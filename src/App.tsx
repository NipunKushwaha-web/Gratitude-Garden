import { GardenProvider, useGarden } from './context/GardenContext';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import GardenCanvas from './components/GardenCanvas';
import CalendarWidget from './components/CalendarWidget';
import EntryArchive from './components/EntryArchive';

function JourneyStats() {
  const { entries } = useGarden();
  const wordCount = entries.reduce((acc, e) => acc + e.content.split(' ').length, 0);

  return (
    <div className="bg-[#FFFEF9] rounded-2xl p-5 shadow-sm border border-[#E8E4DB]">
      <h3 className="font-heading text-lg text-[#3D3229] mb-4">Your Journey</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-[#F7F3EB]/50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <span className="text-[#3D3229]">Flowers Planted</span>
          </div>
          <span className="font-handwritten text-xl text-[#7B9E87]">{entries.length}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-[#F7F3EB]/50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <span className="text-[#3D3229]">Days of Gratitude</span>
          </div>
          <span className="font-handwritten text-xl text-[#7B9E87]">{entries.length}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-[#F7F3EB]/50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✍️</span>
            <span className="text-[#3D3229]">Words Written</span>
          </div>
          <span className="font-handwritten text-xl text-[#7B9E87]">{wordCount}</span>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen pb-16" style={{
      background: 'linear-gradient(180deg, #F7F3EB 0%, #EDE8DC 100%)'
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <Header />

        <section className="mt-8">
          <EntryForm />
        </section>

        <section className="mt-12">
          <GardenCanvas />
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <CalendarWidget />
          <JourneyStats />
        </section>

        <EntryArchive />

        <footer className="mt-12 text-center text-sm">
          <a
            href="https://instagram.com/thakurxnipun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#7B9E87] hover:text-[#6B8E77] transition-colors"
          >
            Coded by @thakurxnipun
          </a>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <GardenProvider>
      <AppContent />
    </GardenProvider>
  );
}

export default App;
