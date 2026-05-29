import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  menuItems: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.http.get<any[]>('http://localhost:3000/api/menu')
      .subscribe((data) => {
        this.menuItems = data;
        this.cdr.detectChanges();
      });
  }
}