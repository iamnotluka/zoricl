import React from 'react'
import { MarkdownSection } from '../MarkdownSection'
import DateSignature from '../DateSignature'
import { Link } from 'react-router-dom'
import { Header } from '../Header'

export default function Home() {
  return (
    <div>
      <Header previousPage='none'/>
      <DateSignature date='18 October 2023 at 8:36pm'/>
    <MarkdownSection markdownFileName='introduction.txt'/>
    <p>If you're a recruiter or just interested what I did in past couple of years - read my <Link to="/career">career summary</Link>.</p>
    <h4>Knowledge Base</h4>
    <p>"<i>Knowledge kept is potential unrealized."</i> - ChatGPT</p>
    <p>If you want to learn or read about tech, marketing or business - or just use some of the resources I'm currently reading. 👇</p>
    <p>Look at my <Link to="/knowledge-base">knowledge base.</Link></p>
  </div>
  )
}
