import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { MergeTransaction } from 'src/interface/MergeTransaction';
import { RequestLog } from 'src/interface/RequestLog';

type CollctionName = 'MergeTransactions' | 'RejectLogs' | 'ResolveLogs';

@Injectable()
export class LowdbService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase('MergeTransactions');
    this.initDatabase('RejectLogs');
    this.initDatabase('ResolveLogs');
  }

  private async initDatabase(collctionName: CollctionName) {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);
    const listUsers = await this.db.get(collctionName).value();
    if (!listUsers) {
      await this.db.set(collctionName, []).write();
    }
  }

  async insertMergeTransactions(mergeTransactions: MergeTransaction[]) {
    const listData = await this.db.get('MergeTransactions').value();
    mergeTransactions.forEach((mTra) => {
      listData.push(mTra);
    });
    return await this.db.set('MergeTransactions', listData);
  }

  async findAllMergeTransactions() {
    return await this.db.get('MergeTransactions').value();
  }

  async insertRejectLog(rejectLogs: RequestLog[]) {
    const listData = await this.db.get('RejectLogs').value();
    const newListData = listData.concat(rejectLogs);
    return await this.db.set('RejectLogs', newListData);
  }

  async insertResolveLog(resolveLogs: RequestLog[]) {
    const listData = await this.db.get('ResolveLogs').value();
    const newListData = listData.concat(resolveLogs);
    return await this.db.set('ResolveLogs', newListData);
  }

  async findAllRejectLog(type?: string): Promise<RequestLog[]> {
    const listData = await this.db.get('RejectLogs').value();
    if (!type) return listData;
    const notRetryList = listData.filter((log) => {
      return log.retry === type;
    });
    return notRetryList;
  }

  async findAllResolveLog(): Promise<RequestLog[]> {
    const listData = await this.db.get('ResolveLogs').value();
    return listData;
  }

  async updateSuccessRequest(successRequest: RequestLog[]) {
    const listData = await this.db.get('RejectLogs').value();
    for (const sr of successRequest) {
      for (const log of listData) {
        if (sr.url === log.url) {
          log.retry = 'Y';
          break;
        }
      }
    }

    return await this.db.set('RejectLogs', listData);
  }
}
