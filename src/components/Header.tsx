import React from 'react'
import { Link } from 'react-router-dom';

interface HeaderProps {
    previousPage: string;
}

export const Header: React.FC<HeaderProps> = ({previousPage}) => {
    const instagramLink = '';
    return (
        <div className="header">
            <Link to={previousPage}><p><i className='fa fa-angle-left fa-2x'></i> Back</p></Link>
            {/* TODO: Add share button */}
        </div>
    )
}
