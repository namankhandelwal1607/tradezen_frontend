import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const TableComponent = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCryptoForSell, setSelectedCryptoForSell] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('https://trade-server-peach.vercel.app//portfolio');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched portfolio data:', data); // Debugging information
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  const openSellModal = (crypto) => {
    console.log('Selected crypto for sell:', crypto); // Debugging information
    setSelectedCryptoForSell(crypto);
    setIsSellModalOpen(true);
  };

  const closeSellModal = () => {
    setSelectedCryptoForSell(null);
    setIsSellModalOpen(false);
  };

  const handleSell = async () => {
    if (!selectedCryptoForSell) return;
  
    console.log('Crypto to sell:', selectedCryptoForSell); // Debugging information
  
    try {
      const { symbol, price, name, stocks } = selectedCryptoForSell;
      const response = await fetch(`https://trade-server-peach.vercel.app/portfolio/${symbol}/${price}/${name}/${stocks}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setPortfolioData((prevData) => prevData.filter((crypto) => crypto.symbol !== selectedCryptoForSell.symbol));
        closeSellModal();
      } else {
        console.error('Failed to sell crypto');
      }
    } catch (error) {
      console.error('Error selling crypto:', error);
    }
  };
  

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        <table className="w-full table-auto">
          <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
            <tr>
              <th className="py-1">Symbol</th>
              <th className="py-1">Name</th>
              <th className="py-1">Price</th>
              <th className="py-1">Stocks</th>
              <th className="py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No data available</td>
              </tr>
            ) : (
              portfolioData.map((stock, index) => (
                <tr key={index} className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0">
                  <td className="py-4 flex items-center uppercase">{stock.symbol}</td>
                  <td className="py-4">{stock.name}</td>
                  <td className="py-4">{stock.price}</td>
                  <td className="py-4">{stock.stocks}</td>
                  <td className="py-4">
                    <button
                      onClick={() => openSellModal(stock)}
                      className="bg-[#14FFEC] text-black font-semibold py-2 px-4 rounded hover:bg-[#0DA79A] transition-colors duration-300"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
          <span>
            Data provided by{" "}
            <a className="text-cyan" href="#" rel="noreferrer">
              HackHive
            </a>
          </span>
          <Pagination />
        </div>
      </div>

      {isSellModalOpen && selectedCryptoForSell && (
        <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#212121] bg-opacity-90 p-6 rounded-lg shadow-lg text-white max-w-2xl w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSell();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">CONFIRM!</label>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#14FFEC] text-black font-semibold py-2 px-4 rounded hover:bg-[#0DA79A] transition-colors duration-300"
                >
                  Sell {selectedCryptoForSell.symbol}
                </button>
                <button
                  type="button"
                  onClick={closeSellModal}
                  className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default TableComponent;
