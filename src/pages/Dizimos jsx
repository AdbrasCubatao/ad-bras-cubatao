import React, { useState } from 'react';

export default function Dizimos() {
  const [copiado, setCopiado] = useState(false);

  // Chave PIX oficial (CNPJ)
  const chavePix = '50.317.711/0001-62'; 

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <div style={{ 
      padding: '24px 16px', 
      fontFamily: 'sans-serif', 
      maxWidth: '500px', 
      margin: '0 auto',
      textAlign: 'center' 
    }}>
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🙌</div>
      <h2 style={{ color: '#0056b3', marginBottom: '8px', fontSize: '22px' }}>Dízimos e Ofertas</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
        "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." <br />
        <strong style={{ color: '#333' }}>2 Coríntios 9:7</strong>
      </p>

      {/* Card Principal - PIX */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #e9ecef', 
        borderRadius: '16px', 
        padding: '20px', 
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <span style={{ 
          backgroundColor: '#e7f0ff', 
          color: '#0056b3', 
          fontSize: '12px', 
          fontWeight: 'bold', 
          padding: '4px 12px', 
          borderRadius: '20px',
          textTransform: 'uppercase'
        }}>
          Chave PIX (CNPJ)
        </span>

        <p style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#333', 
          margin: '16px 0 12px 0',
          wordBreak: 'break-all'
        }}>
          {chavePix}
        </p>

        <button
          onClick={copiarPix}
          style={{
            backgroundColor: copiado ? '#28a745' : '#0056b3',
            color: '#fff',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          {copiado ? '✓ Chave PIX Copiada!' : '📋 Copiar Chave PIX'}
        </button>
      </div>

      {/* Card Secundário - Dados Bancários */}
      <div style={{ 
        border: '1px solid #eee', 
        borderRadius: '16px', 
        padding: '16px', 
        textAlign: 'left',
        backgroundColor: '#fff'
      }}>
        <h4 style={{ color: '#333', marginTop: 0, marginBottom: '12px', fontSize: '15px' }}>
          Dados da Conta
        </h4>
        <div style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: '4px 0' }}><strong>Favorecido:</strong> AD Brás Cubatão</p>
          <p style={{ margin: '4px 0' }}><strong>Banco:</strong> CORA SCD S.A.</p>
          <p style={{ margin: '4px 0' }}><strong>CNPJ:</strong> 50.317.711/0001-62</p>
        </div>
      </div>
    </div>
  );
}
