# Banco de Alimento - Frontend

Interface web do projeto Banco de Alimento, feita com Angular. Projeto final da Residência Porto Digital - SENAC com a Capgemini (3º período).

A API (Java + Spring Boot) fica em outro repositório: [banco-de-alimento-backend](https://github.com/BancoDeAlimento/banco-de-alimento-backend)

## Sobre o projeto

O Banco de Alimento conecta quem tem alimentos para doar com quem precisa receber. A ideia é facilitar o cadastro das doações e o controle do que está disponível, evitando desperdício.

O frontend é o Banco de Alimentos do Recife: um serviço público ligado à Secretaria de Assistência Social e Combate à Fome. As telas foram pensadas para qualquer pessoa usar, com texto grande, botão "Ouvir" (leitura em voz alta) e aviso quando a internet cai.

> **A definir pelo time:** nome do projeto

## Funcionalidades

- [x] Tela de início, com as opções "Quero ajudar" e "Preciso de alimento"
- [x] Tela "Quero ajudar"
- [x] Formulário de doação ("Quero doar") com validação dos campos
- [x] Cadastro de entidade
- [x] Pedir alimento, em passos (nome, idade, pessoas, local, contato, documento e CadÚnico) e tela de pedido enviado
- [x] Botão "Ouvir", que lê o texto da tela em voz alta
- [x] Faixa de aviso quando a internet cai
- [x] Páginas "Em breve" e "Página não encontrada"
- [x] PWA: app instalável, com manifesto e service worker
- [x] Layout de desktop: início, "Quero ajudar", "Preciso de alimento" e "Quero doar" <!-- CONFERIR -->
- [ ] Contador de alimentos movimentados vindo da API (BDA-19, em andamento)
- [ ] Layout de desktop dos passos do pedido, "Pedido enviado" e "Cadastro de entidade"

## Autores

(manter a lista atual)

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 22 |
| @angular/service-worker | 22.2.4 (PWA) |
| Node.js | 24 (LTS) |
| npm | vem junto com o Node.js |
| TypeScript | instalado com o Angular |
| Testes | Vitest, rodado pelo `ng test` |

## Pré-requisitos

- Node.js 24 (LTS). Para conferir, rode `node -v`
- Angular CLI: `npm install -g @angular/cli`
- Git
- O backend rodando em `http://localhost:8080` (veja as instruções no repositório do backend)

## Como rodar

```bash
git clone https://github.com/BancoDeAlimento/banco-de-alimento-frontend.git
cd banco-de-alimento-frontend
npm install
ng serve
```

Abra `http://localhost:4200` no navegador.

### Portas usadas

| Porta | Uso |
|---|---|
| 4200 | `ng serve` (desenvolvimento, sem PWA) |
| 8080 | backend (Spring Boot) |
| 8081 | build de produção, para testar o PWA |

### Outros comandos

| Comando | Para que serve |
|---|---|
| `ng build` | gera a versão de produção na pasta `dist/` |
| `ng test --watch=false` | roda os testes uma vez |
| `ng test` | roda os testes e fica observando as mudanças |

Antes de abrir um Pull Request, rode `ng build` e `ng test --watch=false`: os dois precisam passar.

## Estrutura de pastas

```
public/
├── icons/                          ícones do PWA, favicons e apple-touch-icon
└── manifest.webmanifest            manifesto do PWA
ngsw-config.json                    cache do service worker
src/
├── app/
│   ├── paginas/                    uma pasta por grupo de telas
│   │   ├── entrada/                inicio.ts, quero-ajudar.ts
│   │   ├── doacao/                 quero-doar.ts, cadastro-entidade.ts
│   │   ├── pedir-alimento/         preciso-de-alimento.ts, passo-1 a passo-7,
│   │   │                           passo-layout.ts, pedido-enviado.ts, pedido.service.ts
│   │   └── erro/                   em-breve.ts, nao-encontrada.ts
│   ├── compartilhado/              o que as telas reaproveitam
│   │   ├── componentes/
│   │   │   ├── layout/             tela (topo, navegação, título, botão "Ouvir" e conteúdo)
│   │   │   ├── formulario/         campo-texto, grupo-opcoes
│   │   │   └── aviso, botao-falar, cartao-link, icone, sem-internet
│   │   ├── servicos/               envio, impacto, leitura-em-voz-alta
│   │   └── utilitarios/            telefone (validação)
│   ├── app.config.ts               configurações do app (rotas, HttpClient e service worker)
│   ├── app.routes.ts               rotas
│   └── app.ts / app.html           componente raiz
├── environments/                   endereço da API por ambiente
├── index.html
└── styles.css                      cores, medidas e fontes globais (variáveis CSS)
```

Regras para o código:

- **Tela nova:** em `paginas/`, na pasta do grupo dela.
- **Algo que mais de uma tela usa:** em `compartilhado/`.
- **Imports** sempre por caminho relativo (`../../compartilhado/...`). Ao mover um arquivo, rode `ng build` para achar os imports que ficaram velhos.
- **Nomes sem repetição:** a pasta é o grupo e o arquivo é a peça (nada de `tela/tela.ts`).
- **CSS separado do TypeScript:** cada componente tem o CSS em um arquivo próprio, ao lado do `.ts`, com `styleUrl: './nome.css'`. Não use `styles` inline.
- **CSS mobile first:** o estilo base é o do celular e o desktop (`@media (min-width: 64rem)`) fica no fim do arquivo, seguindo o Figma.

## Telas e rotas

As rotas ficam em `src/app/app.routes.ts`, carregadas sob demanda (`loadComponent`). Todas têm título da aba no formato `Nome da tela | Banco de Alimentos do Recife`.

| Rota | Tela |
|---|---|
| `/` | Início |
| `/quero-ajudar` | Quero ajudar |
| `/em-breve` | Em breve (telas que ainda não foram desenhadas) |
| `**` | Página não encontrada (precisa ser sempre a última rota) |

As demais rotas (doação, cadastro de entidade e pedir alimento) estão listadas no próprio `app.routes.ts`, separadas por comentários por parte do projeto.

## PWA

O app é instalável e abre offline. O manifesto fica em `public/manifest.webmanifest`, os ícones em `public/icons/` e a configuração de cache em `ngsw-config.json`. O service worker é registrado em `app.config.ts` com `provideServiceWorker`.

O service worker **só funciona no build de produção**, não no `ng serve`. Para testar:

```bash
ng build
npx http-server -p 8081 -c-1 dist/banco-de-alimento-frontend/browser
```

Abra `http://localhost:8081` (a 8080 é do backend). No Chrome, em DevTools → Aplicativo, confira o manifesto e o service worker. A instalação no celular exige HTTPS.

## Ambientes

O endereço da API fica em `src/environments/`:

| Arquivo | Quando é usado | apiUrl |
|---|---|---|
| `environment.development.ts` | `ng serve` (desenvolvimento) | `http://localhost:8080` |
| `environment.ts` | `ng build` (produção) | marcador, falta a URL do backend publicado |

Enquanto o marcador existir, o contador de impacto mostra "Indisponível no momento" no build de produção.

Não coloque senha, token nem chave nesses arquivos: eles vão para o repositório.

## Como o frontend se comunica com o backend

O frontend chama a API usando o `HttpClient` do Angular (`provideHttpClient()` em `app.config.ts`). Se a API estiver desligada, a tela mostra uma mensagem clara em vez de um número falso.

Para o navegador aceitar a resposta, o backend precisa liberar o CORS para `http://localhost:4200`.

| Tela | Endpoint usado |
|---|---|
| Início (contador de alimentos movimentados) | `GET /api/impacto` (BDA-19, em andamento) |

## Pendências conhecidas

- Layout de desktop dos passos do pedido, "Pedido enviado" e "Cadastro de entidade".
- Rodapé no desktop só existe na tela de início; no Figma todas as telas têm.
- URL do backend em produção e CORS do front publicado.
- `href="#contato"` em "Contato e endereço" é provisório (falta a página de contato).
- "Sou produtor rural" e "Conhecer o Banco" levam para `/em-breve`.
- Placeholder "macarrão" no código e "macaxeira" no Figma.

## Como contribuir

(manter as seções de Branches, Commits, Atualizar o local com o remoto, Pull Request e Integrantes como estão)