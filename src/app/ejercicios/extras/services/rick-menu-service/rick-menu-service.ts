import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RickModel, RickObject } from '../../models/rick-model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickService {
  public baseUrl: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  public getCharacters(name: string, gender: string): Observable<RickModel[]> {
    const params = new HttpParams().set('name', name).set('gender', gender);

    return this.http
      .get<RickObject>(this.baseUrl, { params: params })
      .pipe(map((d) => d.results));
  }
}
