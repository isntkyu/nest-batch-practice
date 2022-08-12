import { Injectable } from '@nestjs/common';
import { RequestHttpService } from 'src/request-http/request-http.service';

@Injectable()
export class StoreTransactionsService {
  constructor(private readonly requestHttpService: RequestHttpService) {}

  async getStoreTransactionsByApi() {
    const data = await this.requestHttpService.postData(
      'http://localhost:4002/store-transaction/5603431',
    );
    console.log(data);
  }
}
