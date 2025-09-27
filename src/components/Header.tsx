import { Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import logoSesi from "@/assets/logo-sesi.png";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <img 
                src={logoSesi} 
                alt="SESI - Conselho Nacional" 
                className="h-10 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Mural de Avisos
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Conselho Nacional SESI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono font-semibold">
                {formatTime(currentTime)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium capitalize">
                {formatDate(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;