import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-center text-white/70">
      <div className="glass-card rounded-xl p-4 max-w-xl mx-auto">
        <p className="text-sm sm:text-base mb-4">
          TypeMaster, yazma hızınızı ve doğruluğunuzu geliştirmenize yardımcı olan ücretsiz bir araçtır.
          Türkçe ve İngilizce dil desteği ile pratik yapın, kendinizi geliştirin.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/yourusername/typemaster"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm sm:text-base hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}