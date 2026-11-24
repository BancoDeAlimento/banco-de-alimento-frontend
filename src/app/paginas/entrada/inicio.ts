import { Component, computed, inject, signal } from '@angular/core';
import { CartaoLink } from '../../compartilhado/componentes/cartao-link';
import { ImpactoService } from '../../compartilhado/servicos/impacto.service';
import { Tela } from '../../compartilhado/componentes/layout/tela';

/** Tela 01 - Início */
@Component({
  selector: 'app-inicio',
  imports: [Tela, CartaoLink],
  template: `
    <app-tela titulo="Banco de Alimentos do Recife" [textoParaOuvir]="textoParaOuvir">
      <p class="apresentacao">{{ apresentacao }}</p>

      <h2 class="pergunta">O que você quer fazer?</h2>

      <div class="escolhas">
        <app-cartao-link
          link="/quero-ajudar"
          icone="coracao"
          titulo="Quero ajudar"
          descricao="Doar comida ou vender para o Banco"
          [destaque]="true"
        />
        <app-cartao-link
          link="/preciso-de-alimento"
          icone="prato"
          titulo="Preciso de alimento"
          descricao="Para mim ou para minha entidade"
        />
      </div>

      <!-- O número vem da API (GET /api/impacto). O aria-live faz o leitor de tela avisar quando ele carrega. -->
      <section class="impacto">
        <p>Alimentos movimentados</p>
        <p class="numero" [class.numero-aviso]="!temNumero()" aria-live="polite">{{ numeroImpacto() }}</p>
        <p>Desde 01/2025. O número é atualizado com os registros do Banco.</p>
      </section>
    </app-tela>
  `,
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly impactoService = inject(ImpactoService);

  /** Total em kg vindo da API (null enquanto carrega ou se der erro). */
  private readonly totalKg = signal<number | null>(null);
  private readonly falhou = signal(false);

  protected readonly temNumero = computed(() => this.totalKg() !== null);

  /** Texto do contador: o número formatado, ou um aviso claro (sem número falso). */
  protected readonly numeroImpacto = computed(() => {
    const total = this.totalKg();
    if (total !== null) return `${total.toLocaleString('pt-BR')} kg`;
    return this.falhou() ? 'Indisponível no momento' : 'Carregando...';
  });

  protected readonly apresentacao =
    'Serviço público da Prefeitura, ligado à Secretaria de Assistência Social e Combate à Fome. Recebemos alimentos de quem doa e entregamos para quem precisa.';

  protected readonly textoParaOuvir = `Banco de Alimentos do Recife. ${this.apresentacao} O que você quer fazer? Quero ajudar: doar comida ou vender para o Banco. Preciso de alimento: para mim ou para minha entidade.`;

  constructor() {
    this.impactoService.buscar().subscribe({
      next: (resposta) => this.totalKg.set(resposta.totalKg),
      error: () => this.falhou.set(true),
    });
  }
}