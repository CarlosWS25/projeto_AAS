
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Upload, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 border-b-2 border-blue-400 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Video className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-yellow-400">UALFlix</h1>
          </div>
          <nav className="flex gap-4">
            <Link to="/catalogo">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-800">
                <Play className="w-4 h-4 mr-2" />
                Catálogo
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-800">
                <Upload className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-yellow-400">
            Sistema de Streaming Distribuído
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bem-vindo ao UALFlix - Sua plataforma de streaming distribuída
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-blue-800/50 border-blue-400 hover:bg-blue-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-yellow-400">
                <Play className="w-6 h-6" />
                Catálogo de Vídeos
              </CardTitle>
              <CardDescription className="text-blue-100">
                Navegue pela nossa coleção de vídeos organizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Acesse todos os vídeos disponíveis com informações detalhadas, incluindo título, descrição e duração.
              </p>
              <Link to="/catalogo">
                <Button className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400">
                  Ver Catálogo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-blue-800/50 border-blue-400 hover:bg-blue-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-yellow-400">
                <Upload className="w-6 h-6" />
                Painel de Administração
              </CardTitle>
              <CardDescription className="text-blue-100">
                Gerencie o conteúdo da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Adicione novos vídeos à plataforma ou remova conteúdo existente através do painel administrativo.
              </p>
              <Link to="/admin">
                <Button className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400">
                  Acessar Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Status Section */}
        <div className="mt-16">
          <Card className="bg-blue-800/30 border-blue-400">
            <CardHeader>
              <CardTitle className="text-center text-yellow-400">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">3</div>
                  <div className="text-sm text-blue-100">Nós Ativos</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">127</div>
                  <div className="text-sm text-blue-100">Streams Ativas</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">89%</div>
                  <div className="text-sm text-blue-100">Load Balancing</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">45ms</div>
                  <div className="text-sm text-blue-100">Latência Média</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 border-t-2 border-blue-400 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-blue-100">&copy; 2024 UALFlix - Sistema de Streaming Distribuído</p>
          <p className="text-blue-200 text-sm mt-2">Projeto de Sistemas Distribuídos</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
