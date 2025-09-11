import { Component, inject, effect, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackblitzFilterService } from '../extras/services/stackblitz-filter-service/stackblitz-filter-service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stackblitz-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './stackblitz-filter.html',
  styleUrl: './stackblitz-filter.css',
})
export class StackblitzFilter {
  private searchService = inject(StackblitzFilterService);
  private destroyRef = inject(DestroyRef);

  query = signal('');
  results = signal<string[]>([]);

  constructor() {
    toObservable(this.query)
      .pipe(
        debounceTime(3000),
        distinctUntilChanged(),
        switchMap((q) => {
          if (q.trim()) {
            return this.searchService.search(q);
          } else {
            return of([]);
          }
        }),
        takeUntilDestroyed(this.destroyRef) // Automatic cleanup
      )
      .subscribe((results) => {
        this.results.set([...results]);
      });

    // This is wrong because the effect aplies operators to the call not to the signal changes
    // effect(() => {
    //   const q = this.query();
    //   if (q) {
    //     this.searchService
    //       .search(q)
    //       .pipe(
    //         distinctUntilChanged(),
    //         debounceTime(5000),
    //         switchMap((data) => of(data))
    //       )
    //       .subscribe((results) => {
    //         this.results.set([...results]);
    //       });
    //   } else {
    //     this.results.set([]);
    //   }
    // });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query.set(input.value);
  }
}
