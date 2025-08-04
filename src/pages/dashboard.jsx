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
    <div style={{ padding: 40 }}>
      <h2>Minhas Turmas</h2>
      <FormTurma professorId={professorId} onTurmaCriada={loadTurmas} />
      <ListaTurmas turmas={turmas} onAtualizar={loadTurmas} />
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
