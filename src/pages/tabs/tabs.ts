import { MensualidadPage } from './../mensualidad/mensualidad';
import { CajaPage } from './../caja/caja';
import { BuscarPage } from './../buscar/buscar';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BuscarPage;
  tab3Root = CajaPage;
  tab4Root = MensualidadPage;

  constructor() {}
}
