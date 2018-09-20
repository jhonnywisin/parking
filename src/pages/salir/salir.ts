import { Mensualidades } from './../../providers/auto/mes';
import { AutoProvider } from './../../providers/auto/auto';
import { servicioDB } from './../../services/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  //-----------------------------------Variables----------------------------------------
  id:         number;
  titulo:     string;
  tituloHora: string;
  placa:      string;
  marca:      string;
  linea:      string;
  color:      string;
  cascos:     number;
  nombre:     string;
  tel:        string;

  moto:any = {};
  formatoHora;
  horasalida;
  horaEntrada;
  saldo;
  saldoCaja;
  dateObj  = new Date();
  buscar = false;
  parametro;
  caja;
  saldoSumado;
  contador: boolean = true;

  marcaMotos = [];
  yamaha     = [];
  honda      = [];
  suzuki     = [];
  akt        = [];
  auteco     = [];
  hero       = [];
  tvs        = [];
  colores    = [];
  casco      = [];
//---------------------------------------------------------------------------------------



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: servicioDB, public alertCtrl: AlertController) {

    //--------------- extraemos los parametro---------------------
    this.id         = navParams.get('id');
    this.parametro  = navParams.get('placa');

    this.formateandoHora();
    //------------------si mandamos una placa la app va actuar--------------------
    if(this.parametro != null){
      this.placa  = this.parametro;
      this.buscar = true;
      this.db.obtenMoto(this.parametro)
      .subscribe(moto => {
        this.moto = moto;
        if(this.moto != null){
          this.horaEntrada = this.moto.horaEntrada;
          this.saldo =  "$ " + this.db.calculaSaldo(this.horaEntrada, this.dateObj.getTime());
          this.saldoCaja = this.db.calculaSaldo(this.horaEntrada, this.dateObj.getTime());
          this.getHora();
        }
      });
    }

    //-----------------segun el id va a ser el titulo----------------------------
    if(this.id == 0){
      this.titulo     = "Ingresar";
      this.tituloHora = "Hora de ingreso";
    }else if(this.id == 1){
      this.titulo     = "Salir";
      this.tituloHora = "Hora de Salida";
    }else if(this.id == 3){
      this.titulo     = "Ingresar";
      this.tituloHora = "Fecha de Ingreso";
    }


    this.casco      = ['0','1','2','3','4'];
    this.marcaMotos = ['Yamaha','Honda','Suzuki','AKT','Auteco','Hero','TVS','Otro'];
    this.colores    = ['Rojo','Blanco','Azul','Negro','Verde','Gris','Naranja','Amarillo','Rosado','Otro'];
    //-----------------------Tipos de motos segun su marca--------------------
    this.yamaha = ['BWS','Crypton','Fazer','FZ','Fino','Libero','SZ','YBR','XT','XTZ','DT','RX','Otro'];
    this.honda  = ['Dio','Wave','Click','CB','CBF','XR','XRE','Otro'];
    this.suzuki = ['Lets','Best','Viva','Vivax','GXS','Gixxer','AX4','GN','Hayate','GS','Otro'];
    this.akt    = ['NKD','RTX','CR4','CR5','TTR','TTX','Special','Flex','JET','Dynamic','TT250','Otro'];
    this.auteco = ['Dominar','Pulsar','Discover','Boxer','Platino','Kymco','KTM','Starker','Otro'];
    this.hero   = ['Thriller','Splendor','Ignitor','Eco','Dash','Otro'];
    this.tvs    = ['Apache','Striker','TVS','Rockz','Otro'];
    //------------------------------------------------------------------------
  }

  //-------------------------Metodo para buscar el vehiculo--------------------------
  btnBuscar(){
    if(this.placa != null){
      this.buscar = true;
      this.db.obtenMoto(this.placa)
      .subscribe(moto => {
        if(moto != null){
          this.moto = moto;
          if(this.moto != null){
            this.horaEntrada = this.moto.horaEntrada;
            this.saldo =  "$ " + this.db.calculaSaldo(this.horaEntrada, this.dateObj.getTime());
            this.getHora();
          }
        }else{
          if(this.buscar){
            this.buscar = false;
            this.alertMotoNull();
            this.placa = "";
          }
        }
      });
    }
    //-------------------------------------------------------------------------------
  }

    //-------------------------------Metodo para cobrar-------------------------------------
  public cobra(){
    this.buscar = false;
    this.db.obtenCaja()
      .subscribe(dinero => {
        this.saldoSumado = dinero;
        this.caja = this.saldoSumado + this.saldoCaja;
        if(this.contador){
          this.db.guardaDinero(this.caja);
          this.contador = false;
        }
      });
    this.db.eliminaMoto(this.placa);
    this.alertElimina();
    this.navCtrl.pop();
  }


  //-----------------------Metodo para guardar el vehiculo-------------------------------
  public guarda(){
    if(this.id == 3){
      if(this.placa != null && this.marca != null && this.linea != null
        && this.color != null && this.cascos != null && this.nombre != null && this.tel != null){
          var miMen = new Mensualidades(this.placa, this.marca, this.linea, this.color, this.cascos, this.dateObj.getTime(),this.nombre,this.tel);
          this.db.creaMensualidad(miMen);
          this.alert();
          this.navCtrl.pop();
      }else{
        this.alertCampos();
      }
    }else{
      if(this.placa != null && this.marca != null && this.linea != null && this.color != null && this.cascos != null){
        var date = this.dateObj.getTime();
        var miAuto = new AutoProvider(this.placa, this.marca, this.linea, this.color, this.cascos, date);
        this.db.creaMoto(miAuto);
        this.alert();
        this.navCtrl.pop();
      }else{
        this.alertCampos();
      }
    }
  }

  // ------------------------------alertas-----------------------------------------
   //alerta guardado
  public alert(){
    let alert = this.alertCtrl.create({
      title: 'Tu Moto se a guardado con exito',
      buttons: ['OK']
    });
    alert.present();
  }

   //alerta eliminado
  public alertElimina(){
    let alert = this.alertCtrl.create({
      title:    'Moto eliminada con exito',
      buttons:  ['OK']
    });
    alert.present();
  }

  //alerta moto null
  public alertMotoNull(){
    let alert = this.alertCtrl.create({
      title:    'la moto no se encuentra en el parqueadero',
      subTitle: 'Intentalo de nuevo',
      buttons:  ['OK']
    });
    alert.present();
  }

  //alert campos llenos
  public alertCampos(){
    let alert = this.alertCtrl.create({
      title: 'Campos incompletos',
      subTitle: 'Debes de llenar todos los campos',
      buttons: ['ok']
    });
    alert.present();
  }
  //---------------------------------------------------------------------------------


  //----------------------formateando Hora-------------------------------
  public formateandoHora(){

    var hor = this.dateObj.getHours();
    var min = this.dateObj.getMinutes();
    let dia = this.dateObj.getDate();
    let mes = this.dateObj.getMonth() + 1;
    let año = this.dateObj.getFullYear();

    if(this.id == 3){
      if(mes < 10){
        this.formatoHora = dia + '/0' + mes + '/' + año;
      }else{
        this.formatoHora = dia + '/' + mes + '/' + año;
      }
    }else{

      if(min < 10){
        this.formatoHora = hor +":0"+ min;
      }else{
        this.formatoHora = hor +":"+ min;
      }
    }
  }
  //---------------------------------------------------------------------

  //----------------Recuperando Hora Entrada---------------------------
  public getHora(){

    var horaEntr = new Date(this.horaEntrada);

    var hor = horaEntr.getHours();
    var min = horaEntr.getMinutes();

    if(min < 10){
      this.horasalida = hor +":0"+ min;
    }else{
      this.horasalida = hor +":"+ min;
    }
  }
  //-----------------------------------------------------------------------
}
