'use client'

import { useEffect, useState } from 'react'
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

export default function Tuberia3DPage() {
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