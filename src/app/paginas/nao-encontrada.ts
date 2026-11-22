import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aviso } from '../compartilhado/aviso';
import { Tela } from '../compartilhado/tela/tela';

/** Erro 404: aparece quando o endereço digitado não existe. */
@Component({
  selector: 'app-nao-encontrada',
  imports: [Tela, Aviso, RouterLink],
  template: `
    <app-tela titulo="Não achamos essa página" voltarPara="/">
      <app-aviso tipo="erro" titulo="O endereço não existe">
        O link pode estar errado ou a página mudou de lugar. Volte ao início e escolha o que você
        quer fazer.
      </app-aviso>
      <div class="acoes">
        <a class="botao botao-principal" routerLink="/">Voltar ao início</a>
      </div>
    </app-tela>
  `,
})
export class NaoEncontrada {}
