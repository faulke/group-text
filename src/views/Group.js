import React from 'react'
import { useParams } from 'react-router-dom'

const Group = () => {
  const { id } = useParams()

  return (
    <div className="page-container">
      Group is { id }
    </div>
  )
}

export default Group
