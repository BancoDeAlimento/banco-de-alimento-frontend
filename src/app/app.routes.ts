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
    path: 'quero-ajudar',
    title: 'Quero ajudar' + sufixo,
    loadComponent: () => import('./paginas/quero-ajudar').then((m) => m.QueroAjudar),
  },
  {
    path: 'em-breve',
    title: 'Em breve' + sufixo,
    loadComponent: () => import('./paginas/em-breve').then((m) => m.EmBreve),
  },

  // ---------- PARTE 2: pedir alimento (passos 1 a 7 e pedido enviado) ----------
  {
    path: 'pedir-alimento/passo-1',
    title: 'Passo 1 de 7: como você se chama?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-1-nome').then((m) => m.Passo1Nome),
  },
  {
    path: 'pedir-alimento/passo-2',
    title: 'Passo 2 de 7: quantos anos você tem?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-2-idade').then((m) => m.Passo2Idade),
  },
  {
    path: 'pedir-alimento/passo-3',
    title: 'Passo 3 de 7: quantas pessoas comem com você?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-3-pessoas').then((m) => m.Passo3Pessoas),
  },
  {
    path: 'pedir-alimento/passo-4',
    title: 'Passo 4 de 7: onde podemos te encontrar?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-4-local').then((m) => m.Passo4Local),
  },
  {
    path: 'pedir-alimento/passo-5',
    title: 'Passo 5 de 7: como falamos com você?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-5-contato').then((m) => m.Passo5Contato),
  },
  {
    path: 'pedir-alimento/passo-6',
    title: 'Passo 6 de 7: você tem algum documento?' + sufixo,
    loadComponent: () =>
      import('./pedir-alimento/passo-6-documento').then((m) => m.Passo6Documento),
  },
  {
    path: 'pedir-alimento/passo-7',
    title: 'Passo 7 de 7: você está no CadÚnico?' + sufixo,
    loadComponent: () => import('./pedir-alimento/passo-7-cadunico').then((m) => m.Passo7Cadunico),
  },
  {
    path: 'pedido-enviado',
    title: 'Pedido enviado' + sufixo,
    loadComponent: () => import('./pedir-alimento/pedido-enviado').then((m) => m.PedidoEnviado),
  },
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
