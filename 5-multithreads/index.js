const { PerformanceObserver, performance } = require("perf_hooks");
const { Worker } = require("worker_threads");
const { cpus } = require("os");

const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(
      `Performance entry: ${entry.name} - Duration: ${entry.duration}ms`
    );
  });
});

performanceObserver.observe({ entryTypes: ["measure"] });

const digits = [];
for (let i = 1; i <= 300_000; i++) {
  digits.push(i);
}

const oneThreadFunction = (digits) => {
  let count = 0;
  performance.mark("start");
  for (let digit of digits) {
    if (digit % 3 === 0) {
      count += 1;
    }
  }
  performance.mark("end");
  performance.measure("digit-count", "start", "end");

  console.log(`Count of numbers divisible by 3: ${count}`);
};

const core = cpus().length;
process.env.UV_THREADPOOL_SIZE = core;

const multithreadFunction = (digits) => {
  const digitsPerThread = Math.ceil(digits.length / core);

  let count = 0;
  const threads = [];
  for (let i = 0; i < core; i++) {
    const start = i * digitsPerThread;
    const end = start + digitsPerThread;
    const threadDigits = digits.slice(start, end);

    const worker = new Worker("./worker.js", { workerData: { threadDigits } });

    worker.on("message", (result) => {
      count += result;
      console.log(`Thread ${i + 1} count: ${result}`);
    });

    threads.push(worker);
  }

  performance.mark("threads-start");
  Promise.all(
    threads.map(
      (worker) =>
        new Promise((resolve) => {
          worker.on("exit", () => {
            resolve();
          });
        })
    )
  )
    .then(() => {
      performance.mark("threads-end");
      performance.measure("thread-performance", "threads-start", "threads-end");
      console.log(`Total count of numbers divisible by 3: ${count}`);
    })
    .catch((err) => {
      console.error("Error in threads:", err);
    });
};

oneThreadFunction(digits);
multithreadFunction(digits);
