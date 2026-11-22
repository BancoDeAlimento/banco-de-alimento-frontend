import { Component, input, output, signal } from '@angular/core';
import { Aviso } from '../compartilhado/aviso';
import { Tela } from '../compartilhado/tela/tela';

/**
 * Moldura dos passos do pedido: usa a <app-tela> e acrescenta "Passo X de 7", a barra de
 * progresso e os botões "Continuar" e "Falar com uma pessoa".
 */
@Component({
  selector: 'app-passo-layout',
  imports: [Tela, Aviso],
  template: `
    <app-tela
      [titulo]="titulo()"
      [textoParaOuvir]="textoParaOuvir()"
      [voltarPara]="voltarPara()"
      rotuloVoltar="Voltar"
    >
      <div acima-do-titulo>
        <p class="progresso-texto">Passo {{ passo() }} de {{ total }}</p>
        <div class="segmentos" aria-hidden="true">
          @for (numero of segmentos; track numero) {
            <span class="segmento" [class.feito]="numero <= passo()"></span>
          }
        </div>
      </div>

      <ng-content />

      <div class="acoes">
        <button
          type="button"
          class="botao botao-principal"
          [disabled]="ocupado()"
          (click)="continuar.emit()"
        >
          {{ ocupado() ? 'Enviando...' : textoContinuar() }}
        </button>
        <button type="button" class="botao botao-secundario" (click)="ajudaAberta.set(!ajudaAberta())">
          Falar com uma pessoa
        </button>
      </div>

      @if (ajudaAberta()) {
        <app-aviso tipo="info" titulo="Quer falar com uma pessoa?">
          Procure o CRAS ou o Centro POP mais perto de você. Eles ajudam a fazer o pedido junto
          com você.
        </app-aviso>
      }
    </app-tela>
  `,
  styles: `
    .progresso-texto {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .segmentos {
      display: flex;
      gap: 0.25rem;
    }

    .segmento {
      flex: 1;
      height: 0.5rem;
      border: 1.5px solid var(--cor-primaria);
      border-radius: 999px;
      background: #fff;
    }

    .segmento.feito {
      background: var(--cor-primaria);
    }
  `,
})
export class PassoLayout {
  readonly passo = input.required<number>();
  readonly titulo = input.required<string>();
  readonly voltarPara = input.required<string>();
  readonly textoParaOuvir = input('');
  readonly textoContinuar = input('Continuar');
  /** true enquanto o pedido está sendo enviado: desativa o botão. */
  readonly ocupado = input(false);

  readonly continuar = output<void>();

  protected readonly total = 7;
  protected readonly segmentos = [1, 2, 3, 4, 5, 6, 7];
  protected readonly ajudaAberta = signal(false);
}
