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

    const [copied, setCopied] = useState(() => false)
    
      useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }, [darkMode]);

      const handleShareClick = async (e: any) => {
      e.preventDefault(); // Prevent default behavior of <a> tag
      
      const url = window.location.href;

      const textarea = document.querySelector('.my-textarea') as HTMLTextAreaElement;;
      textarea.readOnly = true; // This prevents the keyboard from popping up
      textarea.value = url;
      textarea.select();
      const success = document.execCommand('copy');

      if (success) {
        setCopied(true);
        // Show an alert to the user
        setTimeout(() => {
          setCopied(false);
        }, 1000) 
      } else {
      }

      };

    return (
      <div className="upper-header">
        <div className="header">
            {previousPage != 'none' && <Link to={previousPage}><p><i className='fa fa-angle-left fa-2x'></i> Back</p></Link>}
            {previousPage == 'none' && <div className='disabled-back'><p><i className='fa fa-angle-left fa-2x'></i> Back</p></div>}
            {<a href='#' onClick={handleShareClick}><strong>{!copied ? 'Copy URL' : 'Copied!'}</strong> <i className='fa fa-share'></i></a>}
            {/* <Toggle
            checked={darkMode}
            onChange={handleToggle}
            icons={false}
            // icons={{ checked: darkIcon, unchecked: lightIcon }}
            aria-label='Dark mode toggle'/> */}
            <textarea className="my-textarea"></textarea>
        </div>
      </div>
    )
}
