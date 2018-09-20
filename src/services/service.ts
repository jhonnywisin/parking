import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class servicioDB{

  motos: any = [];

  constructor(public db: AngularFireDatabase){}

  //---------------------Metodo Para Guardar Un Vehiculo----------------------
  public creaMoto(moto){
    this.db.database.ref('motos/' + moto.placa).set(moto);
  }

  //---------------------Metodo para guardar Mensualidades--------------------
  public creaMensualidad(moto){
    this.db.database.ref('mensualidades/' + moto.placa).set(moto);
  }

  //---------------------Metodo para guardar la caja--------------------------
  public guardaDinero(dinero: number){
    this.db.database.ref('caja/registradora').set(dinero);
  }

  //---------------------Metodo Para obtener Un Vehiculo----------------------
  public obtenMoto(placa: string){
    return this.db.object('motos/' + placa).valueChanges();
  }

  //--------------Metodo para obtener las motos de mensualidad-----------------
  public obtenMensualidad(){
    return this.db.list('mensualidades').valueChanges();
  }

  //---------------------Metodo para obtener valor caja----------------------
  public obtenCaja(){
    return this.db.object('caja/registradora').valueChanges();
  }
  //---------------------Metodo Para Eliminar Un Vehiculo----------------------
  public eliminaMoto(placa: string){
    this.db.database.ref('motos/' + placa).remove();
  }

  //-------------------Metodo para obtener todos los vehiculos---------------------
  public obtenMotos(){
    return this.db.list('motos/').valueChanges();
  }

  //---------------Metosdo para calcular el valor-----------------------------
  public calculaSaldo(horaEntrada: number, horaSalida: number): number{

    let  tiempo:    number = horaSalida    - horaEntrada;
    let  segundos:  number = tiempo    / 1000;
    let  minutos:   number = segundos  / 60;
    let  horas:     number;
    let  importe:   number = 0;
    let  valor:     number = 700;

    if(minutos <= 0)
        horas = 0;

    else if(minutos <= 60 )
        horas = 1;

    else if(minutos > 60 && minutos <= 120 )
        horas = 2;

    else if(minutos > 120 && minutos <= 180)
        horas = 3;

    else if(minutos > 180 && minutos <= 240)
        horas = 4;

    else if(minutos > 240 && minutos <= 300)
        horas = 5;

    else if(minutos > 300 && minutos <= 360)
        horas = 6;

    else if(minutos > 360 && minutos <= 420)
        horas = 7;

    else if(minutos > 420 && minutos <= 480)
        horas = 8;

    else if(minutos > 480 && minutos <= 540)
        horas = 9;

    else if(minutos > 540 && minutos <= 600)
        horas = 10;

    else if(minutos > 600 && minutos <= 660)
        horas = 11;

    else if(minutos > 660 && minutos <= 720)
        horas = 12;

    importe = valor * horas;

    return importe;
  }

  //------------------------metodo para mostrar las lineas segun su marca------------------------
  public obtenLinea(marca: string){

    var linea = [];
    if(marca == 'yamaha'){
      linea = ['Fz','Libero','Bws','SZ','Ybr','XT','Xtz','otro'];
    }

    return linea;
  }
}
