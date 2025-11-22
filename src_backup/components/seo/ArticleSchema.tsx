interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  imageUrl?: string;
  url: string;
}

export const ArticleSchema = ({
  title,
  description,
  author,
  publishDate,
  modifiedDate,
  imageUrl,
  url
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl || "https://elevatedai.co/og-image.jpg",
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://elevatedai.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elevated AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://elevatedai.co/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
