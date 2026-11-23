import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Aviso } from '../compartilhado/aviso';
import { EnvioService, mensagemDoErro } from '../compartilhado/envio.service';
import { GrupoOpcoes, Opcao } from '../compartilhado/grupo-opcoes/grupo-opcoes';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.7 - Você já está no CadÚnico? É o último passo: envia o pedido. */
@Component({
  selector: 'app-passo-7-cadunico',
  imports: [PassoLayout, GrupoOpcoes, Aviso],
  template: `
    <app-passo-layout
      [passo]="7"
      [titulo]="titulo"
      [textoParaOuvir]="textoParaOuvir"
      voltarPara="/pedir-alimento/passo-6"
      textoContinuar="Enviar pedido"
      [ocupado]="enviando()"
      (continuar)="enviar()"
    >
      <app-grupo-opcoes nome="cadunico" [opcoes]="opcoes" [(valor)]="cadunico" />
      @if (erroOpcao()) {
        <p class="erro">{{ erroOpcao() }}</p>
      }

      @if (cadunico() === 'nao' || cadunico() === 'nao-sei') {
        <app-aviso>{{ avisoCras }}</app-aviso>
      }

      @if (respostasPerdidas()) {
        <app-aviso
          tipo="erro"
          titulo="Faltam respostas do começo do pedido"
          acao="Recomeçar o pedido"
          (acionar)="recomecar()"
        >
          Isso acontece quando a página é recarregada. Responda de novo desde o passo 1, é rápido.
        </app-aviso>
      }

      @if (erroEnvio(); as erro) {
        <app-aviso tipo="erro" [titulo]="erro.titulo" acao="Tentar de novo" (acionar)="enviar()">
          {{ erro.texto }}
        </app-aviso>
      }
    </app-passo-layout>
  `,
})
export class Passo7Cadunico {
  private readonly router = inject(Router);
  private readonly pedido = inject(PedidoService);
  private readonly envio = inject(EnvioService);

  protected readonly titulo = 'Você já está no CadÚnico?';
  protected readonly avisoCras = 'Se não estiver, o CRAS ajuda a fazer depois. Isso não impede o pedido.';
  protected readonly opcoes: Opcao[] = [
    { valor: 'sim', texto: 'Sim' },
    { valor: 'nao', texto: 'Não' },
    { valor: 'nao-sei', texto: 'Não sei' },
  ];
  protected readonly textoParaOuvir = `${this.titulo} ${this.opcoes.map((o) => o.texto).join('. ')}.`;

  protected readonly cadunico = this.pedido.cadunico;

  private readonly tentou = signal(false);
  protected readonly enviando = signal(false);
  protected readonly respostasPerdidas = signal(false);
  protected readonly erroEnvio = signal<{ titulo: string; texto: string } | null>(null);

  protected readonly erroOpcao = computed(() =>
    this.tentou() && !this.cadunico() ? 'Escolha uma das opções para enviar o pedido.' : '',
  );

  protected async enviar(): Promise<void> {
    this.tentou.set(true);
    if (this.erroOpcao()) return;

    this.respostasPerdidas.set(this.pedido.faltaResposta());
    if (this.respostasPerdidas()) return;

    this.erroEnvio.set(null);
    this.enviando.set(true);
    try {
      const codigo = await this.envio.enviar('pedido', {
        nome: this.pedido.nome(),
        idade: this.pedido.idade(),
        pessoas: this.pedido.pessoas(),
        local: this.pedido.local(),
        contato: this.pedido.contato(),
        telefone: this.pedido.telefone(),
        documento: this.pedido.documento(),
        cadunico: this.pedido.cadunico(),
      });
      this.pedido.codigo.set(codigo);
      await this.router.navigate(['/pedido-enviado']);
    } catch (erro) {
      this.erroEnvio.set(mensagemDoErro(erro));
    } finally {
      this.enviando.set(false);
    }
  }

  protected recomecar(): void {
    void this.router.navigate(['/pedir-alimento/passo-1']);
  }
}
