import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoOpcoes, Opcao } from '../compartilhado/grupo-opcoes/grupo-opcoes';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.3 - Quantas pessoas comem com você? */
@Component({
  selector: 'app-passo-3-pessoas',
  imports: [PassoLayout, GrupoOpcoes],
  template: `
    <app-passo-layout
      [passo]="3"
      [titulo]="titulo"
      voltarPara="/pedir-alimento/passo-2"
      (continuar)="continuar()"
    >
      <app-grupo-opcoes nome="pessoas" layout="linha" [opcoes]="opcoes" [(valor)]="pessoas" />
      <p class="dica">Conte você também.</p>
      @if (erro()) {
        <p class="erro">{{ erro() }}</p>
      }
    </app-passo-layout>
  `,
})
export class Passo3Pessoas {
  private readonly router = inject(Router);

  protected readonly titulo = 'Quantas pessoas comem com você?';
  protected readonly opcoes: Opcao[] = [
    { valor: '1', texto: '1' },
    { valor: '2', texto: '2' },
    { valor: '3', texto: '3' },
    { valor: '4', texto: '4' },
    { valor: '5+', texto: '5+' },
  ];

  protected readonly pessoas = inject(PedidoService).pessoas;

  private readonly tentou = signal(false);
  protected readonly erro = computed(() =>
    this.tentou() && !this.pessoas() ? 'Escolha quantas pessoas comem com você.' : '',
  );

  protected continuar(): void {
    this.tentou.set(true);
    if (this.erro()) return;

    void this.router.navigate(['/pedir-alimento/passo-4']);
  }
}
