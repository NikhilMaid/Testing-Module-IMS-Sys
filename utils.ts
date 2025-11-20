import { MetalType } from './types';

export const formatWeight = (weight: number, metal: MetalType = MetalType.GOLD): string => {
  const decimals = metal === MetalType.SILVER ? 2 : 3;
  return weight.toFixed(decimals);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateTagId = (category: string): string => {
  const prefix = category.substring(0, 2).toUpperCase();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

export const calculatePrice = (
  netWeight: number, 
  rate: number, 
  makingCharges: number, 
  wastage: number
): { base: number; total: number; tax: number } => {
  // Logic: Base = (NetWt * Rate) + MakingCharges + ((NetWt * Rate) * Wastage%)
  const metalCost = netWeight * rate;
  const wastageCost = metalCost * (wastage / 100);
  const makingCost = makingCharges; // Assuming absolute value passed, if per gram: makingCharges * netWeight
  
  const taxableValue = metalCost + wastageCost + makingCost;
  const gst = taxableValue * 0.03; // 3% GST on Gold
  
  return {
    base: taxableValue,
    tax: gst,
    total: taxableValue + gst
  };
};