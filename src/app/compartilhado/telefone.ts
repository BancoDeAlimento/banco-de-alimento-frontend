/** Deixa só os números e aplica a máscara (81) 90000-0000 (ou (81) 3000-0000 para fixo). */
export function formatarTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  if (numeros.length === 0) return '';
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

/** Telefone válido = DDD + 8 ou 9 dígitos. */
export function telefoneValido(valor: string): boolean {
  const quantidade = valor.replace(/\D/g, '').length;
  return quantidade === 10 || quantidade === 11;
}
