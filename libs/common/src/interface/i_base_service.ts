import { Observable } from 'rxjs';

export interface IBaseService {
  onCreate(item: any): Observable<any>;
  onUpdate(id: string, item: any): Observable<any>;
  onDelete(id: string): Observable<any>;
  getAll(item: any): Observable<any>;
  getById(id: string): Observable<any>;
}
