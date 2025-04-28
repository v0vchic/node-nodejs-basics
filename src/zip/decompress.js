import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const dirname = new URL('.', import.meta.url).pathname;

const decompress = async () => {
    const sourcePath = join(dirname, 'files', 'archive.gz');
    const destPath = join(dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gunzip = createGunzip();

    try {
        await pipeline(
            readStream,
            gunzip,
            writeStream
        );
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await decompress();