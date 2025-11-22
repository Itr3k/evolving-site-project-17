import { FileText, Download, Video, FileCode, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Resource } from '@/data/resourcesData';

interface ResourceCardProps {
  resource: Resource;
}

const typeIcons = {
  guide: FileText,
  template: FileCode,
  video: Video,
  download: Download,
  blog: FileText,
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const Icon = typeIcons[resource.type];
  const isExternal = resource.link?.startsWith('http');

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative h-full backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex gap-2">
            {resource.isPremium && (
              <Badge variant="outline" className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                Premium
              </Badge>
            )}
            {resource.isPlaceholder && (
              <Badge variant="outline" className="bg-white/5 text-white/60 border-white/10">
                Coming Soon
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {resource.description}
        </p>

        {resource.link && !resource.isPlaceholder && (
          isExternal ? (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View Resource
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <Link
              to={resource.link}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View Resource
              <ExternalLink className="w-4 h-4" />
            </Link>
          )
        )}

        {resource.downloadUrl && !resource.isPlaceholder && (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            asChild
          >
            <a href={resource.downloadUrl} download>
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
