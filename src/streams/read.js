import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const dirname = new URL('.', import.meta.url).pathname;

const read = async () => {
    const filePath = join(dirname, 'fileToRead.txt');

    try {
        const readStream = createReadStream(filePath);
        await pipeline(
            readStream,
            process.stdout
        );
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await read();