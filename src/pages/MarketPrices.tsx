import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Trash2, Download } from 'lucide-react';
import { mockMarketPrices } from '../lib/mockData';
import { MarketPrice } from '../lib/supabase';
import MarketPriceForm from '../components/forms/MarketPriceForm';
import toast from 'react-hot-toast';

const MarketPrices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(mockMarketPrices);
  const [showForm, setShowForm] = useState(false);
  const [editingPrice, setEditingPrice] = useState<MarketPrice | undefined>(undefined);
  
  // Get unique regions and crops from price data
  const regions = Array.from(new Set(marketPrices.map(price => price.region)));
  const crops = Array.from(new Set(marketPrices.map(price => price.crop)));
  
  // Filter prices based on search term, region and crop
  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = searchTerm === '' || 
      price.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
      price.town.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === '' || price.region === selectedRegion;
    const matchesCrop = selectedCrop === '' || price.crop === selectedCrop;
    
    return matchesSearch && matchesRegion && matchesCrop;
  });
  
  // Handle form submission
  const handleSubmit = (data: Partial<MarketPrice>) => {
    if (editingPrice) {
      // Update existing price
      const updatedPrices = marketPrices.map(price => 
        price.id === editingPrice.id 
          ? { ...price, ...data, last_updated: new Date().toISOString() } 
          : price
      );
      setMarketPrices(updatedPrices);
      toast.success('Market price updated successfully');
    } else {
      // Add new price
      const newPrice: MarketPrice = {
        id: (marketPrices.length + 1).toString(),
        crop: data.crop || '',
        region: data.region || '',
        town: data.town || '',
        price_per_kg: data.price_per_kg || 0,
        price_per_bag: data.price_per_bag || 0,
        last_updated: new Date().toISOString(),
      };
      
      setMarketPrices([...marketPrices, newPrice]);
      toast.success('Market price added successfully');
    }
    
    setShowForm(false);
    setEditingPrice(undefined);
  };
  
  // Handle price deletion
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this price entry?')) {
      setMarketPrices(marketPrices.filter(price => price.id !== id));
      toast.success('Market price deleted successfully');
    }
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Market Prices</h1>
        
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingPrice(undefined);
              setShowForm(true);
            }}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Add Price</span>
          </button>
          
          <button className="btn btn-secondary flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Form section */}
      {showForm && (
        <div className="card animate-slide-up">
          <h2 className="text-lg font-bold mb-4">
            {editingPrice ? 'Edit Market Price' : 'Add New Market Price'}
          </h2>
          
          <MarketPriceForm 
            initialData={editingPrice}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingPrice(undefined);
            }}
          />
        </div>
      )}
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
            placeholder="Search by crop or town..."
          />
        </div>
        
        <div className="md:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input pl-10 w-full appearance-none"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="md:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input pl-10 w-full appearance-none"
            >
              <option value="">All Crops</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Market prices table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header text-left">Crop</th>
                <th className="table-header text-left">Region</th>
                <th className="table-header text-left">Town/Market</th>
                <th className="table-header text-right">Price per kg</th>
                <th className="table-header text-right">Price per bag</th>
                <th className="table-header text-center">Last Updated</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((price: MarketPrice) => (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium text-gray-900">{price.crop}</td>
                    <td className="table-cell">{price.region}</td>
                    <td className="table-cell">{price.town}</td>
                    <td className="table-cell text-right">
                      KES {price.price_per_kg.toLocaleString()}
                    </td>
                    <td className="table-cell text-right">
                      KES {price.price_per_bag.toLocaleString()}
                    </td>
                    <td className="table-cell text-center text-sm text-gray-500">
                      {formatDate(price.last_updated)}
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingPrice(price);
                            setShowForm(true);
                          }}
                          className="text-primary-600 hover:text-primary-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(price.id)}
                          className="text-error-500 hover:text-error-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No market prices found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;