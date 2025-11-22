import { Calendar, Eye, User } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleMetaProps {
  author: string;
  date: string;
  views: number;
}

export const ArticleMeta = ({ author, date, views }: ArticleMetaProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>{author}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <time dateTime={date}>
          {format(new Date(date), 'MMMM d, yyyy')}
        </time>
      </div>
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        <span>{views.toLocaleString()} views</span>
      </div>
    </div>
  );
};
