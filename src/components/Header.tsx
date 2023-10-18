import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';

interface HeaderProps {
    previousPage: string;
}

const darkIcon = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <i className="fa fa-moon-o" style={{ fontSize: '10px', marginLeft: '8px', color: 'gray' }} />
    </div>
  );
  
  const lightIcon = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <i className="fa fa-sun-o" style={{ fontSize: '10px', color: '#DCB13D', marginLeft: '-25px' }} />
    </div>
  );
  
export const Header: React.FC<HeaderProps> = ({previousPage}) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true' ? true : false;
      });
    
      const handleToggle = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
      };
    
      useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }, [darkMode]);
    return (
        <div className="header">
            {previousPage != 'none' && <Link to={previousPage}><p><i className='fa fa-angle-left fa-2x'></i> Back</p></Link>}
            {previousPage == 'none' && <div className='disabled-back'><p><i className='fa fa-angle-left fa-2x'></i> Back</p></div>}
            <Toggle
            checked={darkMode}
            onChange={handleToggle}
            icons={false}
            // icons={{ checked: darkIcon, unchecked: lightIcon }}
            aria-label='Dark mode toggle'/>
        </div>
    )
}
