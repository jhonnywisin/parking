import { Injectable } from '@angular/core';

@Injectable()
export class Mensualidades{

  private placa:  string;
  private marca:  string;
  private linea:  string;
  private color:  string;
  private cascos: number;
  private FechaIngreso: number;
  private nombre: string;
  private telefo: string;

  constructor(placa: string, marca: string, linea: string, color: string,
             cascos: number, FechaIngreso: number, nombre: string, tel: string) {

    this.placa        = placa;
    this.marca        = marca;
    this.linea        = linea;
    this.color        = color;
    this.cascos       = cascos;
    this.FechaIngreso  = FechaIngreso;
    this.nombre       = nombre;
    this.telefo       = tel;
  }
}
