import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showAlert = true;

  constructor(private router: Router) {}

  closeAlert(): void {
    this.showAlert = false;
  }

  logout(): void {
    // Limpar dados de sessão/autenticação
    localStorage.clear(); // ou sessionStorage.clear() se preferir

    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}
