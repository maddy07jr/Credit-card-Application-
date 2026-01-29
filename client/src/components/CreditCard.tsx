import React from 'react';

const CreditCard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[400px] h-[250px] bg-gradient-to-br from-[#0a192f] to-[#112240] rounded-2xl relative text-white shadow-2xl transition-transform transform hover:scale-105 duration-500 overflow-hidden border border-[#1e2f4a]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#ffd700] opacity-5 blur-3xl"></div>
        
        <div className="w-full px-8 absolute top-8 z-10">
          <div className="flex justify-between items-start">
            <div className="">
              <p className="font-light text-[#8892b0] text-xs uppercase tracking-widest mb-1">Card Holder</p>
              <p className="font-medium tracking-widest text-[#e6f1ff] text-lg uppercase font-mono">MANICK SRIRAM M</p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[#ffd700] font-bold italic text-xl">MBank</span>
                <span className="text-[10px] text-[#8892b0] uppercase tracking-wider">Premium</span>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
             <div className="w-12 h-9 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-md"></div>
             <img className="w-8 opacity-80" src="https://img.icons8.com/ios/50/ffffff/contactless-payment.png" alt="contactless" />
          </div>

          <div className="pt-2">
            <p className="font-mono text-xl tracking-[0.2em] text-[#e6f1ff] shadow-sm">4642  3489  9867  7632</p>
          </div>
          
          <div className="pt-6 pr-6">
            <div className="flex justify-between items-end">
              <div className="flex gap-8">
                  <div>
                    <p className="font-light text-[#8892b0] text-[10px] uppercase tracking-widest">Expires</p>
                    <p className="font-medium tracking-wider text-sm font-mono">11/25</p>
                  </div>
                  <div>
                    <p className="font-light text-[#8892b0] text-[10px] uppercase tracking-widest">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm font-mono">•••</p>
                  </div>
              </div>
              <img className="h-10 opacity-90" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
