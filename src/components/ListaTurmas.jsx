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
    <div className="lista-turmas">
      <style>{`
        .lista-turmas h3 {
          margin-bottom: 16px;
          color: #333;
        }
        .lista-turmas ul {
          list-style: none;
          padding: 0;
        }
        .lista-turmas li {
          background: #f8f9fa;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .lista-turmas button {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }
        .lista-turmas button:first-of-type {
          background: #4a90e2;
          color: white;
        }
        .lista-turmas button:first-of-type:hover {
          background: #357ABD;
        }
        .lista-turmas button:last-of-type {
          background: #e74c3c;
          color: white;
        }
        .lista-turmas button:last-of-type:hover {
          background: #c0392b;
        }
      `}</style>

      <h3>Turmas Cadastradas</h3>
      {turmas.length === 0 ? (
        <p>Nenhuma turma cadastrada ainda.</p>
      ) : (
        <ul>
          {turmas.map(turma => (
            <li key={turma.id}>
              <span><strong>{turma.nome}</strong> — {turma.disciplina}</span>
              <div>
                <button onClick={() => navigate(`/turma/${turma.id}`)}>Gerenciar</button>
                <button onClick={() => excluirTurma(turma.id)} style={{ marginLeft: 8 }}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
