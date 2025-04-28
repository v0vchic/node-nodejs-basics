import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const calculateHash = async () => {
    const filePath = join(
        dirname(fileURLToPath(import.meta.url)),
        'fileToCalculateHashFor.txt'
    );

    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => {
            console.log(hash.digest('hex'));
            resolve();
        });
        stream.on('error', () => reject(new Error('FS operation failed')));
    });
};

await calculateHash();