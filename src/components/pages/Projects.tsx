import React from 'react'
import { Header } from '../Header';
import { MarkdownSection } from '../MarkdownSection';
import DateSignature from '../DateSignature';

interface ProjectsProps {
    backPage: string;
}

const Projects: React.FC<ProjectsProps> = ({backPage}) => {
  return (
    <div>
      <Header previousPage={backPage}></Header>
      <DateSignature date="18 October 2023 at 10:15am"/>
      <MarkdownSection markdownFileName='projects.txt'/>
    </div>
  )
}

export default Projects;