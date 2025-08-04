import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) alert('Erro: ' + error.message)
    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login do Professor</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} /><br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </div>
  )
}
