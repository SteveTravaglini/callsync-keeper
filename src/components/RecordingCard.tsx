
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, MoreVertical, FileText, Trash2 } from 'lucide-react';
import { Recording } from '@/lib/types';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const getMeetingIcon = (type: string) => {
  switch (type) {
    case 'zoom':
      return '📹';
    case 'google-meet':
      return '👥';
    case 'microsoft-teams':
      return '👨‍💼';
    case 'webex':
      return '🌐';
    default:
      return '🎥';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'scheduled':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Scheduled</Badge>;
    case 'recording':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">Recording</Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>;
    case 'failed':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
    default:
      return null;
  }
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

interface RecordingCardProps {
  recording: Recording;
  index: number;
}

const RecordingCard = ({ recording, index }: RecordingCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Recording deleted",
      description: `"${recording.title}" has been removed from your recordings.`,
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/recording/${recording.id}`}>
        <Card className="overflow-hidden card-hover">
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
            {recording.thumbnailUrl ? (
              <img 
                src={recording.thumbnailUrl} 
                alt={recording.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-4xl">
                {getMeetingIcon(recording.meetingType)}
              </div>
            )}
            
            <div className="absolute top-3 left-3 flex items-center space-x-2">
              {getStatusBadge(recording.status)}
            </div>
            
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <MoreVertical size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/transcript/${recording.id}`;
                    }}
                  >
                    <FileText size={14} />
                    <span>View Transcript</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm text-red-600 focus:text-red-600"
                    onClick={handleDelete}
                  >
                    <Trash2 size={14} />
                    <span>Delete Recording</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium text-base mb-2 truncate">{recording.title}</h3>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(recording.date).toLocaleDateString()}</span>
                </div>
                
                {recording.duration > 0 && (
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDuration(recording.duration)}</span>
                  </div>
                )}
              </div>
              
              {recording.transcriptAvailable && (
                <Badge variant="secondary" className="text-xs">
                  Transcript
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default RecordingCard;
