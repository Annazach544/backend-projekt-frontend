import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  menuItems: any[] = [];
  username: string = "";
  password: string = "";
  loginMessage: string = "";
  token: string = "";
  newTitle: string = "";
  newDescription: string = "";
  newPrice: number = 0;
  newCategory: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.http.get<any[]>('http://localhost:3000/api/menu')
      .subscribe((data) => {
        this.menuItems = data;
      });
  }

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
}