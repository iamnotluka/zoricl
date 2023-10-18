import React from 'react'
import { Link } from 'react-router-dom';

interface HeaderProps {
    previousPage: string;
}

export const Header: React.FC<HeaderProps> = ({previousPage}) => {
    return (
        <div className="header">
            {previousPage != 'none' && <Link to={previousPage}><p><i className='fa fa-angle-left fa-2x'></i> Back</p></Link>}
            {previousPage == 'none' && <div className='disabled-back'><p><i className='fa fa-angle-left fa-2x'></i> Back</p></div>}
        </div>
    )
}
