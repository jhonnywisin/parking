import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalirPage } from './salir';

@NgModule({
  declarations: [
    SalirPage,
  ],
  imports: [
    IonicPageModule.forChild(SalirPage),
  ],
})
export class SalirPageModule {}
