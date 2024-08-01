import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Eleve } from '../models/eleve';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private baseUrl = 'http://localhost:8080/api/eleves';
  eleves$: any;

  constructor(private http: HttpClient) { }

  updateEleve(id: number, eleve: Eleve): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.baseUrl}/${id}`, eleve).pipe(
      catchError(this.handleError)
    );
  }

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  createEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.baseUrl, eleve).pipe(
      catchError(this.handleError)
    );
  }

  deleteEleve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getEleveById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
