import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function ListaTurmas({ turmas, onAtualizar }) {
  const navigate = useNavigate()

  async function excluirTurma(id) {
    if (!window.confirm('Deseja excluir esta turma?')) return
    const { error } = await supabase.from('turmas').delete().eq('id', id)
    if (!error) onAtualizar()
    else alert('Erro ao excluir turma: ' + error.message)
  }

  return (
    <div>
      <h3>Turmas Cadastradas</h3>
      {turmas.length === 0 ? (
        <p>Nenhuma turma cadastrada ainda.</p>
      ) : (
        <ul>
          {turmas.map(turma => (
            <li key={turma.id}>
              <strong>{turma.nome}</strong> — {turma.disciplina}
              <button onClick={() => navigate(`/turma/${turma.id}`)}>Gerenciar</button>
              <button onClick={() => excluirTurma(turma.id)} style={{ marginLeft: 10 }}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
