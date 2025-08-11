import { useState, useEffect } from 'react';
import './App.css';

// 1. Definindo a "forma" dos nossos dados com TypeScript
// Isso nos ajuda a evitar erros, garantindo que cada conversa tenha os campos certos.
type Conversation = {
  id: number;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  tags: string[];
  status: string;
};

function App() {
  // 2. Criando nossos três estados principais
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
      // O nosso "detetive" para depuração
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/conversations`;
      console.log("Estou tentando buscar dados da seguinte URL:", apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConversations(data);
      } catch (e) {
        if (e instanceof Error) {
            // O erro que você está vendo provavelmente vai cair aqui.
            setError(e.message);
            console.error("Erro completo ao buscar dados:", e);
        }
      } finally {
        // Aconteça o que acontecer (sucesso ou erro), paramos de carregar.
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez

  // 3. Renderização condicional baseada no estado
  if (loading) {
    return <div>Carregando conversas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>Caixa de Entrada</h1>
      </header>
      <main>
        <ul>
          {conversations.map((convo) => (
            <li key={convo.id}>
              <strong>{convo.contactName}</strong>: {convo.lastMessage}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;