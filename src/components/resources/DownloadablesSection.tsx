import { Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { downloadables } from '@/data/resourcesData';

const fileTypeColors = {
  PDF: 'bg-red-500/10 text-red-400 border-red-500/20',
  DOCX: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  XLSX: 'bg-green-500/10 text-green-400 border-green-500/20',
  ZIP: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export const DownloadablesSection = () => {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            Downloadable Resources
          </h2>
          <p className="text-lg text-white/60 max-w-3xl">
            Templates, frameworks, and guides you can download and customize for your organization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadables.map((item, index) => (
            <div
              key={item.id}
              className="group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex flex-col gap-2 items-end">
                      <Badge
                        variant="outline"
                        className={fileTypeColors[item.fileType]}
                      >
                        {item.fileType}
                      </Badge>
                      {item.isPremium && (
                        <Badge variant="outline" className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                          Premium
                        </Badge>
                      )}
                      {item.isPlaceholder && (
                        <Badge variant="outline" className="bg-white/5 text-white/60 border-white/10">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-white/40">{item.fileSize}</span>
                    
                    {!item.isPlaceholder ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                        asChild
                      >
                        <a href={item.downloadUrl} download>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    ) : (
                      <span className="text-xs text-white/40">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl backdrop-blur-sm bg-primary/5 ring-1 ring-primary/10 text-center animate-on-scroll">
          <p className="text-white/80 mb-4">
            Need a custom template or framework tailored to your specific needs?
          </p>
          <Button variant="default" asChild>
            <a href="/contact">Request Custom Resource</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
