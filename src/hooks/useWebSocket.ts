import { useEffect, useRef, useState } from 'react';
import { TranslationDocument } from '../types/document';

export function useWebSocket(url: string) {
  const [documents, setDocuments] = useState<TranslationDocument[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log(`Tentando conectar ao WebSocket em: ${url}`); // Verifique se a URL está correta
    socketRef.current = new WebSocket(url);

    // Eventos de conexão
    socketRef.current.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      setIsConnected(true);
    };

    socketRef.current.onclose = () => {
      setDocuments([])
      console.log('Desconectado do servidor WebSocket');
      setIsConnected(false);
    };

    socketRef.current.onerror = (error) => {
      setDocuments([])
      console.error('Erro WebSocket:', error);
    };

    console.log( socketRef.current)


    // Eventos de recebimento de mensagens
    socketRef.current.onmessage = (event) => {
      console.log(event);
      console.log("Mensagem passou aqui");

      console.log(event.data);

      console.log('Mensagem recebida:', event.data); // Verifique o que está sendo recebido

      try {
        // Assumimos que event.data seja um JSON com a lista de documentos
        const documentsList = JSON.parse(event.data);
        console.log(documentsList);

        if (Array.isArray(documentsList)) {
          // Se for uma lista de documentos, atualizamos o estado
          setDocuments(documentsList);
        } else {
          console.error('Esperado uma lista de documentos, mas recebeu:', documentsList);
        }

      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    };

    // Cleanup ao desmontar o componente
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log('WebSocket fechado');
      }
    };
  }, [url]);

  return { documents, isConnected };
}
