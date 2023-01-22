const MySQLEvents = require("mysql-events")
import express from "express"
import winston from "winston"
import http from "http"
import { Options } from "sequelize"

import configs from "./config/config.js"
import mainSequelize from "./models"
import institutionsBb from "./models/institutions_db"

// import { socketConnection } from "./listeners/connection"

import winston_logger from "./utils/logger"
import { webhookWorker } from "./services/jobs/index.js"
import { umZug } from "./services/umZug"
import { Utils } from "./utils/utils.js"
import { MSetting } from "./models/index.models.js"
import { addJobs } from './services/jobs'
import { QUENAMES } from './services/jobs/types.js'


const env = process.env.NODE_ENV || "development"
const config = (configs as { [key: string]: Options })[env]

// initialize express app 1
export const app = express()

// create http server
const httpServer = http.createServer(app)

let retrySec = 1000
let setTimeId: string | number | NodeJS.Timeout | undefined

const workingDir = __dirname

export const initServer = async (host: string, port: number) => {

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined")
  }

  try {
    // initialize socket.io3
    // socketConnection(httpServer)

    await mainSequelize.authenticate()

    winston_logger.info("Main Database connected successfully")
    
    const settings = await Utils.getSettings(MSetting)

    if(settings?.company_settings.run_main_migrations.value){
      const umzugMain = umZug(`migrations/main/*.js`, mainSequelize, workingDir)
      await umzugMain.up()
    }

    if(settings?.company_settings){
      settings?.company_settings?.databases.forEach( async (database: { type: string; db_name: string; run_migrations: boolean }) => {
          await mainSequelize.query(`CREATE DATABASE IF NOT EXISTS ${database.db_name}`)
          const sequelize = await institutionsBb(database)
          sequelize.authenticate()
          winston_logger.info(`Sub Database ${database.db_name} connected successfully`)
          if(database.run_migrations){
            const umzug = umZug(`migrations/${database?.type}/*.js`, sequelize, workingDir)
            await umzug.up()
            umzug.on("migrating", (ev) => console.log({ name: ev.name, path: ev.path }))
          }
        }
      )
    }

    webhookWorker.run()

    // start the cron job
    //TODO:  //addJobs({ event: QUENAMES.CRONJOB }, QUENAMES.CRONJOB)

    httpServer.listen(port, host, () => {
      winston_logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        })
      )

      winston_logger.info(`Server is running on http://${host}:${port}`)
    })

    dbWatcher()

    clearTimeout(setTimeId)
  } catch (error: any) {
    console.log(error)
    httpServer.close()

    // gracefully shutdown worker
    await webhookWorker.close()

    winston_logger.error(
      "Unable to connect to the database. Retrying in... " + retrySec
    )
    setTimeout(async () => {
      await initServer(host, port)
    }, retrySec)
    retrySec += 1000
  }

  httpServer.on("error", async (e: any) => {
    if (e.code === "EADDRINUSE" || e.code === "ENOTFOUND") {
      winston_logger.info(
        `Address in use or not found, retrying... || http://${host}:${port} || ${e.code}`
      )
      setTimeout(() => {
        httpServer.close()
        httpServer.listen(port, host)
      }, 5000)
    }
  })
}

function dbWatcher() {
  const dsn = {
    host: config.host,
    user: config.username,
    password: config.password,
  }

  const mysqlEventWatcher = MySQLEvents(dsn)

  const watcher = mysqlEventWatcher.add(
    "onlinesalesdb_development",
    function (oldRow: null, newRow: null, event: any) {
      //row inserted
      if (oldRow === null) {
        //insert code goes here
        //    console.log("INSERT: ", oldRow, newRow)
      }

      //row deleted
      if (newRow === null) {
        //delete code goes here
        //  console.log("DELETE: ", oldRow, newRow)
      }

      //row updated
      if (oldRow !== null && newRow !== null) {
        //update code goes here
        //    console.log("UPDATE: ", oldRow, newRow)
      }

      //detailed event information
      // console.log("DETAILED: ", event)
    },
    "match this string or regex"
  )

  //   console.log("WATCHER: ", watcher)
  winston_logger.info("MySQL Event Watcher Started")
}
