import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { useMetaMask } from '@/hooks/use-metamask';
import { UniswapWidget } from './uniswap-widget';

const UNISWAP_BASE_URL = 'https://app.uniswap.org/#/swap';
const NEUROX_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // Placeholder
const USDC_TOKEN_ADDRESS = '0xA0b86a33E6441c8ba3cc8bb83db4D4c72f1b9f83'; // USDC on mainnet

interface TokenData {
  symbol: string;
  name: string;
  price: string;
  change24h: number;
  volume: string;
}

export function UniswapButton() {
  const { account } = useMetaMask();
  const isConnected = !!account;
  const [showDetails, setShowDetails] = useState(false);

  // Mock token data - in real app, fetch from CoinGecko/DEX APIs
  const tokenData: TokenData = {
    symbol: 'NEUROX',
    name: 'Neural Network Token',
    price: '$0.0247',
    change24h: 12.7,
    volume: '$1,247,832'
  };

  const handleBuyOnUniswap = () => {
    if (!isConnected) {
      alert('Conecte sua carteira MetaMask primeiro!');
      return;
    }

    // Create Uniswap URL with pre-filled parameters
    const uniswapUrl = new URL(UNISWAP_BASE_URL);
    uniswapUrl.searchParams.set('outputCurrency', NEUROX_TOKEN_ADDRESS);
    uniswapUrl.searchParams.set('inputCurrency', USDC_TOKEN_ADDRESS);
    uniswapUrl.searchParams.set('chain', 'mainnet');
    
    // Open Uniswap in new tab
    window.open(uniswapUrl.toString(), '_blank', 'noopener,noreferrer');
  };

  const handleQuickBuy = (amount: string) => {
    if (!isConnected) {
      alert('Conecte sua carteira MetaMask primeiro!');
      return;
    }

    const uniswapUrl = new URL(UNISWAP_BASE_URL);
    uniswapUrl.searchParams.set('outputCurrency', NEUROX_TOKEN_ADDRESS);
    uniswapUrl.searchParams.set('inputCurrency', USDC_TOKEN_ADDRESS);
    uniswapUrl.searchParams.set('exactAmount', amount);
    uniswapUrl.searchParams.set('chain', 'mainnet');
    
    window.open(uniswapUrl.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Uniswap Widget */}
      <UniswapWidget />
      
      {/* Additional Options */}
      <div className="space-y-4">
      {/* Main Buy Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          onClick={handleBuyOnUniswap}
          disabled={!isConnected}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-orbitron px-8 py-6 text-lg"
          data-testid="button-buy-uniswap"
        >
          <ShoppingCart className="mr-2" size={20} />
          Comprar NEUROX na Uniswap
          <ExternalLink className="ml-2" size={16} />
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
          data-testid="button-token-details"
        >
          <TrendingUp className="mr-2" size={16} />
          Detalhes do Token
        </Button>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="text-center p-4 glass-effect rounded-xl border-orange-500/20">
          <p className="text-orange-300 text-sm">
            ⚠️ Conecte sua carteira MetaMask para comprar tokens
          </p>
        </div>
      )}

      {/* Quick Buy Options */}
      {isConnected && (
        <Card className="glass-effect border-neon-purple/20">
          <CardHeader>
            <CardTitle className="font-orbitron text-neon-purple text-lg">
              Compra Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['10', '50', '100', '500'].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => handleQuickBuy(amount)}
                  className="border-neon-green/50 text-neon-green hover:bg-neon-green/10"
                  data-testid={`button-quick-buy-${amount}`}
                >
                  <DollarSign size={14} className="mr-1" />
                  ${amount}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Valores em USDC - Será redirecionado para Uniswap
            </p>
          </CardContent>
        </Card>
      )}

      {/* Token Details */}
      {showDetails && (
        <Card className="glass-effect border-neon-cyan/20 animate-slide-up">
          <CardHeader>
            <CardTitle className="font-orbitron text-neon-cyan flex items-center justify-between">
              Informações do Token NEUROX
              <Badge className={`${tokenData.change24h > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {tokenData.change24h > 0 ? '+' : ''}{tokenData.change24h}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green" data-testid="token-price">
                  {tokenData.price}
                </div>
                <div className="text-sm text-gray-400">Preço Atual</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple" data-testid="token-volume">
                  {tokenData.volume}
                </div>
                <div className="text-sm text-gray-400">Volume 24h</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-neural-gold" data-testid="token-supply">
                  1B
                </div>
                <div className="text-sm text-gray-400">Supply Total</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Contrato:</span>
                <span className="font-mono text-xs text-neon-cyan">
                  {NEUROX_TOKEN_ADDRESS.slice(0, 6)}...{NEUROX_TOKEN_ADDRESS.slice(-4)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Rede:</span>
                <span className="text-neon-green">Ethereum Mainnet</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-neon-purple">ERC-20</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300 text-center">
                NEUROX é o token nativo da rede neural descentralizada. 
                Use para acessar recursos premium e participar da governança.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>⚠️ Este é um projeto demonstrativo. Tokens e preços são simulados.</p>
        <p>Sempre faça sua própria pesquisa antes de investir em criptomoedas.</p>
      </div>
      </div>
    </div>
  );
}