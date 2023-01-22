const winston = require('winston');

export default winston.createLogger({
    transports: [
        new winston.transports.File({ filename: './error-logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './error-logs/combined.log' }),
        new winston.transports.Http({
            level: 'warn',
            format: winston.format.json()
          }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});