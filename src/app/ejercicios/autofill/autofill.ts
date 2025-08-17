import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autofill',
  imports: [FormsModule, CommonModule],
  templateUrl: './autofill.html',
  styleUrl: './autofill.css',
})
export class Autofill {
  public items: string[] = [
    'Angular',
    'React',
    'Django',
    'Docker',
    'Node',
    'Vue',
    'Design',
    'Data Science',
  ];
  public searchTerm: string = '';

  get filteredItems(): string[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.items.filter((item) => item.toLowerCase().includes(term));
  }

  public selectItem(item: string): void {
    this.searchTerm = item;
  }
}
