/* eslint-disable prettier/prettier */
import { PrismaError } from '@factory/common/constants/constant';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { getObjKey } from '../';
export function generateMessageErrorPrismaClient(
  error: PrismaClientKnownRequestError,
) {
  const list_error = [];
  const error_item = {};
  error_item['code'] = error.code;
  error_item['name'] = error.name;
  error_item['meta'] = error.meta;
  error_item['message'] = getObjKey(PrismaError, error.code);
  list_error.push(error_item);
  return list_error;
}
