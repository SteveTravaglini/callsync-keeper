
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
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
      return <Badge variant="warning" className="font-normal">Scheduled</Badge>;
    case 'recording':
      return <Badge variant="info" className="font-normal animate-pulse">Recording</Badge>;
    case 'processing':
      return <Badge variant="info" className="font-normal">Processing</Badge>;
    case 'completed':
      return <Badge variant="success" className="font-normal">Completed</Badge>;
    case 'failed':
      return <Badge variant="destructive" className="font-normal">Failed</Badge>;
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <Link to={`/recording/${recording.id}`}>
        <Card className="overflow-hidden border-border/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="aspect-video bg-muted relative">
            {recording.thumbnailUrl ? (
              <img 
                src={recording.thumbnailUrl} 
                alt={recording.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-4xl bg-gradient-to-b from-muted to-muted/60">
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
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    <MoreVertical size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm rounded-lg"
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
                    className="cursor-pointer flex items-center gap-2 text-sm text-destructive focus:text-destructive rounded-lg"
                    onClick={handleDelete}
                  >
                    <Trash2 size={14} />
                    <span>Delete Recording</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-base mb-2 truncate">{recording.title}</h3>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  <span>{new Date(recording.date).toLocaleDateString()}</span>
                </div>
                
                {recording.duration > 0 && (
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{formatDuration(recording.duration)}</span>
                  </div>
                )}
              </div>
              
              {recording.transcriptAvailable && (
                <Badge variant="secondary" className="text-xs font-normal">
                  Transcript
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default RecordingCard;
