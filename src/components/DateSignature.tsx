import React from 'react'

interface DateProps {
    date?: string;
}

const getCurrentDateFormatted = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${day} ${month} ${year} at ${formattedHours}:${formattedMinutes}${ampm}`;
}

const DateSignature: React.FC<DateProps> = ({date}) => {
  if (!date) {
    date = getCurrentDateFormatted();
  }
  return (
    <div className='date-signature'>
      <p>{date}</p>
    </div>
  )
}

export default DateSignature;
