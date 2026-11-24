import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoFalar } from '../../compartilhado/componentes/botao-falar';
import { CampoTexto } from '../../compartilhado/componentes/formulario/campo-texto';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.1 - Como você se chama? */
@Component({
  selector: 'app-passo-1-nome',
  imports: [PassoLayout, CampoTexto, BotaoFalar],
  template: `
    <app-passo-layout
      [passo]="1"
      [titulo]="titulo"
      voltarPara="/preciso-de-alimento"
      (continuar)="continuar()"
    >
      <app-campo-texto
        campoId="nome"
        [rotulo]="titulo"
        [rotuloVisivel]="false"
        placeholder="Seu nome ou apelido"
        [(valor)]="nome"
        [erro]="erro()"
      />
      <app-botao-falar rotulo="Falar meu nome" (texto)="nome.set($event)" />
      <p class="dica">Pode ser só um apelido.</p>
    </app-passo-layout>
  `,
})
export class Passo1Nome {
  private readonly router = inject(Router);

  protected readonly titulo = 'Como você se chama?';
  protected readonly nome = inject(PedidoService).nome;

  private readonly tentou = signal(false);
  protected readonly erro = computed(() =>
    this.tentou() && !this.nome().trim()
      ? 'Escreva como podemos te chamar. Pode ser só um apelido.'
      : '',
  );

  protected continuar(): void {
    this.tentou.set(true);
    if (this.erro()) return;

    void this.router.navigate(['/pedir-alimento/passo-2']);
  }
}
