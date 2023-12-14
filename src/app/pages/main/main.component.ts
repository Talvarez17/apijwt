import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  Lista: any = [];

  constructor(private conexion: ServicesService) {

    this.listaActividades();

    }

    listaActividades() {
      this.conexion.get().subscribe((dato: any) => {
        console.log(dato);
        this.Lista = dato.reverse();
      });
    }

}
