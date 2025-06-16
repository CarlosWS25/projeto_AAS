
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowLeft, Heart } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";
import SearchAndFilters from "@/components/SearchAndFilters";
import { useFavorites } from "@/hooks/useFavorites";

// Dados expandidos dos vídeos com categorias
const videosData = [
  {
    id: 1,
    title: "Introdução aos Sistemas Distribuídos",
    description: "Uma visão geral sobre conceitos fundamentais de sistemas distribuídos e suas aplicações modernas.",
    duration: "15:30",
    category: "Fundamentos",
    thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    title: "Arquiteturas de Microserviços",
    description: "Explorando padrões de arquitetura de microserviços e suas vantagens em sistemas modernos.",
    duration: "22:45",
    category: "Arquitetura",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 3,
    title: "Load Balancing e Alta Disponibilidade",
    description: "Técnicas avançadas de balanceamento de carga e estratégias para garantir alta disponibilidade.",
    duration: "18:20",
    category: "Performance",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 4,
    title: "Consistência de Dados Distribuídos",
    description: "Abordagens modernas para manter consistência em bancos de dados distribuídos.",
    duration: "25:10",
    category: "Banco de Dados",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 5,
    title: "Protocolo de Consenso Raft",
    description: "Implementação detalhada e funcionamento do algoritmo de consenso Raft em sistemas distribuídos.",
    duration: "30:15",
    category: "Algoritmos",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 6,
    title: "Docker e Containerização",
    description: "Conceitos avançados de containerização com Docker para deployment de aplicações distribuídas.",
    duration: "20:35",
    category: "DevOps",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 7,
    title: "Kubernetes em Produção",
    description: "Orquestração de containers com Kubernetes para ambientes de produção distribuídos.",
    duration: "28:40",
    category: "DevOps",
    thumbnail: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 8,
    title: "CAP Theorem na Prática",
    description: "Compreendendo o teorema CAP e suas implicações práticas em sistemas distribuídos.",
    duration: "19:25",
    category: "Fundamentos",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

const Catalogo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const categories = useMemo(() => {
    const cats = [...new Set(videosData.map(video => video.category))];
    return cats.sort();
  }, []);

  const filteredVideos = useMemo(() => {
    let filtered = videosData;

    // Filtro por pesquisa
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filtro por favoritos
    if (showFavoritesOnly) {
      filtered = filtered.filter(video => isFavorite(video.id));
    }

    return filtered;
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 border-b-2 border-blue-400 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Video className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-yellow-400">UALFlix - Catálogo</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={showFavoritesOnly 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "text-white border-white hover:bg-white hover:text-blue-800"
              }
            >
              <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favoritos ({favorites.length})
            </Button>
            <Link to="/admin">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-800">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-yellow-400 mb-2">Catálogo de Vídeos</h2>
          <p className="text-blue-100 text-lg">
            Explore nossa coleção de vídeos sobre sistemas distribuídos
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          categories={categories}
          activeFilter={selectedCategory}
        />

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-blue-200">
            Mostrando {filteredVideos.length} de {videosData.length} vídeos
            {searchQuery && ` para "${searchQuery}"`}
            {selectedCategory !== "all" && ` na categoria "${selectedCategory}"`}
            {showFavoritesOnly && " (apenas favoritos)"}
          </p>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={handleVideoSelect}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(video.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-blue-200 mb-2">Nenhum vídeo encontrado</p>
            <p className="text-blue-300">Tente alterar os filtros ou termo de pesquisa</p>
            <Button
              onClick={handleClearFilters}
              className="mt-4 bg-yellow-500 text-blue-900 hover:bg-yellow-400"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12">
          <Card className="bg-blue-800/30 border-blue-400">
            <CardHeader>
              <CardTitle className="text-center text-yellow-400">Estatísticas do Catálogo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{videosData.length}</div>
                  <div className="text-sm text-blue-100">Vídeos Disponíveis</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{categories.length}</div>
                  <div className="text-sm text-blue-100">Categorias</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{favorites.length}</div>
                  <div className="text-sm text-blue-100">Favoritos</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">99%</div>
                  <div className="text-sm text-blue-100">Disponibilidade</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default Catalogo;
