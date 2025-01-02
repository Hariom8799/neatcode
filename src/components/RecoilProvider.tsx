'use client'

import { RecoilRoot } from 'recoil'
import { useState, useEffect } from 'react'

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <RecoilRoot>{children}</RecoilRoot> : null
}

