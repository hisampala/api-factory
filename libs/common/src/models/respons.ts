import { ErrorMessage } from './error_message';

export class ResponseResult<T> {
  status_code: number;
  stataus_message: string;
  error_message: ErrorMessage[] = [];
  data: T = {} as T;
  total: number;
  constructor(
    status_code: number,
    stataus_message: string,
    data?: T,
    error?: any,
    total?: number,
  ) {
    this.status_code = status_code;
    this.stataus_message = stataus_message;
    this.data = data;
    this.error_message = error;
    this.total = total;
  }
}
