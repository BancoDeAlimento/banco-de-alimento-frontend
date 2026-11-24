import { Injectable, signal } from '@angular/core';

/**
 * Guarda as respostas do pedido de alimento enquanto a pessoa anda pelos 7 passos.
 * Se a página for recarregada, as respostas se perdem (o passo 7 avisa quando isso acontece).
 */
@Injectable({ providedIn: 'root' })
export class PedidoService {
  readonly nome = signal('');
  readonly idade = signal<string | null>(null);
  readonly pessoas = signal<string | null>(null);
  readonly local = signal('');
  readonly contato = signal<string | null>(null);
  readonly telefone = signal('');
  readonly documento = signal<string | null>(null);
  readonly cadunico = signal<string | null>(null);

  /** Código de atendimento, gerado quando o pedido é enviado. */
  readonly codigo = signal<string | null>(null);

  /** Falta alguma resposta dos passos 1 a 5? (acontece quando a página é recarregada) */
  faltaResposta(): boolean {
    return (
      !this.nome().trim() ||
      !this.idade() ||
      !this.pessoas() ||
      !this.local().trim() ||
      !this.contato()
    );
  }
}
