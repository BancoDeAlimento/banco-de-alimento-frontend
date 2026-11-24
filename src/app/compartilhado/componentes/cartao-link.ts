import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icone } from './icone';

/** Cartão grande que leva para outra tela (usado em Início, Quero ajudar e Preciso de alimento). */
@Component({
  selector: 'app-cartao-link',
  imports: [RouterLink, Icone],
  template: `
    <a class="cartao" [class.destaque]="destaque()" [routerLink]="link()">
      <span class="icone"><app-icone [nome]="icone()" tamanho="1.5rem" /></span>
      <span class="textos">
        <strong>{{ titulo() }}</strong>
        <span>{{ descricao() }}</span>
      </span>
      <app-icone nome="seta-direita" />
    </a>
  `,
  styles: `
    .cartao {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 4.5rem;
      padding: 0.75rem 1rem;
      border: 2px solid var(--cor-primaria);
      border-radius: var(--raio);
      background: #fff;
      color: var(--cor-texto);
      text-decoration: none;
    }

    .cartao:hover {
      background: var(--cor-selecionado);
    }

    .destaque {
      background: var(--cor-primaria);
      color: #fff;
    }

    .destaque:hover {
      background: var(--cor-primaria-escura);
    }

    .icone {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: var(--cor-selecionado);
      color: var(--cor-primaria);
    }

    .destaque .icone {
      background: #fff;
    }

    .textos {
      display: flex;
      flex: 1;
      flex-direction: column;
      line-height: 1.3;
    }

    strong {
      font-size: 1.125rem;
    }

    .textos span {
      font-size: 0.875rem;
    }
  `,
})
export class CartaoLink {
  readonly link = input.required<string>();
  readonly icone = input.required<string>();
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
  readonly destaque = input(false);
}
