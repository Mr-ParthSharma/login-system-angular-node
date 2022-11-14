import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators'
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: "root",
})

export class AuthService {
  private url = "https://localhost:3000/auth";

  httpOptions : { headers : HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json Authorization"}),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }
}
