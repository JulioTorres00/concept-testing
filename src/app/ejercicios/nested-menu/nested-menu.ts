import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface nestedMenuData {
  label: string;
  color: string;
  url: string;
  submenu: nestedMenuData[];
}

@Component({
  selector: 'app-nested-menu',
  imports: [RouterLink],
  templateUrl: './nested-menu.html',
  styleUrl: './nested-menu.css',
})
export class NestedMenu {
  public menuData: nestedMenuData[] = [
    {
      label: 'Home',
      color: 'blue',
      url: '/home',
      submenu: [],
    },
    {
      label: 'Products',
      color: 'green',
      url: '/products',

      submenu: [
        { label: 'Laptops', color: 'red', url: '/laptops', submenu: [] },
        { label: 'Phones', color: 'orange', url: '/phones', submenu: [] },
        {
          label: 'Accessories',
          color: 'teal',
          url: '/accesories',
          submenu: [
            { label: 'Chargers', color: 'pink', url: '/chargers', submenu: [] },
            { label: 'Cables', color: 'gray', url: '/cables', submenu: [] },
          ],
        },
      ],
    },
    {
      label: 'About',
      color: 'purple',
      url: '/about',
      submenu: [],
    },
    {
      label: 'Contact',
      color: 'brown',
      url: '/contact',
      submenu: [
        { label: 'Support', color: 'black', url: '/support', submenu: [] },
        { label: 'Sales', color: 'yellow', url: '/sales', submenu: [] },
      ],
    },
  ];

  public submenuData = input<nestedMenuData[]>(this.menuData);
}
