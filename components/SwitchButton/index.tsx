import React from 'react'

interface SwitchButtonProps {
  state: boolean | string
}

export default function SwitchButton({ state }: SwitchButtonProps) {
  return typeof state === 'boolean' ? (
    <button
      type="button"
      role="switch"
      className={`switch-button ${state ? 'active' : ''}`}
    />
  ) : (
    <button
      type="button"
      role="switch"
      className={`switch-button ml-12 ${state === 'dark' ? 'active' : ''}`}
    />
  )
}
