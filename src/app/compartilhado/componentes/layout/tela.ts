import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { Icone } from '../icone';
import { LeituraEmVozAltaService } from '../../servicos/leitura-em-voz-alta.service';

/**
 * Moldura de todas as telas: topo (Voltar + nome do banco), título, botão "Ouvir" e o conteúdo.
 * O que muda de uma tela para outra entra no meio, pelo <ng-content />.
 * Conteúdo marcado com o atributo `acima-do-titulo` aparece antes do título (ex.: barra de passos).
 * No desktop o topo também mostra os links Início, Quero ajudar e Preciso de alimento e o botão Ouvir.
 */
@Component({
  selector: 'app-tela',
  imports: [RouterLink, Icone],
  templateUrl: './tela.html',
  styleUrl: './tela.css',
})
export class Tela implements OnDestroy {
  protected readonly leitura = inject(LeituraEmVozAltaService);
  private readonly router = inject(Router);
  private readonly tituloTela = viewChild.required<ElementRef<HTMLElement>>('tituloTela');

  readonly titulo = input.required<string>();
  /** Texto lido pelo botão "Ouvir". Se ficar vazio, lê só o título. */
  readonly textoParaOuvir = input('');
  /** Endereço do botão Voltar. Sem ele (tela de início), o topo mostra só o nome do banco. */
  readonly voltarPara = input<string>();
  readonly rotuloVoltar = input('Início');

  private readonly endereco = toSignal(
    this.router.events.pipe(
      filter((evento) => evento instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Qual link do topo (desktop) fica marcado: as telas de dentro marcam a seção a que pertencem. */
  protected readonly secao = computed(() => {
    const url = this.endereco().split(/[?#]/)[0];
    if (url === '/') return 'inicio';
    if (/^\/(quero-ajudar|quero-doar)(\/|$)/.test(url)) return 'ajudar';
    if (/^\/(preciso-de-alimento|pedir-alimento|pedido-enviado|cadastro-entidade)(\/|$)/.test(url)) {
      return 'alimento';
    }
    return '';
  });

  constructor() {
    // Ao abrir a tela, o foco vai para o título: quem usa leitor de tela escuta a tela nova.
    afterNextRender(() => this.tituloTela().nativeElement.focus());
  }

  protected ouvir(): void {
    this.leitura.ler(this.textoParaOuvir() || this.titulo());
  }

  ngOnDestroy(): void {
    this.leitura.parar();
  }
}