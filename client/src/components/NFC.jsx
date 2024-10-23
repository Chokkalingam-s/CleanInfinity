import Card from './Card';
import VerticalCard from './VerticalCard';

export default function NFCPage() {
  const NFCtitles = ['Pair with Biodegradable', 'Pair with Non-Biodegradable'];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">NFC</h1>
      
      {/* Card Section */}
      <div className="flex flex-col md:flex-row justify-center mb-6">
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          <Card />
        </div>
      </div>

      {/* VerticalCard Section */}
      <div className="flex flex-col items-center">
        <VerticalCard titles={NFCtitles} />
      
      </div>
    </div>
  );
}
