import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Database, BookOpen, HelpCircle } from "lucide-react";

const quickAccessLinks = [
  {
    title: "Meu RH",
    description: "Portal de Recursos Humanos",
    url: "http://portal_rh.sesi.cn:9000",
    icon: Users,
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "Base de Conhecimento",
    description: "Documentação e Tutoriais",
    url: "https://visitorconsultoria.tomticket.com/kb/",
    icon: BookOpen,
    color: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
];

const QuickAccess = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-xl border border-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
          Acessos Rápidos
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Acesse rapidamente os principais sistemas e portais
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-3">
          {quickAccessLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.title}
                variant="outline"
                className={`h-auto p-4 flex items-center gap-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${link.color} border-2 group relative overflow-hidden`}
                onClick={() => handleLinkClick(link.url)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4 relative z-10 w-full">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-base mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {link.title}
                    </div>
                    <div className="text-sm opacity-90 leading-tight group-hover:opacity-100 transition-opacity duration-300">
                      {link.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;