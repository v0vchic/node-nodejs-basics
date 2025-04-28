import { access, writeFile } from 'node:fs/promises';
import { constants } from 'fs';
import { join } from 'path';

const dirname = new URL('.', import.meta.url).pathname;

const create = async () => {
    const filePath = join(dirname, 'files', 'fresh.txt');

    try {
        await access(filePath, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(filePath, 'I am fresh and young');
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await create();