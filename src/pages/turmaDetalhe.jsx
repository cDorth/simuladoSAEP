import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

import Atividades from '../components/Atividades'

export default function TurmaDetalhe() {
  const { id } = useParams()
  const [turma, setTurma] = useState(null)

  useEffect(() => {
    async function fetchTurma() {
      const { data } = await supabase.from('turmas').select('*').eq('id', id).single()
      setTurma(data)
    }
    fetchTurma()
  }, [id])

  if (!turma) return <p>Carregando turma...</p>

  return (
    <div style={{ padding: 40 }}>
      <h2>{turma.nome} - {turma.disciplina}</h2>
      <Atividades turmaId={id} />
    </div>
  )
}
