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
}