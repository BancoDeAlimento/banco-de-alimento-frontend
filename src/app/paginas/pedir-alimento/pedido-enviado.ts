import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aviso } from '../../compartilhado/componentes/aviso';
import { Icone } from '../../compartilhado/componentes/icone';
import { Tela } from '../../compartilhado/componentes/layout/tela';
import { PedidoService } from './pedido.service';

/** Tela 06 - Pedido enviado */
@Component({
  selector: 'app-pedido-enviado',
  imports: [Tela, Aviso, Icone, RouterLink],
  template: `
    <app-tela
      [titulo]="codigo() ? 'Pedido enviado' : 'Não achamos o seu pedido'"
      voltarPara="/"
      [textoParaOuvir]="textoParaOuvir()"
    >
      <div acima-do-titulo>
        @if (codigo()) {
          <span class="selo"><app-icone nome="check" tamanho="1.75rem" /></span>
        }
      </div>

      @if (codigo()) {
        <p>Guarde ou anote o código abaixo. Com ele você acompanha o pedido e retira os alimentos.</p>

        <section class="codigo">
          <p class="dica">Seu código de atendimento</p>
          <p class="numero">{{ codigo() }}</p>
        </section>

        <h2>O que acontece agora</h2>
        <ol>
          @for (passo of passos; track passo) {
            <li>{{ passo }}</li>
          }
        </ol>

        @if (copia(); as resultado) {
          <app-aviso [tipo]="resultado.tipo">{{ resultado.texto }}</app-aviso>
        }

        <div class="acoes">
          <button type="button" class="botao botao-principal" (click)="copiar()">Copiar código</button>
          <a class="botao botao-secundario" routerLink="/">Voltar ao início</a>
        </div>
      } @else {
        <app-aviso tipo="erro" titulo="Não encontramos o código do seu pedido">
          Isso acontece quando a página é recarregada ou aberta direto pelo endereço. Se você já
          enviou o pedido, procure o CRAS ou o Centro POP e conte que fez um pedido. Se não enviou,
          você pode fazer um novo.
        </app-aviso>
        <div class="acoes">
          <a class="botao botao-principal" routerLink="/pedir-alimento/passo-1">Fazer um novo pedido</a>
          <a class="botao botao-secundario" routerLink="/">Voltar ao início</a>
        </div>
      }
    </app-tela>
  `,
  styles: `
    .selo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: var(--cor-primaria);
      color: #fff;
    }

    .codigo {
      padding: 1rem;
      border: 2px solid var(--cor-primaria);
      border-radius: var(--raio);
      background: #fff;
      text-align: center;
    }

    .numero {
      color: var(--cor-titulo);
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: 0.15em;
    }

    ol {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: passo;
    }

    li {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
      counter-increment: passo;
      font-size: 0.9375rem;
    }

    li::before {
      content: counter(passo);
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: var(--cor-primaria);
      color: #fff;
      font-size: 0.875rem;
      font-weight: 700;
    }
  `,
})
export class PedidoEnviado {
  protected readonly codigo = inject(PedidoService).codigo;

  protected readonly passos = [
    'A equipe entra em contato pelo jeito que você indicou.',
    'Você leva o código ao ponto de retirada combinado.',
    'Se ainda não está no CadÚnico, o CRAS ajuda a fazer o cadastro.',
  ];

  protected readonly copia = signal<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  protected textoParaOuvir(): string {
    const codigo = this.codigo();
    if (!codigo) return 'Não achamos o seu pedido.';
    // Separa as letras para a voz ler uma a uma
    return `Pedido enviado. Guarde ou anote o código: ${codigo.split('').join(' ')}. ${this.passos.join(' ')}`;
  }

  protected async copiar(): Promise<void> {
    const codigo = this.codigo() ?? '';
    try {
      await navigator.clipboard.writeText(codigo);
      this.copia.set({ tipo: 'sucesso', texto: 'Código copiado.' });
    } catch {
      this.copia.set({
        tipo: 'erro',
        texto: `Não deu para copiar. Anote o código: ${codigo}`,
      });
    }
  }
}
