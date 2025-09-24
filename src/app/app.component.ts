import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //IMPORT NECESSÁRIO

@Component({
  selector: 'app-root',
  standalone: true, // só se o seu projeto for Angular standalone
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //PLURAL
})
export class AppComponent implements OnInit {
  title = 'aula4';

  vehicles: any; // Variável para guardar os veículos

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Faz a requisição quando o componente carrega
    this.http.get('http://localhost:3001/vehicles')
      .subscribe({
        next: (dados) => this.vehicles = dados,
        error: (erro) => console.error('Erro ao buscar veículos:', erro)
      });
  } // FECHANDO O MÉTODO
}
