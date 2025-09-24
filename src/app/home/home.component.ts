import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,            // importante para standalone component
  imports: [CommonModule, FormsModule, MenuComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // corrigido para 'styleUrls'
})
export class HomeComponent {
  showAlert = true;

  closeAlert(): void {
    this.showAlert = false;
  }
}