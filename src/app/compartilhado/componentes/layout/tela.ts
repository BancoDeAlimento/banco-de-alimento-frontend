import { Component, ElementRef, OnDestroy, afterNextRender, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icone } from '../icone';
import { LeituraEmVozAltaService } from '../../servicos/leitura-em-voz-alta.service';

/**
 * Moldura de todas as telas: topo (Voltar + nome do banco), título, botão "Ouvir" e o conteúdo.
 * O que muda de uma tela para outra entra no meio, pelo <ng-content />.
 * Conteúdo marcado com o atributo `acima-do-titulo` aparece antes do título (ex.: barra de passos).
 */
@Component({
  selector: 'app-tela',
  imports: [RouterLink, Icone],
  templateUrl: './tela.html',
  styleUrl: './tela.css',
})
export class Tela implements OnDestroy {
  protected readonly leitura = inject(LeituraEmVozAltaService);
  private readonly tituloTela = viewChild.required<ElementRef<HTMLElement>>('tituloTela');

  readonly titulo = input.required<string>();
  /** Texto lido pelo botão "Ouvir". Se ficar vazio, lê só o título. */
  readonly textoParaOuvir = input('');
  /** Endereço do botão Voltar. Sem ele (tela de início), o topo mostra só o nome do banco. */
  readonly voltarPara = input<string>();
  readonly rotuloVoltar = input('Início');

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