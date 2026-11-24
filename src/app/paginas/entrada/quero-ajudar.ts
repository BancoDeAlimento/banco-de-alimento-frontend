import { Component } from '@angular/core';
import { CartaoLink } from '../../compartilhado/componentes/cartao-link';
import { Tela } from '../../compartilhado/componentes/layout/tela';

/** Tela 02 - Quero ajudar */
@Component({
  selector: 'app-quero-ajudar',
  imports: [Tela, CartaoLink],
  template: `
    <app-tela titulo="Quero ajudar" voltarPara="/" [textoParaOuvir]="textoParaOuvir">
      <p>Escolha como você quer participar:</p>

      <app-cartao-link
        link="/quero-doar"
        icone="coracao"
        titulo="Doar alimentos"
        descricao="Pessoa, empresa ou feira"
        [destaque]="true"
      />
      <!-- Estas duas telas ainda não foram desenhadas: levam para a página "Em breve" -->
      <app-cartao-link
        link="/em-breve"
        icone="folha"
        titulo="Sou produtor rural"
        descricao="Vender para o programa PAA e PNAE"
      />
      <app-cartao-link
        link="/em-breve"
        icone="info"
        titulo="Conhecer o Banco"
        descricao="Quem somos e os números"
      />
    </app-tela>
  `,
})
export class QueroAjudar {
  protected readonly textoParaOuvir =
    'Quero ajudar. Escolha como você quer participar: doar alimentos, se você é pessoa, empresa ou feira; sou produtor rural, para vender para o programa PAA e PNAE; ou conhecer o Banco.';
}
