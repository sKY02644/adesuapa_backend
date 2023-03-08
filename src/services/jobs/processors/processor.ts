import { Job } from 'bullmq';

import { JOBNAMES } from "../types";
import webHook from './processes/webhook'
import cronjob from './processes/cronjob'
import passwordreset from './processes/passwordreset'


export async function processor(job: Job) {

    const jobName = job.name
    const event = job.data

    switch (jobName) {
        case JOBNAMES.WEBHOOKJOB:
            await webHook(event)
            break;
        case JOBNAMES.CRONJOB:
            console.log("JOB", jobName, " ------ ", event)
            await cronjob(event)
            break;
        case JOBNAMES.PASSWORDRESETCODEJOB:
            await passwordreset(event)
            break;
        default:
            break;
    }

}
