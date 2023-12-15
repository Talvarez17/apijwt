import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

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
      this.Lista = dato;
    });
  }

  eliminar(id: any) {

    Swal.fire({
      title: '¿Quieres eliminar este registro?',
      text: "No podras deshacer esta acción",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.conexion.delete(id).subscribe((dato: any) => {
          console.log(dato);
          window.location.reload();
        });
      }
    })
  }

}
