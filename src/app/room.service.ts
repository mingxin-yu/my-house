import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Room } from './room';


@Injectable({providedIn: 'root'})
export class RoomService {
  // URL to web api
  private static ROOMS_URL = 'api/rooms';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(RoomService.ROOMS_URL)
      .pipe(
        catchError(this.handleError<Room[]>('getRooms', []))
      );
  }

  /** GET room by id. Return `undefined` when id not found */
  getRoomNo404<Data>(id: number): Observable<Room> {
    const url = `${RoomService.ROOMS_URL}/?id=${id}`;
    return this.http.get<Room[]>(url)
      .pipe(
        // returns a {0|1} element array
        map(rooms => rooms[0]),
        catchError(this.handleError<Room>(`getRoom id=${id}`))
      );
  }

  /** GET room by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `${RoomService.ROOMS_URL}/${id}`;
    return this.http.get<Room>(url).pipe(
      catchError(this.handleError<Room>(`getRoom id=${id}`))
    );
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(RoomService.ROOMS_URL, room, this.httpOptions).pipe(
      catchError(this.handleError<Room>('addRoom'))
    );
  }

  deleteRoom(id: number): Observable<Room> {
    const url = `${RoomService.ROOMS_URL}/${id}`;

    return this.http.delete<Room>(url, this.httpOptions).pipe(
      catchError(this.handleError<Room>('deleteRoom'))
    );
  }

  updateRoom(room: Room): Observable<any> {
    return this.http.put(RoomService.ROOMS_URL, room, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateRoom'))
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
