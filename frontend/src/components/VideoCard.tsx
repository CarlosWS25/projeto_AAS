
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Heart } from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  videoUrl?: string;
  category?: string;
}

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onToggleFavorite?: (videoId: number) => void;
  isFavorite?: boolean;
}

const VideoCard = ({ video, onPlay, onToggleFavorite, isFavorite = false }: VideoCardProps) => {
  return (
    <Card className="bg-blue-800/50 border-blue-400 hover:bg-blue-800/70 transition-all duration-300 hover:scale-105 group">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative">
          <div 
            className="w-full h-48 bg-gradient-to-br from-blue-700 to-blue-900 rounded-t-lg flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!video.thumbnail && (
              <div className="text-6xl text-blue-400">📹</div>
            )}
            
            {/* Favorite Button */}
            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(video.id);
                }}
                className={`absolute top-2 right-2 w-8 h-8 p-0 ${
                  isFavorite 
                    ? 'text-red-500 hover:text-red-400' 
                    : 'text-white hover:text-red-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={() => onPlay(video)}
                size="lg"
                className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 rounded-full w-16 h-16 p-0"
              >
                <Play className="w-8 h-8" />
              </Button>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>

            {/* Category Badge */}
            {video.category && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-blue-900 px-2 py-1 rounded text-xs font-semibold">
                {video.category}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-blue-200 text-sm mb-4 line-clamp-3">
            {video.description}
          </p>
          
          <Button
            onClick={() => onPlay(video)}
            className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
          >
            <Play className="w-4 h-4 mr-2" />
            Assistir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
