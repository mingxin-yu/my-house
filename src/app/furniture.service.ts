import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Furniture } from './furniture';


@Injectable({providedIn: 'root'})
export class FurnitureService {
  // URL to web api
  private static FURNITURES_URL = 'api/furnitures';
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(
    private http: HttpClient) {}

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(FurnitureService.FURNITURES_URL).pipe(
        catchError(this.handleError<Furniture[]>('getFurnitures', [])));
  }

  /** GET furniture by id. Return `undefined` when id not found */
  getFurnitureNo404<Data>(id: number): Observable<Furniture> {
    const url = `${FurnitureService.FURNITURES_URL}/?id=${id}`;
    return this.http.get<Furniture[]>(url)
      .pipe(
        // returns a {0|1} element array
        map(furnitures => furnitures[0]),
        catchError(this.handleError<Furniture>(`getFurniture id=${id}`))
      );
  }

  /** GET furniture by id. Will 404 if id not found */
  getFurniture(id: number): Observable<Furniture> {
    const url = `${FurnitureService.FURNITURES_URL}/${id}`;
    return this.http.get<Furniture>(url).pipe(
      catchError(this.handleError<Furniture>(`getFurniture id=${id}`))
    );
  }

  addFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(FurnitureService.FURNITURES_URL, furniture, this.httpOptions).pipe(
      catchError(this.handleError<Furniture>('addFurniture'))
    );
  }

  deleteFurniture(id: number): Observable<Furniture> {
    const url = `${FurnitureService.FURNITURES_URL}/${id}`;

    return this.http.delete<Furniture>(url, this.httpOptions).pipe(
      catchError(this.handleError<Furniture>('deleteFurniture'))
    );
  }

  updateFurniture(furniture: Furniture): Observable<any> {
    return this.http.put(FurnitureService.FURNITURES_URL, furniture, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateFurniture'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
