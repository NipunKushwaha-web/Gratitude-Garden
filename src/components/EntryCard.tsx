import type { Entry } from '../types';
import { FlowerIcon } from './Flower';
import { formatShortDate } from '../utils/dateUtils';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useGarden } from '../context/GardenContext';

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { deleteEntry } = useGarden();
  const preview = entry.content.slice(0, 100);
  const isLong = entry.content.length > 100;

  return (
    <div className="bg-[#FFFEF9] rounded-2xl p-4 shadow-sm border border-[#E8E4DB] hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#7B9E87]/10 rounded-full">
          <FlowerIcon type={entry.flowerType} size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-handwritten text-lg text-[#7A6F5D]">
              {formatShortDate(entry.date)}
            </span>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="p-1.5 text-[#7A6F5D]/50 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[#3D3229] leading-relaxed">
            {expanded || !isLong ? entry.content : `${preview}...`}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-2 text-sm text-[#7B9E87] hover:text-[#6B8E77] transition-colors"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
