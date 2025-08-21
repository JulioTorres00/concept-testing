import { Component, computed, OnInit, signal } from '@angular/core';
import { CountriesMenuService } from '../extras/services/countries-menu-service/countries-menu-service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countries-menu',
  imports: [FormsModule],
  templateUrl: './countries-menu.html',
  styleUrl: './countries-menu.css',
})
export class CountriesMenu implements OnInit {
  public countriesInput = signal<string>('');
  public countriesSelect = signal<string>('');
  public countriesList = signal<any[]>([]);

  private subscription = new Subscription();

  public filteredCountriesList = computed(() => {
    const inputValue = this.countriesInput().toLowerCase().trim();
    const selectValue = this.countriesSelect().toLowerCase();

    return this.countriesList().filter(
      (country: { name: { common: string }; subregion: string }) =>
        country.name?.common?.toLowerCase().includes(inputValue) &&
        country.subregion?.toLowerCase().includes(selectValue)
    );
  });

  constructor(private contriesService: CountriesMenuService) {}

  ngOnInit(): void {
    const sub = this.contriesService.getCountriesList().subscribe({
      next: (data) => {
        this.countriesList.set([...data]);
      },
      error: (err) => {
        console.log('Error en el API: ' + err.message);
        this.countriesList.set([]);
      },
    });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

// Approach #2

// private service = inject(CountriesMenuService);

//   public countriesInput = signal<string>('');
//   public countriesSelect = signal<string>('');
//   public countriesList = toSignal(this.service.getCountriesList(), {
//     initialValue: [],
//   });

//   public filteredCountriesList = computed(() => {
//     const inputValue = this.countriesInput().toLowerCase().trim();
//     const selectValue = this.countriesSelect().toLowerCase();

//     return this.countriesList().filter(
//       (country: { name: { common: string }; subregion: string }) =>
//         country.name?.common?.toLowerCase().includes(inputValue) &&
//         country.subregion?.toLowerCase().includes(selectValue)
//     );
//   });
