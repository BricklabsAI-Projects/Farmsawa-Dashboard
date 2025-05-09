import React from 'react';
import { Transaction } from '../../lib/supabase';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <a href="/transactions" className="text-primary-600 text-sm hover:underline">
          View All
        </a>
      </div>
      
      <div className="overflow-x-auto -mx-6">
        <table className="min-w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="table-header text-left">Customer</th>
              <th className="table-header text-left">Product</th>
              <th className="table-header text-right">Amount</th>
              <th className="table-header text-center">Status</th>
              <th className="table-header text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {transactions.slice(0, 5).map(transaction => (
              <tr key={transaction.id} className="hover:bg-neutral-50">
                <td className="table-cell">
                  <div className="font-medium text-gray-900">{transaction.user_name}</div>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;