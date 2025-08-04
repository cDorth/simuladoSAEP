import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Atividades({ turmaId }) {
  const [atividades, setAtividades] = useState([])
  const [descricao, setDescricao] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')

  useEffect(() => {
    carregarAtividades()
  }, [])

  async function carregarAtividades() {
    const { data } = await supabase.from('atividades').select('*').eq('turma_id', turmaId)
    setAtividades(data)
  }

  async function criarAtividade() {
    await supabase.from('atividades').insert({
      descricao,
      data_entrega: dataEntrega,
      turma_id: turmaId
    })
    setDescricao('')
    setDataEntrega('')
    carregarAtividades()
  }

  async function excluirAtividade(id) {
    await supabase.from('atividades').delete().eq('id', id)
    carregarAtividades()
  }

  return (
    <div>
      <h3>Atividades</h3>
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <input type="date" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} />
      <button onClick={criarAtividade}>Adicionar</button>
      <ul>
        {atividades.map(atividade => (
          <li key={atividade.id}>
            {atividade.descricao} - Entrega: {atividade.data_entrega}
            <button onClick={() => excluirAtividade(atividade.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
