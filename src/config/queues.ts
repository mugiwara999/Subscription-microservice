import { Queue, Worker } from "bullmq";
import redis from "./redis";
import prisma from "./prisma";

const QUEUE_NAME = "subscription-expiry";


export const expiryQueue = new Queue(QUEUE_NAME, { connection: redis });

export const expiryWorker = new Worker(
    QUEUE_NAME,
    async (job) => {
        const { subscription_id } = job.data as { subscription_id: string };
        const subscription = await prisma.subscription.update({
            where: {
                id: subscription_id
            },
            data: {
                status: "EXPIRED"
            }
        })
        console.log(`Subscription ${subscription_id} expired`);
    },
    {
        connection: redis,
        concurrency: 5,
    }
)

expiryWorker.on("completed", (jobId, result) => {
    console.log(`Job ${jobId} completed with result ${result}`);
})

expiryWorker.on("failed", (jobId, error) => {
    console.log(`Job ${jobId} failed with error ${error}`);
})

export function ScheduleExpiration(subscription_id: string, delayMs: number) {
    expiryQueue.add(subscription_id, { subscription_id }, { delay: delayMs,attempts: 3,});
}