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
  // Datos que se mostrarán; en un caso real pueden provenir de un servicio
  items = [
    'Angular',
    'React',
    'Django',
    'Docker',
    'Node',
    'Vue',
    'Design',
    'Data Science',
  ];
  searchTerm = '';

  // Devuelve los elementos que contienen la búsqueda, sin distinguir mayúsculas
  get filteredItems(): string[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.items.filter((item) => item.toLowerCase().includes(term));
  }

  public selectItem(item: string): void {
    this.searchTerm = item;
  }
}
