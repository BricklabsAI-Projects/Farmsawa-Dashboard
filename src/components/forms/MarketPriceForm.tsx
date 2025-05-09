import React, { useState } from 'react';
import { MarketPrice } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface MarketPriceFormProps {
  initialData?: MarketPrice;
  onSubmit: (data: Partial<MarketPrice>) => void;
  onCancel: () => void;
}

const MarketPriceForm: React.FC<MarketPriceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<MarketPrice>>(
    initialData || {
      crop: '',
      region: '',
      town: '',
      price_per_kg: 0,
      price_per_bag: 0,
    }
  );

  const regions = ['Central', 'Eastern', 'Western', 'Nyanza', 'Rift Valley', 'Coast', 'North Eastern'];
  const crops = ['Maize', 'Beans', 'Rice', 'Wheat', 'Potatoes', 'Coffee', 'Tea', 'Vegetables'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert to number if the field is a price field
    if (name === 'price_per_kg' || name === 'price_per_bag') {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.crop || !formData.region || !formData.town) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (formData.price_per_kg && formData.price_per_kg <= 0) {
      toast.error('Price per kg must be greater than 0');
      return;
    }
    
    if (formData.price_per_bag && formData.price_per_bag <= 0) {
      toast.error('Price per bag must be greater than 0');
      return;
    }
    
    // Submit form
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
            Crop*
          </label>
          <select
            id="crop"
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="input w-full"
            required
          >
            <option value="">Select a crop</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region*
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="input w-full"
            required
          >
            <option value="">Select a region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="town" className="block text-sm font-medium text-gray-700 mb-1">
            Town/Market*
          </label>
          <input
            type="text"
            id="town"
            name="town"
            value={formData.town}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="price_per_kg" className="block text-sm font-medium text-gray-700 mb-1">
            Price per kg (KES)*
          </label>
          <input
            type="number"
            id="price_per_kg"
            name="price_per_kg"
            value={formData.price_per_kg}
            onChange={handleChange}
            className="input w-full"
            min="1"
            step="0.1"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="price_per_bag" className="block text-sm font-medium text-gray-700 mb-1">
          Price per bag (KES)*
        </label>
        <input
          type="number"
          id="price_per_bag"
          name="price_per_bag"
          value={formData.price_per_bag}
          onChange={handleChange}
          className="input w-full"
          min="1"
          step="1"
          required
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Update Price' : 'Add Price'}
        </button>
      </div>
    </form>
  );
};

export default MarketPriceForm;