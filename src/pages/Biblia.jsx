import React from 'react';

export default function Biblia() {
  const abrirBiblia = () => {
    // 1. Tenta abrir o app de Bíblia do celular (Ex: YouVersion)
    const appUrl = 'youversion://'; 
    // 2. Link de contingência para o navegador (Bíblia Online ARC)
    const webUrl = 'https://www.bibliaonline.com.br/arc';

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = appUrl;

      // Se não abrir o app nativo em 1,5s, vai para o site
      setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, 1500);
    } else {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      textAlign: 'center', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>📖</div>
      <h2 style={{ color: '#0056b3', marginBottom: '8px', fontSize: '24px' }}>Bíblia Sagrada</h2>
      <p style={{ color: '#666', marginBottom: '28px', maxWidth: '320px', lineHeight: '1.4' }}>
        Acesse a Bíblia diretamente no seu aplicativo de preferência ou no navegador.
      </p>
      
      <button
        onClick={abrirBiblia}
        style={{
          backgroundColor: '#0056b3',
          color: '#fff',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 86, 179, 0.3)',
          width: '100%',
          maxWidth: '280px'
        }}
      >
        Abrir Bíblia
      </button>
    </div>
  );
}
