import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import cls from 'cls-hooked'

const env = process.env.NODE_ENV || 'development'

const subDbs = new Map()

export default async (settings: any) => {
                
    const namespace = cls.createNamespace(`onlinesalesnamespace_${settings?.type}`)

    Sequelize.useCLS(namespace)

    const config = (settings?.configs as {[key: string]: SequelizeOptions})[env]

    const sequelize: Sequelize = new Sequelize({
        ...config,
        database: settings?.db_name,
        define: {
            underscored: true,
            timestamps: true,
        },
        retry: {
            max: 5,
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
    
    const modelsPath = env === 'production' ? [ __dirname + '/classes/' + settings?.type + '/*.js' ] : [ __dirname + '/classes/' + settings?.type + '/*.ts' ]

    sequelize.addModels(modelsPath)

    subDbs.set(settings?.type, sequelize)

    return sequelize
}

export { subDbs }
