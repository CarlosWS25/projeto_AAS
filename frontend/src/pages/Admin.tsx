
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Video, ArrowLeft, Plus, Trash2, Upload, FileVideo, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Introdução aos Sistemas Distribuídos",
      description: "Uma visão geral sobre conceitos fundamentais de sistemas distribuídos.",
      duration: "15:30",
      category: "Fundamentos",
      size: "245 MB"
    },
    {
      id: 2,
      title: "Arquiteturas de Microserviços",
      description: "Explorando padrões de arquitetura de microserviços.",
      duration: "22:45",
      category: "Arquitetura",
      size: "312 MB"
    }
  ]);

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    file: null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["Fundamentos", "Arquitetura", "Performance", "Banco de Dados", "Algoritmos", "DevOps"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setNewVideo(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validação de arquivo
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo de vídeo válido (MP4, AVI, MOV, WMV).",
          variant: "destructive",
        });
        return;
      }

      // Validação de tamanho (max 1GB)
      const maxSize = 1024 * 1024 * 1024; // 1GB
      if (file.size > maxSize) {
        toast({
          title: "Erro",
          description: "O arquivo deve ter no máximo 1GB.",
          variant: "destructive",
        });
        return;
      }

      setNewVideo(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            resolve(true);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    
    if (!newVideo.title || !newVideo.description || !newVideo.duration || !newVideo.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simular upload do arquivo
      if (newVideo.file) {
        await simulateUpload();
      }

      const video = {
        id: Date.now(),
        title: newVideo.title,
        description: newVideo.description,
        duration: newVideo.duration,
        category: newVideo.category,
        size: newVideo.file ? formatFileSize(newVideo.file.size) : "N/A"
      };

      setVideos(prev => [...prev, video]);
      setNewVideo({
        title: "",
        description: "",
        duration: "",
        category: "",
        file: null
      });
      setUploadProgress(0);

      toast({
        title: "Sucesso",
        description: "Vídeo adicionado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer upload do vídeo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteVideo = (id) => {
    setVideos(prev => prev.filter(video => video.id !== id));
    toast({
      title: "Vídeo removido",
      description: "O vídeo foi removido do catálogo.",
    });
  };

  const totalSize = videos.reduce((acc, video) => {
    const sizeMatch = video.size.match(/(\d+(?:\.\d+)?)\s*(MB|GB)/);
    if (sizeMatch) {
      const size = parseFloat(sizeMatch[1]);
      const unit = sizeMatch[2];
      return acc + (unit === 'GB' ? size * 1024 : size);
    }
    return acc;
  }, 0);

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
            <h1 className="text-3xl font-bold text-yellow-400">UALFlix - Admin</h1>
          </div>
          <Link to="/catalogo">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-800">
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-yellow-400 mb-2">Painel de Administração</h2>
          <p className="text-blue-100 text-lg">
            Gerencie o conteúdo da plataforma UALFlix
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Video Form */}
          <Card className="bg-blue-800/30 border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Plus className="w-5 h-5" />
                Adicionar Novo Vídeo
              </CardTitle>
              <CardDescription className="text-blue-100">
                Preencha os dados para adicionar um novo vídeo ao catálogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newVideo.title}
                    onChange={handleInputChange}
                    placeholder="Digite o título do vídeo"
                    className="bg-blue-700/50 border-blue-400 text-white placeholder:text-blue-200"
                    required
                    disabled={isUploading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">Descrição *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newVideo.description}
                    onChange={handleInputChange}
                    placeholder="Digite a descrição do vídeo"
                    className="bg-blue-700/50 border-blue-400 text-white placeholder:text-blue-200"
                    required
                    disabled={isUploading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration" className="text-white">Duração *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newVideo.duration}
                      onChange={handleInputChange}
                      placeholder="Ex: 15:30"
                      className="bg-blue-700/50 border-blue-400 text-white placeholder:text-blue-200"
                      required
                      disabled={isUploading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-white">Categoria *</Label>
                    <Select value={newVideo.category} onValueChange={handleCategoryChange} disabled={isUploading}>
                      <SelectTrigger className="bg-blue-700/50 border-blue-400 text-white">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-800 border-blue-400">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="text-white hover:bg-blue-700">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="file" className="text-white">Arquivo do Vídeo</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="bg-blue-700/50 border-blue-400 text-white file:bg-yellow-500 file:text-blue-900 file:border-0 file:rounded file:px-3 file:py-1"
                    disabled={isUploading}
                  />
                  {newVideo.file && (
                    <div className="mt-2 flex items-center gap-2 text-blue-200 text-sm">
                      <FileVideo className="w-4 h-4" />
                      <span>{newVideo.file.name}</span>
                      <span>({formatFileSize(newVideo.file.size)})</span>
                    </div>
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-200">
                      <Upload className="w-4 h-4" />
                      <span>Fazendo upload... {Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Fazendo Upload...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Vídeo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Video List */}
          <Card className="bg-blue-800/30 border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Video className="w-5 h-5" />
                Vídeos no Catálogo ({videos.length})
              </CardTitle>
              <CardDescription className="text-blue-100">
                Lista de todos os vídeos disponíveis na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {videos.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-200">Nenhum vídeo adicionado ainda</p>
                  </div>
                ) : (
                  videos.map((video) => (
                    <div 
                      key={video.id}
                      className="bg-blue-700/50 rounded-lg p-4 flex justify-between items-start hover:bg-blue-700/70 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{video.title}</h3>
                        <p className="text-blue-200 text-sm mb-2">{video.description}</p>
                        <div className="flex gap-4 text-xs text-blue-300">
                          <span>Duração: {video.duration}</span>
                          <span>Categoria: {video.category}</span>
                          <span>Tamanho: {video.size}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/20 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Stats */}
        <div className="mt-8">
          <Card className="bg-blue-800/30 border-blue-400">
            <CardHeader>
              <CardTitle className="text-center text-yellow-400">Estatísticas do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{videos.length}</div>
                  <div className="text-sm text-blue-100">Total de Vídeos</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{totalSize.toFixed(1)} MB</div>
                  <div className="text-sm text-blue-100">Armazenamento Usado</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{categories.length}</div>
                  <div className="text-sm text-blue-100">Categorias</div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">99.9%</div>
                  <div className="text-sm text-blue-100">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
