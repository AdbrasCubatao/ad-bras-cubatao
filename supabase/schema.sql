-- Schema do app AD Brás Cubatão
-- Rode este script inteiro no SQL Editor do seu projeto Supabase.

-- ========== PEDIDOS DE ORAÇÃO ==========
create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anônimo',
  message text not null,
  created_at timestamptz not null default now()
);

alter table prayer_requests enable row level security;

-- Qualquer visitante pode ler e criar pedidos (são públicos, como combinado)
create policy "Pedidos são públicos para leitura" on prayer_requests
  for select using (true);
create policy "Qualquer um pode enviar pedido" on prayer_requests
  for insert with check (true);
-- Só usuários autenticados (admin) podem apagar
create policy "Admin pode apagar pedidos" on prayer_requests
  for delete using (auth.role() = 'authenticated');


-- ========== COMENTÁRIOS (por departamento) ==========
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  department_slug text not null,
  name text not null default 'Anônimo',
  text text not null,
  created_at timestamptz not null default now()
);

alter table comments enable row level security;

create policy "Comentários são públicos para leitura" on comments
  for select using (true);
create policy "Qualquer um pode comentar" on comments
  for insert with check (true);
create policy "Admin pode apagar comentários" on comments
  for delete using (auth.role() = 'authenticated');


-- ========== AVISOS ==========
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table announcements enable row level security;

create policy "Avisos são públicos para leitura" on announcements
  for select using (true);
create policy "Admin pode gerenciar avisos" on announcements
  for insert with check (auth.role() = 'authenticated');
create policy "Admin pode apagar avisos" on announcements
  for delete using (auth.role() = 'authenticated');


-- ========== AGENDA / EVENTOS ==========
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  created_at timestamptz not null default now()
);

alter table events enable row level security;

create policy "Eventos são públicos para leitura" on events
  for select using (true);
create policy "Admin pode gerenciar eventos" on events
  for insert with check (auth.role() = 'authenticated');
create policy "Admin pode apagar eventos" on events
  for delete using (auth.role() = 'authenticated');


-- ========== QUIZ BÍBLICO ==========
create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null, -- array de strings, ex: ["Noé", "Abraão", "Moisés", "Davi"]
  correct_index int not null,
  created_at timestamptz not null default now()
);

alter table quiz_questions enable row level security;

create policy "Perguntas são públicas para leitura" on quiz_questions
  for select using (true);
create policy "Admin pode gerenciar perguntas" on quiz_questions
  for insert with check (auth.role() = 'authenticated');
create policy "Admin pode apagar perguntas" on quiz_questions
  for delete using (auth.role() = 'authenticated');


-- ========== PONTUAÇÃO DO QUIZ BÍBLICO (ranking) ==========
create table if not exists quiz_scores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  score int not null,
  total_questions int not null,
  created_at timestamptz not null default now()
);

alter table quiz_scores enable row level security;

create policy "Ranking é público para leitura" on quiz_scores
  for select using (true);
create policy "Qualquer um pode registrar sua pontuação" on quiz_scores
  for insert with check (true);
create policy "Admin pode apagar pontuações" on quiz_scores
  for delete using (auth.role() = 'authenticated');
create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Configurações são públicas para leitura" on site_settings
  for select using (true);
create policy "Admin pode gerenciar configurações" on site_settings
  for insert with check (auth.role() = 'authenticated');
create policy "Admin pode atualizar configurações" on site_settings
  for update using (auth.role() = 'authenticated');
