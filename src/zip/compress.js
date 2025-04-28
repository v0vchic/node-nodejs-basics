import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = new URL('.', import.meta.url).pathname;


const compress = async () => {
    const sourcePath = join(dirname, 'files', 'fileToCompress.txt');
    const destPath = join(dirname, 'files', 'archive.gz');

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gzip = createGzip();

    try {
        await pipeline(
            readStream,
            gzip,
            writeStream
        );
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await compress();