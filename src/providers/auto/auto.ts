import { Injectable } from '@angular/core';

@Injectable()
export class AutoProvider {

  private placa:  string;
  private marca:  string;
  private linea:  string;
  private color:  string;
  private cascos: number;
  private horaEntrada: number;

  constructor(placa: string, marca: string, linea: string, color: string, cascos: number, horaEntrada: number) {

    this.placa        = placa;
    this.marca        = marca;
    this.linea        = linea;
    this.color        = color;
    this.cascos       = cascos;
    this.horaEntrada  = horaEntrada;
  }

  public setPlaca(placa: string){
    this.placa = placa;
  }

  public setMarca(marca: string){
    this.marca = marca;
  }

  public setLinea(linea: string){
    this.linea = linea;
  }

  public setColor(color: string){
    this.color = color;
  }

  public setDueño(cascos: number){
    this.cascos = cascos;
  }

  public setHoraEntrada(horaEntrada: number){
    this.horaEntrada = horaEntrada;
  }

  public getPlaca(): string{
    return this.placa;
  }

  public getMarca(): string{
    return this.marca;
  }

  public getLinea(): string{
    return this.linea;
  }

  public getColor(): string{
    return this.color;
  }

  public getDueno(): number{
    return this.cascos;
  }

  public getHoraEntrada(): number{
    return this.horaEntrada;
  }
}
