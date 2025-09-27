export interface Notice {
  id: string;
  filial: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
  recorrencia: string;
  assunto: string;
  titulo: string;
  mensagem: string;
  tituloLink?: string;
  link?: string;
  tituloLink2?: string;
  link2?: string;
  tituloLink3?: string;
  link3?: string;
  // Campos derivados para compatibilidade
  title: string;
  content: string;
  priority: string;
  category: string;
  date: string;
  author: string;
}