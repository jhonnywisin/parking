import { SalirPage } from './../salir/salir';
import { servicioDB } from './../../services/service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {
  @ViewChild(Slides) slides: Slides;
  motos: any = [];
  placas: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public srDB: servicioDB, public loading: LoadingController ) {

    this.iniciandoMotos();
    this.loader();
  }

  public iniciandoMotos(){

    this.srDB.obtenMotos()
      .subscribe(motos => {
      this.motos = motos;
      console.log(this.motos);
      });
  }

  loader(){
    let load = this.loading.create({
      content: 'Cargando...',
      spinner: 'crescent',
      duration: 1500
    });
    load.onDidDismiss(() => {
      this.cargaFor();
    });
    load.present();
  }


  public getMotos(ev: any){

    const val = ev.target.value;

    if(val && val.trim() != ''){
      this.placas = this.placas.filter((placa) => {
        return (placa.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  cargaFor(){
    for(let i=0; i < this.motos.length; i++){
      this.placas.push(this.motos[i].placa);
    }
  }

  // ------------boton--------------------
  actualizarLista(){
    this.motos = [];
    this.placas = [];
    this.iniciandoMotos();
    this.loader();
  }

  getdatos(placa){
    this.navCtrl.push(SalirPage,{placa: placa, id: 1});
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

    if(currentIndex == 0)
      this.navCtrl.parent.select(0);

    else if(currentIndex == 1)
      this.navCtrl.parent.select(2);
  }
}
