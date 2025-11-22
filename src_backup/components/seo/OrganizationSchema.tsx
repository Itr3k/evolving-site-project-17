export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elevated AI",
    "legalName": "N3RD Labs LLC",
    "url": "https://elevatedai.co",
    "logo": "https://elevatedai.co/logo.png",
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "name": "Johnathan Scott"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "johnathan@elevatedai.co",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.linkedin.com/in/johnathan-scott/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
