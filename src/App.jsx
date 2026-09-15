import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Páginas Originais do Seu Projeto
import Home from './pages/Home.jsx'
import Agenda from './pages/Agenda.jsx'
import Biblia from './pages/Biblia.jsx'
import Departments from './pages/Departments.jsx'
import DepartmentDetail from './pages/DepartmentDetail.jsx'
import Dizimos from './pages/Dizimos.jsx'
import Prayer from './pages/Prayer.jsx'
import Quiz from './pages/Quiz.jsx'
import SimplePage from './pages/SimplePage.jsx'
import StaticPages from './pages/StaticPages.jsx'
import Study from './pages/Study.jsx'

// Páginas de Avisos
import Announcements from './pages/Announcements.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/biblia" element={<Biblia />} />
        <Route path="/departamentos" element={<Departments />} />
        <Route path="/departamentos/:id" element={<DepartmentDetail />} />
        <Route path="/dizimos" element={<Dizimos />} />
        <Route path="/pedidos-oracao" element={<Prayer />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/estudos" element={<Study />} />
        <Route path="/pagina/:slug" element={<StaticPages />} />
        
        {/* Rota de Avisos */}
        <Route path="/avisos" element={<Announcements />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
          }
