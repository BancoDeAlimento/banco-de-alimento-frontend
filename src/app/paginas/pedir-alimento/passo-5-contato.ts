import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CampoTexto } from '../../compartilhado/componentes/formulario/campo-texto';
import { GrupoOpcoes, Opcao } from '../../compartilhado/componentes/formulario/grupo-opcoes';
import { telefoneValido } from '../../compartilhado/utilitarios/telefone';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.5 - Como a gente fala com você? */
@Component({
  selector: 'app-passo-5-contato',
  imports: [PassoLayout, GrupoOpcoes, CampoTexto],
  template: `
    <app-passo-layout
      [passo]="5"
      [titulo]="titulo"
      [textoParaOuvir]="textoParaOuvir"
      voltarPara="/pedir-alimento/passo-4"
      (continuar)="continuar()"
    >
      <app-grupo-opcoes nome="contato" [opcoes]="opcoes" [(valor)]="contato" />
      @if (erroOpcao()) {
        <p class="erro">{{ erroOpcao() }}</p>
      }

      @if (contato() === 'telefone') {
        <app-campo-texto
          campoId="telefone"
          rotulo="Número"
          tipo="tel"
          placeholder="(81) 90000-0000"
          [(valor)]="telefone"
          [erro]="erroTelefone()"
        />
      }
    </app-passo-layout>
  `,
})
export class Passo5Contato {
  private readonly router = inject(Router);
  private readonly pedido = inject(PedidoService);

  protected readonly titulo = 'Como a gente fala com você?';
  protected readonly opcoes: Opcao[] = [
    { valor: 'telefone', texto: 'Tenho telefone ou WhatsApp' },
    { valor: 'recado', texto: 'Não tenho. Deixem recado no CRAS ou na entidade' },
  ];
  protected readonly textoParaOuvir = `${this.titulo} ${this.opcoes.map((o) => o.texto).join('. ')}.`;

  protected readonly contato = this.pedido.contato;
  protected readonly telefone = this.pedido.telefone;

  private readonly tentou = signal(false);

  protected readonly erroOpcao = computed(() =>
    this.tentou() && !this.contato() ? 'Escolha uma das opções para continuar.' : '',
  );

  protected readonly erroTelefone = computed(() =>
    this.tentou() && this.contato() === 'telefone' && !telefoneValido(this.telefone())
      ? 'Digite o número com DDD. Exemplo: (81) 90000-0000'
      : '',
  );

  protected continuar(): void {
    this.tentou.set(true);
    if (this.erroOpcao() || this.erroTelefone()) return;

    void this.router.navigate(['/pedir-alimento/passo-6']);
  }
}
