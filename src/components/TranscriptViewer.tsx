
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Transcript, TranscriptSegment } from '@/lib/types';
import { 
  Search, 
  Download, 
  Copy, 
  PlayCircle, 
  PauseCircle,
  User,
  UserCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const formatTimestamp = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface TranscriptViewerProps {
  transcript: Transcript;
}

const TranscriptViewer = ({ transcript }: TranscriptViewerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const segmentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  
  const filteredSegments = transcript.segments.filter(segment => 
    segment.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.5;
          
          // Find which segment corresponds to this time
          const currentSegment = transcript.segments.find(
            segment => newTime >= segment.startTime && newTime <= segment.endTime
          );
          
          if (currentSegment) {
            setActiveSegmentId(currentSegment.id);
            
            // Scroll to the active segment
            const segmentElement = segmentRefs.current.get(currentSegment.id);
            if (segmentElement) {
              segmentElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              });
            }
          }
          
          return newTime;
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, transcript.segments]);
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const jumpToSegment = (segment: TranscriptSegment) => {
    setCurrentTime(segment.startTime);
    setActiveSegmentId(segment.id);
    setIsPlaying(true);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript.fullText);
    toast({
      title: "Copied to clipboard",
      description: "The full transcript has been copied to your clipboard.",
    });
  };
  
  const downloadTranscript = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript.fullText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `transcript-${transcript.recordingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Transcript has been downloaded as a text file.",
    });
  };
  
  const getSpeakerColor = (speaker: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800',
      'bg-amber-100 text-amber-800',
      'bg-pink-100 text-pink-800',
    ];
    
    const speakerIndex = transcript.speakers.indexOf(speaker);
    return colors[speakerIndex % colors.length];
  };
  
  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search transcript..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={togglePlayback}>
              {isPlaying ? <PauseCircle className="mr-1 h-4 w-4" /> : <PlayCircle className="mr-1 h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="mr-1 h-4 w-4" />
              Copy
            </Button>
            
            <Button variant="outline" size="sm" onClick={downloadTranscript}>
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-500">
            Found {filteredSegments.length} results for "{searchQuery}"
          </div>
        )}
      </div>
      
      <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
        <AnimatePresence initial={false}>
          {(searchQuery ? filteredSegments : transcript.segments).map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              ref={el => el && segmentRefs.current.set(segment.id, el)}
              className={`p-4 rounded-lg transition-all duration-200 ${
                activeSegmentId === segment.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSpeakerColor(segment.speaker)}`}>
                    <UserCircle size={16} />
                  </div>
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{segment.speaker}</span>
                      <Badge variant="outline" className="text-xs font-normal">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTimestamp(segment.startTime)}
                      </Badge>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-gray-500 hover:text-gray-900"
                      onClick={() => jumpToSegment(segment)}
                    >
                      <PlayCircle size={14} className="mr-1" />
                      Play
                    </Button>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {searchQuery ? (
                      // Highlight matching text
                      <span dangerouslySetInnerHTML={{
                        __html: segment.text.replace(
                          new RegExp(searchQuery, 'gi'),
                          match => `<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">${match}</mark>`
                        )
                      }} />
                    ) : (
                      segment.text
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TranscriptViewer;
