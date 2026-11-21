import {
    FlowProducer,
    Queue
} from "bullmq";

import type {
    FlowJob,
    JobsOptions,
    QueueOptions
} from "bullmq";

import { Redis } from "ioredis";
import httpStatus from "http-status";

import env from "#substructure/env.ts";
import ApiError from "#webhost/errors/apiError.ts";

type CreateQueueOptions = Omit<QueueOptions, "connection">;

const getRedisConnection = () => {
    const url = new URL(env.redisPath);

    return new Redis({
        host: url.hostname || "127.0.0.1",
        port: Number(url.port) || 6379,
        username: url.username || undefined,
        password: url.password || undefined,
        maxRetriesPerRequest: null
    });
};

type RedisConnection = ReturnType<typeof getRedisConnection>;

export const connection = getRedisConnection();

type BulkJob = {
    name: string;
    data: any;
    opts?: JobsOptions;
};

type AddJobOptions = JobsOptions & {
    name?: string;
};

class QueueManager {
    private connection: Redis | null = null;

    public queues: Record<string, Queue> = {};

    private flowProducer: FlowProducer;

    constructor() {
        this.connection = null;
        this.queues = {};

        this.flowProducer = new FlowProducer({
            connection
        });
    }

    async initialize(): Promise<void> {
        try {
            const redisConnection = connection;

            this.connection = redisConnection;

            redisConnection.on("error", (err: Error) => {
                console.error("Redis connection error:", err);
            });

            redisConnection.on("connect", () => {
                console.info("Redis connected successfully");
            });

            await redisConnection.ping();

            // دریافت حساب های بانکی کاربر
            await this.createQueue("Bank-Accounts");

            console.log("Queue Manager initialized successfully");
        } catch (error) {
            console.log("Failed to initialize Queue Manager:", error);
            throw error;
        }
    }

    async createQueue(
      queueName: string,
      options: CreateQueueOptions = {}
    ): Promise<Queue> {
        const existingQueue = this.queues[queueName];

        if (existingQueue) {
            return existingQueue;
        }

        const defaultOptions = {
            connection: this.connection ?? connection,

            defaultJobOptions: {
                removeOnComplete: {
                    age: 48 * 3600 // 48 ساعت
                },

                removeOnFail: {
                    age: 30 * 24 * 3600 // 30 روز
                },

                attempts: 15,

                backoff: {
                    type: "exponential",
                    delay: 84_375
                }
            },

            // تنظیمات برای جلوگیری از stalled شدن jobs
            stalledInterval: 30000, // هر 30 ثانیه چک کن

            maxStalledCount: 3 // حداکثر 3 بار stalled شدن قبل از fail
        };

        const queue = new Queue(queueName, {
            ...defaultOptions,
            ...options
        });

        this.queues[queueName] = queue;

        return queue;
    }

    async addJob(
      queueName: string,
      data: any,
      options: AddJobOptions = {}
    ) {
        const queue = this.queues[queueName];

        if (!queue) {
            throw new Error(`Queue ${queueName} not found`);
        }

        return queue.add(
          options.name || "job",
          data,
          options
        );
    }

    async addBulkJobs(
      queueName: string,
      jobs: BulkJob[]
    ) {
        const queue = this.queues[queueName];

        if (!queue) {
            throw new Error(`Queue ${queueName} not found`);
        }

        return queue.addBulk(jobs);
    }

    async addFlow(flowStructure: FlowJob) {
        try {
            return await this.flowProducer.add(flowStructure);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
              ? error.message
              : String(error);

            throw new ApiError(
              httpStatus.INTERNAL_SERVER_ERROR,
              "Error creating Flow",
              errorMessage
            );
        }
    }

    async shutdown(): Promise<void> {
        try {
            // بستن تمام queues
            for (const queue of Object.values(this.queues)) {
                await queue.close();
            }

            // بستن connection
            if (this.connection) {
                await this.connection.quit();
            }

            console.info("Queue Manager shutdown successfully");
        } catch (error) {
            console.error(
              "Error during Queue Manager shutdown:",
              error
            );

            throw error;
        }
    }
}

// Singleton instance
const queueManager = new QueueManager();

export default queueManager;