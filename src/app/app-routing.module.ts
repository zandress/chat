import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateAuthenticated } from './shared/guards/auth.guard';
import { CanActivateLogin } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [CanActivateAuthenticated],
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HomeComponentModule),
  },
  {
    path: 'login',
    canActivate: [CanActivateLogin],
    loadChildren: () =>
      import('./login/login.component').then((m) => m.LoginComponentModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [CanActivateLogin, CanActivateAuthenticated],
})
export class AppRoutingModule {}
