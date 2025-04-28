import { access, rename as fsRename } from 'node:fs/promises';
import { constants } from 'fs';
import { join } from 'path';

const dirname = new URL('.', import.meta.url).pathname;

const rename = async () => {
    const oldPath = join(dirname, 'wrongFilename.txt');
    const newPath = join(dirname, 'properFilename.md');

    try {
        await access(oldPath, constants.F_OK);
        await access(newPath, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fsRename(oldPath, newPath);
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await rename();