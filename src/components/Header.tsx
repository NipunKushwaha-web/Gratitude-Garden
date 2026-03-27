import { useGarden } from '../context/GardenContext';
import { Sprout, Leaf } from 'lucide-react';

export default function Header() {
  const { flowers } = useGarden();
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="relative py-8 px-4 text-center">
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30"
            stroke="#7B9E87"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,35 Q200,50 400,35 T800,35 T1200,35"
            stroke="#8FB996"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="flex items-center justify-center gap-3 mb-2">
        <Leaf className="w-6 h-6 text-[#7B9E87] rotate-45" />
        <h1 className="font-heading text-4xl md:text-5xl font-medium text-[#3D3229] tracking-tight">
          Your Gratitude Garden
        </h1>
        <Leaf className="w-6 h-6 text-[#7B9E87] -rotate-45" />
      </div>

      <p className="font-handwritten text-xl text-[#7A6F5D]">{dateString}</p>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#7A6F5D]">
        <Sprout className="w-4 h-4" />
        <span>{flowers.length} flower{flowers.length !== 1 ? 's' : ''} growing</span>
      </div>
    </header>
  );
}
