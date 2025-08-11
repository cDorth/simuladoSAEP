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
    <div className="login-wrapper">
      <style>{`
        body {
          background: linear-gradient(135deg, #4a90e2, #2c3e50);
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
        }
        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .login-container {
          width: 100%;
          max-width: 380px;
          background: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          animation: fadeIn 0.5s ease-in-out;
        }
        .login-container h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #333;
          font-weight: 600;
          font-size: 1.8rem;
        }
        .login-container input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          background: #fafafa;
          transition: all 0.2s ease;
        }
        .login-container input:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 6px rgba(74, 144, 226, 0.3);
          outline: none;
        }
        .login-container button {
          width: 100%;
          padding: 12px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .login-container button:hover {
          background: #357ABD;
        }
        .login-container button:disabled {
          background: #a0c4f7;
          cursor: not-allowed;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-container">
        <h2>Login do Professor</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  )
}
