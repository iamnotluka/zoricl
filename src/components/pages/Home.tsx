import React from 'react'
import { MarkdownSection } from '../MarkdownSection'
import DateSignature from '../DateSignature'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <DateSignature date='18 October 2023 at 8:36pm'/>
    <MarkdownSection markdownFileName='introduction.txt'  centralise={false}/>
    <h4>Career</h4>
    <p>I've done a couple of things in my life. Read my <Link to="/career">career summary here</Link>.</p>
  </div>
  )
}
