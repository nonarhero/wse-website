'use client'

import { useEffect } from 'react'

interface TrackingTag {
  id: string
  name: string
  type: string
  code: string
  position: string
}

export function TrackingScripts() {
  useEffect(() => {
    // Fetch and inject head scripts
    const loadHeadScripts = async () => {
      try {
        const res = await fetch('/api/tracking-tags')
        const tags: TrackingTag[] = await res.json()
        
        const headTags = tags.filter(
          (tag) => tag.position === 'head' && tag.code
        )

        headTags.forEach((tag) => {
          // Check if script already exists
          const existing = document.getElementById(`tracking-script-${tag.id}`)
          if (existing) return

          // Create script container
          const container = document.createElement('div')
          container.id = `tracking-script-${tag.id}`
          container.innerHTML = tag.code
          
          // Move script tags to head
          const scripts = container.querySelectorAll('script')
          scripts.forEach((script) => {
            const newScript = document.createElement('script')
            if (script.src) {
              newScript.src = script.src
              newScript.async = script.async
              newScript.defer = script.defer
            } else {
              newScript.textContent = script.textContent
            }
            document.head.appendChild(newScript)
          })

          // Handle noscript tags
          const noscripts = container.querySelectorAll('noscript')
          noscripts.forEach((noscript) => {
            document.head.appendChild(noscript.cloneNode(true))
          })
        })
      } catch (error) {
        console.error('Failed to load tracking scripts:', error)
      }
    }

    loadHeadScripts()
  }, [])

  return null
}

export function TrackingBodyScripts() {
  useEffect(() => {
    // Fetch and inject body scripts
    const loadBodyScripts = async () => {
      try {
        const res = await fetch('/api/tracking-tags')
        const tags: TrackingTag[] = await res.json()
        
        const bodyTags = tags.filter(
          (tag) => tag.position === 'body' && tag.code
        )

        bodyTags.forEach((tag) => {
          // Check if script already exists
          const existing = document.getElementById(`tracking-body-${tag.id}`)
          if (existing) return

          // Create container and inject HTML
          const container = document.createElement('div')
          container.id = `tracking-body-${tag.id}`
          container.innerHTML = tag.code
          container.style.display = 'none'
          
          document.body.appendChild(container)

          // Execute scripts
          const scripts = container.querySelectorAll('script')
          scripts.forEach((script) => {
            const newScript = document.createElement('script')
            if (script.src) {
              newScript.src = script.src
              newScript.async = script.async
              newScript.defer = script.defer
            } else {
              newScript.textContent = script.textContent
            }
            document.body.appendChild(newScript)
          })
        })
      } catch (error) {
        console.error('Failed to load body tracking scripts:', error)
      }
    }

    loadBodyScripts()
  }, [])

  return null
}
