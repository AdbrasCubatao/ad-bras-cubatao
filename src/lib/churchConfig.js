import { supabase } from './supabase'

// Configuration de fallback local
export const INITIAL_CHURCH = {
  name: 'AD Brás Cubatão',
  shortName: 'AD Brás',
  nameLine1: 'AD BRÁS',
  nameLine2: 'CUBATÃO',
  tagline: 'Uma Igreja que Ama, Serve e Anuncia Jesus!',
  
  logo: {
    main: '/images/logo.png',
    dark: '/images/logo-dark.png',
    favicon: '/favicon.ico',
  },

  pastors: {
    presidents: {
      names: 'Pr. Edson Carlos da Silva e Missª. Solange da Silva',
      role: 'Pastores Presidentes',
      photo: '/images/pastores-presidentes.png',
      message: 'Que sua vida seja edificada pela Palavra de Deus e pela comunhão com a nossa igreja.',
    },
    senior: {
      names: 'Bispo Samuel Ferreira e Bispa Keila Ferreira',
      role: 'Presidentes da AD Brás / Nação Madureira',
      photo: '/images/bispos.png',
    }
  },

  services: [
    { day: 'Domingo', name: 'Escola Bíblica Dominical (EBD)', time: '09:00', description: 'Estudo aprofundado da Palavra' },
    { day: 'Domingo', name: 'Culto da Família e Celebração', time: '18:00', description: 'Louvor, adoração e pregação' },
    { day: 'Terça-feira', name: 'Culto de Doutrina e Ensino', time: '19:30', description: 'Crescimento espiritual contínuo' },
    { day: 'Quinta-feira', name: 'Culto da Vitória / Libertação', time: '19:30', description: 'Oração e busca pelo Espírito Santo' },
  ],

  verseOfTheDay: {
    text: 'Eu e a minha casa serviremos ao Senhor.',
    reference: 'Josué 24:15',
  },

  social: {
    whatsapp: 'https://wa.me/5513900000000',
    instagram: 'https://instagram.com/adbrascubatao',
    youtube: 'https://youtube.com/@adbrascubatao',
    facebook: 'https://facebook.com/adbrascubatao',
  },

  contacts: {
    phone: '+55 (13) 3361-0000',
    email: 'contato@adbrascubatao.com.br',
    address: {
      street: 'Av. Brasil',
      number: '123',
      neighborhood: 'Jardim Casqueiro',
      city: 'Cubatão',
      state: 'SP',
      zipCode: '11500-000',
      full: 'Av. Brasil, 123 - Jardim Casqueiro, Cubatão - SP',
      googleMapsUrl: 'https://maps.google.com/?q=AD+Bras+Cubatao',
    },
  },

  giving: {
    pix: {
      key: '00.000.000/0001-00',
      type: 'CNPJ',
      merchantName: 'Igreja Evangélica Assembleia de Deus Ministério do Brás',
    },
    bankAccount: {
      bank: 'Banco do Brasil',
      agency: '0000-0',
      account: '00000-0',
      cnpj: '00.000.000/0001-00',
    },
  },
}

/**
 * Carrega as configurações do Supabase se existirem,
 * fazendo fallback automático para as constantes locais.
 */
export async function getChurchSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error || !data) return INITIAL_CHURCH

    return { ...INITIAL_CHURCH, ...data.content }
  } catch {
    return INITIAL_CHURCH
  }
}
