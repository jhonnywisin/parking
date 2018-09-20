import { servicioDB } from './../../services/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-gestion',
  templateUrl: 'gestion.html',
})
export class GestionPage {

  lista;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: servicioDB) {

    this.lista = ['jhonny','vane','jayko','andres','pipe','tevez','arturo','juan']

  }

}
