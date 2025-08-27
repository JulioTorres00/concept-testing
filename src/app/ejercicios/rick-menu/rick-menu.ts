import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { RickModel } from '../extras/models/rick-model';
import { RickService } from '../../ejercicios/extras/services/rick-menu-service/rick-menu-service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rick-menu',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rick-menu.html',
  styleUrl: './rick-menu.css',
})
export class RickMenu implements OnDestroy {
  public inputField = signal<string>('');
  public selectField = signal<string>('');
  public dataList = signal<RickModel[]>([]);
  private subs = new Subscription();

  constructor(private service: RickService) {}

  onSearch() {
    const subs = this.service
      .getCharacters(this.inputField(), this.selectField())
      .subscribe({
        next: (data) => {
          console.log(data);
          this.dataList.set(data);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    this.subs.add(subs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
