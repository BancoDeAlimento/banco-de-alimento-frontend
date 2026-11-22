import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aviso } from '../compartilhado/aviso';
import { Tela } from '../compartilhado/tela/tela';

/** Página de aviso para as telas que ainda não existem. */
@Component({
  selector: 'app-em-breve',
  imports: [Tela, Aviso, RouterLink],
  template: `
    <app-tela titulo="Esta parte ainda não está pronta" voltarPara="/">
      <app-aviso tipo="info" titulo="Estamos trabalhando nisso">
        Essa opção ainda não está disponível. Volte ao início e escolha outra opção, ou procure o
        CRAS ou o Centro POP mais perto de você.
      </app-aviso>
      <div class="acoes">
        <a class="botao botao-principal" routerLink="/">Voltar ao início</a>
      </div>
    </app-tela>
  `,
})
export class EmBreve {}
