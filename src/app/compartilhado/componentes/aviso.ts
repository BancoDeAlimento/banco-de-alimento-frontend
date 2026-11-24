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
  styleUrl: './aviso.css',
})
export class Aviso {
  readonly tipo = input<'info' | 'sucesso' | 'erro'>('info');
  readonly titulo = input('');
  readonly acao = input('');
  readonly acionar = output<void>();
}