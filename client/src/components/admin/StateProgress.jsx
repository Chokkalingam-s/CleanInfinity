export default function StateProgress({totalUsersInWard}) {
  return (
    <div className='container flex items-center justify-center'>
      <div className='drop rounded-lg shadow-md p-6 my-4'>
        <p className='text-lg font-medium text-center'>
          <span className='block text-4xl font-bold text-light'>
            {totalUsersInWard}
          </span>
          <span className='block mt-2'>
            Ranking Of You&apos;re Ward In you&apos;re State
          </span>
        </p>
      </div>
    </div>
  )
}
