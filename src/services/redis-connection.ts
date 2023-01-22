import IORedis from 'ioredis';

import winston_logger from "../utils/logger"

let redisClient: IORedis

const port = process.env.REDIS_PORT ? +(process.env.REDIS_PORT) : 6379
const host = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost'

redisClient = new IORedis({ 
    host, 
    port,
    maxRetriesPerRequest: null
 })

redisClient.on('connect', function () {
    winston_logger.info('Redis Server Connected!')
})

redisClient.on('error', function (error: any) {
    winston_logger.error("Error in Redis", error)
});

export default redisClient