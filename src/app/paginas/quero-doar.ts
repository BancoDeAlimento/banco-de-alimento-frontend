import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aviso } from '../compartilhado/aviso';
import { CampoTexto } from '../compartilhado/campo-texto/campo-texto';
import { EnvioService, mensagemDoErro } from '../compartilhado/envio.service';
import { GrupoOpcoes, Opcao } from '../compartilhado/grupo-opcoes/grupo-opcoes';
import { telefoneValido } from '../compartilhado/telefone';
import { Tela } from '../compartilhado/tela/tela';

const SEM_ERROS = { quem: '', nome: '', telefone: '', oQue: '', entrega: '' };

/** Tela 03 - Quero doar */
@Component({
  selector: 'app-quero-doar',
  imports: [Tela, Aviso, CampoTexto, GrupoOpcoes, RouterLink],
  template: `
    <app-tela titulo="Quero doar" voltarPara="/">
      @if (enviado()) {
        <app-aviso tipo="sucesso" titulo="Oferta enviada. Obrigado!">
          A equipe vai entrar em contato pelo telefone que você informou para combinar a entrega.
        </app-aviso>
        <div class="acoes">
          <a class="botao botao-principal" routerLink="/">Voltar ao início</a>
        </div>
      } @else {
        <p>Conta pra gente o que você tem. A equipe entra em contato para combinar a entrega.</p>

        <form class="formulario" novalidate (submit)="enviar($event)">
          <div class="agrupado">
            <p id="rotulo-quem" class="rotulo">Quem está doando?</p>
            <app-grupo-opcoes nome="quem" rotuloId="rotulo-quem" [opcoes]="opcoesQuem" [(valor)]="quem" />
            @if (erros().quem) {
              <p class="erro">{{ erros().quem }}</p>
            }
          </div>

          <app-campo-texto
            campoId="nome"
            rotulo="Seu nome ou nome da empresa"
            [obrigatorio]="true"
            placeholder="Ex.: Maria da Silva"
            [(valor)]="nome"
            [erro]="erros().nome"
          />
          <app-campo-texto
            campoId="telefone"
            rotulo="Telefone ou WhatsApp"
            tipo="tel"
            [obrigatorio]="true"
            placeholder="(81) 90000-0000"
            [(valor)]="telefone"
            [erro]="erros().telefone"
          />
          <app-campo-texto
            campoId="oque"
            rotulo="O que você vai doar?"
            dica="Pode listar vários itens"
            [linhas]="3"
            [obrigatorio]="true"
            placeholder="Ex.: 20 kg de arroz, 10 caixas de macarrão"
            [(valor)]="oQue"
            [erro]="erros().oQue"
          />
          <app-campo-texto
            campoId="quantidade"
            rotulo="Quantidade aproximada"
            placeholder="Ex.: 30 kg"
            [(valor)]="quantidade"
          />

          <div class="agrupado">
            <p id="rotulo-entrega" class="rotulo">Como prefere entregar?</p>
            <app-grupo-opcoes
              nome="entrega"
              rotuloId="rotulo-entrega"
              [opcoes]="opcoesEntrega"
              [(valor)]="entrega"
            />
            @if (erros().entrega) {
              <p class="erro">{{ erros().entrega }}</p>
            }
          </div>

          <p class="dica">
            Para volumes grandes ou doações que se repetem, a equipe pode combinar a coleta com você.
          </p>

          @if (temErros()) {
            <app-aviso tipo="erro" titulo="Falta preencher alguns campos">
              Veja as mensagens em vermelho, corrija e toque de novo em "Enviar oferta de doação".
            </app-aviso>
          }

          @if (erroEnvio(); as erro) {
            <app-aviso tipo="erro" [titulo]="erro.titulo">{{ erro.texto }}</app-aviso>
          }

          <button type="submit" class="botao botao-principal" [disabled]="enviando()">
            {{ enviando() ? 'Enviando...' : erroEnvio() ? 'Tentar de novo' : 'Enviar oferta de doação' }}
          </button>
        </form>
      }
    </app-tela>
  `,
})
export class QueroDoar {
  private readonly envio = inject(EnvioService);

  protected readonly opcoesQuem: Opcao[] = [
    { valor: 'pessoa', texto: 'Pessoa' },
    { valor: 'empresa', texto: 'Empresa' },
    { valor: 'feira', texto: 'Feira ou mercado' },
  ];
  protected readonly opcoesEntrega: Opcao[] = [
    { valor: 'levo', texto: 'Eu levo até o Banco' },
    { valor: 'busquem', texto: 'Prefiro que busquem' },
  ];

  protected readonly quem = signal<string | null>(null);
  protected readonly nome = signal('');
  protected readonly telefone = signal('');
  protected readonly oQue = signal('');
  protected readonly quantidade = signal('');
  protected readonly entrega = signal<string | null>(null);

  private readonly tentou = signal(false);
  protected readonly enviando = signal(false);
  protected readonly enviado = signal(false);
  protected readonly erroEnvio = signal<{ titulo: string; texto: string } | null>(null);

  /** Mensagens de erro de cada campo. Só aparecem depois da primeira tentativa de enviar. */
  protected readonly erros = computed(() => (this.tentou() ? this.validar() : SEM_ERROS));
  protected readonly temErros = computed(() => Object.values(this.erros()).some(Boolean));

  private validar() {
    return {
      quem: this.quem() ? '' : 'Escolha quem está doando.',
      nome: this.nome().trim() ? '' : 'Escreva o seu nome ou o nome da empresa.',
      telefone: telefoneValido(this.telefone())
        ? ''
        : 'Digite o telefone com DDD. Exemplo: (81) 90000-0000',
      oQue: this.oQue().trim() ? '' : 'Conte o que você vai doar.',
      entrega: this.entrega() ? '' : 'Escolha como prefere entregar.',
    };
  }

  protected async enviar(evento: Event): Promise<void> {
    evento.preventDefault();
    this.tentou.set(true);
    if (this.temErros()) return;

    this.erroEnvio.set(null);
    this.enviando.set(true);
    try {
      await this.envio.enviar('doacao', {
        quem: this.quem(),
        nome: this.nome(),
        telefone: this.telefone(),
        oQue: this.oQue(),
        quantidade: this.quantidade(),
        entrega: this.entrega(),
      });
      this.enviado.set(true);
    } catch (erro) {
      this.erroEnvio.set(mensagemDoErro(erro));
    } finally {
      this.enviando.set(false);
    }
  }
}
