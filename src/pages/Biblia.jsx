import React from 'react';

export default function Biblia() {
  const webUrl = 'https://www.bibliaonline.com.br/arc';
  const youversionUrl = 'https://www.bible.com/pt';

  const abrirBiblia = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Links web da YouVersion (bible.com) disparam automaticamente a intenção
    // de abrir o aplicativo nativo se o usuário já o tiver instalado no celular.
    if (isMobile) {
      window.location.href = youversionUrl;
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
        Acesse a Bíblia diretamente no seu aplicativo ou continue lendo no navegador.
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
          maxWidth: '280px',
          marginBottom: '12px'
        }}
      >
        Abrir Bíblia
      </button>

      <a
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '14px',
          color: '#0056b3',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        Ler no navegador (Bíblia Online)
      </a>
    </div>
  );
}
