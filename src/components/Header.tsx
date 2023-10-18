import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';

interface HeaderProps {
    previousPage: string;
}

export const Header: React.FC<HeaderProps> = ({previousPage}) => {
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="header">
            {previousPage != 'none' && <Link to={previousPage}><p><i className='fa fa-angle-left fa-2x'></i> Back</p></Link>}
            {previousPage == 'none' && <div className='disabled-back'><p><i className='fa fa-angle-left fa-2x'></i> Back</p></div>}
            <Toggle
            checked={darkMode}
            onChange={handleToggle}
            icons={false}
            aria-label='Dark mode toggle'/>
        </div>
    )
}
