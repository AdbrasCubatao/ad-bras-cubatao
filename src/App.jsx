import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import ManageAgenda from './pages/admin/ManageAgenda.jsx'
import ManageStudies from './pages/admin/ManageStudies.jsx'
import { 
  StudiesPage, 
  BiblePage, 
  CultosPage, 
  WorshipPage, 
  LocationPage, 
  TithesPage, 
  ContactsPage, 
  MorePage 
} from './pages/StaticPages.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '70px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudos" element={<StudiesPage />} />
        <Route path="/biblia" element={<BiblePage />} />
        <Route path="/cultos" element={<CultosPage />} />
        <Route path="/louvores" element={<WorshipPage />} />
        <Route path="/localizacao" element={<LocationPage />} />
        <Route path="/dizimos" element={<TithesPage />} />
        <Route path="/contatos" element={<ContactsPage />} />
        <Route path="/mais" element={<MorePage />} />

        {/* Rotas Administrativas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/agenda" element={<ManageAgenda />} />
        <Route path="/admin/estudos" element={<ManageStudies />} />
      </Routes>

      <Navbar />
    </div>
  )
}
