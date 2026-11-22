import { Component, input, model } from '@angular/core';

export interface Opcao {
  valor: string;
  texto: string;
}

/**
 * Lista de opções em cartões (um "radio" por cartão).
 * Usa <input type="radio"> de verdade, então o teclado (setas, Tab) e o leitor de tela funcionam.
 * O estado selecionado muda fundo, borda e círculo: nunca depende só da cor.
 *
 * Uso: <app-grupo-opcoes nome="idade" [opcoes]="opcoes" [(valor)]="idade" />
 * `layout="linha"` mostra as opções lado a lado, como os números da tela "Quantas pessoas".
 */
@Component({
  selector: 'app-grupo-opcoes',
  templateUrl: './grupo-opcoes.html',
  styleUrl: './grupo-opcoes.css',
})
export class GrupoOpcoes {
  /** Mesmo `name` para todos os radios do grupo. */
  readonly nome = input.required<string>();
  readonly opcoes = input.required<readonly Opcao[]>();
  /** id do elemento que dá nome ao grupo. Por padrão, o título da tela. */
  readonly rotuloId = input('titulo-tela');
  readonly layout = input<'lista' | 'linha'>('lista');

  /** Valor escolhido. Funciona com [(valor)]="algumSignal". */
  readonly valor = model<string | null>(null);
}
