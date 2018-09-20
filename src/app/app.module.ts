import { GestionPage } from './../pages/gestion/gestion';
import { Mensualidades } from './../providers/auto/mes';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutoProvider } from '../providers/auto/auto';
import { servicioDB } from './../services/service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SalirPage } from './../pages/salir/salir';
import { CajaPage } from './../pages/caja/caja';
import { BuscarPage } from './../pages/buscar/buscar';
import { MensualidadPage } from './../pages/mensualidad/mensualidad';

var config = {
  apiKey: "AIzaSyDjQYqYKfjhW3YRBkqmtwGfeQPUlnFM69Y",
  authDomain: "parking-a2d1c.firebaseapp.com",
  databaseURL: "https://parking-a2d1c.firebaseio.com",
  projectId: "parking-a2d1c",
  storageBucket: "parking-a2d1c.appspot.com",
  messagingSenderId: "16932676008"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SalirPage,
    BuscarPage,
    CajaPage,
    MensualidadPage,
    GestionPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SalirPage,
    BuscarPage,
    CajaPage,
    MensualidadPage,
    GestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutoProvider,
    servicioDB,
    Mensualidades
  ]
})
export class AppModule {}
