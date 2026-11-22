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

  // ---------- PARTE 2: pedir alimento (passos 1 a 7 e pedido enviado) ----------
  // (as rotas da Parte 2 entram aqui)

  // ---------- PARTE 3: doar, preciso de alimento e cadastro de entidade ----------
  // (as rotas da Parte 3 entram aqui)

  // ---------- PARTE 1: erro 404 (precisa ser a última rota) ----------
  {
    path: '**',
    title: 'Página não encontrada' + sufixo,
    loadComponent: () => import('./paginas/nao-encontrada').then((m) => m.NaoEncontrada),
  },
];