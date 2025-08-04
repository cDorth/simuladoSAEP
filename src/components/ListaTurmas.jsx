import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function ListaTurmas({ turmas, onAtualizar }) {
  const navigate = useNavigate()

  async function excluirTurma(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta turma?')) return
    await supabase.from('turmas').delete().eq('id', id)
    onAtualizar()
  }

  return (
    <ul>
      {turmas.map(turma => (
        <li key={turma.id}>
          <strong>{turma.nome}</strong> - {turma.disciplina}
          <button onClick={() => navigate(`/turma/${turma.id}`)}>Detalhes</button>
          <button onClick={() => excluirTurma(turma.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  )
}
