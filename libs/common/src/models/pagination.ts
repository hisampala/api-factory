export class Pagination {
  constructor(skip: number, take: number) {
    this.skip = skip;
    this.take = take;
  }
  skip: number;
  take: number;
}
