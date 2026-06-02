import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  menuItems: any[] = [];

  username: string = "";
  password: string = "";
  loginMessage: string = "";
  token: string = "";

  newTitle: string = "";
  newDescription: string = "";
  newPrice: number = 0;
  newCategory: string = "";
  editId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || "";
    this.getMenu();
  }
  // Hämtar alla maträtter från webbtjänsten
  getMenu() {
    this.http.get<any[]>('http://localhost:3000/api/menu')
      .subscribe((data) => {
        this.menuItems = data;
      });
  }

  // Hanterar inloggning av administratör
  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:3000/api/auth/login',
      loginData
    ).subscribe({
      next: (response) => {
        this.token = response.token;
        localStorage.setItem("token", this.token);
        this.loginMessage = "Inloggning lyckades!";
      },
      error: () => {
        this.loginMessage = "Fel användarnamn eller lösenord";
      }
    });
  }

  // Skapar en ny maträtt
  createMenuItem() {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const newItem = {
      title: this.newTitle,
      description: this.newDescription,
      price: this.newPrice,
      category: this.newCategory,
      image: ""
    };

    this.http.post(
      'http://localhost:3000/api/menu',
      newItem,
      { headers }
    ).subscribe({
      next: () => {
        this.getMenu();
        this.newTitle = "";
        this.newDescription = "";
        this.newPrice = 0;
        this.newCategory = "";
        alert("Maträtt tillagd!");
      },
      error: () => {
        alert("Kunde inte lägga till maträtt");
      }
    });
  }

  // Raderar en maträtt
  deleteMenuItem(id: number) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.delete(
      `http://localhost:3000/api/menu/${id}`,
      { headers }
    ).subscribe({
      next: () => {
        this.getMenu();
      },
      error: () => {
        alert("Kunde inte radera maträtt");
      }
    });
  }

  // Förbereder formuläret
  startEdit(item: any) {
  this.editId = item.id;
  this.newTitle = item.title;
  this.newDescription = item.description;
  this.newPrice = item.price;
  this.newCategory = item.category;
}

// Uppdaterar en maträtt
updateMenuItem() {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const updatedItem = {
    title: this.newTitle,
    description: this.newDescription,
    price: this.newPrice,
    category: this.newCategory,
    image: ""
  };

  this.http.put(
    `http://localhost:3000/api/menu/${this.editId}`,
    updatedItem,
    { headers }
  ).subscribe({
    next: () => {
      this.getMenu();

      this.editId = null;
      this.newTitle = "";
      this.newDescription = "";
      this.newPrice = 0;
      this.newCategory = "";

      alert("Maträtt uppdaterad!");
    },
    error: () => {
      alert("Kunde inte uppdatera maträtt");
    }
  });
}

// Loggar ut administratören
logout() {
  localStorage.removeItem("token");
  this.token = "";
  this.loginMessage = "";
}
}