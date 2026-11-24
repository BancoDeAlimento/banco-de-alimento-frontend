import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icone } from './icone';

/** Cartão grande que leva para outra tela (usado em Início, Quero ajudar e Preciso de alimento). */
@Component({
  selector: 'app-cartao-link',
  imports: [RouterLink, Icone],
  styleUrl: './cartao-link.css',
  template: `
    <a class="cartao" [class.destaque]="destaque()" [routerLink]="link()">
      <span class="icone"><app-icone [nome]="icone()" tamanho="1.5rem" /></span>
      <span class="textos">
        <strong>{{ titulo() }}</strong>
        <span>{{ descricao() }}</span>
        <!-- No desktop o cartão mostra "Continuar ›" em vez da seta -->
        <span class="continuar" aria-hidden="true">Continuar ›</span>
      </span>
      <app-icone class="seta" nome="seta-direita" />
    </a>
  `,
})
export class CartaoLink {
  readonly link = input.required<string>();
  readonly icone = input.required<string>();
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
  readonly destaque = input(false);
}