import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestHttpDto } from './create-request-http.dto';

export class UpdateRequestHttpDto extends PartialType(CreateRequestHttpDto) {}
