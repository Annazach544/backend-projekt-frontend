import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {

  message: string = "";


  // Hanterar bokningsförfrågan
  sendBooking() {
    this.message = "Tack för din bokningsförfrågan! Vi kontaktar dig så snart som möjligt.";
  }
}