import { Injectable, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ReadFileService {
  transactionCsvFile(filePath: string): StreamableFile {
    let data = '';
    const readStream = fs.createReadStream(join(filePath));
    readStream.on('data', (chunk) => (data += chunk.toString())); // <--- the data log gets printed
    readStream.on('end', () => {
      console.log(data);
      console.log('done');
    });
    readStream.on('error', (err) => {
      console.error(err);
    });
    return new StreamableFile(readStream);
  }
}
