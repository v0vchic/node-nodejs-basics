import { readdir, access } from 'node:fs/promises';
import { join } from 'path';
import { constants } from 'fs';

const dirname = new URL('.', import.meta.url).pathname;

const list = async () => {
    const folderPath = join(dirname, 'files');

    try {
        await access(folderPath, constants.F_OK);
        const files = await readdir(folderPath);
        console.log(files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();