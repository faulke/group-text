import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/monokai-sublime.css'

const Highlight = ({ children }) => {
  const codeNode = React.createRef()

  const highlight = () => {
    codeNode &&
      codeNode.current &&
      hljs.highlightBlock(codeNode.current)
  }

  useEffect(() => {
    highlight()
  }, [])

  return (
    <pre className="rounded">
      <code ref={codeNode} className="json">
        {children}
      </code>
    </pre>
  )
}

Highlight.propTypes = {
  children: PropTypes.string.isRequired
}

export default Highlight
