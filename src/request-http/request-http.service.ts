import { ReadFileService } from './../read-file/read-file.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { CreateRequestHttpDto } from './dto/create-request-http.dto';
import { UpdateRequestHttpDto } from './dto/update-request-http.dto';
import { map } from 'rxjs/operators';

interface RequestData {
  body?: string;
  queryString?: string;
  pathVariable?: string;
}

@Injectable()
export class RequestHttpService {
  constructor(private readonly httpService: HttpService) {}

  async getData(url: string): Promise<AxiosResponse<any[]>> {
    return this.httpService
      .get(url)
      .toPromise()
      .then((response) => response.data)
      .catch((err) => err);
  }

  async postData(url: string): Promise<AxiosResponse<any[]>> {
    return this.httpService
      .post(url)
      .toPromise()
      .then((response) => response.data)
      .catch((err) => err);
  }
}
