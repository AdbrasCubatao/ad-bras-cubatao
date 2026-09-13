import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Páginas Públicas
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

// Páginas Administrativas
import AdminLogin from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'

import AdminStudies from './pages/AdminStudies.jsx'

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
        <Route path="/quiz" element={<Quiz />} />

        {/* Rotas Administrativas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        
        <Route path="/admin/estudos" element={<AdminStudies />} />
      </Routes>
    </Router>
  )
}
