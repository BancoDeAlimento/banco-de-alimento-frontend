import { Routes } from '@angular/router';

const sufixo = ' | Banco de Alimentos do Recife';

export const routes: Routes = [
  // ---------- PARTE 1: base e telas de entrada ----------
  {
    path: '',
    pathMatch: 'full',
    title: 'Banco de Alimentos do Recife',
    loadComponent: () => import('./paginas/inicio').then((m) => m.Inicio),
  },
  {
    path: 'em-breve',
    title: 'Em breve' + sufixo,
    loadComponent: () => import('./paginas/em-breve').then((m) => m.EmBreve),
  },
];