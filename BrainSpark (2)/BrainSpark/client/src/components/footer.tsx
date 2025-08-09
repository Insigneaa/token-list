import { Brain } from 'lucide-react';
import { FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';

export function Footer() {
  const platformLinks = [
    { href: "#", label: "Neural Network" },
    { href: "#", label: "3D Visualization" },
    { href: "#", label: "AI Models" },
    { href: "#", label: "API Access" },
  ];

  const resourceLinks = [
    { href: "#", label: "Documentation" },
    { href: "#", label: "Tutorials" },
    { href: "#", label: "GitHub" },
    { href: "#", label: "Whitepaper" },
  ];

  const socialLinks = [
    { href: "#", icon: FaTwitter, color: "hover:text-neon-cyan", label: "Twitter" },
    { href: "#", icon: FaDiscord, color: "hover:text-neon-purple", label: "Discord" },
    { href: "#", icon: FaGithub, color: "hover:text-neon-green", label: "GitHub" },
    { href: "#", icon: FaTelegram, color: "hover:text-neural-gold", label: "Telegram" },
  ];

  return (
    <footer className="py-12 border-t border-gray-800" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="text-neon-cyan text-2xl" />
              <h3 className="font-orbitron font-bold text-xl text-neon-cyan">NEUROX</h3>
            </div>
            <p className="text-gray-400">
              The future of decentralized neural networks and AI-powered blockchain technology.
            </p>
          </div>
          
          {/* Platform Links */}
          <div>
            <h4 className="font-orbitron font-semibold mb-4 text-neon-purple">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-neon-cyan transition-colors"
                    data-testid={`platform-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resource Links */}
          <div>
            <h4 className="font-orbitron font-semibold mb-4 text-neon-green">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-neon-cyan transition-colors"
                    data-testid={`resource-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="font-orbitron font-semibold mb-4 text-neural-gold">Community</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NEUROX. All rights reserved. Powered by neural networks and blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}
