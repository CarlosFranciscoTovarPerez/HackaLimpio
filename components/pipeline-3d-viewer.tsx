'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

import type { PipelineId } from '@/components/community-map'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, FileText, Lock, Unlock, X } from 'lucide-react'

type Props = {
  selectedPipeline: PipelineId
}

type SceneProps = Props & {
  valvesClosed: boolean
}

const pipeData = {
  principal: {
    title: 'Red Principal - Pozo Norte',
    status: 'Estable',
    risk: 22,
    color: '#0284c7',
    pressure: '42 PSI',
    flow: 'Normal',
    sensors: [
      ['Entrada Principal', '7.2 pH', -4.2],
      ['Presión Zona A', '2.8 bar', -2],
      ['Flujo Central', '52 L/min', 0.4],
      ['Turbidez', '0.5 NTU', 2.4],
      ['Salida Comunitaria', '7.1 pH', 4.2],
    ],
  },
  habitacional: {
    title: 'Ramal Zona Habitacional',
    status: 'Revisión',
    risk: 61,
    color: '#0284c7',
    pressure: '25 PSI',
    flow: 'Irregular',
    sensors: [
      ['Entrada Principal', '7.0 pH', -4.2],
      ['Presión Zona A', '2.1 bar', -2],
      ['Flujo Central', '45 L/min', 0.4],
      ['Turbidez', '0.8 NTU', 2.4],
      ['Salida Comunitaria', '6.9 pH', 4.2],
    ],
  },
  escuela: {
    title: 'Ramal Escuela Primaria',
    status: 'Crítico',
    risk: 84,
    color: '#0284c7',
    pressure: '14 PSI',
    flow: 'Bajo',
    sensors: [
      ['Entrada Principal', '6.8 pH', -4.2],
      ['Presión Baja', '1.1 bar', -2],
      ['Contaminación Detectada', 'Riesgo alto', 0.4],
      ['Turbidez Alta', '3.2 NTU', 2.4],
      ['Salida Escuela', '6.5 pH', 4.2],
    ],
  },
  fuga: {
    title: 'Tramo con posible fuga',
    status: 'Crítico',
    risk: 91,
    color: '#0284c7',
    pressure: '11 PSI',
    flow: 'Pérdida detectada',
    sensors: [
      ['Entrada Principal', '7.1 pH', -4.2],
      ['Caída Presión', '0.9 bar', -2],
      ['Fuga Detectada', 'Alerta', 0.4],
      ['Turbidez', '1.6 NTU', 2.4],
      ['Salida Baja', '6.7 pH', 4.2],
    ],
  },
}

const pipeCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-4.6, 0, 0),
  new THREE.Vector3(-2.4, -0.08, 0),
  new THREE.Vector3(0, 0.08, 0),
  new THREE.Vector3(2.4, 0.18, 0),
  new THREE.Vector3(4.6, 0, 0),
])

function FlowParticles({ valvesClosed }: { valvesClosed: boolean }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    const time = clock.getElapsedTime()

    groupRef.current.children.forEach((child, index) => {
      const speed = valvesClosed ? 0.01 : 0.12
      const offset = index * 0.08
      const progress = (time * speed + offset) % 1
      const point = pipeCurve.getPoint(progress)

      child.position.x = point.x
      child.position.y = point.y + Math.sin(time * 2 + index) * 0.045
      child.position.z = point.z + Math.cos(time * 2 + index) * 0.045
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: valvesClosed ? 5 : 18 }).map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color={valvesClosed ? '#64748b' : '#7dd3fc'}
            transparent
            opacity={valvesClosed ? 0.35 : 0.85}
            emissive={valvesClosed ? '#334155' : '#0284c7'}
            emissiveIntensity={valvesClosed ? 0.1 : 0.45}
          />
        </mesh>
      ))}
    </group>
  )
}

function ValveGate({ x, valvesClosed }: { x: number; valvesClosed: boolean }) {
  return (
    <group position={[x, 0.05, 0]}>
      <mesh position={[0, -0.03, 0]} rotation={[0, 0, valvesClosed ? Math.PI / 2 : 0]}>
        <boxGeometry args={[0.55, 0.08, 0.12]} />
        <meshStandardMaterial
          color={valvesClosed ? '#ef4444' : '#22c55e'}
          emissive={valvesClosed ? '#991b1b' : '#15803d'}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0, -0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.035, 16, 48]} />
        <meshStandardMaterial color={valvesClosed ? '#7f1d1d' : '#020617'} />
      </mesh>
    </group>
  )
}

function SensorLabel({
  title,
  value,
  x,
  color,
  valvesClosed,
}: {
  title: string
  value: string
  x: number
  color: string
  valvesClosed: boolean
}) {
  return (
    <group position={[x, 0.15, 0]}>
      <ValveGate x={0} valvesClosed={valvesClosed} />

      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={valvesClosed ? '#ef4444' : color}
          emissive={valvesClosed ? '#991b1b' : color}
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      <Html position={[0, 1.45, 0]} center distanceFactor={8}>
        <div className="rounded-xl border border-slate-600/80 bg-slate-900/90 px-3 py-2 text-white shadow-xl backdrop-blur-sm">
          <div className="whitespace-nowrap text-xs font-bold">{title}</div>
          <div className="whitespace-nowrap text-[11px] text-slate-300">
            {valvesClosed ? 'Compuerta cerrada' : value}
          </div>
        </div>
      </Html>
    </group>
  )
}

function PipeMaterial({ color, valvesClosed }: { color: string; valvesClosed: boolean }) {
  return (
    <meshStandardMaterial
      color={valvesClosed ? '#475569' : color}
      transparent
      opacity={0.78}
      roughness={0.18}
      metalness={0.35}
      emissive={valvesClosed ? '#1e293b' : color}
      emissiveIntensity={valvesClosed ? 0.03 : 0.08}
    />
  )
}

function WaterCore({ valvesClosed }: { valvesClosed: boolean }) {
  return (
    <>
      <mesh>
        <tubeGeometry args={[pipeCurve, 96, 0.19, 48, false]} />
        <meshStandardMaterial
          color={valvesClosed ? '#64748b' : '#38bdf8'}
          transparent
          opacity={valvesClosed ? 0.1 : 0.28}
          roughness={0.05}
          metalness={0.1}
          emissive={valvesClosed ? '#334155' : '#0284c7'}
          emissiveIntensity={valvesClosed ? 0.04 : 0.35}
        />
      </mesh>

      <FlowParticles valvesClosed={valvesClosed} />
    </>
  )
}

function PipeScene({ selectedPipeline, valvesClosed }: SceneProps) {
  const current = pipeData[selectedPipeline]

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 2, -4]} intensity={0.6} />

      <group rotation={[0.1, 0.15, 0]}>
        <mesh>
          <tubeGeometry args={[pipeCurve, 96, 0.28, 48, false]} />
          <PipeMaterial color={current.color} valvesClosed={valvesClosed} />
        </mesh>

        <WaterCore valvesClosed={valvesClosed} />

        <mesh position={[0, 0.17, 0.04]}>
          <tubeGeometry args={[pipeCurve, 96, 0.025, 16, false]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={valvesClosed ? 0.2 : 0.55} />
        </mesh>

        <mesh position={[-4.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.35, 32]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        <mesh position={[4.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.35, 32]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {selectedPipeline === 'habitacional' && (
          <mesh position={[0.8, 0.55, 0]} rotation={[0, 0, -0.65]}>
            <cylinderGeometry args={[0.2, 0.2, 2.2, 32]} />
            <PipeMaterial color={current.color} valvesClosed={valvesClosed} />
          </mesh>
        )}

        {selectedPipeline === 'escuela' && (
          <>
            <mesh position={[1.1, -0.55, 0]} rotation={[0, 0, 0.75]}>
              <cylinderGeometry args={[0.2, 0.2, 2.3, 32]} />
              <PipeMaterial color={current.color} valvesClosed={valvesClosed} />
            </mesh>

            <mesh position={[0.4, 0.05, 0]}>
              <sphereGeometry args={[0.65, 32, 32]} />
              <meshStandardMaterial color="#ef4444" transparent opacity={0.32} />
            </mesh>

            <mesh position={[0.4, 0.7, 0]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial color="#facc15" emissive="#ca8a04" emissiveIntensity={0.5} />
            </mesh>

            <mesh position={[0.72, 0.95, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>

            <mesh position={[0.08, 0.92, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>
          </>
        )}

        {selectedPipeline === 'fuga' && (
          <>
            <mesh position={[0.5, 0.05, 0]}>
              <sphereGeometry args={[0.65, 32, 32]} />
              <meshStandardMaterial color="#ef4444" transparent opacity={0.32} />
            </mesh>

            <mesh position={[0.5, 0.75, 0]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>

            <mesh position={[0.8, 1.05, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>

            <mesh position={[0.2, 1.0, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>
          </>
        )}

        {current.sensors.map(([title, value, x], index) => (
          <SensorLabel
            key={title}
            title={String(title)}
            value={String(value)}
            x={Number(x)}
            color={
              selectedPipeline === 'escuela' && index === 2
                ? '#ef4444'
                : index === 2 && selectedPipeline !== 'principal'
                  ? '#f59e0b'
                  : '#22c55e'
            }
            valvesClosed={valvesClosed}
          />
        ))}

        <Html position={[-4.75, -0.9, 0]} center distanceFactor={8}>
          <span className="text-xs font-bold tracking-wide text-slate-300">ENTRADA</span>
        </Html>

        <Html position={[4.55, -0.9, 0]} center distanceFactor={8}>
          <span className="text-xs font-bold tracking-wide text-slate-300">SALIDA</span>
        </Html>
      </group>

      <gridHelper args={[12, 24, '#334155', '#1e293b']} position={[0, -1.05, 0]} />
    </>
  )
}

export function Pipeline3DViewer({ selectedPipeline }: Props) {
  const [valvesClosed, setValvesClosed] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportText, setReportText] = useState('')
  const [reportSaved, setReportSaved] = useState(false)

  const current = pipeData[selectedPipeline]

  function handleSaveReport() {
    if (!reportText.trim()) return

    setReportSaved(true)
    setReportModalOpen(false)
    setReportText('')
  }

  function handleToggleValves() {
    setValvesClosed((prev) => {
      const next = !prev

      if (!next) {
        setReportModalOpen(false)
        setReportSaved(false)
        setReportText('')
      }

      return next
    })
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Visualización 3D - Sistema de Tuberías
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={valvesClosed ? 'destructive' : 'outline'} className="gap-2">
                {valvesClosed ? 'Compuertas cerradas' : `${current.status} · ${current.risk}/100`}
              </Badge>

              {valvesClosed && (
                <Button
                  size="sm"
                  onClick={() => setReportModalOpen(true)}
                  className="animate-pulse gap-2 bg-red-600 text-white shadow-[0_0_0_4px_rgba(239,68,68,0.18),0_10px_24px_rgba(239,68,68,0.28)] hover:bg-red-700"
                >
                  <FileText className="h-4 w-4" />
                  {reportSaved ? 'Reporte guardado' : 'Meter reporte'}
                </Button>
              )}

              <Button
                size="sm"
                variant={valvesClosed ? 'destructive' : 'default'}
                className="gap-2"
                onClick={handleToggleValves}
              >
                {valvesClosed ? (
                  <>
                    <Unlock className="h-4 w-4" />
                    Abrir compuertas
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Cerrar compuertas
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[430px] w-full bg-slate-950">
            <Canvas camera={{ position: [0, 2.2, 7.2], fov: 45 }}>
              <PipeScene selectedPipeline={selectedPipeline} valvesClosed={valvesClosed} />
              <OrbitControls enablePan={false} minDistance={5} maxDistance={10} />
            </Canvas>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t bg-muted/30 p-4 text-sm">
            <div className="font-medium">{current.title}</div>
            <div className="text-muted-foreground">
              Presión: {valvesClosed ? '0 PSI / tramo aislado' : current.pressure}
            </div>
            <div className="text-muted-foreground">
              Flujo: {valvesClosed ? 'Detenido' : current.flow}
            </div>
            <div className="text-muted-foreground">
              {valvesClosed
                ? 'Acción: tramo aislado para reducir pérdida mientras llega la cuadrilla'
                : `AquaRiesgo: ${current.risk}/100`}
            </div>

            {reportSaved && valvesClosed && (
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700">
                Reporte registrado
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  Reporte de emergencia
                </div>

                <h2 className="text-xl font-black tracking-tight text-slate-950">Registrar reporte del tramo</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Describe la situación detectada, la acción tomada y cualquier observación para la cuadrilla.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Cerrar reporte"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="font-bold text-slate-900">{current.title}</div>
              <div className="mt-1 text-slate-500">
                Estado: {current.status} · Riesgo: {current.risk}/100 · Presión:{' '}
                {valvesClosed ? '0 PSI / tramo aislado' : current.pressure}
              </div>
            </div>

            <textarea
              value={reportText}
              onChange={(event) => setReportText(event.target.value)}
              placeholder="Ejemplo: Se cerraron compuertas por fuga detectada. Presión crítica en el tramo. Se recomienda enviar cuadrilla con prioridad alta..."
              className="min-h-[150px] w-full resize-none rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => setReportModalOpen(false)}>
                Cancelar
              </Button>

              <Button type="button" onClick={handleSaveReport} disabled={!reportText.trim()} className="gap-2">
                <FileText className="h-4 w-4" />
                Guardar reporte
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}