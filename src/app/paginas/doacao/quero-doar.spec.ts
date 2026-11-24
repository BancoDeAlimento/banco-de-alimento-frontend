import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QueroDoar } from './quero-doar';

describe('QueroDoar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueroDoar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('mostra o título', async () => {
    const fixture = TestBed.createComponent(QueroDoar);
    await fixture.whenStable();
    const tela = fixture.nativeElement as HTMLElement;
    expect(tela.querySelector('h1')?.textContent).toContain('Quero doar');
  });

  it('explica o que falta quando tenta enviar com o formulário vazio', async () => {
    const fixture = TestBed.createComponent(QueroDoar);
    await fixture.whenStable();
    const tela = fixture.nativeElement as HTMLElement;

    tela.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(tela.textContent).toContain('Falta preencher alguns campos');
    expect(tela.textContent).toContain('Escolha quem está doando.');
  });
});
