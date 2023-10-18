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
    <h4>Career</h4>
    <p>I've done a couple of things in my life. Read my <Link to="/career">career summary here</Link>.</p>
    <h4>Happiness Algorithm</h4>
    <p>A neat framework and resources that work for me. Check it out <Link to="/happiness-algorithm">here.</Link></p>
  </div>
  )
}
