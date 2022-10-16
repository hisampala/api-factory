export function isNullObj(obj: any) {
  return obj === null || obj === undefined || obj === '';
}
export function isNullObjString(obj: string) {
  return obj === null || obj === undefined || obj === '' || obj.length < 0;
}
export function getObjKey(obj, value): string {
  return Object.keys(obj).find((key) => obj[key] === value);
}
export function isStringColor(obj: string) {
  return obj.startsWith('#') && obj.length <= 7;
}
export function isEmail(email: string) {
  const condition =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return condition.test(email);
}
export function isPhoneNumber(phonenumber: string) {
  const condition = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  return condition.test(phonenumber);
}
export function ConvertFlightNumber(flightnumber: string) {
  return flightnumber.split(' ').length > 1
    ? flightnumber.split(' ').join('')
    : flightnumber;
}
export function getObjValueByKey(obj, value): string {
  return Object.keys(obj).find((key) => obj[key] === value);
}
