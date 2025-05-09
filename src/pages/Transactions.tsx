import React, { useState } from 'react';
import { ArrowDownUp, Download, Calendar, Filter } from 'lucide-react';
import { mockTransactions } from '../lib/mockData';
import { Transaction } from '../lib/supabase';
import TransactionModal from '../components/modals/TransactionModal';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Filter transactions based on search term and status
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      transaction.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    if (sortField === 'total_amount') {
      return sortDirection === 'asc'
        ? a.total_amount - b.total_amount
        : b.total_amount - a.total_amount;
    }
    
    const aValue = a[sortField]?.toString() || '';
    const bValue = b[sortField]?.toString() || '';
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
  
  // Handle sorting
  const toggleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        
        <button className="btn btn-primary flex items-center gap-2">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
            placeholder="Search transactions..."
          />
        </div>
        
        <div className="md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input pl-10 w-full appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Transactions table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="table-header text-left cursor-pointer"
                  onClick={() => toggleSort('user_name')}
                >
                  <div className="flex items-center">
                    <span>Customer</span>
                    {sortField === 'user_name' && (
                      <ArrowDownUp size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="table-header text-left">Product</th>
                <th 
                  className="table-header text-right cursor-pointer"
                  onClick={() => toggleSort('total_amount')}
                >
                  <div className="flex items-center justify-end">
                    <span>Amount</span>
                    {sortField === 'total_amount' && (
                      <ArrowDownUp size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header text-center cursor-pointer"
                  onClick={() => toggleSort('status')}
                >
                  <div className="flex items-center justify-center">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <ArrowDownUp size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="table-header text-right cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center justify-end">
                    <span>Date</span>
                    {sortField === 'date' && (
                      <ArrowDownUp size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="table-header text-right">Supplier</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction: Transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <td className="table-cell font-medium text-gray-900">{transaction.user_name}</td>
                    <td className="table-cell">
                      <div>{transaction.product}</div>
                      <div className="text-sm text-gray-500">Qty: {transaction.quantity}</div>
                    </td>
                    <td className="table-cell text-right font-medium">
                      KES {transaction.total_amount.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <span className={`
                        badge inline-flex justify-center
                        ${transaction.status === 'completed' ? 'badge-success' : 
                          transaction.status === 'pending' ? 'badge-warning' : 'badge-error'}
                      `}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell text-right text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="table-cell text-right">
                      {transaction.supplier_name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No transactions found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default Transactions;