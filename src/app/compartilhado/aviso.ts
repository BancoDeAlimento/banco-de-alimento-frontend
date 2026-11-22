import { Component, input, output } from '@angular/core';

/**
 * Caixa de aviso. Tipos:
 *  - info: dica ou explicação (fundo verde-claro)
 *  - sucesso: deu certo
 *  - erro: algo deu errado; diga o que aconteceu e o que a pessoa pode fazer
 * Se passar `acao`, aparece um botão (por exemplo "Tentar de novo") e o evento `acionar` dispara no clique.
 */
@Component({
  selector: 'app-aviso',
  template: `
    <div
      class="aviso"
      [class.aviso-erro]="tipo() === 'erro'"
      [class.aviso-sucesso]="tipo() === 'sucesso'"
      [attr.role]="tipo() === 'erro' ? 'alert' : tipo() === 'sucesso' ? 'status' : null"
    >
      @if (titulo()) {
        <strong>{{ titulo() }}</strong>
      }
      <div><ng-content /></div>
      @if (acao()) {
        <button type="button" class="aviso-botao" (click)="acionar.emit()">{{ acao() }}</button>
      }
    </div>
  `,
  styles: `
    .aviso {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background: var(--cor-selecionado);
      color: var(--cor-texto);
      font-size: 0.9375rem;
    }

    .aviso-sucesso {
      border-left: 4px solid var(--cor-primaria);
    }

    .aviso-erro {
      border-left: 4px solid var(--cor-erro);
      background: var(--cor-erro-fundo);
    }

    strong {
      font-size: 1rem;
    }

    .aviso-erro strong {
      color: var(--cor-erro);
    }

    .aviso-botao {
      align-self: flex-start;
      min-height: 2.75rem;
      padding: 0 1rem;
      border: 2px solid var(--cor-primaria);
      border-radius: var(--raio);
      background: #fff;
      color: var(--cor-primaria);
      font-weight: 700;
      cursor: pointer;
    }

    .aviso-erro .aviso-botao {
      border-color: var(--cor-erro);
      color: var(--cor-erro);
    }
  `,
})
export class Aviso {
  readonly tipo = input<'info' | 'sucesso' | 'erro'>('info');
  readonly titulo = input('');
  readonly acao = input('');
  readonly acionar = output<void>();
}
