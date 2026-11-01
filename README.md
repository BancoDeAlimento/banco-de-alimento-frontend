# Banco de Alimento - Frontend

Interface web do projeto **Banco de Alimento**, feita com Angular. Projeto final da Residência Porto Digital - SENAC com a Capgemini (3º período).

A API (Java + Spring Boot) fica em outro repositório: [banco-de-alimento-backend](https://github.com/BancoDeAlimento/banco-de-alimento-backend)

## Sobre o projeto

O Banco de Alimento conecta quem tem alimentos para doar com quem precisa receber. A ideia é facilitar o cadastro das doações e o controle do que está disponível, evitando desperdício.

> **A definir pelo time:** nome do projeto

### Funcionalidades

- [ ] A definir (exemplo: tela de listagem de alimentos disponíveis)
- [ ] A definir (exemplo: formulário de cadastro de doação)
- [ ] A definir (exemplo: tela de retirada)

## Integrantes

| Nome | Área |
|---|---|
| Allany Dias | Frontend |
| Mayara Marina | Frontend |
| Vinícius Santiago | Frontend |
| Victoria Soares | Backend |
| Luis Gabriel | Backend |
| Filipe Gabriel | Backend |

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 22 |
| Node.js | 24 (LTS) |
| npm | vem junto com o Node.js |
| TypeScript | instalado com o Angular |

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

## Como o frontend se comunica com o backend

O frontend chama a API em `http://localhost:8080` usando o `HttpClient` do Angular. Os dados mostrados nas telas vêm das respostas JSON do backend.

> **A definir pelo time:** listar aqui os endpoints que o frontend usa, quando existirem.

| Tela | Endpoint usado |
|---|---|
| A definir | `GET /api/...` |

## Como contribuir

### Branches

- A `main` é protegida: ninguém dá push direto nela.
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

Depois dos dois pontos, tudo minúsculo, com o verbo no presente ("cria", "corrige", "atualiza") e a mensagem curta.

### Atualizar o local com o remoto

Sempre puxar as atualizações do remoto **antes de começar a trabalhar** e **antes de abrir o PR**:

```bash
git fetch --all        # baixa as atualizações de todas as branches
git checkout main
git pull               # atualiza a main local
git checkout bda-8-tela-doacoes
git merge main         # traz as novidades da main pra sua branch
```

### Pull Request

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
- [ ] Atualizei minha branch com a `main` (`git fetch --all` e `git merge main`)
- [ ] O projeto roda sem erro
- [ ] Os commits seguem o padrão (`feat:`, `fix:`, `docs:`) em português
- [ ] Atualizei o README, se mudei endpoint ou tela
```

- O PR precisa de aprovação antes do merge.
