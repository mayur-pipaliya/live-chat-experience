import os from "os";
import cluster from "cluster";

import { ExpressServer } from "./app.js";
import { getEnvVariable } from "./utils/env.js";

const maxWorkers = Number(getEnvVariable("NODE_CLUSTER_MAX_WORKERS", 1));
const numCPUs = os.cpus().length;
const numWorkers = Math.min(maxWorkers, numCPUs);

if (numWorkers === 1) {
  console.info("Only one worker requested, not using cluster mode");
}

if (numWorkers > 1 && cluster.isPrimary) {
  console.info(
    `Requested max workers: ${maxWorkers}, ${numCPUs} available, using ${numWorkers} workers`
  );
  console.info(`Primary ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    console.error(`Worker ${worker.process.pid} exited with code ${code}`);
    console.info("Fork new worker!");
    cluster.fork();
  });
} else {
  console.info(`Worker ${process.pid} started`);

  const app = new ExpressServer();
  app.start();
}
