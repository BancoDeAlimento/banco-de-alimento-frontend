import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Aviso } from '../../compartilhado/componentes/aviso';
import { GrupoOpcoes, Opcao } from '../../compartilhado/componentes/formulario/grupo-opcoes';
import { PassoLayout } from './passo-layout';
import { PedidoService } from './pedido.service';

/** Tela 05.6 - Você tem algum documento? (nenhuma resposta é obrigatória) */
@Component({
  selector: 'app-passo-6-documento',
  imports: [PassoLayout, GrupoOpcoes, Aviso],
  template: `
    <app-passo-layout
      [passo]="6"
      [titulo]="titulo"
      [textoParaOuvir]="textoParaOuvir"
      voltarPara="/pedir-alimento/passo-5"
      (continuar)="continuar()"
    >
      <app-grupo-opcoes nome="documento" [opcoes]="opcoes" [(valor)]="documento" />

      @if (documento() === 'nenhum') {
        <app-aviso>{{ avisoSemDocumento }}</app-aviso>
      }
    </app-passo-layout>
  `,
})
export class Passo6Documento {
  private readonly router = inject(Router);

  protected readonly titulo = 'Você tem algum documento?';
  protected readonly avisoSemDocumento = 'Sem documento você recebe do mesmo jeito.';
  protected readonly opcoes: Opcao[] = [
    { valor: 'cpf', texto: 'Tenho CPF' },
    { valor: 'rg', texto: 'Tenho RG ou outro documento' },
    { valor: 'nenhum', texto: 'Não tenho documento' },
  ];
  protected readonly textoParaOuvir = `${this.titulo} ${this.opcoes.map((o) => o.texto).join('. ')}. ${this.avisoSemDocumento}`;

  protected readonly documento = inject(PedidoService).documento;

  protected continuar(): void {
    void this.router.navigate(['/pedir-alimento/passo-7']);
  }
}
