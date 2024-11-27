import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  language?: 'tr' | 'en';
}

export default function SEO({ 
  title = 'TypeMaster | Hızlı Yazma Testi',
  description = 'Türkçe ve İngilizce yazma hızınızı test edin. Profesyonel yazma hızı testi ile WPM, doğruluk ve performansınızı ölçün.',
  keywords = 'yazma testi, typing test, hızlı yazma, wpm test, klavye hızı, türkçe yazma testi',
  language = 'tr'
}: SEOProps) {
  const baseUrl = 'https://typemaster.app';

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />

      {/* PWA */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preload" as="image" href="/logo.svg" />
      
      {/* Canonical */}
      <link rel="canonical" href={baseUrl} />
    </Helmet>
  );
}