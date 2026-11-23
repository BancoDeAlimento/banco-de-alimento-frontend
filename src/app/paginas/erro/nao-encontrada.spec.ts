import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NaoEncontrada } from './nao-encontrada';

describe('NaoEncontrada', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaoEncontrada],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('explica o erro e oferece voltar ao início', async () => {
    const fixture = TestBed.createComponent(NaoEncontrada);
    await fixture.whenStable();
    const tela = fixture.nativeElement as HTMLElement;

    expect(tela.querySelector('h1')?.textContent).toContain('Não achamos essa página');
    expect(tela.textContent).toContain('Voltar ao início');
  });
});
