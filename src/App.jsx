import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import TurmaDetalhe from './pages/turmaDetalhe'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/turma/:id" element={user ? <TurmaDetalhe /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
