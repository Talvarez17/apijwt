import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { EditComponent } from './pages/edit/edit.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      // {path: 'main', component: MainComponent, canActivate: [AuthGuard]},     
      // {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},     
      {path: 'main', component: MainComponent},     
      {path: 'edit', component: EditComponent},     
      {path: 'menu', component: MenuComponent},     
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }