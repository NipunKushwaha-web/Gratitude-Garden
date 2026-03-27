export type FlowerType = 'rose' | 'sunflower' | 'tulip' | 'lavender' | 'lotus';

export interface Entry {
  id: string;
  date: string;
  content: string;
  flowerType: FlowerType;
  createdAt: number;
  updatedAt: number;
}

export interface GardenFlower {
  id: string;
  x: number;
  y: number;
  flowerType: FlowerType;
  entryId: string;
  scale: number;
  rotation: number;
  bloomProgress: number;
}

export interface GardenState {
  flowers: GardenFlower[];
  lastWatered: string | null;
}

export const FLOWER_COLORS: Record<FlowerType, { primary: string; secondary: string; center: string }> = {
  rose: { primary: '#D4A5A5', secondary: '#E8C4C4', center: '#E8C872' },
  sunflower: { primary: '#E8C872', secondary: '#F5D76E', center: '#5C4033' },
  tulip: { primary: '#C4846C', secondary: '#D9A08B', center: '#E8C872' },
  lavender: { primary: '#B8A9C9', secondary: '#D4C8E0', center: '#9B8BB4' },
  lotus: { primary: '#F8BBD9', secondary: '#FAD6E8', center: '#E8C872' },
};

export const FLOWER_TYPES: FlowerType[] = ['rose', 'sunflower', 'tulip', 'lavender', 'lotus'];
