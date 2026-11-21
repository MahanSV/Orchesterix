import { Worker } from "bullmq";

import type { Job } from "bullmq";

import { connection } from "#context/bullMQ/queueManager.ts";

type ProcessorHandler = () => Promise<unknown>;

type Processor = {
    queueName: string;
    handler: ProcessorHandler;
};

export async function setupWorkers(
): Promise<void> {

    const processors: Processor[] = [

        { // Okay
            queueName: "Bank-Accounts",

            handler: async () =>
              await updateAllGoogleAdsAuthUsersForCronJob()
        }

    ];

    for (const { queueName, handler } of processors) {

        new Worker(
          queueName,

          async (job: Job) => {
              console.log(`🔄 Processing ${queueName}...`);

              try {
                  const result = await handler();

                  const serializedResult =
                    JSON.stringify(result, null, 2) ?? String(result);

                  await job.log(serializedResult);

                  console.log(`✅ Finished ${queueName}.`);

              } catch (error: unknown) {
                  console.error(`❌ Failed ${queueName}:`, error);

                  throw error;
              }
          },

          {
              connection
          }
        );

        console.log(`🚀 Worker listening on queue: ${queueName}`);
    }
}