import { ReadFileService } from './../read-file/read-file.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { PostStoreTransactionRequestDto } from 'src/interface/PostStoreTransactionRequestDto';

@Injectable()
export class RequestHttpService {
  constructor(private readonly httpService: HttpService) {}

  async getData(url: string): Promise<AxiosResponse<any[]>> {
    return this.httpService
      .get(url)
      .toPromise()
      .then((response) => response.data)
      .catch(() => Promise.reject(url));
  }

  async postData(
    url: string,
    body: PostStoreTransactionRequestDto,
  ): Promise<AxiosResponse<any[]>> {
    return this.httpService
      .post(url, body)
      .toPromise()
      .then((response) => response.data)
      .catch(() => Promise.reject(url));
  }
}
