import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Página não encontrada
        </p>
        <p className="mb-8 text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Voltar ao Mural
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
