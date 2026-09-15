import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Importações dos componentes
import Home from './pages/Home.jsx'
import Agenda from './pages/Agenda.jsx'
import Study from './pages/Study.jsx'
import Announcements from './pages/Announcements.jsx'
import Biblia from './pages/Biblia.jsx'
import Departments from './pages/Departments.jsx'
import DepartmentDetail from './pages/DepartmentDetail.jsx'
import Dizimos from './pages/Dizimos.jsx'
import Prayer from './pages/Prayer.jsx'
import Quiz from './pages/Quiz.jsx'

// Painel de Administração
import AdminLogin from './pages/admin/AdminLogin.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminAgenda from './pages/admin/AdminAgenda.jsx'
import AdminStudies from './pages/admin/AdminStudies.jsx'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '48px', color: '#ef4444', margin: '0 0 10px 0' }}>404</h1>
      <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>Página Não Encontrada</h2>
      <Link to="/" style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
        Voltar para o Início
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/estudos" element={<Study />} />
        <Route path="/avisos" element={<Announcements />} />
        <Route path="/biblia" element={<Biblia />} />
        <Route path="/departamentos" element={<Departments />} />
        <Route path="/departamentos/:id" element={<DepartmentDetail />} />
        <Route path="/dizimos" element={<Dizimos />} />
        <Route path="/pedidos-oracao" element={<Prayer />} />
        <Route path="/oracao" element={<Prayer />} /> {/* <--- Nova Rota Adicionada */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Rotas Administrativas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/agenda" element={<AdminAgenda />} />
        <Route path="/admin/adminagenda" element={<AdminAgenda />} />
        <Route path="/admin/estudos" element={<AdminStudies />} />

        {/* Rota Coringa - Evita Tela Branca */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
