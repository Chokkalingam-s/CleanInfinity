
import NFCCard from './NFC-Card';
export default function NFCPage() {
  const NFCtitles = ['Pair with BioDegradable', 'Pair with NonDegradable'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-lightest-green"> {/* Center content with full height */}
      <h1 className="text-3xl font-bold text-center mb-2">NFC</h1>
      
      {/* Card Section */}
      <div className="flex flex-col md:flex-row justify-center align-content-center  mb-1 w-full">
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          {/* Content for the first card can go here */}
        </div>
      </div>

      {/* VerticalCard Section */}
      <div className="flex flex-col items-center justify-center mb-1 w-full">
        <NFCCard titles={NFCtitles} />
      </div>

      {/* Information Section */}
      <div className="p-4 flex flex-col items-center justify-center bg-white rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300 mt-8 w-full md:w-3/4 lg:w-1/2">
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold text-lime-600">What is NFC?</h2>
          <p className="mt-2 text-gray-700 text-left">
            NFC (Near Field Communication) is used to get coins based on the waste we segregate and put in the dustbin.
          </p>
        </div>
        <div className="p-5 text-left">
          <h3 className="text-xl font-semibold text-gray-800 text-left">Benefits:</h3>
          <p className="mt-2 text-gray-600 text-left">
            - Encourages waste segregation<br />
            - Rewards for recycling efforts<br />
            - Easy and efficient usage
          </p>
        </div>
      </div>
    </div>
  );
}
