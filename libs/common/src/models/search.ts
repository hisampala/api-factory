import { Pagination } from './pagination';

export class Search<T> implements Pagination {
  skip: number;
  take: number;
  where = {} as T;
  constructor(item: T) {
    this.take = Number(item['take']) ? Number(item['take']) : 10;
    this.skip = item['skip'] ? Number(item['skip']) * this.take : 0;
    this.where = item;
    const list_or = [];
    Object.keys(item).forEach((key: string) => {
      if (item[key].split(',').length > 1) {
        const list_value: string[] = item[key].split(',');
        list_value.forEach((value: string) => {
          const newElement = {};
          newElement[key] = value;
          list_or.push(newElement);
        });
        this.where['OR'] = list_or;
        delete this.where[key];
      }
    });
    delete this.where['take'];
    delete this.where['skip'];
  }
}
