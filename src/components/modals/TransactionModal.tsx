import React from 'react';
import { X } from 'lucide-react';
import { Transaction } from '../../lib/supabase';

interface TransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900">Transaction Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                <p className="mt-1 text-sm text-gray-900">{transaction.user_name}</p>
                <p className="mt-1 text-sm text-gray-500">ID: {transaction.user_id}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500">Order Details</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Product:</span>
                    <span className="text-sm font-medium">{transaction.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <span className="text-sm font-medium">{transaction.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Amount:</span>
                    <span className="text-sm font-medium">KES {transaction.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500">Supplier Information</h4>
                <p className="mt-1 text-sm text-gray-900">{transaction.supplier_name}</p>
                <p className="mt-1 text-sm text-gray-500">ID: {transaction.supplier_id}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Status & Timing</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`badge ${
                      transaction.status === 'completed' ? 'badge-success' :
                      transaction.status === 'pending' ? 'badge-warning' : 'badge-error'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date:</span>
                    <span className="text-sm font-medium">{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="btn btn-primary w-full sm:w-auto sm:ml-3"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;