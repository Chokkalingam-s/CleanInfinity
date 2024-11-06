import NFCCard from './NFC-Card'
export default function NFCPage() {
  const NFCtitles = ['Pair with BioDegradable', 'Pair with NonDegradable']

  return (
    <div className='flex flex-col items-center justify-center container'>
      <h1 className='text-3xl font-bold text-center mb-2'>NFC</h1>

      <div className='flex flex-col md:flex-row justify-center align-content-center mb-1 w-full'>
        <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
          
        </div>
      </div>

      <div className='flex flex-col items-center justify-center mb-1 w-full'>
        <NFCCard titles={NFCtitles} />
      </div>

      <div className='p-4 flex flex-col drop rounded-lg shadow-xl hover:shadow-md transition-shadow duration-150 mt-4 md:w-3/4 lg:w-1/2'>
        <div className='p-5'>
          <h2>What is NFC?</h2>
          <p className='mt-2'>
            NFC (Near Field Communication) is used to get coins based on the
            waste we segregate and put in the dustbin.
          </p>
        </div>
        <div className='p-5'>
          <h3>Benefits:</h3>
          <p className='mt-2'>
            - Encourages waste segregation
            <br />
            - Rewards for recycling efforts
            <br />- Easy and efficient usage
          </p>
        </div>
      </div>
    </div>
  )
}
