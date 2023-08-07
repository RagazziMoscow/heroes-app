import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, ObservableInput, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import Hero from "./hero";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly heroesUrl = 'api/heroes';  // URL to web api
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError<Hero[], ObservableInput<Hero[]>>(this.handleError<Hero[]>('getHeroes', []))
    ) as Observable<Hero[]>;
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>( `${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError<Hero, ObservableInput<Hero>>(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError("addHero"))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any, caught: Observable<T>): ObservableInput<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
