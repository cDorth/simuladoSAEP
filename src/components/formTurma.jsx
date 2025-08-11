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
    <div className="form-turma">
      <style>{`
        .form-turma {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .form-turma h3 {
          margin-bottom: 16px;
          color: #333;
        }
        .form-turma input {
          padding: 10px;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          background: #fff;
          transition: border-color 0.2s ease;
        }
        .form-turma input:focus {
          border-color: #4a90e2;
          outline: none;
        }
        .form-turma button {
          padding: 10px 16px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .form-turma button:hover {
          background: #357ABD;
        }
      `}</style>

      <h3>Criar nova turma</h3>
      <input placeholder="Nome da turma" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Disciplina" value={disciplina} onChange={e => setDisciplina(e.target.value)} />
      <button onClick={criarTurma}>Criar</button>
    </div>
  )
}
