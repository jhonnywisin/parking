import { servicioDB } from './../../services/service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-caja',
  templateUrl: 'caja.html',
})
export class CajaPage {
  @ViewChild(Slides) slides: Slides;
  caja;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: servicioDB,
             public alertCtl: AlertController ) {

    db.obtenCaja()
      .subscribe(dinero => {
        if(dinero != null){
          this.caja = dinero;
        }else{
          this.caja = 0;
        }
      });
  }

  reiniciar(){
    this.alerta();
  }

  alerta(){
    let alert = this.alertCtl.create({
      title:    'Reinicio de caja',
      subTitle: 'No podras devolver los datos despues del reinicio ¿continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Reiniciar',
          handler: () => {
            this.db.guardaDinero(0);
          }
        }
      ]
    });
    alert.present();
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

    if(currentIndex == 0)
      this.navCtrl.parent.select(0);

    else if(currentIndex == 1)
      this.navCtrl.parent.select(3);
  }
}
