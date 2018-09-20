import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionPage } from './gestion';

@NgModule({
  declarations: [
    GestionPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionPage),
  ],
})
export class GestionPageModule {}
