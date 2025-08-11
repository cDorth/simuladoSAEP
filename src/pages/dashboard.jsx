import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

import FormTurma from '../components/formTurma'
import ListaTurmas from '../components/ListaTurmas'

export default function Dashboard() {
  const [turmas, setTurmas] = useState([])
  const [professorId, setProfessorId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadTurmas()
  }, [])

  async function loadTurmas() {
    const { data: { user } } = await supabase.auth.getUser()
    setProfessorId(user.id)
    const { data, error } = await supabase.from('turmas').select('*').eq('professor_id', user.id)
    if (!error) setTurmas(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="dashboard-wrapper">
      <style>{`
        body {
          background: linear-gradient(135deg, #4a90e2, #2c3e50);
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }
        .dashboard-wrapper {
          padding: 40px;
          max-width: 900px;
          margin: auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          margin-top: 40px;
        }
        .dashboard-wrapper h2 {
          margin-bottom: 24px;
          color: #333;
          font-size: 1.8rem;
          font-weight: 600;
        }
        .dashboard-wrapper button {
          padding: 10px 16px;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 20px;
        }
        .dashboard-wrapper button:hover {
          background: #c0392b;
        }
      `}</style>

      <h2>Minhas Turmas</h2>
      <FormTurma professorId={professorId} onTurmaCriada={loadTurmas} />
      <ListaTurmas turmas={turmas} onAtualizar={loadTurmas} />
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
