import { supabase } from './supabase'

export const DEPARTMENTS = [
  {
    slug: 'ujademc',
    name: 'UJADEMC',
    title: 'União da Juventude da Assembléia de Deus de Cubatão',
    description: 'Departamento de Jovens. Levando a juventude a viver uma vida com propósito e firme na Palavra.',
    leader: 'Liderança de Jovens',
    color: '#2563eb', // Azul
    schedule: 'Sábado às 19:30',
    instagram: 'https://instagram.com/ujademc_oficial',
  },
  {
    slug: 'minidenc',
    name: 'MINIDENC',
    title: 'Ministério Infantil da Assembleia de Deus',
    description: 'Departamento Infantil. Ensinando o caminho em que as crianças devem andar desde os primeiros anos.',
    leader: 'Liderança Infantil',
    color: '#eab308', // Amarelo
    schedule: 'Domingo às 09:00 e 18:00',
    instagram: '',
  },
  {
    slug: 'cibec',
    name: 'CIBEC',
    title: 'Círculo de Oração do Ministério Madureira',
    description: 'Departamento das Mulheres. Mulheres em oração e intercessão constante pelas famílias e pela igreja.',
    leader: 'Liderança Feminina',
    color: '#ec4899', // Rosa
    schedule: 'Quinta-feira às 14:30',
    instagram: '',
  },
  {
    slug: 'univadem',
    name: 'UNIVADEM',
    title: 'União Varões da Assembleia de Deus',
    description: 'Departamento dos Homens. Homens alinhados com o propósito de liderança e serviço cristão.',
    leader: 'Liderança de Homens',
    color: '#1e293b', // Azul Escuro / Grafite
    schedule: '1º Sábado do Mês às 19:00',
    instagram: '',
  },
  {
    slug: 'missoes',
    name: 'SEMADEC / Missões',
    title: 'Secretaria de Missões',
    description: 'Departamento Missionário. Evangelismo local e apoio aos projetos missionários globais.',
    leader: 'Liderança de Missões',
    color: '#16a34a', // Verde
    schedule: '3º Domingo do Mês',
    instagram: '',
  },
  {
    slug: 'diaconal',
    name: 'Corpo Diaconal',
    title: 'Diáconos e Diaconisas',
    description: 'Serviço e organização nos cultos e assistência às famílias da comunidade.',
    leader: 'Liderança Diaconal',
    color: '#475569', // Cinza
    schedule: 'Escala nos cultos',
    instagram: '',
  },
  {
    slug: 'geracao-teen',
    name: 'Geração Teen',
    title: 'União de Adolescentes',
    description: 'Departamento dos Adolescentes. Fortalecendo os valores cristãos na fase de transição para a juventude.',
    leader: 'Liderança de Adolescentes',
    color: '#06b6d4', // Ciano
    schedule: 'Sábado às 17:30',
    instagram: '',
  },
  {
    slug: 'ebd',
    name: 'EBD',
    title: 'Escola Bíblica Dominical',
    description: 'Ensino bíblico sistemático para todas as idades, do infantil aos adultos.',
    leader: 'Superintendência da EBD',
    color: '#8b5cf6', // Roxo
    schedule: 'Domingo às 09:00',
    instagram: '',
  },
]

/**
 * Busca a lista de departamentos atualizada no Supabase.
 * Se não encontrar ou der erro, usa a constante local como fallback.
 */
export async function getDepartments() {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return DEPARTMENTS
    }

    return data
  } catch {
    return DEPARTMENTS
  }
}
