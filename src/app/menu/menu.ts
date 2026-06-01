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