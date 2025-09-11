import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface filterItems {
  phrase: string;
}

@Injectable({
  providedIn: 'root',
})
export class StackblitzFilterService {
  private baseUrl: string = 'https://corsproxy.io/?https://duckduckgo.com/ac/';

  private searchService = inject(HttpClient);

  search(query: string): Observable<string[]> {
    const params = new HttpParams().set('q', query);

    return this.searchService
      .get<filterItems[]>(this.baseUrl, {
        params: params,
      })
      .pipe(map((data) => data.map((item) => item.phrase)));
  }
}
