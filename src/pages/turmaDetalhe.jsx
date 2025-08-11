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
    <div className="turma-detalhe">
      <style>{`
        body {
          background: linear-gradient(135deg, #4a90e2, #2c3e50);
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }
        .turma-detalhe {
          max-width: 900px;
          margin: 40px auto;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .turma-detalhe h2 {
          color: #333;
          margin-bottom: 20px;
        }
      `}</style>

      <h2>{turma.nome} - {turma.disciplina}</h2>
      <Atividades turmaId={id} />
    </div>
  )
}
