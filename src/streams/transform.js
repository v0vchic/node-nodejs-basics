import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, _, callback) {
            this.data = (this.data || []).concat(chunk);
            callback();
        },
        final(callback) {
            const fullText = Buffer.concat(this.data).toString();
            this.push(fullText.split('').reverse().join(''));
            callback();
        }
    });

    await pipeline(
        process.stdin,
        reverseStream,
        process.stdout
    );
};

await transform();