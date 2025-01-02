'use client'

import RecoilProvider from "@/components/RecoilProvider"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <RecoilProvider>{children}</RecoilProvider>
}

