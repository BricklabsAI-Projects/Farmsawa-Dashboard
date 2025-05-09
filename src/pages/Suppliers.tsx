import React, { useState } from 'react';
import { PlusCircle, Search, Download, Star } from 'lucide-react';
import { mockSuppliers } from '../lib/mockData';
import { Supplier } from '../lib/supabase';
import SupplierForm from '../components/forms/SupplierForm';
import toast from 'react-hot-toast';

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | undefined>(undefined);
  
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => {
    return searchTerm === '' || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      supplier.phone_number.includes(searchTerm) ||
      supplier.products.some(product => 
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
  });
  
  // Handle form submission
  const handleSubmit = (data: Partial<Supplier>) => {
    if (editingSupplier) {
      // Update existing supplier
      const updatedSuppliers = suppliers.map(supplier => 
        supplier.id === editingSupplier.id 
          ? { ...supplier, ...data } 
          : supplier
      );
      setSuppliers(updatedSuppliers);
      toast.success('Supplier updated successfully');
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        id: (suppliers.length + 1).toString(),
        name: data.name || '',
        phone_number: data.phone_number || '',
        address: data.address || '',
        products: data.products || [],
        rating: 0,
        review_count: 0,
        created_at: new Date().toISOString(),
      };
      
      setSuppliers([...suppliers, newSupplier]);
      toast.success('Supplier added successfully');
    }
    
    setShowForm(false);
    setEditingSupplier(undefined);
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
        
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingSupplier(undefined);
              setShowForm(true);
            }}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Add Supplier</span>
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
            {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          
          <SupplierForm 
            initialData={editingSupplier}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingSupplier(undefined);
            }}
          />
        </div>
      )}
      
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10 w-full"
          placeholder="Search suppliers by name, phone or products..."
        />
      </div>
      
      {/* Suppliers table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header text-left">Name</th>
                <th className="table-header text-left">Contact</th>
                <th className="table-header text-left">Products</th>
                <th className="table-header text-center">Rating</th>
                <th className="table-header text-right">Since</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier: Supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium text-gray-900">{supplier.name}</td>
                    <td className="table-cell">
                      <div>{supplier.phone_number}</div>
                      <div className="text-sm text-gray-500">{supplier.address}</div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-wrap gap-1">
                        {supplier.products.slice(0, 3).map((product, index) => (
                          <span 
                            key={index}
                            className="inline-block text-xs py-0.5 px-2 bg-primary-50 text-primary-700 rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                        {supplier.products.length > 3 && (
                          <span className="inline-block text-xs py-0.5 px-2 bg-neutral-100 text-neutral-700 rounded-full">
                            +{supplier.products.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{supplier.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({supplier.review_count})</span>
                      </div>
                    </td>
                    <td className="table-cell text-right text-gray-500">
                      {formatDate(supplier.created_at)}
                    </td>
                    <td className="table-cell text-right">
                      <button
                        onClick={() => {
                          setEditingSupplier(supplier);
                          setShowForm(true);
                        }}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No suppliers found matching your search criteria.
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

export default Suppliers;