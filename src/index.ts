import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import morgan from 'morgan'
import { promises as fs }  from 'fs'
import os from 'os'
import path from 'path'

import { app, initServer } from './server'

require('dotenv').config()

// MIDDLEWARES
import { errorHandler } from './middlewares/error-handler'

import { eventsHandler } from "./services/serverSentEvents";

// ERRORS
import { NotFoundError } from './errors/not-found-error'

// INDEX CONTROLLERS
import { defaults } from './controllers'

// Self-Invoking Function
( async function () {
  
  const HOST = os.hostname()
  const PORT = +(`${process.env.PORT}`) || 4545
  const STABLEVERSION = `${process.env.STABLE_VERSION}`
  
  app.use(morgan('tiny'))
  app.use(helmet())
  app.set('trust proxy', true)
  app.use(cors({
      origin: [
        'http://localhost:8080', 'http://localhost:8081', 
        `http://${HOST}:${PORT}`, 'http://192.168.0.101:8080', 
        'https://adesuapa.vercel.app', 'https://adesuapa-new.vercel.app'],
      credentials: true,
      exposedHeaders: ["set-cookie"]
    })
  )

  // init SERVER SENT EVENT
  app.get(`/${STABLEVERSION}/see`, eventsHandler.bind(eventsHandler));

  app.use(json())
  app.use(
      cookieSession({
          name: '_ny_vsky__RRKIDLK',
          signed: false,
          expires: new Date(Date.now() + 60 * 60 * 1000)// 1 hour
          // secure: true // turn on in production
      })
  )
  
  // * DEFAULT ROUTES
  app.get(`/:${STABLEVERSION}?`, (req, res) => res.send(defaults))

  /**
   * * GET ROUTES PATH
   */
  const routePath = path.join(__dirname, 'routes');

  /**
   * * LOAD ALL ROUTES
   */
  try {
    const files = await fs.readdir(routePath);
    for (const file of files) {
      const item = await import(path.join(routePath, file));
      app.use(`/${STABLEVERSION}`, item.default);
    }
  } catch (err) {
    console.error(err);
  }

  // 404 ROUTES
  app.all('*', async (req, res) => {
      throw new NotFoundError()
  })

  // catch all 404 errors
  app.use(errorHandler) //

  await initServer(HOST, PORT)

})()