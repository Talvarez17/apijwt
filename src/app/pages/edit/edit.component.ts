import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

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
  });


  constructor(private fb: FormBuilder,private router:Router, private conexion: ServicesService) {

    }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  Agregar() {
    if (this.Formulario.touched) {
      
      this.conexion.post('register', this.Formulario.value).subscribe((dato: any) => {
        if (dato['id'] !=0 ) {
          this.router.navigate(['/main']);
        }
      })
    }
  }

}
