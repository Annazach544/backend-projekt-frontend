import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {

  menuItems: any[] = [];
  loading: boolean = true;
  errorMessage: string = "";

  // Kategorier som används för att dela upp restaurangens meny
  categories: string[] = ["Förrätt", "Pizza", "Varmrätt", "Dessert"];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getMenu();
  }

  // Hämtar alla maträtter från webbtjänsten
getMenu() {
  this.loading = true;
  this.errorMessage = "";

  this.http.get<any[]>('https://backend-projekt-backend.onrender.com/api/menu')
    .subscribe({
      next: (data) => {
        this.menuItems = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Kunde inte hämta meny.";
        this.cdr.detectChanges();
      }
    });
}

  // Hämtar maträtter baserat på kategori
  getItemsByCategory(category: string) {
    return this.menuItems.filter(item => item.category === category);
  }
}