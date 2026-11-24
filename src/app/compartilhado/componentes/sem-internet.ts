import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Aviso } from './aviso';

/** Faixa que aparece no topo de qualquer tela quando a internet cai. */
@Component({
  selector: 'app-sem-internet',
  imports: [Aviso],
  template: `
    @if (!conectado()) {
      <div class="faixa">
        <app-aviso tipo="erro" titulo="Você está sem internet">
          Seus dados continuam na tela. Quando a internet voltar, tente de novo.
        </app-aviso>
      </div>
    }
  `,
  styleUrl: './sem-internet.css',
})
export class SemInternet {
  protected readonly conectado = signal(navigator.onLine);

  constructor() {
    const ligou = () => this.conectado.set(true);
    const caiu = () => this.conectado.set(false);

    window.addEventListener('online', ligou);
    window.addEventListener('offline', caiu);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('online', ligou);
      window.removeEventListener('offline', caiu);
    });
  }
}