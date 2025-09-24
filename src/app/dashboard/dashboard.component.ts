import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicleData.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarroVin } from '../utils/carroVinInterface';
import { Subscription } from 'rxjs';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  carVin!: CarroVin;
  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Busca veículos da API
    this.dashboardService.getVehicles().subscribe((res) => {
      console.log('Veículos recebidos:', res.vehicles);
      this.vehicles = res.vehicles;
    });

    // Quando o usuário seleciona um veículo
    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles.find(v => v.id === Number(id))!;
    });

    // Observa mudanças no VIN
    this.vinForm.controls.vin.valueChanges.subscribe((value) => {
      this.reqVin = this.dashboardService.buscarVin(value as string)
        .subscribe((res) => {
          this.carVin = res;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.reqVin) this.reqVin.unsubscribe();
  }
}

