import { Component, computed, input, model } from '@angular/core';
import { formatarTelefone } from '../telefone';

/**
 * Campo de texto com rótulo visível, dica e mensagem de erro.
 * Uso: <app-campo-texto campoId="nome" rotulo="Seu nome" [obrigatorio]="true"
 *        [(valor)]="nome" [erro]="erroDoNome()" />
 * - tipo="tel": aplica a máscara (81) 90000-0000
 * - linhas > 0: vira uma caixa de texto grande (textarea)
 */
@Component({
  selector: 'app-campo-texto',
  templateUrl: './campo-texto.html',
  styleUrl: './campo-texto.css',
})
export class CampoTexto {
  readonly campoId = input.required<string>();
  readonly rotulo = input.required<string>();
  /** false = o rótulo fica só para leitor de tela (quando o título da tela já faz esse papel). */
  readonly rotuloVisivel = input(true);
  readonly dica = input('');
  readonly erro = input('');
  readonly placeholder = input('');
  readonly obrigatorio = input(false);
  readonly tipo = input<'text' | 'tel'>('text');
  readonly linhas = input(0);

  readonly valor = model('');

  /** Liga o campo à dica e ao erro, para o leitor de tela ler os dois. */
  protected readonly descricao = computed(() => {
    const ids: string[] = [];
    if (this.dica()) ids.push(this.campoId() + '-dica');
    if (this.erro()) ids.push(this.campoId() + '-erro');
    return ids.length > 0 ? ids.join(' ') : null;
  });

  protected aoDigitar(evento: Event): void {
    const campo = evento.target as HTMLInputElement | HTMLTextAreaElement;
    const texto = this.tipo() === 'tel' ? formatarTelefone(campo.value) : campo.value;
    campo.value = texto;
    this.valor.set(texto);
  }
}
