import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import cls from 'cls-hooked'

import configs from '../config/config.js'

const env = process.env.NODE_ENV || 'development'
const config = (configs as {[key: string]: SequelizeOptions})[env]

const namespace = cls.createNamespace('onlinesalesnamespace')

Sequelize.useCLS(namespace)

const sequelize: Sequelize = new Sequelize({
  ...config,
  define: {
    underscored: true,
    timestamps: true,
  },
  retry: {
    max: 5, // try to connect to the database up to 5 times
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ],
  },
})

sequelize.addModels([__dirname + '/classes/main/*.js'])

export default sequelize
