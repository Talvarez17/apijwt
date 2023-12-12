import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  Formulario: FormGroup = this.fb.group({
    user: [, Validators.required],
    password: [, Validators.required],
  });

  constructor(private fb: FormBuilder, private conexion: ServicesService, private auth: AuthGuard, private router: Router) {
  }


  // login() {
  //   console.log("Boton entrar funciona");
  //   this.conexion.post('nomina', 'Login', this.Formulario.value).subscribe((dato: any) => {
  //     console.log(dato);

  //     if (dato.id != 0) {
  //       setTimeout(() => {
  //         this.router.navigate(['/main']);
  //       }, 1000);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Usuario no encontrado',
  //         text: 'Verifica que tus datos sean correctos'
  //       });
  //     }

  //   });
  // }

  login(){
    this.router.navigate(['/main'])
  }


}
