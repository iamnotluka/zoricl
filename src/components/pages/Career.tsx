import React from 'react'
import { MarkdownSection } from '../MarkdownSection'
import DateSignature from '../DateSignature'

export default function Career() {
  return (
    <div>
        <DateSignature date="18 October 2023 at 8:21am"/>
        <MarkdownSection markdownFileName='career.txt' centralise={false}/>
    </div>
  )
}
