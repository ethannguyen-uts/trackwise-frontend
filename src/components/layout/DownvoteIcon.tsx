import React from 'react'

interface DownvoteIconProps {
  color: string
}

export const DownvoteIcon: React.FC<DownvoteIconProps> = ({ color }) => {
  const generalClassName = `h-8 w-8 ${color}`
  return (
    <svg
      className={generalClassName}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {' '}
      <path stroke="none" d="M0 0h24v24H0z" />{' '}
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
