import { Component, input, output, signal } from '@angular/core';
import { Aviso } from './aviso';
import { Icone } from './icone';

/** O navegador chama esse recurso de "SpeechRecognition" (no Chrome tem o prefixo webkit). */
const Reconhecimento =
  typeof window === 'undefined'
    ? undefined
    : ((window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition);

/**
 * Botão "Falar": a pessoa fala e o texto reconhecido sai pelo evento `texto`.
 * Se o navegador não tiver o recurso, ou o microfone estiver bloqueado, mostra um aviso
 * explicando o que fazer.
 */
@Component({
  selector: 'app-botao-falar',
  imports: [Aviso, Icone],
  template: `
    <button type="button" class="botao botao-secundario" (click)="falar()">
      <app-icone nome="microfone" />
      &nbsp;{{ ouvindo() ? 'Ouvindo... pode falar' : rotulo() }}
    </button>
    @if (erro()) {
      <app-aviso tipo="erro" titulo="Não deu para usar a voz">{{ erro() }}</app-aviso>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  `,
})
export class BotaoFalar {
  readonly rotulo = input('Falar');
  readonly texto = output<string>();

  protected readonly ouvindo = signal(false);
  protected readonly erro = signal('');

  protected falar(): void {
    this.erro.set('');

    if (!Reconhecimento) {
      this.erro.set('Este navegador não consegue ouvir a sua voz. Digite no campo acima.');
      return;
    }

    const reconhecimento = new Reconhecimento();
    reconhecimento.lang = 'pt-BR';
    reconhecimento.onstart = () => this.ouvindo.set(true);
    reconhecimento.onend = () => this.ouvindo.set(false);
    reconhecimento.onresult = (evento: any) => this.texto.emit(evento.results[0][0].transcript);
    reconhecimento.onerror = (evento: any) => {
      this.erro.set(
        evento.error === 'not-allowed'
          ? 'Precisamos da permissão do microfone. Libere o microfone no navegador ou digite no campo acima.'
          : 'Não conseguimos ouvir direito. Tente de novo ou digite no campo acima.',
      );
    };
    reconhecimento.start();
  }
}
