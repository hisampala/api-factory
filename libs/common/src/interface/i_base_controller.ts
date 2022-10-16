import { Observable } from 'rxjs';

export interface IBaseController {
  onCreate(...item: any): Observable<any>;
  onUpdate(...item: any): Observable<any>;
  onDelete(...item: any): Observable<any>;
  getAll(...item: any): Observable<any>;
  getById(...item: any): Observable<any>;
}
