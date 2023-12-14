import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  Formulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    apellidoPaterno: [, [Validators.required, Validators.maxLength(255)]],
    apellidoMaterno: [, [Validators.required, Validators.maxLength(255)]],
    rfc: [, [Validators.required, Validators.maxLength(10)]],
    pass: [, [Validators.required, Validators.maxLength(255)]],
    token: localStorage.getItem('token')
  });


  constructor(private fb: FormBuilder,private router:Router, private conexion: ServicesService) {

    }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  agregar() {
    if (this.Formulario.touched) {
      
      this.conexion.post('register', this.Formulario.value).subscribe((dato: any) => {

        if (dato.id !=0) {
          Swal.fire({
            title: 'Exito',
            text: "Se ha registrado a la persona",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: 'red',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/main']);
            }
          })
        } else if (dato.status == 401) {
          Swal.fire(
            'Error',
            'No se ha marcar como terminada la actividad',
            'warning'
          )        
        }

      })
    }
  }

}
