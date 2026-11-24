import { Injectable } from '@angular/core';

export type MotivoDoErro = 'sem-internet' | 'servidor';

export class ErroDeEnvio extends Error {
  motivo: MotivoDoErro;

  constructor(motivo: MotivoDoErro) {
    super(motivo);
    this.motivo = motivo;
  }
}

/** Transforma o erro numa mensagem fácil de entender, dizendo o que fazer. */
export function mensagemDoErro(erro: unknown): { titulo: string; texto: string } {
  if (erro instanceof ErroDeEnvio && erro.motivo === 'sem-internet') {
    return {
      titulo: 'Você está sem internet',
      texto: 'Seus dados continuam na tela. Conecte-se à internet e toque em "Tentar de novo".',
    };
  }
  return {
    titulo: 'Não conseguimos enviar',
    texto:
      'O problema foi do nosso lado, não seu. Seus dados continuam aqui. Espere um pouco e toque em "Tentar de novo". Se continuar, procure o CRAS ou o Centro POP mais perto de você.',
  };
}

/**
 * Envia pedidos, ofertas de doação e pré-cadastros.
 *
 * TODO (time do back-end): o envio abaixo é simulado. Quando a API Spring Boot
 * tiver os endpoints, troque o corpo de `enviar` por uma chamada com HttpClient
 * (provideHttpClient em app.config.ts). Se a chamada falhar, lance `new ErroDeEnvio('servidor')`
 * e as telas já mostram o aviso de erro.
 */
@Injectable({ providedIn: 'root' })
export class EnvioService {
  async enviar(_tipo: 'pedido' | 'doacao' | 'entidade', _dados: unknown): Promise<string> {
    if (!navigator.onLine) throw new ErroDeEnvio('sem-internet');

    await new Promise((resolver) => setTimeout(resolver, 800));
    return gerarCodigo();
  }
}

function gerarCodigo(): string {
  const letras = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sem O, I, L, 0 e 1 para não confundir
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }
  return codigo;
}
