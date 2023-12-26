import React from 'react'
import { MarkdownSection } from '../../MarkdownSection'
import DateSignature from '../../DateSignature'
import { Link } from 'react-router-dom'
import { Header } from '../../Header'

export default function Home() {
  return (
    <div>
      <Header previousPage='none'/>
      <DateSignature date='18 October 2023 at 8:36pm'/>
    <MarkdownSection markdownFileName='introduction.txt'/>
    <p>If you're a recruiter or just interested what I did in past couple of years - read my <Link to="/career">career summary</Link>.</p>
    <h4>Knowledge Base</h4>
    <p>"<i>Knowledge kept is potential unrealized."</i> - ChatGPT</p>
    <p>Look at my <Link to="/knowledge-base">knowledge base.</Link> 📖</p>
    <h4>💡 Current Side Project</h4>
    <p>While working, I am always working on a side project. I try documenting my journey with the hope to end the series with "Lessons learned" and implement those in my next project.</p>
    <p>Check it out <Link to="/building-start-up">here.</Link></p>
  </div>
  )
}
