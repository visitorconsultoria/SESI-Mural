import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search, Filter, Megaphone, Loader2 } from "lucide-react";
import { useNotices } from '@/hooks/useNotices';
import NoticeCard, { Notice } from './NoticeCard';
import { toast } from '@/hooks/use-toast';

const NoticeBoard = () => {
  const { notices, loading, error, refetch } = useNotices();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filtrar avisos
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  // Obter categorias únicas
  const categories = [...new Set(notices.map(notice => notice.category))];


  const handleRefresh = () => {
    refetch();
    toast({
      title: "Avisos atualizados",
      description: "Os avisos foram atualizados com sucesso.",
    });
  };

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/20">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{error}</p>
          <Button onClick={handleRefresh} className="mx-auto mt-4 block">
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Megaphone className="w-6 h-6 text-primary" />
            Avisos e Comunicados
            <Badge variant="secondary" className="ml-2">
              {filteredNotices.length}
            </Badge>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Atualizar
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar avisos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[130px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Prioridade">Prioridade</SelectItem>
                <SelectItem value="Aviso">Aviso</SelectItem>
                <SelectItem value="Lembrete">Lembrete</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading && notices.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
            <span>Carregando avisos...</span>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum aviso encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;