import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, AlertCircle, Info, CheckCircle, User, Calendar, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface NoticeCardProps {
  notice: Notice;
}

const priorityConfig = {
  'Prioridade': {
    icon: AlertCircle,
    color: "bg-red-500/10 text-red-700 border-red-200",
    badge: "bg-red-500/15 text-red-700 hover:bg-red-500/25",
  },
  'Aviso': {
    icon: Info,
    color: "bg-amber-500/10 text-amber-700 border-amber-200",
    badge: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25",
  },
  'Lembrete': {
    icon: Info,
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    badge: "bg-blue-500/15 text-blue-700 hover:bg-blue-500/25",
  },
};

const NoticeCard = ({ notice }: NoticeCardProps) => {
  const config = priorityConfig[notice.priority as keyof typeof priorityConfig] || priorityConfig['Aviso'];
  const Icon = config.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card 
          className={cn(
            "h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]",
            "bg-gradient-to-br from-card to-card/50 border-l-4",
            config.color
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 flex-1">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base leading-tight line-clamp-2">
                    {notice.title}
                  </h3>
                </div>
              </div>
              <Badge variant="outline" className={cn("text-xs", config.badge)}>
                {notice.priority.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {notice.content}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-xs">
                  {notice.category}
                </Badge>
                {notice.author && (
                  <span>Por: {notice.author}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(notice.date)}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground italic">
                Clique para ver detalhes completos
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={cn("text-sm font-semibold", config.badge)}>
                  {notice.priority.toUpperCase()}
                </Badge>
              </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-left leading-tight pr-8">
            {notice.title}
          </DialogTitle>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{notice.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="capitalize">Data de Publicação: {formatFullDate(notice.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {notice.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Conteúdo do Aviso</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                {notice.content}
              </p>
            </div>
          </div>

          {/* Links relacionados */}
          {(notice.tituloLink || notice.tituloLink2 || notice.tituloLink3) && (
            <div className="bg-secondary/30 rounded-lg p-6 border">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Links Relacionados</h3>
              </div>
              <div className="space-y-3">
                {notice.tituloLink && notice.link && (
                  <a
                    href={notice.link.startsWith('http') ? notice.link : `https://${notice.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium">{notice.tituloLink}</span>
                  </a>
                )}
                {notice.tituloLink2 && notice.link2 && (
                  <a
                    href={notice.link2.startsWith('http') ? notice.link2 : `https://${notice.link2}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium">{notice.tituloLink2}</span>
                  </a>
                )}
                {notice.tituloLink3 && notice.link3 && (
                  <a
                    href={notice.link3.startsWith('http') ? notice.link3 : `https://${notice.link3}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-card rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium">{notice.tituloLink3}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeCard;