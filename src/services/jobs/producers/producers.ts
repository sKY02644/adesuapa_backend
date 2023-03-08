import { Queue } from "bullmq";
import connection from "../../redis-connection";

import { QUENAMES, JOBNAMES } from "../types";

export const que = new Queue(QUENAMES.WEBHOOK, { connection });

export async function addJobs(data: any, type: string) {
  switch (type) {
    case QUENAMES.WEBHOOK:
      await que.add(JOBNAMES.WEBHOOKJOB, data, {
        removeOnComplete: { age: 3600, count: 1000 },
        removeOnFail: { age: 24 * 3600 },
      });
      break;
    case QUENAMES.CRONJOB:
      await que.add(JOBNAMES.CRONJOB, data, {
        removeOnComplete: { age: 3600, count: 1000 },
        removeOnFail: { age: 24 * 3600 },
        repeat: {
            pattern: '30 * * * * *',
        },
      });
      break;
    case QUENAMES.PASSWORDRESETCODE:
      await que.add(JOBNAMES.PASSWORDRESETCODEJOB, data, {
        removeOnComplete: { age: 3600, count: 1000 },
        removeOnFail: { age: 24 * 3600 },
      });
      break;
    default:
      break;
  }
}
