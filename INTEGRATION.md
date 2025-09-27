# Integração com ERP Protheus

Este documento explica como integrar o Mural de Avisos com a API do ERP Protheus.

## Configuração da API

### 1. Endpoint da API Protheus

Para integrar com o Protheus, você precisará configurar o endpoint da API no arquivo `src/hooks/useNotices.ts`:

```typescript
const fetchNotices = async () => {
  setLoading(true);
  try {
    // Substitua pela URL real da API Protheus
    const response = await fetch('http://SEU_SERVIDOR_PROTHEUS:PORTA/rest/notices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer SEU_TOKEN_AQUI'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    
    const data = await response.json();
    setNotices(data.notices || []);
    setError(null);
  } catch (err) {
    setError('Erro ao carregar avisos. Tentando novamente...');
    console.error('Erro ao buscar avisos:', err);
  } finally {
    setLoading(false);
  }
};
```

### 2. Formato dos Dados Esperados

A API deve retornar os dados no seguinte formato:

```json
{
  "notices": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "priority": "low|medium|high|urgent",
      "category": "string",
      "date": "ISO 8601 date string",
      "author": "string (opcional)",
      "read": "boolean (opcional)"
    }
  ]
}
```

### 3. Configurações do Servidor

#### Para Servidor Local (Rede Interna SESI):
- Configure CORS no servidor Protheus para permitir requisições do mural
- Certifique-se de que a porta está aberta no firewall
- Use HTTP se estiver em rede interna segura

#### Para Produção:
- Configure HTTPS
- Implemente autenticação adequada
- Configure rate limiting
- Monitore logs de acesso

## Estrutura da Integração

### Arquivos Principais:
- `src/hooks/useNotices.ts` - Hook para buscar dados da API
- `src/components/NoticeBoard.tsx` - Componente principal do mural
- `src/components/NoticeCard.tsx` - Card individual de aviso

### Funcionalidades Implementadas:
- ✅ Busca automática de avisos a cada 5 minutos
- ✅ Filtros por prioridade, categoria e busca textual
- ✅ Marcação de avisos como lidos
- ✅ Atualização manual via botão
- ✅ Tratamento de erros de conectividade
- ✅ Interface responsiva

## Exemplo de Endpoint Protheus

### TLPP (AdvPL) - Exemplo de WebService REST:

```advpl
#Include "TOTVS.ch"
#Include "RestFul.ch"

WSRESTFUL notices DESCRIPTION "Mural de Avisos SESI"

WSDATA page AS INTEGER OPTIONAL
WSDATA limit AS INTEGER OPTIONAL

WSMETHOD GET DESCRIPTION "Lista avisos" WSSYNTAX "/notices"

END WSRESTFUL

WSMETHOD GET WSRECEIVE page, limit WSSERVICE notices
    Local cJson := ""
    Local aNotices := {}
    Local nI := 0
    
    // Buscar avisos no banco de dados
    aNotices := GetNoticesFromDB()
    
    // Converter para JSON
    cJson := '{'
    cJson += '"notices": ['
    
    For nI := 1 To Len(aNotices)
        If nI > 1
            cJson += ','
        EndIf
        cJson += '{'
        cJson += '"id": "' + aNotices[nI][1] + '",'
        cJson += '"title": "' + aNotices[nI][2] + '",'
        cJson += '"content": "' + aNotices[nI][3] + '",'
        cJson += '"priority": "' + aNotices[nI][4] + '",'
        cJson += '"category": "' + aNotices[nI][5] + '",'
        cJson += '"date": "' + aNotices[nI][6] + '",'
        cJson += '"author": "' + aNotices[nI][7] + '"'
        cJson += '}'
    Next nI
    
    cJson += ']'
    cJson += '}'
    
    Self:SetContentType("application/json")
    Self:SetResponse(cJson)
    
Return .T.
```

## Deployment

### Servidor Local:
1. Build do projeto: `npm run build`
2. Servir arquivos estáticos via nginx/apache
3. Configurar proxy reverso se necessário

### Exemplo nginx.conf:
```nginx
server {
    listen 80;
    server_name mural.sesi.local;
    
    location / {
        root /var/www/mural-sesi/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://protheus-server:8099/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Monitoramento

Para monitorar o funcionamento:
- Verifique logs do navegador (F12 > Console)
- Monitor logs do servidor Protheus
- Configure alertas para falhas de conectividade

## Suporte

Para dúvidas sobre integração, contate:
- Equipe TI SESI: ti@sesi.org.br
- Documentação Protheus: [Link para docs internos]