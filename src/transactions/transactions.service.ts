import { RequestHttpService } from './../request-http/request-http.service';
import { Injectable } from '@nestjs/common';
import { ReadFileService } from 'src/read-file/read-file.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly requestHttpService: RequestHttpService,
    private readonly readFileService: ReadFileService,
  ) {}

  async getTransactionsByAPI() {
    const data = await this.requestHttpService.getData(
      'http://localhost:4001/transaction?page=1',
    );
    console.log(data);
  }

  async getTransactionsByFile() {
    const data = await this.readFileService.transactionCsvFile(
      '../transaction.csv',
    );
    console.log(data);
  }
}
