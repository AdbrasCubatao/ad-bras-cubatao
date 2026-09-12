import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import Prayer from './pages/Prayer.jsx'
import Departments from './pages/Departments.jsx'
import DepartmentDetail from './pages/DepartmentDetail.jsx'
import Quiz from './pages/Quiz.jsx'
import Announcements from './pages/Announcements.jsx'
import Agenda from './pages/Agenda.jsx'
import Study from './pages/Study.jsx'
import AdminStudies from './pages/AdminStudies.jsx'
import {
  BiblePage, CultosPage, WorshipPage,
  LocationPage, TithesPage, ContactsPage, MorePage,
} from './pages/StaticPages.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biblia" element={<BiblePage />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/cultos" element={<CultosPage />} />
        <Route path="/avisos" element={<Announcements />} />
        <Route path="/oracao" element={<Prayer />} />
        <Route path="/estudos" element={<Study />} />
        <Route path="/louvores" element={<WorshipPage />} />
        <Route path="/departamentos" element={<Departments />} />
        <Route path="/departamentos/:slug" element={<DepartmentDetail />} />
        <Route path="/localizacao" element={<LocationPage />} />
        <Route path="/dizimos" element={<TithesPage />} />
        <Route path="/contatos" element={<ContactsPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/mais" element={<MorePage />} />

        {/* Rotas de Administração */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/estudos" element={<ProtectedRoute><AdminStudies /></ProtectedRoute>} />
      </Routes>
      {!isAdmin && <BottomNav />}
    </>
  )
}
git commit -m "Atualiza layout da tela de estudos"

