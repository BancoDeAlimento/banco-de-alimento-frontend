import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoOpcoes, Opcao } from '../../compartilhado/componentes/formulario/grupo-opcoes';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.2 - Quantos anos você tem, mais ou menos? */
@Component({
  selector: 'app-passo-2-idade',
  imports: [PassoLayout, GrupoOpcoes],
  template: `
    <app-passo-layout
      [passo]="2"
      [titulo]="titulo"
      [textoParaOuvir]="textoParaOuvir"
      voltarPara="/pedir-alimento/passo-1"
      (continuar)="continuar()"
    >
      <app-grupo-opcoes nome="idade" [opcoes]="opcoes" [(valor)]="idade" />
      @if (erro()) {
        <p class="erro">{{ erro() }}</p>
      }
    </app-passo-layout>
  `,
})
export class Passo2Idade {
  private readonly router = inject(Router);

  protected readonly titulo = 'Quantos anos você tem, mais ou menos?';
  protected readonly opcoes: Opcao[] = [
    { valor: 'ate-11', texto: 'Até 11 anos' },
    { valor: '12-17', texto: '12 a 17 anos' },
    { valor: '18-59', texto: '18 a 59 anos' },
    { valor: '60-mais', texto: '60 anos ou mais' },
  ];
  protected readonly textoParaOuvir = `${this.titulo} ${this.opcoes.map((o) => o.texto).join('. ')}.`;

  protected readonly idade = inject(PedidoService).idade;

  private readonly tentou = signal(false);
  protected readonly erro = computed(() =>
    this.tentou() && !this.idade() ? 'Escolha uma das idades para continuar.' : '',
  );

  protected continuar(): void {
    this.tentou.set(true);
    if (this.erro()) return;

    void this.router.navigate(['/pedir-alimento/passo-3']);
  }
}
