import { formatarTelefone, telefoneValido } from './telefone';

describe('telefone', () => {
  it('aplica a máscara de celular', () => {
    expect(formatarTelefone('81900001234')).toBe('(81) 90000-1234');
  });

  it('aplica a máscara de telefone fixo', () => {
    expect(formatarTelefone('8130001234')).toBe('(81) 3000-1234');
  });

  it('formata enquanto a pessoa ainda está digitando', () => {
    expect(formatarTelefone('8')).toBe('(8');
    expect(formatarTelefone('819')).toBe('(81) 9');
  });

  it('ignora letras e passa de 11 dígitos', () => {
    expect(formatarTelefone('(81) 9a0000-1234999')).toBe('(81) 90000-1234');
  });

  it('valida telefone com DDD', () => {
    expect(telefoneValido('(81) 90000-1234')).toBe(true);
    expect(telefoneValido('(81) 3000-1234')).toBe(true);
    expect(telefoneValido('(81) 9000')).toBe(false);
    expect(telefoneValido('')).toBe(false);
  });
});
