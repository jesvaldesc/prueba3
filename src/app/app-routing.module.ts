import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./paginas/registrar/registrar.module').then(m => m.RegistrarPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./paginas/agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./paginas/editar/editar.module').then( m => m.EditarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
