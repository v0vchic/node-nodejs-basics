import { readFile, access } from 'node:fs/promises';
import { join } from 'path';
import { constants } from 'fs';

const dirname = new URL('.', import.meta.url).pathname;

const read = async () => {
    const filePath = join(dirname, 'fileToRead.txt');

    try {
        await access(filePath, constants.F_OK);
        const content = await readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await read();