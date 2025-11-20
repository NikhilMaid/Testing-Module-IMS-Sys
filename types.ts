export enum MetalType {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND'
}

export enum Purity {
  K24 = '24K',
  K22 = '22K (916)',
  K18 = '18K (750)',
  K14 = '14K (585)',
  STERLING = '925 Sterling'
}

export enum ItemCategory {
  BANGLE = 'Bangle',
  CHAIN = 'Chain',
  RING = 'Ring',
  NECKLACE = 'Necklace',
  LOOSE_STONE = 'Loose Stone',
  COIN = 'Coin'
}

export enum StockStatus {
  IN_STOCK = 'IN_STOCK',
  ON_APPROVAL = 'ON_APPROVAL',
  SOLD = 'SOLD',
  REPAIR = 'REPAIR',
  HALLMARKING = 'HALLMARKING'
}

export interface JewelleryItem {
  tagId: string;
  huid?: string; // Hallmark Unique ID
  name: string;
  category: ItemCategory;
  metalType: MetalType;
  purity: Purity;
  grossWeight: number;
  stoneWeight: number;
  netWeight: number;
  wastagePercent: number; // Making charges calculation often involves wastage %
  makingChargesPerGram: number;
  status: StockStatus;
  imageUrl?: string;
}

export interface CartItem extends JewelleryItem {
  price: number;
  makingChargesTotal: number;
  taxAmount: number;
}

export interface Karigar {
  id: string;
  name: string;
  skill: string;
  metalBalance: number; // Positive means they owe metal
  cashBalance: number;
}

export interface OldGoldPurchase {
  description: string;
  grossWeight: number;
  purityPercent: number;
  netPureWeight: number;
  exchangeRate: number;
  amount: number;
}

export interface DailyRate {
  metal: MetalType;
  purity: Purity;
  rateBuy: number;
  rateSell: number;
}