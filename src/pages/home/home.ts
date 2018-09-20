import { SalirPage } from './../salir/salir';
import { Component, ViewChild  } from '@angular/core';
import { NavController, Slides  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController) {}

  ingresar(){
    this.navCtrl.push(SalirPage,{id: 0});
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.navCtrl.parent.select(1);
  }
}
