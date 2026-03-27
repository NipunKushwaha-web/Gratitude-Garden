import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthDays, isToday } from '../utils/dateUtils';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarWidget() {
  const { entries } = useGarden();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const entryDates = new Set(entries.map(e => e.date));

  return (
    <div className="bg-[#FFFEF9] rounded-2xl p-5 shadow-sm border border-[#E8E4DB]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#F7F3EB] rounded-lg transition-colors text-[#7A6F5D] hover:text-[#3D3229]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-lg text-[#3D3229]">
          {MONTHS[month]} {year}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#F7F3EB] rounded-lg transition-colors text-[#7A6F5D] hover:text-[#3D3229]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-[#7A6F5D] py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = entryDates.has(dateStr);
          const today = isToday(day, month, year);

          return (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm relative
                ${today ? 'bg-[#7B9E87] text-white font-medium' : ''}
                ${hasEntry && !today ? 'bg-[#7B9E87]/10' : ''}
              `}
              title={hasEntry ? 'Gratitude entry' : ''}
            >
              {day}
              {hasEntry && (
                <span className="absolute bottom-0.5 w-1 h-1 bg-[#D4A5A5] rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E8E4DB] flex items-center justify-between text-sm text-[#7A6F5D]">
        <span>{entries.length} entries this year</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#D4A5A5] rounded-full" />
          <span>Entry day</span>
        </div>
      </div>
    </div>
  );
}
