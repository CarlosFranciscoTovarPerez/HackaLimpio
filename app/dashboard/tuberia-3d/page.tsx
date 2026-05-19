'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import type { PipelineId } from '@/components/community-map'

const Pipeline3DViewer = dynamic(
  () => import('@/components/pipeline-3d-viewer').then((mod) => mod.Pipeline3DViewer),
  { ssr: false }
)

function isPipelineId(value: string | null): value is PipelineId {
  return value === 'principal' || value === 'habitacional' || value === 'escuela' || value === 'fuga'
}

function Tuberia3DContent() {
  const searchParams = useSearchParams()
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineId>('principal')

  useEffect(() => {
    const pipe = searchParams.get('pipe')

    if (isPipelineId(pipe)) {
      setSelectedPipeline(pipe)
    }
  }, [searchParams])

  return <Pipeline3DViewer selectedPipeline={selectedPipeline} />
}

export default function Tuberia3DPage() {
  return (
    <Suspense fallback={<div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 text-sm font-semibold text-muted-foreground shadow-sm backdrop-blur-xl">Cargando tubería 3D...</div>}>
      <Tuberia3DContent />
    </Suspense>
  )
}
