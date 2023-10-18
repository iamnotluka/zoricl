import React from 'react'
import { MarkdownSection } from '../MarkdownSection'
import DateSignature from '../DateSignature'
import { Header } from '../Header'

interface HappinessAlgorithmProps {
    backPage: string;
}

export const HappinessAlgorithm: React.FC<HappinessAlgorithmProps> = ({backPage}) => {
    return (
    <div>
        <Header previousPage={backPage}/>
        <DateSignature date="18 October 2023 at 9:25am"/>
        <MarkdownSection markdownFileName='happiness_algorithm.txt'/>
    </div>
  )
}
