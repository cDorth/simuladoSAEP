import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Atividades({ turmaId }) {
  const [atividades, setAtividades] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    carregarAtividades()
  }, [])

  async function carregarAtividades() {
    const { data, error } = await supabase
      .from('atividades')
      .select('*')
      .eq('turma_id', turmaId)
      .order('data_entrega', { ascending: true })

    if (!error) setAtividades(data)
    else alert('Erro ao carregar atividades: ' + error.message)
  }

  async function criarAtividade() {
    if (!titulo || !dataEntrega) {
      alert('Preencha pelo menos o título e a data de entrega.')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('atividades').insert({
      titulo,
      descricao,
      data_entrega: dataEntrega,
      turma_id: turmaId
    })

    setLoading(false)

    if (error) {
      alert('Erro ao criar atividade: ' + error.message)
    } else {
      setTitulo('')
      setDescricao('')
      setDataEntrega('')
      carregarAtividades()
    }
  }

  async function excluirAtividade(id) {
    if (!window.confirm('Deseja excluir esta atividade?')) return

    const { error } = await supabase.from('atividades').delete().eq('id', id)
    if (!error) carregarAtividades()
    else alert('Erro ao excluir: ' + error.message)
  }

  return (
    <div className="atividades">
      <style>{`
        .atividades h3 {
          margin-bottom: 16px;
          color: #333;
        }
        .atividades input {
          padding: 10px;
          margin-right: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          background: #fff;
          margin-bottom: 10px;
        }
        .atividades input:focus {
          border-color: #4a90e2;
          outline: none;
        }
        .atividades button {
          padding: 8px 14px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .atividades button:first-of-type {
          background: #4a90e2;
          color: white;
        }
        .atividades button:first-of-type:hover {
          background: #357ABD;
        }
        .atividades button:last-of-type {
          background: #777;
          color: white;
          margin-left: 8px;
        }
        .atividades button:last-of-type:hover {
          background: #555;
        }
        .atividades ul {
          list-style: none;
          padding: 0;
        }
        .atividades li {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .atividades li button {
          background: #e74c3c;
          color: white;
          margin-top: 6px;
        }
        .atividades li button:hover {
          background: #c0392b;
        }
      `}</style>

      <h3>Atividades da Turma</h3>
      <div>
        <input
          placeholder="Título da atividade"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <input
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          type="date"
          value={dataEntrega}
          onChange={e => setDataEntrega(e.target.value)}
        />
        <button onClick={criarAtividade} disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>

      <ul>
        {atividades.length === 0 && <li>Nenhuma atividade cadastrada.</li>}
        {atividades.map(atividade => (
          <li key={atividade.id}>
            <strong>{atividade.titulo}</strong><br />
            {atividade.descricao && <em>{atividade.descricao}</em>}<br />
            Entrega: {atividade.data_entrega}
            <br />
            <button onClick={() => excluirAtividade(atividade.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
