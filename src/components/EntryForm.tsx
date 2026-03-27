import { useState, useRef, useEffect } from 'react';
import { useGarden } from '../context/GardenContext';
import { Sprout, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const PLACEHOLDERS = [
  'A person who made me smile today...',
  'Something small that brought me joy...',
  'A moment I want to remember...',
  'Someone I\'m thankful to have in my life...',
  'An experience that taught me something...',
];

export default function EntryForm() {
  const { addEntry, getTodayEntry, isPlanting } = useGarden();
  const [content, setContent] = useState('');
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const maxChars = 280;

  const todayEntry = getTodayEntry();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPlanting) return;

    addEntry(content.trim());
    setShowSuccess(true);

    if (successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    setTimeout(() => {
      setShowSuccess(false);
      setContent('');
    }, 2000);
  };

  if (todayEntry) {
    return (
      <div className="bg-[#FFFEF9] rounded-3xl p-6 shadow-lg border border-[#E8E4DB] max-w-lg mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B9E87]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#7B9E87]" />
            <span className="text-sm font-medium text-[#7B9E87]">Today's gratitude planted</span>
          </div>
          <p className="font-handwritten text-xl text-[#3D3229] leading-relaxed">
            "{todayEntry.content}"
          </p>
          <p className="mt-4 text-sm text-[#7A6F5D]">
            Come back tomorrow to plant another flower
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFEF9] rounded-3xl p-6 shadow-lg border border-[#E8E4DB] max-w-lg mx-auto relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {showSuccess && (
        <div
          ref={successRef}
          className="absolute inset-0 flex items-center justify-center bg-[#FFFEF9]/95 z-10"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🌸</div>
            <p className="font-handwritten text-2xl text-[#7B9E87]">
              Your gratitude has bloomed!
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <label className="block mb-4">
          <span className="font-heading text-xl text-[#3D3229] block mb-2">
            What are you grateful for today?
          </span>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            placeholder={placeholder}
            className="w-full h-32 p-4 bg-[#F7F3EB]/50 rounded-2xl border border-[#E8E4DB] text-[#3D3229] placeholder-[#7A6F5D]/60 resize-none focus:outline-none focus:ring-2 focus:ring-[#7B9E87]/50 focus:border-[#7B9E87] transition-all font-nunito"
            disabled={isPlanting}
          />
        </label>

        <div className="flex items-center justify-between">
          <span
            className={`text-sm ${
              charCount > maxChars - 30
                ? charCount >= maxChars
                  ? 'text-red-400'
                  : 'text-[#C4846C]'
                : 'text-[#7A6F5D]'
            }`}
          >
            {charCount}/{maxChars}
          </span>

          <button
            ref={buttonRef}
            type="submit"
            disabled={!content.trim() || isPlanting}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
              ${
                !content.trim() || isPlanting
                  ? 'bg-[#E8E4DB] text-[#7A6F5D] cursor-not-allowed'
                  : 'bg-[#7B9E87] text-white hover:bg-[#6B8E77] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
              }
            `}
          >
            {isPlanting ? (
              <>
                <Sprout className="w-5 h-5 animate-bounce" />
                <span>Planting...</span>
              </>
            ) : (
              <>
                <Sprout className="w-5 h-5" />
                <span>Plant Flower</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
