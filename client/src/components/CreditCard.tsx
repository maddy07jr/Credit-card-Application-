import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreditCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
    onClick={() => navigate('/card-details')}
    className="w-96 h-56 bg-linear-to-r from-gray-800 to-black rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 duration-500 cursor-pointer"
    >
    <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
        <div className="">
            <p className="font-light">Name</p>
            <p className="font-medium tracking-widest">MANICK SRIRAM M</p>
        </div>
        <img className="w-14 h-14" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
        </div>
        <div className="pt-1">
        <p className="font-light">Card Number</p>
        <p className="font-medium tracking-more-wider">4642  3489  9867  7632</p>
        </div>
        <div className="pt-6 pr-6">
        <div className="flex justify-between">
            <div className="">
            <p className="font-light text-xs">Valid</p>
            <p className="font-medium tracking-wider text-sm">11/25</p>
            </div>
            <div className="">
            <p className="font-light text-xs">CVV</p>
            <p className="font-bold tracking-more-wider text-sm">···</p>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default CreditCard;
