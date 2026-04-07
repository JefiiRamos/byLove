"use client";

import { useEffect, useState } from "react";

const ALLOWED_USERNAME = "nicole matoso marques";
const ALLOWED_PASSWORD = "030426";
const RELATIONSHIP_START_DATE = new Date("2024-02-14T00:00:00");

const surprises = [
  "Voce e a resposta mais linda que a vida me deu.",
  "Te amar e a melhor parte de todos os meus planos.",
  "Se eu tivesse que te escolher em todas as vidas, escolheria de olhos fechados.",
  "Nosso amor transforma qualquer dia comum em dia inesquecivel."
];

const reasons = [
  "Seu sorriso ilumina qualquer dia meu.",
  "Com voce, tudo fica mais leve e verdadeiro.",
  "Seu jeito me faz querer ser melhor todos os dias."
];

const commonThings = [
  "Rir ate doer a barriga",
  "Sonhar alto e juntos",
  "Filmes e series abracados",
  "Comida boa e conversa infinita",
  "Transformar momentos simples em memorias"
];

function normalizeName(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCounterText() {
  const now = new Date();
  const diffMs = now - RELATIONSHIP_START_DATE;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  return `${days} dias, ${hours} horas e ${minutes} minutos`;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [gateMessage, setGateMessage] = useState("");
  const [gateMessageType, setGateMessageType] = useState("");
  const [counter, setCounter] = useState(getCounterText());
  const [surpriseText, setSurpriseText] = useState("");
  const [reasonText, setReasonText] = useState("Clique em um motivo.");

  useEffect(() => {
    if (!isAuthorized) return undefined;
    const timer = setInterval(() => {
      setCounter(getCounterText());
    }, 60000);
    return () => clearInterval(timer);
  }, [isAuthorized]);

  function handleSubmit(event) {
    event.preventDefault();
    const typedUsername = normalizeName(username);
    const typedPassword = password.trim();

    if (typedUsername === ALLOWED_USERNAME && typedPassword === ALLOWED_PASSWORD) {
      setGateMessage(
        "Acesso liberado. Bem-vinda ao coracao do Jeferson."
      );
      setGateMessageType("success");
      setTimeout(() => {
        setIsAuthorized(true);
        setCounter(getCounterText());
      }, 1500);
      return;
    }
    setGateMessage("Credenciais invalidas. Este portal e secreto.");
    setGateMessageType("error");
  }

  function handleSurprise() {
    const randomMessage = surprises[Math.floor(Math.random() * surprises.length)];
    setSurpriseText(randomMessage);
  }

  return (
    <>
      <div className={`bg-hearts ${isAuthorized ? "" : "hidden"}`} aria-hidden="true" />
      <main className={`app ${isAuthorized ? "is-auth" : "is-login"}`}>
        {!isAuthorized ? (
          <section className="panel panel-gate panel-login active" aria-live="polite">
            <div className="glass login-card">
              <p className="login-badge">ACESSO RESTRITO</p>
              <h1>Portal secreto</h1>
              <p className="description">
                Apenas uma pessoa no mundo possui estas credenciais.
              </p>
              <form className="gate-form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="sr-only">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Usuario (nome completo)"
                  autoComplete="name"
                  required
                />
                <label htmlFor="password" className="sr-only">
                  Senha numerica
                </label>
                <input
                  id="password"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Senha numerica"
                  autoComplete="off"
                  required
                />
                <button type="submit">Entrar</button>
              </form>
              <p className={`message ${gateMessageType}`} role="status">
                {gateMessage}
              </p>
            </div>
          </section>
        ) : (
          <section className="panel panel-landing active" aria-hidden="false">
            <header className="hero glass">
              <p className="tag">Para Nicole Matoso Marques</p>
              <h2>Bem-vinda ao nosso universo</h2>
              <p className="hero-text">
                Entre milhoes de pessoas, voce virou meu lugar favorito no mundo.
                Este site existe para lembrar, todos os dias, do quanto eu te amo.
              </p>
              <button className="cta" onClick={handleSurprise}>
                Clique para uma surpresa
              </button>
              <p className="surprise" aria-live="polite">
                {surpriseText}
              </p>
            </header>

            <section className="grid">
              <article className="card glass">
                <h3>Nosso contador de amor</h3>
                <p>Estamos juntos ha:</p>
                <p className="counter">{counter}</p>
                <small>* Voce pode ajustar a data em `RELATIONSHIP_START_DATE`.</small>
              </article>

              <article className="card glass">
                <h3>Coisas que temos em comum</h3>
                <ul className="list">
                  {commonThings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card glass">
                <h3>3 motivos infinitos</h3>
                <div className="reasons">
                  {reasons.map((reason, index) => (
                    <button
                      key={reason}
                      className="reason-btn"
                      onClick={() => setReasonText(reason)}
                    >
                      Motivo {index + 1}
                    </button>
                  ))}
                </div>
                <p className="reason-text">{reasonText}</p>
              </article>
            </section>
          </section>
        )}
      </main>
    </>
  );
}
