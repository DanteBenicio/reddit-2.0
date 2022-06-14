import React, { useEffect } from 'react'

export const useClickOutside = (
  handler: () => void,
  elementRef: React.MutableRefObject<any>,
  ignoredElement?: React.MutableRefObject<any>,
) => {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      const clickedElement = e.target as HTMLElement

      if (ignoredElement) {
        if (
          !elementRef.current?.contains(clickedElement) &&
          clickedElement !== ignoredElement?.current
        ) {
          handler()
        }

        return ''
      }

      if (!elementRef.current?.contains(clickedElement)) {
        handler()
      }
    })

    return () => document.removeEventListener('click', () => {})
  }, [])

  return elementRef
}
