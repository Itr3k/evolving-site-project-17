import { ExternalLink } from 'lucide-react';

interface Source {
  title: string;
  url: string;
}

interface SourcesListProps {
  sources: Source[];
}

export const SourcesList = ({ sources }: SourcesListProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="border-t border-border pt-8 mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Sources & References</h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
