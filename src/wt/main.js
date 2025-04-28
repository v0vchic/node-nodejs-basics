import { cpus } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    const cpuCount = cpus().length;
    const workers = Array(cpuCount).fill(null);
    const initialNumber = 10;

    const results = await Promise.allSettled(
        workers.map((_, i) => new Promise((resolve, reject) => {
            const worker = new Worker(join(dirname, 'worker.js'));
            worker.postMessage(initialNumber + i);

            worker.on('message', (result) => resolve(result));
            worker.on('error', () => resolve({ status: 'error', data: null }));
            worker.on('exit', (code) => {
                if (code !== 0) resolve({ status: 'error', data: null });
            });
        }))
    );

    console.log(results.map(result =>
        result.status === 'fulfilled' ? result.value : { status: 'error', data: null }
    ));
};

await performCalculations();