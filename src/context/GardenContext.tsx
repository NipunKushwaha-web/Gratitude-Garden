import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { FLOWER_TYPES } from '../types';
import type { Entry, GardenFlower, FlowerType } from '../types';

interface GardenContextType {
  entries: Entry[];
  flowers: GardenFlower[];
  addEntry: (content: string) => void;
  updateEntry: (id: string, content: string) => void;
  deleteEntry: (id: string) => void;
  getEntryByDate: (date: string) => Entry | undefined;
  getTodayEntry: () => Entry | undefined;
  isPlanting: boolean;
  setIsPlanting: (value: boolean) => void;
  newFlowerId: string | null;
}

type GardenAction =
  | { type: 'LOAD_ENTRIES'; payload: Entry[] }
  | { type: 'ADD_ENTRY'; payload: Entry }
  | { type: 'UPDATE_ENTRY'; payload: { id: string; content: string } }
  | { type: 'DELETE_ENTRY'; payload: string };

const GardenContext = createContext<GardenContextType | undefined>(undefined);

function gardenReducer(state: Entry[], action: GardenAction): Entry[] {
  switch (action.type) {
    case 'LOAD_ENTRIES':
      return action.payload;
    case 'ADD_ENTRY':
      return [...state, action.payload];
    case 'UPDATE_ENTRY':
      return state.map(entry =>
        entry.id === action.payload.id
          ? { ...entry, content: action.payload.content, updatedAt: Date.now() }
          : entry
      );
    case 'DELETE_ENTRY':
      return state.filter(entry => entry.id !== action.payload);
    default:
      return state;
  }
}

function generateFlowerPosition(existingFlowers: GardenFlower[]): { x: number; y: number } {
  const usedPositions: Set<string> = new Set();
  existingFlowers.forEach(f => usedPositions.add(`${Math.round(f.x / 50)}-${Math.round(f.y / 50)}`));

  let x: number, y: number;
  let attempts = 0;
  do {
    x = 50 + Math.random() * 700;
    y = 200 + Math.random() * 300;
    attempts++;
  } while (usedPositions.has(`${Math.round(x / 50)}-${Math.round(y / 50)}`) && attempts < 50);

  return { x, y };
}

export function GardenProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(gardenReducer, []);
  const [flowers, setFlowers] = React.useState<GardenFlower[]>([]);
  const [isPlanting, setIsPlanting] = React.useState(false);
  const [newFlowerId, setNewFlowerId] = React.useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gratitude-entries');
    if (saved) {
      const parsed = JSON.parse(saved) as Entry[];
      dispatch({ type: 'LOAD_ENTRIES', payload: parsed });

      const savedFlowers = localStorage.getItem('gratitude-flowers');
      if (savedFlowers) {
        setFlowers(JSON.parse(savedFlowers));
      } else {
        const initialFlowers: GardenFlower[] = parsed.map(entry => ({
          id: entry.id,
          x: 100 + Math.random() * 600,
          y: 250 + Math.random() * 250,
          flowerType: entry.flowerType,
          entryId: entry.id,
          scale: 1,
          rotation: Math.random() * 20 - 10,
          bloomProgress: 1,
        }));
        setFlowers(initialFlowers);
      }
    }
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('gratitude-entries', JSON.stringify(entries));
    }
  }, [entries]);

  useEffect(() => {
    if (flowers.length > 0) {
      localStorage.setItem('gratitude-flowers', JSON.stringify(flowers));
    }
  }, [flowers]);

  const addEntry = (content: string) => {
    const today = new Date().toISOString().split('T')[0];
    const flowerType = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)] as FlowerType;
    const id = `entry-${Date.now()}`;
    const { x, y } = generateFlowerPosition(flowers);

    const newEntry: Entry = {
      id,
      date: today,
      content,
      flowerType,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    dispatch({ type: 'ADD_ENTRY', payload: newEntry });

    const newFlower: GardenFlower = {
      id,
      x,
      y,
      flowerType,
      entryId: id,
      scale: 0.3,
      rotation: Math.random() * 20 - 10,
      bloomProgress: 0,
    };

    setNewFlowerId(id);
    setIsPlanting(true);
    setFlowers(prev => [...prev, newFlower]);

    setTimeout(() => {
      setFlowers(prev =>
        prev.map(f => (f.id === id ? { ...f, scale: 1, bloomProgress: 1 } : f))
      );
      setIsPlanting(false);
      setNewFlowerId(null);
    }, 2500);
  };

  const updateEntry = (id: string, content: string) => {
    dispatch({ type: 'UPDATE_ENTRY', payload: { id, content } });
  };

  const deleteEntry = (id: string) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id });
    setFlowers(prev => prev.filter(f => f.id !== id));
  };

  const getEntryByDate = (date: string) => {
    return entries.find(entry => entry.date === date);
  };

  const getTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return getEntryByDate(today);
  };

  return (
    <GardenContext.Provider
      value={{
        entries,
        flowers,
        addEntry,
        updateEntry,
        deleteEntry,
        getEntryByDate,
        getTodayEntry,
        isPlanting,
        setIsPlanting,
        newFlowerId,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
}

export function useGarden() {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden must be used within a GardenProvider');
  }
  return context;
}
