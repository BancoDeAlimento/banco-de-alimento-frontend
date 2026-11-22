import { Routes } from '@angular/router';

export const routes: Routes = [
  // ---------- PARTE 1: base e telas de entrada ----------
  {
    path: '',
    pathMatch: 'full',
    title: 'Banco de Alimentos do Recife',
    loadComponent: () => import('./paginas/inicio').then((m) => m.Inicio),
  },
];