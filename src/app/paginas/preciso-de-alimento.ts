import { Component } from '@angular/core';
import { Aviso } from '../compartilhado/aviso';
import { CartaoLink } from '../compartilhado/cartao-link';
import { Tela } from '../compartilhado/tela/tela';

/** Tela 04 - Preciso de alimento */
@Component({
  selector: 'app-preciso-de-alimento',
  imports: [Tela, CartaoLink, Aviso],
  template: `
    <app-tela titulo="Preciso de alimento" voltarPara="/" [textoParaOuvir]="textoParaOuvir">
      <p>
        Quem recebe os alimentos são pessoas e entidades que atendem gente em situação de
        vulnerabilidade no Recife.
      </p>

      <app-cartao-link
        link="/pedir-alimento/passo-1"
        icone="pessoa"
        titulo="Sou uma pessoa"
        descricao="Pedir comida para mim e minha família"
        [destaque]="true"
      />
      <app-cartao-link
        link="/cadastro-entidade"
        icone="predio"
        titulo="Sou uma entidade"
        descricao="Creche, abrigo, OSC ou cozinha solidária"
      />

      <app-aviso>
        Prefere ajuda para preencher? O CRAS e o Centro POP mais perto de você podem fazer o pedido
        junto com você.
      </app-aviso>
    </app-tela>
  `,
})
export class PrecisoDeAlimento {
  protected readonly textoParaOuvir =
    'Preciso de alimento. Quem recebe os alimentos são pessoas e entidades que atendem gente em situação de vulnerabilidade no Recife. Sou uma pessoa: pedir comida para mim e minha família. Sou uma entidade: creche, abrigo, OSC ou cozinha solidária. Prefere ajuda para preencher? O CRAS e o Centro POP mais perto de você podem fazer o pedido junto com você.';
}
