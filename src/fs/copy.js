import { access, cp } from 'node:fs/promises';
import { constants } from 'fs';
import { join } from 'path';

const dirname = new URL('.', import.meta.url).pathname;

const copy = async () => {
    const srcFolder = join(dirname, 'files');
    const destFolder = join(dirname, 'files_copy');

    try {
        await access(srcFolder, constants.F_OK);

        try {
            await access(destFolder, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (destError) {
            if (destError.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await cp(srcFolder, destFolder, {
            recursive: true,
            force: false,
            errorOnExist: true
        });

    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await copy();
