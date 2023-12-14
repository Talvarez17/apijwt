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
    rfc: [, Validators.required],
    pass: [, Validators.required],
  });

  constructor(private fb: FormBuilder, private conexion: ServicesService, private auth: AuthGuard, private router: Router) {
    localStorage.clear()
  }


  Login() {

    this.conexion.post('login', this.Formulario.value).subscribe((dato: any) => {
     
      console.log(dato);
      
      if (!dato.error) {
        console.log("exitoso");
        localStorage.setItem('token', dato.tokenjwt);
        this.router.navigate(['/main']);

      } else {
      
        Swal.fire({
          title: 'Error',
          text: "No se ha encontrado al usuario ",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })
        
      }
    });

  }

}
