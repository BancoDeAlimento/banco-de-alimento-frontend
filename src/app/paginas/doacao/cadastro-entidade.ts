import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aviso } from '../../compartilhado/componentes/aviso';
import { CampoTexto } from '../../compartilhado/componentes/formulario/campo-texto';
import { EnvioService, mensagemDoErro } from '../../compartilhado/servicos/envio.service';
import { GrupoOpcoes, Opcao } from '../../compartilhado/componentes/formulario/grupo-opcoes';
import { telefoneValido } from '../../compartilhado/utilitarios/telefone';
import { Tela } from '../../compartilhado/componentes/layout/tela';

const SEM_ERROS = {
  tipo: '',
  nome: '',
  documento: '',
  telefone: '',
  bairro: '',
  ano: '',
  descricao: '',
};

/** Tela 07 - Cadastro de entidade */
@Component({
  selector: 'app-cadastro-entidade',
  imports: [Tela, Aviso, CampoTexto, GrupoOpcoes, RouterLink],
  template: `
    <app-tela titulo="Cadastro de entidade" voltarPara="/">
      @if (enviado()) {
        <app-aviso tipo="sucesso" titulo="Pré-cadastro enviado. Obrigado!">
          A equipe vai entrar em contato pelo telefone informado para pedir os documentos do edital.
        </app-aviso>
        <div class="acoes">
          <a class="botao botao-principal" routerLink="/">Voltar ao início</a>
        </div>
      } @else {
        <p>
          Primeiro um pré-cadastro rápido. Os documentos do edital você envia depois, quando a
          equipe entrar em contato.
        </p>

        <form class="formulario" novalidate (submit)="enviar($event)">
          <div class="agrupado">
            <p id="rotulo-tipo" class="rotulo">Tipo de entidade</p>
            <app-grupo-opcoes nome="tipo" rotuloId="rotulo-tipo" [opcoes]="opcoesTipo" [(valor)]="tipo" />
            @if (erros().tipo) {
              <p class="erro">{{ erros().tipo }}</p>
            }
          </div>

          <app-campo-texto
            campoId="nome"
            rotulo="Nome da entidade"
            [obrigatorio]="true"
            placeholder="Nome completo"
            [(valor)]="nome"
            [erro]="erros().nome"
          />
          <app-campo-texto
            campoId="documento"
            rotulo="CNPJ ou CPF"
            placeholder="Somente números"
            [(valor)]="documento"
            [erro]="erros().documento"
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
            campoId="bairro"
            rotulo="Bairro"
            [obrigatorio]="true"
            placeholder="Bairro onde funciona"
            [(valor)]="bairro"
            [erro]="erros().bairro"
          />
          <app-campo-texto
            campoId="ano"
            rotulo="Ano de início"
            [obrigatorio]="true"
            placeholder="Ex.: 2018"
            [(valor)]="ano"
            [erro]="erros().ano"
          />
          <app-campo-texto
            campoId="descricao"
            rotulo="O que a entidade faz e quem ela atende"
            dica="Conte também a situação das pessoas atendidas."
            [linhas]="4"
            [obrigatorio]="true"
            placeholder="Conte em poucas linhas"
            [(valor)]="descricao"
            [erro]="erros().descricao"
          />

          <app-aviso>Você pode usar o e-mail que preferir. Não é obrigatório ter conta Google.</app-aviso>

          @if (temErros()) {
            <app-aviso tipo="erro" titulo="Falta preencher alguns campos">
              Veja as mensagens em vermelho, corrija e toque de novo em "Enviar pré-cadastro".
            </app-aviso>
          }

          @if (erroEnvio(); as erro) {
            <app-aviso tipo="erro" [titulo]="erro.titulo">{{ erro.texto }}</app-aviso>
          }

          <button type="submit" class="botao botao-principal" [disabled]="enviando()">
            {{ enviando() ? 'Enviando...' : erroEnvio() ? 'Tentar de novo' : 'Enviar pré-cadastro' }}
          </button>
        </form>
      }
    </app-tela>
  `,
})
export class CadastroEntidade {
  private readonly envio = inject(EnvioService);

  protected readonly opcoesTipo: Opcao[] = [
    { valor: 'osc', texto: 'OSC' },
    { valor: 'cozinha-solidaria', texto: 'Cozinha Solidária' },
  ];

  protected readonly tipo = signal<string | null>(null);
  protected readonly nome = signal('');
  protected readonly documento = signal('');
  protected readonly telefone = signal('');
  protected readonly bairro = signal('');
  protected readonly ano = signal('');
  protected readonly descricao = signal('');

  private readonly tentou = signal(false);
  protected readonly enviando = signal(false);
  protected readonly enviado = signal(false);
  protected readonly erroEnvio = signal<{ titulo: string; texto: string } | null>(null);

  /** Mensagens de erro de cada campo. Só aparecem depois da primeira tentativa de enviar. */
  protected readonly erros = computed(() => (this.tentou() ? this.validar() : SEM_ERROS));
  protected readonly temErros = computed(() => Object.values(this.erros()).some(Boolean));

  private validar() {
    const digitos = this.documento().replace(/\D/g, '');
    const documentoOk =
      this.documento().trim() === '' || digitos.length === 11 || digitos.length === 14;

    const ano = Number(this.ano());
    const anoOk = /^\d{4}$/.test(this.ano().trim()) && ano >= 1900 && ano <= new Date().getFullYear();

    return {
      tipo: this.tipo() ? '' : 'Escolha o tipo da entidade.',
      nome: this.nome().trim() ? '' : 'Escreva o nome da entidade.',
      documento: documentoOk ? '' : 'Digite só números: 11 para CPF ou 14 para CNPJ.',
      telefone: telefoneValido(this.telefone())
        ? ''
        : 'Digite o telefone com DDD. Exemplo: (81) 90000-0000',
      bairro: this.bairro().trim() ? '' : 'Diga o bairro onde a entidade funciona.',
      ano: anoOk ? '' : 'Digite o ano com 4 números. Exemplo: 2018',
      descricao: this.descricao().trim() ? '' : 'Conte em poucas linhas o que a entidade faz.',
    };
  }

  protected async enviar(evento: Event): Promise<void> {
    evento.preventDefault();
    this.tentou.set(true);
    if (this.temErros()) return;

    this.erroEnvio.set(null);
    this.enviando.set(true);
    try {
      await this.envio.enviar('entidade', {
        tipo: this.tipo(),
        nome: this.nome(),
        documento: this.documento(),
        telefone: this.telefone(),
        bairro: this.bairro(),
        ano: this.ano(),
        descricao: this.descricao(),
      });
      this.enviado.set(true);
    } catch (erro) {
      this.erroEnvio.set(mensagemDoErro(erro));
    } finally {
      this.enviando.set(false);
    }
  }
}
