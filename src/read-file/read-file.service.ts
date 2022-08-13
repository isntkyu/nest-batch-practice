import { Injectable, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ReadFileService {
  transactionCsvFile(filePath: string) {
    const readStream = fs.createReadStream(join(filePath));
    return readStream;
  }
}
