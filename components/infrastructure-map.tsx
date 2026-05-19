'use client'

import { useRouter } from 'next/navigation'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, Droplets, AlertTriangle } from 'lucide-react'
import type { PipelineId } from '@/components/community-map'

type PipeStatus = 'stable' | 'warning' | 'critical'

type WaterPoint = {
  name: string
  type: string
  status: PipeStatus
  position: [number, number]
  pipelineId: PipelineId
}

const center: [number, number] = [21.1619, -86.8515]

const pipelines: {
  id: PipelineId
  name: string
  status: PipeStatus
  pressure: string
  risk: number
  flow: string
  positions: [number, number][]
}[] = [
  {
    id: 'principal',
    name: 'Red Principal - Pozo Norte',
    status: 'stable',
    pressure: '42 PSI',
    risk: 22,
    flow: 'Normal',
    positions: [
      [21.174, -86.865],
      [21.1695, -86.858],
      [21.166, -86.854],
      [21.162, -86.851],
      [21.158, -86.848],
      [21.154, -86.845],
    ],
  },
  {
    id: 'habitacional',
    name: 'Ramal Zona Habitacional',
    status: 'warning',
    pressure: '25 PSI',
    risk: 61,
    flow: 'Irregular',
    positions: [
      [21.1695, -86.858],
      [21.169, -86.852],
      [21.168, -86.846],
      [21.166, -86.842],
      [21.164, -86.837],
    ],
  },
  {
    id: 'escuela',
    name: 'Ramal Escuela Primaria',
    status: 'critical',
    pressure: '14 PSI',
    risk: 84,
    flow: 'Bajo',
    positions: [
      [21.162, -86.851],
      [21.159, -86.849],
      [21.156, -86.846],
      [21.153, -86.843],
      [21.150, -86.840],
    ],
  },
  {
    id: 'fuga',
    name: 'Tramo con posible fuga',
    status: 'critical',
    pressure: '11 PSI',
    risk: 91,
    flow: 'Pérdida detectada',
    positions: [
      [21.166, -86.854],
      [21.164, -86.858],
      [21.162, -86.862],
      [21.160, -86.866],
      [21.158, -86.870],
    ],
  },
]

const secondaryPipes: [number, number][][] = [
  [
    [21.174, -86.865],
    [21.176, -86.86],
    [21.178, -86.855],
  ],
  [
    [21.1695, -86.858],
    [21.172, -86.856],
    [21.175, -86.853],
  ],
  [
    [21.166, -86.854],
    [21.166, -86.849],
    [21.166, -86.844],
  ],
  [
    [21.162, -86.851],
    [21.160, -86.847],
    [21.158, -86.843],
  ],
  [
    [21.158, -86.848],
    [21.155, -86.851],
    [21.152, -86.854],
  ],
  [
    [21.164, -86.837],
    [21.161, -86.835],
    [21.158, -86.833],
  ],
]

const waterPoints: WaterPoint[] = [
  {
    name: 'Pozo Principal',
    type: 'Captación',
    status: 'stable',
    position: [21.1695, -86.858],
    pipelineId: 'principal',
  },
  {
    name: 'Tinaco Comunitario',
    type: 'Almacenamiento',
    status: 'warning',
    position: [21.162, -86.851],
    pipelineId: 'habitacional',
  },
  {
    name: 'Escuela Primaria',
    type: 'Punto sensible',
    status: 'critical',
    position: [21.150, -86.840],
    pipelineId: 'escuela',
  },
  {
    name: 'Posible fuga',
    type: 'Incidencia',
    status: 'critical',
    position: [21.160, -86.866],
    pipelineId: 'fuga',
  },
  {
    name: 'Sensor Kabah',
    type: 'Sensor de presión',
    status: 'stable',
    position: [21.166, -86.854],
    pipelineId: 'principal',
  },
  {
    name: 'Sensor Centro',
    type: 'Sensor de flujo',
    status: 'warning',
    position: [21.168, -86.846],
    pipelineId: 'habitacional',
  },
]

function getColor(status: PipeStatus) {
  if (status === 'critical') return '#ef4444'
  if (status === 'warning') return '#f59e0b'
  return '#10b981'
}

function getLabel(status: PipeStatus) {
  if (status === 'critical') return 'Crítico'
  if (status === 'warning') return 'Revisión'
  return 'Estable'
}

export function InfrastructureMap() {
  const router = useRouter()

  function goTo3D(pipelineId: PipelineId) {
    router.push(`/dashboard/tuberia-3d?pipe=${pipelineId}`)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-card">
        <CardTitle className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Red de tuberías
          </div>

          <Badge variant="outline" className="gap-2">
            <Droplets className="h-3.5 w-3.5 text-primary" />
            Click en un punto para ver modelo 3D
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mx-auto aspect-square w-full max-w-[760px] overflow-hidden rounded-xl border border-border">
          <MapContainer center={center} zoom={14} scrollWheelZoom className="h-full w-full">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {secondaryPipes.map((pipe, index) => (
              <Polyline
                key={`secondary-${index}`}
                positions={pipe}
                pathOptions={{
                  color: '#38bdf8',
                  weight: 3,
                  opacity: 0.45,
                  dashArray: '6 6',
                }}
              />
            ))}

            {pipelines.map((pipe) => (
              <Polyline
                key={pipe.id}
                positions={pipe.positions}
                pathOptions={{
                  color: getColor(pipe.status),
                  weight: 7,
                  opacity: 0.85,
                }}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{pipe.name}</p>
                    <p>Estado: {getLabel(pipe.status)}</p>
                    <p>Presión: {pipe.pressure}</p>
                    <p>Flujo: {pipe.flow}</p>
                    <p>AquaRiesgo: {pipe.risk}/100</p>
                  </div>
                </Popup>
              </Polyline>
            ))}

            {waterPoints.map((point) => (
              <CircleMarker
                key={point.name}
                center={point.position}
                radius={12}
                eventHandlers={{
                  click: () => goTo3D(point.pipelineId),
                }}
                pathOptions={{
                  color: '#ffffff',
                  fillColor: getColor(point.status),
                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{point.name}</p>
                    <p>Tipo: {point.type}</p>
                    <p>Estado: {getLabel(point.status)}</p>
                    <p className="text-xs text-slate-500">
                      Click en el punto para abrir su modelo 3D.
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Estable
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            Requiere revisión
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            Crítico
          </div>

          <div className="ml-auto flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            
          </div>
        </div>
      </CardContent>
    </Card>
  )
}