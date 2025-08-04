import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function FormTurma({ professorId, onTurmaCriada }) {
  const [nome, setNome] = useState('')
  const [disciplina, setDisciplina] = useState('')

  async function criarTurma() {
    const { error } = await supabase.from('turmas').insert({
      nome,
      disciplina,
      professor_id: professorId
    })
    if (!error) {
      setNome('')
      setDisciplina('')
      onTurmaCriada()
    } else {
      alert('Erro ao criar turma.')
    }
  }

  return (
    <div>
      <h3>Criar nova turma</h3>
      <input placeholder="Nome da turma" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Disciplina" value={disciplina} onChange={e => setDisciplina(e.target.value)} />
      <button onClick={criarTurma}>Criar</button>
    </div>
  )
}
