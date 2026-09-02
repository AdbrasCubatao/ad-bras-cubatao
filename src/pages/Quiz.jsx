import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import PageHeader from '../components/PageHeader.jsx'

// Perguntas de fallback, usadas se a tabela `quiz_questions` estiver vazia
// ou o Supabase ainda não estiver configurado.
const FALLBACK_QUESTIONS = [
  {
    id: 'f1',
    question: 'Quem construiu a arca por ordem de Deus?',
    options: ['Abraão', 'Noé', 'Moisés', 'Davi'],
    correct_index: 1,
  },
  {
    id: 'f2',
    question: 'Quantos discípulos Jesus escolheu?',
    options: ['10', '12', '7', '14'],
    correct_index: 1,
  },
  {
    id: 'f3',
    question: 'Em que cidade Jesus nasceu?',
    options: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'],
    correct_index: 2,
  },
]

// Quantas perguntas entram em cada partida (sorteadas entre todas cadastradas).
const QUESTIONS_PER_ROUND = 10

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const [leaderboard, setLeaderboard] = useState([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)
  const [playerName, setPlayerName] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  async function loadLeaderboard() {
    setLeaderboardLoading(true)
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('*')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10)
    if (!error) setLeaderboard(data ?? [])
    setLeaderboardLoading(false)
  }

  async function startRound() {
    setLoading(true)
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('created_at', { ascending: true })
    const pool = !error && data && data.length > 0 ? data : FALLBACK_QUESTIONS
    setQuestions(shuffle(pool).slice(0, QUESTIONS_PER_ROUND))
    setLoading(false)
  }

  useEffect(() => {
    startRound()
    loadLeaderboard()
  }, [])

  function handleAnswer(index) {
    if (selected !== null) return
    setSelected(index)
    if (index === questions[step].correct_index) setScore((s) => s + 1)
  }

  function next() {
    if (step + 1 < questions.length) {
      setStep((s) => s + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setStep(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setSaved(false)
    setPlayerName('')
    startRound()
  }

  async function saveScore(e) {
    e.preventDefault()
    if (!playerName.trim()) return
    setSaving(true)
    const { error } = await supabase.from('quiz_scores').insert({
      name: playerName.trim(),
      score,
      total_questions: questions.length,
    })
    setSaving(false)
    if (!error) {
      setSaved(true)
      loadLeaderboard()
    }
  }

  if (loading) {
    return (
      <div className="page">
        <PageHeader title="Quiz Bíblico" />
        <p className="empty-state">Carregando perguntas...</p>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="page">
        <PageHeader title="Quiz Bíblico" />
        <div className="card" style={{ textAlign: 'center' }}>
          <p className="pill">Resultado</p>
          <p className="page-title" style={{ fontSize: 20, margin: '6px 0' }}>
            Você acertou {score} de {questions.length}
          </p>

          {!saved ? (
            <form onSubmit={saveScore} style={{ textAlign: 'left' }}>
              <label htmlFor="playerName">Quer entrar no ranking? Digite seu nome</label>
              <input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Seu nome"
              />
              <button className="btn-primary btn-gold" type="submit" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar pontuação'}
              </button>
            </form>
          ) : (
            <p className="success-text">Pontuação salva no ranking! 🏆</p>
          )}

          <button className="btn-primary" onClick={restart} style={{ marginTop: 10 }}>
            Jogar novamente
          </button>
        </div>

        <Leaderboard loading={leaderboardLoading} items={leaderboard} />
      </div>
    )
  }

  const q = questions[step]

  return (
    <div className="page">
      <PageHeader title="Quiz Bíblico" subtitle={`Pergunta ${step + 1} de ${questions.length}`} />
      <div className="card">
        <p className="comment-name" style={{ fontSize: 15, marginBottom: 14 }}>{q.question}</p>
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (selected !== null) {
            if (i === q.correct_index) cls += ' correct'
            else if (i === selected) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)}>
              {opt}
            </button>
          )
        })}
        {selected !== null && (
          <button className="btn-primary" onClick={next}>
            {step + 1 < questions.length ? 'Próxima pergunta' : 'Ver resultado'}
          </button>
        )}
      </div>

      <Leaderboard loading={leaderboardLoading} items={leaderboard} />
    </div>
  )
}

function Leaderboard({ loading, items }) {
  return (
    <>
      <h3 className="section-heading" style={{ padding: 0, margin: '26px 0 12px' }}>
        Ranking
      </h3>
      {loading && <p className="empty-state">Carregando ranking...</p>}
      {!loading && items.length === 0 && (
        <p className="empty-state">Ninguém pontuou ainda. Jogue e seja o primeiro!</p>
      )}
      {items.length > 0 && (
        <div className="card">
          {items.map((r, i) => (
            <div key={r.id} className="comment-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="comment-name">{i + 1}. {r.name}</span>
              <span className="pill" style={{ margin: 0 }}>{r.score}/{r.total_questions}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
