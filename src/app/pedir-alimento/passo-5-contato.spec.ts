import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Passo5Contato } from './passo-5-contato';

describe('Passo5Contato', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passo5Contato],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  async function criarTela() {
    const fixture = TestBed.createComponent(Passo5Contato);
    await fixture.whenStable();
    return { fixture, tela: fixture.nativeElement as HTMLElement };
  }

  it('mostra o título e o passo 5 de 7', async () => {
    const { tela } = await criarTela();
    expect(tela.querySelector('h1')?.textContent).toContain('Como a gente fala com você?');
    expect(tela.textContent).toContain('Passo 5 de 7');
  });

  it('só mostra o campo de número depois de escolher "Tenho telefone"', async () => {
    const { fixture, tela } = await criarTela();
    expect(tela.querySelector('#telefone')).toBeNull();

    tela.querySelectorAll<HTMLInputElement>('input[type="radio"]')[0].click();
    await fixture.whenStable();
    expect(tela.querySelector('#telefone')).toBeTruthy();
  });

  it('avisa quando tenta continuar sem escolher nada', async () => {
    const { fixture, tela } = await criarTela();
    tela.querySelector<HTMLButtonElement>('.botao-principal')!.click();
    await fixture.whenStable();
    expect(tela.textContent).toContain('Escolha uma das opções para continuar.');
  });
});
