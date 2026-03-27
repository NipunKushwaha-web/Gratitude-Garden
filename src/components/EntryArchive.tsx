import { useGarden } from '../context/GardenContext';
import EntryCard from './EntryCard';
import { BookOpen } from 'lucide-react';

export default function EntryArchive() {
  const { entries } = useGarden();

  if (entries.length === 0) {
    return null;
  }

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const groupedByMonth: Record<string, typeof entries> = {};
  sortedEntries.forEach((entry) => {
    const monthKey = entry.date.slice(0, 7);
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = [];
    }
    groupedByMonth[monthKey].push(entry);
  });

  const monthLabels: Record<string, string> = {
    '2024-01': 'January 2024',
    '2024-02': 'February 2024',
    '2024-03': 'March 2024',
    '2024-04': 'April 2024',
    '2024-05': 'May 2024',
    '2024-06': 'June 2024',
    '2024-07': 'July 2024',
    '2024-08': 'August 2024',
    '2024-09': 'September 2024',
    '2024-10': 'October 2024',
    '2024-11': 'November 2024',
    '2024-12': 'December 2024',
    '2025-01': 'January 2025',
    '2025-02': 'February 2025',
    '2025-03': 'March 2025',
    '2025-04': 'April 2025',
    '2025-05': 'May 2025',
    '2025-06': 'June 2025',
    '2025-07': 'July 2025',
    '2025-08': 'August 2025',
    '2025-09': 'September 2025',
    '2025-10': 'October 2025',
    '2025-11': 'November 2025',
    '2025-12': 'December 2025',
    '2026-01': 'January 2026',
    '2026-02': 'February 2026',
    '2026-03': 'March 2026',
    '2026-04': 'April 2026',
    '2026-05': 'May 2026',
    '2026-06': 'June 2026',
    '2026-07': 'July 2026',
    '2026-08': 'August 2026',
    '2026-09': 'September 2026',
    '2026-10': 'October 2026',
    '2026-11': 'November 2026',
    '2026-12': 'December 2026',
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-[#7B9E87]" />
        <h2 className="font-heading text-2xl text-[#3D3229]">Garden Archive</h2>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByMonth).map(([monthKey, monthEntries]) => (
          <div key={monthKey}>
            <h3 className="font-handwritten text-xl text-[#7A6F5D] mb-4 sticky top-0 bg-[#F7F3EB] py-2 z-10">
              {monthLabels[monthKey] || monthKey}
            </h3>
            <div className="space-y-3">
              {monthEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
