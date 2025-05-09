import React, { useState } from 'react';
import { Supplier } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface SupplierFormProps {
  initialData?: Supplier;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Supplier>>(
    initialData || {
      name: '',
      phone_number: '',
      address: '',
      products: [],
    }
  );

  const [productInput, setProductInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (productInput.trim() === '') return;
    
    setFormData({
      ...formData,
      products: [...(formData.products || []), productInput.trim()],
    });
    
    setProductInput('');
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...(formData.products || [])];
    newProducts.splice(index, 1);
    
    setFormData({
      ...formData,
      products: newProducts,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone_number || !formData.address) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (!formData.products || formData.products.length === 0) {
      toast.error('Please add at least one product');
      return;
    }
    
    // Submit form
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Supplier Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="+254XXXXXXXXX"
            className="input w-full"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address*
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          className="input w-full"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Products*
        </label>
        
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
            className="input flex-1"
            placeholder="Add a product (e.g., NPK Fertilizer, Maize Seeds)"
          />
          <button
            type="button"
            onClick={handleAddProduct}
            className="ml-2 btn btn-primary"
          >
            Add
          </button>
        </div>
        
        {formData.products && formData.products.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.products.map((product, index) => (
              <div 
                key={index}
                className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
              >
                {product}
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="ml-1 text-primary-700 hover:text-primary-900 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No products added yet</p>
        )}
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
          {initialData ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </div>
    </form>
  );
};

export default SupplierForm;