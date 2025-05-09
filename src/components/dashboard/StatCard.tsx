import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  change?: number;
  changeText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  change,
  changeText
}) => {
  // Dynamic color classes based on prop
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-500',
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-700',
    },
    success: {
      bg: 'bg-success-50',
      text: 'text-success-500',
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-500',
    },
  };

  // Choose the correct color class
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <div className="card hover:shadow-lg transition-all animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-success-500' : 'text-error-500'}`}>
              <span>{change >= 0 ? '↑' : '↓'} {Math.abs(change)}%</span>
              <span className="ml-1 text-neutral-500">{changeText || 'vs. last period'}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${selectedColor.bg} ${selectedColor.text}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;