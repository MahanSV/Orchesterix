import { Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { connection } from '#context/bullMQ/queueManager.ts';
import { bankAccountWorkerProcessor } from '#context/bullMQ/workers/bankAccountsWorker.ts';
import { AccountActivityWorkerProcessor } from '#context/bullMQ/workers/acountActivityWorker.ts';
import { guaranteeWorkerProcessor } from '#context/bullMQ/workers/guaranteeWorker.ts';
import { loanWorkerProcessor } from '#context/bullMQ/workers/LoanWorker.ts';
import { PointWorkerProcessor } from '#context/bullMQ/workers/PointWorker.ts';

type ProcessorHandler = (job: Job) => Promise<unknown>;

type Processor = {
  queueName: string;
  handler: ProcessorHandler;
};

export async function setupWorkers(): Promise<void> {
  const processors: Processor[] = [
    // Test ✅
    {
      queueName: 'Bank-Accounts',
      handler: async (job) =>
        await bankAccountWorkerProcessor(job.data.nationalId),
    },
    {
      queueName: 'Account-Activity',
      handler: async (job) =>
        await AccountActivityWorkerProcessor(job.data.nationalId),
    },
    // Test ✅
    {
      queueName: 'Guarantee',
      handler: async (job) =>
        await guaranteeWorkerProcessor(job.data.nationalId),
    },
    {
      queueName: 'Loan',
      handler: async (job) =>
        await loanWorkerProcessor(job.data.nationalId),
    },
    {
      queueName: 'Point',
      handler: async (job) =>
        await PointWorkerProcessor(job.data.nationalId),
    }
  ];

  for (const { queueName, handler } of processors) {
    new Worker(
      queueName,
      async (job: Job) => {
        console.log(`🔄 Processing ${queueName}...`);

        try {
          const result = await handler(job);

          if (queueName === 'Guarantee') {
            const serializedResult = JSON.stringify(
              result,
              (_, value) =>
                typeof value === 'bigint' ? value.toString() : value,
              2
            );

            await job.log(serializedResult ?? String(result));
          }
          else {
            const serializedResult =
              JSON.stringify(result, null, 2) ?? String(result);

            await job.log(serializedResult);
          }

          console.log(`✅ Finished ${queueName}.`);
        } catch (error: unknown) {
          console.error(`❌ Failed ${queueName}:`, error);
          throw error;
        }
      },
      {
        connection,
      },
    );

    console.log(`🚀 Worker listening on queue: ${queueName}`);
  }
}