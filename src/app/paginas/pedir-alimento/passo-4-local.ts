import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoFalar } from '../../compartilhado/componentes/botao-falar';
import { CampoTexto } from '../../compartilhado/componentes/formulario/campo-texto';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.4 - Onde a gente pode te encontrar? */
@Component({
  selector: 'app-passo-4-local',
  imports: [PassoLayout, CampoTexto, BotaoFalar],
  template: `
    <app-passo-layout
      [passo]="4"
      [titulo]="titulo"
      voltarPara="/pedir-alimento/passo-3"
      (continuar)="continuar()"
    >
      <app-campo-texto
        campoId="local"
        [rotulo]="titulo"
        [rotuloVisivel]="false"
        placeholder="Bairro ou lugar conhecido"
        [(valor)]="local"
        [erro]="erro()"
      />
      <app-botao-falar rotulo="Falar" (texto)="local.set($event)" />
      <p class="dica">Ex.: perto da praça de Casa Amarela.</p>
    </app-passo-layout>
  `,
})
export class Passo4Local {
  private readonly router = inject(Router);

  protected readonly titulo = 'Onde a gente pode te encontrar?';
  protected readonly local = inject(PedidoService).local;

  private readonly tentou = signal(false);
  protected readonly erro = computed(() =>
    this.tentou() && !this.local().trim()
      ? 'Diga o bairro ou um lugar conhecido perto de você.'
      : '',
  );

  protected continuar(): void {
    this.tentou.set(true);
    if (this.erro()) return;

    void this.router.navigate(['/pedir-alimento/passo-5']);
  }
}
