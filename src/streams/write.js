import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const dirname = new URL('.', import.meta.url).pathname;

const write = async () => {
    const filePath = join(dirname, 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath);

    await pipeline(
        process.stdin,
        writeStream
    );
};

await write();