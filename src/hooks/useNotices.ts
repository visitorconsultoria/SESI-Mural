import { useState, useEffect } from 'react';
import { Notice } from '@/components/NoticeCard';

export const useNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar avisos da API
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/rest/api/cnsesi/v1/mensagens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:123456'),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const mappedNotices = data.items.map((item: any) => ({
        id: `${item.Z0_FILIAL}-${item.Z0_ASSUNTO}-${Date.now()}`,
        filial: item.Z0_FILIAL,
        tipo: item.Z0_TIPO,
        dataInicio: item.Z0_DTINI,
        dataFim: item.Z0_DTFIM,
        recorrencia: item.Z0_RECOR,
        assunto: item.Z0_ASSUNTO,
        titulo: item.Z0_TITULO,
        mensagem: item.Z0_MSG,
        tituloLink: item.Z0_TITLINK || undefined,
        link: item.Z0_LINK || undefined,
        tituloLink2: item.Z0_TILINK2 || undefined,
        link2: item.Z0_LINK2 || undefined,
        tituloLink3: item.Z0_TILINK3 || undefined,
        link3: item.Z0_LINK3 || undefined,
        // Campos derivados para compatibilidade
        title: item.Z0_TITULO,
        content: item.Z0_MSG,
        priority: item.Z0_TIPO === 'P' ? 'Prioridade' : item.Z0_TIPO === 'A' ? 'Aviso' : 'Lembrete',
        category: item.Z0_ASSUNTO,
        date: item.Z0_DTINI,
        author: 'SESI',
      }));

      setNotices(mappedNotices);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar avisos da API. Verifique a conexão.');
      console.error('Erro ao buscar avisos:', err);
    } finally {
      setLoading(false);
    }
  };


  // Atualizar avisos periodicamente
  useEffect(() => {
    fetchNotices();
    
    const interval = setInterval(fetchNotices, 5 * 60 * 1000); // Atualizar a cada 5 minutos
    
    return () => clearInterval(interval);
  }, []);

  return {
    notices,
    loading,
    error,
    refetch: fetchNotices,
  };
};