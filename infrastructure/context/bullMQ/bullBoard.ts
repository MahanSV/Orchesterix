import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import type { Queue } from "bullmq";

import env from "#substructure/env.ts";
import queueManager from "#context/bullMQ/queueManager.ts";

let serverAdapter: ExpressAdapter | null = null;

let bullBoard: ReturnType<typeof createBullBoard> | null = null;

export function basicAuth(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction
): void {
    const username = env.bullMQUsername || "admin";
    const password = env.bullMQPassword || "admin";

    const auth = req.headers.authorization;

    if (!auth) {
        res.setHeader(
          "WWW-Authenticate",
          'Basic realm="BullMQ Dashboard"'
        );

        res.status(401).send("Authentication required");
        return;
    }

    const [scheme, encodedCredentials] = auth.split(" ");

    if (scheme !== "Basic" || !encodedCredentials) {
        res.setHeader(
          "WWW-Authenticate",
          'Basic realm="BullMQ Dashboard"'
        );

        res.status(401).send("Invalid credentials");
        return;
    }

    const credentials = Buffer
      .from(encodedCredentials, "base64")
      .toString("utf-8");

    const separatorIndex = credentials.indexOf(":");

    if (separatorIndex === -1) {
        res.setHeader(
          "WWW-Authenticate",
          'Basic realm="BullMQ Dashboard"'
        );

        res.status(401).send("Invalid credentials");
        return;
    }

    const user = credentials.slice(0, separatorIndex);
    const pass = credentials.slice(separatorIndex + 1);

    if (user !== username || pass !== password) {
        res.setHeader(
          "WWW-Authenticate",
          'Basic realm="BullMQ Dashboard"'
        );

        res.status(401).send("Invalid credentials");
        return;
    }

    next();
}

export function initializeBullBoard(): ExpressAdapter {
    if (serverAdapter) {
        return serverAdapter;
    }

    const adapter = new ExpressAdapter();

    adapter.setBasePath("/admin/queues");

    const queues = Object.values(queueManager.queues);

    const bullMQAdapters = queues.map(
      (queue) => new BullMQAdapter(queue)
    );

    bullBoard = createBullBoard({
        queues: bullMQAdapters,
        serverAdapter: adapter
    });

    serverAdapter = adapter;

    return adapter;
}

export function addQueueToBoard(queue: Queue): void {
    if (!bullBoard || !serverAdapter) {
        throw new Error("Bull Board not initialized");
    }

    const adapter = new BullMQAdapter(queue);

    bullBoard.addQueue(adapter);
}