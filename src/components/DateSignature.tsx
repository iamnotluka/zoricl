import React from 'react'

interface DateProps {
    date: string;
}

const DateSignature: React.FC<DateProps> = ({date}) => {
  return (
    <div className='date-signature'>
      <p>{date}</p>
    </div>
  )
}

export default DateSignature;
