import { GestionPage } from './../gestion/gestion';
import { SalirPage } from './../salir/salir';
import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mensualidad',
  templateUrl: 'mensualidad.html',
})
export class MensualidadPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ingresar(){
    this.navCtrl.push(SalirPage,{id:3});
  }

  gestion(){
    this.navCtrl.push(GestionPage);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.navCtrl.parent.select(1);
  }
}
