import { Job } from 'bullmq';

import { JOBNAMES } from "../types";
import webHook from './processes/webhook'


export async function processor(job: Job) {

    const jobName = job.name
    const event = job.data

    switch (jobName) {
        case JOBNAMES.WEBHOOKJOB:
            await webHook(event)
            break;
        case JOBNAMES.CRONJOB:

            console.log("JOB", jobName, " ------ ", event)
            
            break;
        default:
            break;
    }

}
