import React from 'react'
import { MarkdownSection } from '../../MarkdownSection'
import DateSignature from '../../DateSignature'
import { Header } from '../../Header'
import { Link } from 'react-router-dom';

interface CareerProps {
    backPage: string;
}

const Career: React.FC<CareerProps> = ({backPage}) => {
    return (
    <div>
        <Header previousPage={backPage}/>
        <DateSignature date="18 October 2023 at 8:21am"/>
        <MarkdownSection markdownFileName='career.txt'/>
    </div>
  )
}

export default Career;