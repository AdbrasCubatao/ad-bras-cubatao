# AD Brás Cubatão — App da Igreja

Web app (React + Vite + Supabase) no estilo do print de referência: início com
acesso rápido, versículo do dia, pedidos de oração públicos, comentários por
departamento, quiz bíblico com ranking e painel administrativo com login.

## Sobre o Quiz Bíblico

- Não há limite de perguntas cadastradas — adicione quantas quiser pelo
  painel admin (aba "Quiz").
- Cada partida sorteia até 10 perguntas aleatórias entre todas as
  cadastradas (ajustável em `QUESTIONS_PER_ROUND`, no topo de
  `src/pages/Quiz.jsx`).
- Ao final, quem quiser pode salvar seu nome e pontuação no ranking
  público (tabela `quiz_scores`). O admin pode apagar pontuações
  individuais ou zerar tudo pela aba "Ranking".

## 1. Rodar localmente

```bash
npm install
cp .env.example .env
# edite o .env com a URL e a chave anon do seu projeto Supabase
npm run dev
```

## 2. Criar o projeto no Supabase

1. Crie um projeto em https://supabase.com
2. Vá em **SQL Editor** → cole todo o conteúdo de `supabase/schema.sql` → Run
3. Vá em **Project Settings → API** e copie:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`
4. Cole essas duas informações no seu `.env`

## 3. Criar o usuário admin (login do painel)

1. No painel do Supabase, vá em **Authentication → Users → Add user**
2. Crie com o e-mail e senha que a liderança vai usar para entrar em `/admin`
3. Pronto — esse login já funciona com a tela `/admin/login` do app

## 4. Trocar o conteúdo placeholder pelo real

- **Logo, foto do pastor, mensagem, versículo, endereço, telefone e redes
  sociais**: pode editar direto pelo painel admin (aba "Configurações"), sem
  precisar mexer em código.
- **Nome/slogan da igreja**: edite `src/lib/churchConfig.js` (usado só como
  valor inicial/reserva, até alguém preencher pelo admin).
- **Departamentos**: edite a lista em `src/lib/departments.js`.

## 5. Subir para o GitHub

```bash
git init
git add .
git commit -m "Primeira versão do app AD Brás Cubatão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git push -u origin main
```

(Crie o repositório vazio no GitHub antes, em github.com/new — sem README,
sem .gitignore, pra não dar conflito com este projeto.)

## 6. Publicar o site (deploy)

Mais simples: [Vercel](https://vercel.com) ou [Netlify](https://netlify.com).

Na Vercel:
1. "Add New Project" → importe o repositório do GitHub
2. Em "Environment Variables", adicione `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_ANON_KEY` (os mesmos do seu `.env`)
3. Deploy — pronto, o app já fica no ar com um link público

Depois disso, quem visitar pelo celular pode "Adicionar à tela de início"
para usar como se fosse um app instalado (é um PWA).

## Estrutura do projeto

```
src/
  components/     -> Header, grid de acesso rápido, navegação, ícones
  pages/          -> cada tela do app (início, oração, quiz, admin, etc.)
  pages/admin/    -> login e painel administrativo
  lib/            -> configuração do Supabase, dados da igreja, hooks
supabase/
  schema.sql      -> script para criar todas as tabelas e permissões
```

## O que falta você me mandar

- Logo em alta resolução
- Foto da fachada da igreja
- Foto do pastor
- Cores oficiais da marca (se tiver um manual de marca)
- Links reais das redes sociais, WhatsApp, endereço e telefone
