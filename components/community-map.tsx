'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

export type PipelineId = 'principal' | 'habitacional' | 'escuela' | 'fuga'

const InfrastructureMap = dynamic(
  () => import('@/components/infrastructure-map').then((mod) => mod.InfrastructureMap),
  { ssr: false }
)

const Pipeline3DViewer = dynamic(
  () => import('@/components/pipeline-3d-viewer').then((mod) => mod.Pipeline3DViewer),
  { ssr: false }
)

export function CommunityMap() {
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineId>('principal')

  return (
    <div className="space-y-6">
      <InfrastructureMap
        selectedPipeline={selectedPipeline}
        onSelectPipeline={setSelectedPipeline}
      />

    
    </div>
  )
}