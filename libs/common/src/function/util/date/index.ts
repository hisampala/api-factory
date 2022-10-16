import * as moment from 'moment';
export function GetCurrentDate() {
  return moment().utc().toDate().toISOString();
}
export function GetCurrentDateDatetimetype() {
  return moment().utc().toDate();
}
export function ConvertFormatStringToDateString(item: string) {
  return moment(item).utc().format('YYYY-MM-DD');
}
export function ConvertFormatStringToDate(item: string) {
  return moment(item).utc().toDate();
}
