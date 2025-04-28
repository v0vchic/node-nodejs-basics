import { unlink } from 'node:fs/promises';
import { join } from 'path';

const dirname = new URL('.', import.meta.url).pathname;

const remove = async () => {
    const filePath = join(dirname, 'fileToRemove.txt');

    try {
        await unlink(filePath);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await remove();