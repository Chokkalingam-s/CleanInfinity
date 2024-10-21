import React from 'react'

export default function Dashboard() {
  return (
    <div className='relative bg-slate-600 top-10'>
      <div className='w-52 bg-white flex'>
        <img
          src='/coins-solid.svg'
          className='w-10'
        />
        <p>500</p>
      </div>
      <div
        className='graph w-10/12 bg-slate-400 m-4'
        style={{ height: '40vh' }}
      ></div>
      <h3>How to use?</h3>
      <div className='grid grid-cols-3'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              className='p-4 w-11/12 items-center justify-center border rounded shadow'
              key={i}
            >
              {' '}
              Content {i + 1}
            </div>
          ))}
      </div>
    </div>
  )
}
