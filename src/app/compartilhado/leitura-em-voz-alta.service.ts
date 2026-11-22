import { Injectable } from '@angular/core';

/** Botão "Ouvir": lê o texto da tela em voz alta usando a voz do próprio navegador. */
@Injectable({ providedIn: 'root' })
export class LeituraEmVozAltaService {
  readonly disponivel = typeof window !== 'undefined' && 'speechSynthesis' in window;

  ler(texto: string): void {
    if (!this.disponivel) return;

    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 0.95;
    window.speechSynthesis.speak(fala);
  }

  parar(): void {
    if (this.disponivel) window.speechSynthesis.cancel();
  }
}
