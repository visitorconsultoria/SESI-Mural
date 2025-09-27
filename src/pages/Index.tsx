import Header from "@/components/Header";
import NoticeBoard from "@/components/NoticeBoard";
import QuickAccess from "@/components/QuickAccess";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Mural de Avisos - Ocupa 3 colunas */}
          <div className="xl:col-span-3">
            <NoticeBoard />
          </div>
          
          {/* Acessos Rápidos - Ocupa 1 coluna */}
          <div className="xl:col-span-1">
            <QuickAccess />
          </div>
        </div>
      </main>
      
      <footer className="bg-primary/5 border-t py-6 mt-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 Conselho Nacional SESI - Mural de Avisos Corporativo
          </p>
          <p className="text-xs mt-1">
            Sistema integrado com ERP Protheus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
