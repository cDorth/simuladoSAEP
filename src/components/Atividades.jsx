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
    <div style={{ marginTop: 30 }}>
      <h3>Atividades da Turma</h3>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Título da atividade"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="date"
          value={dataEntrega}
          onChange={e => setDataEntrega(e.target.value)}
        />
        <button onClick={criarAtividade} disabled={loading} style={{ marginLeft: 10 }}>
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {atividades.length === 0 && <li>Nenhuma atividade cadastrada.</li>}
        {atividades.map(atividade => (
          <li key={atividade.id} style={{ marginBottom: 10 }}>
            <strong>{atividade.titulo}</strong><br />
            {atividade.descricao && <em>{atividade.descricao}</em>}<br />
            Entrega: {atividade.data_entrega}
            <br />
            <button
              onClick={() => excluirAtividade(atividade.id)}
              style={{ marginTop: 5, color: 'red' }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
