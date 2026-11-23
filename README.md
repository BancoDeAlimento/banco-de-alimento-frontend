# Banco de Alimento - Frontend

Interface web do projeto **Banco de Alimento**, feita com Angular. Projeto final da Residência Porto Digital - SENAC com a Capgemini (3º período).

A API (Java + Spring Boot) fica em outro repositório: [banco-de-alimento-backend](https://github.com/BancoDeAlimento/banco-de-alimento-backend)

## Sobre o projeto

O Banco de Alimento conecta quem tem alimentos para doar com quem precisa receber. A ideia é facilitar o cadastro das doações e o controle do que está disponível, evitando desperdício.

O frontend é o **Banco de Alimentos do Recife**: um serviço público ligado à Secretaria de Assistência Social e Combate à Fome. As telas foram pensadas para qualquer pessoa usar, com texto grande, botão "Ouvir" (leitura em voz alta) e aviso quando a internet cai.

> **A definir pelo time:** nome do projeto

### Funcionalidades

- [x] Tela de início, com as opções "Quero ajudar" e "Preciso de alimento"
- [x] Tela "Quero ajudar"
- [x] Formulário de doação ("Quero doar") com validação dos campos
- [x] Cadastro de entidade
- [x] Pedir alimento, em passos (nome, idade, pessoas, local, contato, documento e CadÚnico) e tela de pedido enviado
- [x] Botão "Ouvir", que lê o texto da tela em voz alta
- [x] Faixa de aviso quando a internet cai
- [x] Páginas "Em breve" e "Página não encontrada"
- [ ] Contador de alimentos movimentados vindo da API (BDA-19, em andamento)
- [ ] Layout de desktop da tela de início

## Autores

<a href="https://github.com/BancoDeAlimento/banco-de-alimento-frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BancoDeAlimento/banco-de-alimento-frontend" />
</a>

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 22 |
| Node.js | 24 (LTS) |
| npm | vem junto com o Node.js |
| TypeScript | instalado com o Angular |
| Testes | Vitest, rodado pelo `ng test` |

## Pré-requisitos

- Node.js 24 (LTS). Para conferir, rode `node -v`
- Angular CLI:

  ```bash
  npm install -g @angular/cli
  ```

- Git
- O backend rodando em `http://localhost:8080` (veja as instruções no [repositório do backend](https://github.com/BancoDeAlimento/banco-de-alimento-backend))

## Como rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/BancoDeAlimento/banco-de-alimento-frontend.git
   cd banco-de-alimento-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode a aplicação:

   ```bash
   ng serve
   ```

4. Abra `http://localhost:4200` no navegador.

### Outros comandos

| Comando | Para que serve |
|---|---|
| `ng build` | gera a versão de produção na pasta `dist/` |
| `ng test --watch=false` | roda os testes uma vez |
| `ng test` | roda os testes e fica observando as mudanças |

Antes de abrir um Pull Request, rode `ng build` e `ng test --watch=false`: os dois precisam passar.

## Estrutura de pastas

```
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
│   │   │   ├── layout/             tela (topo, título, botão "Ouvir" e conteúdo)
│   │   │   ├── formulario/         campo-texto, grupo-opcoes
│   │   │   └── aviso, botao-falar, cartao-link, icone, sem-internet
│   │   ├── servicos/               envio, impacto, leitura-em-voz-alta
│   │   └── utilitarios/            telefone (validação)
│   ├── app.config.ts               configurações do app (rotas e HttpClient)
│   ├── app.routes.ts               rotas
│   └── app.ts / app.html           componente raiz
├── environments/                   endereço da API por ambiente
├── index.html
└── styles.css                      cores e medidas globais (variáveis CSS)
```

Regra para colocar um arquivo novo:

- Tela nova: em `paginas/`, na pasta do grupo dela.
- Algo que mais de uma tela usa: em `compartilhado/`.
- Imports sempre por caminho relativo (`../../compartilhado/...`). Ao mover um arquivo, rode `ng build` para achar os imports que ficaram velhos.

## Telas e rotas

As rotas ficam em `src/app/app.routes.ts`, carregadas sob demanda (`loadComponent`). Todas têm título da aba no formato `Nome da tela | Banco de Alimentos do Recife`.

| Rota | Tela |
|---|---|
| `/` | Início |
| `/quero-ajudar` | Quero ajudar |
| `/em-breve` | Em breve (telas que ainda não foram desenhadas) |
| `**` | Página não encontrada (precisa ser sempre a última rota) |

As demais rotas (doação, cadastro de entidade e pedir alimento) estão listadas no próprio `app.routes.ts`, separadas por comentários por parte do projeto.

## Ambientes

O endereço da API fica em `src/environments/`:

| Arquivo | Quando é usado | `apiUrl` |
|---|---|---|
| `environment.development.ts` | `ng serve` (desenvolvimento) | `http://localhost:8080` |
| `environment.ts` | `ng build` (produção) | marcador, falta a URL do backend publicado |

Para usar o endereço em um serviço:

```ts
import { environment } from '../../../environments/environment';

private readonly url = `${environment.apiUrl}/api/impacto`;
```

Não coloque senha, token nem chave nesses arquivos: eles vão para o repositório.

## Como o frontend se comunica com o backend

O frontend chama a API usando o `HttpClient` do Angular (configurado com `provideHttpClient()` em `app.config.ts`). Os dados mostrados nas telas vêm das respostas JSON do backend. Se a API estiver desligada, a tela mostra uma mensagem clara em vez de um número falso.

Para o navegador aceitar a resposta, o backend precisa liberar o CORS para `http://localhost:4200`.

> **A definir pelo time:** completar a tabela conforme os endpoints forem integrados.

| Tela | Endpoint usado |
|---|---|
| Início (contador de alimentos movimentados) | `GET /api/impacto` (BDA-19, em andamento) |
| A definir | `GET /api/...` |

## Como contribuir

### Branches

- A `develop` é a branch de integração: todo Pull Request vai para ela. A `main` só recebe o que o time decidir lançar.
- Ninguém dá push direto na `main` nem na `develop`.
- Nome da branch: `bda-<número do card>-<função>`, tudo minúsculo e separado por hífen.
  - Exemplo: `bda-8-tela-doacoes`
- Uma branch por card do Jira. Depois do merge, a branch pode ser apagada. Não criar branch à toa.

### Commits

Sempre em português, no formato `tipo: o que foi feito`:

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat:` | funcionalidade nova | `feat: cria tela de listagem de doações` |
| `fix:` | correção de erro | `fix: corrige o formulário de cadastro` |
| `docs:` | documentação | `docs: atualiza tabela de endpoints` |

Depois dos dois pontos, tudo minúsculo, com o verbo no presente ("cria", "corrige", "atualiza") e a mensagem curta. Um commit por parte do código, para dar para entender o histórico lendo só as mensagens.

### Atualizar o local com o remoto

Sempre puxar as atualizações do remoto **antes de começar a trabalhar** e **antes de abrir o PR**:

```bash
git fetch --all        # baixa as atualizações de todas as branches
git checkout develop
git pull               # atualiza a develop local
git checkout bda-8-tela-doacoes
git merge develop      # traz as novidades da develop pra sua branch
```

Depois do merge, rode `ng build` e `ng test --watch=false`. Se a `develop` trouxe arquivos que mudaram de pasta, o build mostra os imports que precisam de ajuste.

### Pull Request

- A base do PR é a `develop`.
- O título segue o mesmo padrão dos commits. Exemplo: `feat: cria tela de listagem de doações`
- A descrição segue este modelo:

```
## O que foi feito
(explique em poucas linhas)

## Card do Jira
BDA-

## Como testar
(passo a passo curto pra conferir)

## Checklist
- [ ] Atualizei minha branch com a `develop` (`git fetch --all` e `git merge develop`)
- [ ] O projeto roda sem erro
- [ ] Os commits seguem o padrão (`feat:`, `fix:`, `docs:`) em português
- [ ] Atualizei o README, se mudei endpoint ou tela
```

- O PR precisa de aprovação de outra pessoa do time antes do merge. Ninguém aprova o próprio PR.
- No merge, use **Create a merge commit**, para manter os commits separados por parte do código.

## Integrantes

| Nome | Área |
|---|---|
| Allany Dias | Frontend |
| Mayara Marina | Frontend |
| Vinícius Santiago | Frontend |
| Victoria Soares | Backend |
| Luis Gabriel | Backend |
| Filipe Gabriel | Backend |
