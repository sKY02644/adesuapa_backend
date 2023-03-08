import { Worker } from 'bullmq'
import connection from '../../redis-connection'

import { QUENAMES } from '../types'
import { processor } from '../processors/processor'

export const worker = new Worker(QUENAMES.WEBHOOK, processor, { connection, autorun: false })

worker.on('error', err => {
    console.error(QUENAMES.WEBHOOK + " Error: ", err);
});

console.log(QUENAMES.WEBHOOK + "WORKER STARTED")
