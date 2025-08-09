import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useMetaMask } from '@/hooks/use-metamask';

// Simulated Uniswap interface since we can't install the actual widget
export function UniswapWidget() {
  const { account } = useMetaMask();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('NEUROX');
  const [exchangeRate, setExchangeRate] = useState(0.0247);
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRate(prev => {
        const change = (Math.random() - 0.5) * 0.001;
        return Math.max(0.001, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate output amount when input changes
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      if (fromToken === 'ETH' && toToken === 'NEUROX') {
        const ethPrice = 2400; // Mock ETH price
        const neuroxAmount = (Number(fromAmount) * ethPrice) / exchangeRate;
        setToAmount(neuroxAmount.toFixed(2));
      } else if (fromToken === 'NEUROX' && toToken === 'ETH') {
        const ethPrice = 2400;
        const ethAmount = (Number(fromAmount) * exchangeRate) / ethPrice;
        setToAmount(ethAmount.toFixed(6));
      }
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken, exchangeRate]);

  const handleSwap = async () => {
    if (!account) {
      alert('Conecte sua carteira MetaMask primeiro!');
      return;
    }

    if (!fromAmount || isNaN(Number(fromAmount))) {
      alert('Insira um valor válido!');
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      // Open actual Uniswap with the selected parameters
      const uniswapUrl = new URL('https://app.uniswap.org/#/swap');
      
      if (fromToken === 'ETH') {
        uniswapUrl.searchParams.set('inputCurrency', 'ETH');
        uniswapUrl.searchParams.set('outputCurrency', '0x0000000000000000000000000000000000000000'); // NEUROX placeholder
      } else {
        uniswapUrl.searchParams.set('inputCurrency', '0x0000000000000000000000000000000000000000'); // NEUROX placeholder
        uniswapUrl.searchParams.set('outputCurrency', 'ETH');
      }
      
      uniswapUrl.searchParams.set('exactAmount', fromAmount);
      uniswapUrl.searchParams.set('chain', 'mainnet');
      
      window.open(uniswapUrl.toString(), '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 1500);
  };

  const handleTokenSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Main Swap Interface */}
      <Card className="glass-effect border-gradient-to-r from-neon-cyan/20 to-neon-purple/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-neon-cyan flex items-center justify-between">
            Uniswap Protocol
            <Badge className="bg-green-500/20 text-green-400">
              <Activity size={12} className="mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>From</span>
              <span>Balance: {fromToken === 'ETH' ? '2.45' : '1,247.89'}</span>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-2xl font-bold outline-none flex-1 text-white"
                  data-testid="input-from-amount"
                />
                <Button
                  variant="ghost"
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg font-orbitron"
                  data-testid="button-from-token"
                >
                  {fromToken}
                </Button>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                ~${fromToken === 'ETH' ? (Number(fromAmount || 0) * 2400).toFixed(2) : (Number(fromAmount || 0) * exchangeRate).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleTokenSwap}
              variant="ghost"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 p-0"
              data-testid="button-swap-tokens"
            >
              ↕️
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>To</span>
              <span>Balance: {toToken === 'ETH' ? '2.45' : '1,247.89'}</span>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.0"
                  className="bg-transparent text-2xl font-bold outline-none flex-1 text-white"
                  data-testid="input-to-amount"
                />
                <Button
                  variant="ghost"
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg font-orbitron"
                  data-testid="button-to-token"
                >
                  {toToken}
                </Button>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                ~${toToken === 'ETH' ? (Number(toAmount || 0) * 2400).toFixed(2) : (Number(toAmount || 0) * exchangeRate).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Exchange Rate */}
          {fromAmount && toAmount && (
            <div className="glass-effect rounded-lg p-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Rate</span>
                <span className="text-neon-green font-mono">
                  1 {fromToken} = {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-400">Slippage Tolerance</span>
                <span className="text-neon-purple">{slippage}%</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!account || !fromAmount || isLoading}
            className={`w-full py-6 font-orbitron font-bold text-lg ${
              !account 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
            }`}
            data-testid="button-swap"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processando...
              </div>
            ) : !account ? (
              'Conecte sua Carteira'
            ) : !fromAmount ? (
              'Insira um valor'
            ) : (
              `Trocar ${fromToken} por ${toToken}`
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Price Info */}
      <Card className="glass-effect border-neural-gold/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-neural-gold text-lg flex items-center">
            <TrendingUp className="mr-2" size={20} />
            NEUROX Market Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green" data-testid="neurox-price">
                ${exchangeRate.toFixed(4)}
              </div>
              <div className="text-sm text-gray-400">Current Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">
                +12.7%
              </div>
              <div className="text-sm text-gray-400">24h Change</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h Volume:</span>
              <span className="text-neon-cyan">$1,247,832</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Market Cap:</span>
              <span className="text-neural-gold">$24.7M</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Liquidity:</span>
              <span className="text-neon-purple">$892,156</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => {
            setFromAmount('0.1');
            setFromToken('ETH');
            setToToken('NEUROX');
          }}
          variant="outline"
          className="border-neon-green/50 text-neon-green hover:bg-neon-green/10"
          data-testid="button-quick-buy-0.1"
        >
          <DollarSign size={16} className="mr-1" />
          Buy 0.1 ETH
        </Button>
        
        <Button
          onClick={() => {
            const uniswapUrl = 'https://app.uniswap.org/#/pool';
            window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
          }}
          variant="outline"
          className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
          data-testid="button-add-liquidity"
        >
          <ExternalLink size={16} className="mr-1" />
          Add Liquidity
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center p-3 glass-effect rounded-lg">
        <p className="mb-1">⚠️ Este é um projeto demonstrativo</p>
        <p>Clique em "Trocar" para abrir o Uniswap oficial</p>
      </div>
    </div>
  );
}