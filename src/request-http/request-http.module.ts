import { Module } from '@nestjs/common';
import { RequestHttpService } from './request-http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RequestHttpService],
  exports: [RequestHttpService],
})
export class RequestHttpModule {}
