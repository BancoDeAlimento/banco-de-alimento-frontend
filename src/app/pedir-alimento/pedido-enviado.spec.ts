import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PedidoEnviado } from './pedido-enviado';
import { PedidoService } from './pedido.service';

describe('PedidoEnviado', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoEnviado],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('mostra o código quando o pedido foi enviado', async () => {
    TestBed.inject(PedidoService).codigo.set('K7M2QX');
    const fixture = TestBed.createComponent(PedidoEnviado);
    await fixture.whenStable();

    const tela = fixture.nativeElement as HTMLElement;
    expect(tela.querySelector('h1')?.textContent).toContain('Pedido enviado');
    expect(tela.textContent).toContain('K7M2QX');
  });

  it('explica o que fazer quando não existe código', async () => {
    const fixture = TestBed.createComponent(PedidoEnviado);
    await fixture.whenStable();

    const tela = fixture.nativeElement as HTMLElement;
    expect(tela.querySelector('h1')?.textContent).toContain('Não achamos o seu pedido');
    expect(tela.textContent).toContain('Fazer um novo pedido');
  });
});
