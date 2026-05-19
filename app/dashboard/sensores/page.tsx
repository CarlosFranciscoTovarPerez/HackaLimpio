'use client'

import { useMemo, useState, type ComponentType } from 'react'
import {
  Activity,
  Battery,
  CheckCircle2,
  Droplets,
  Gauge,
  MapPin,
  RadioTower,
  RefreshCw,
  Search,
  Signal,
  SlidersHorizontal,
  ThermometerSun,
  WifiOff,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { sensorNodes } from '@/lib/data'

type SensorFilter = 'Todos' | 'En línea' | 'Alerta' | 'Mantenimiento' | 'Sin señal'

const statusStyle = {
  'En línea': 'border-emerald-300 bg-emerald-50 text-emerald-700',
  Alerta: 'border-red-300 bg-red-50 text-red-700',
  Mantenimiento: 'border-amber-300 bg-amber-50 text-amber-700',
  'Sin señal': 'border-slate-300 bg-slate-100 text-slate-600',
}

const statusDot = {
  'En línea': 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]',
  Alerta: 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.15)]',
  Mantenimiento: 'bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.15)]',
  'Sin señal': 'bg-slate-400 shadow-[0_0_0_4px_rgba(148,163,184,0.15)]',
}

const sensorCardStyle = {
  'En línea':
    'border-emerald-300 bg-emerald-50/70 shadow-[0_12px_30px_rgba(16,185,129,0.12)] ring-1 ring-emerald-100',
  Alerta:
    'border-red-300 bg-red-50/70 shadow-[0_12px_30px_rgba(239,68,68,0.14)] ring-1 ring-red-100',
  Mantenimiento:
    'border-amber-300 bg-amber-50/70 shadow-[0_12px_30px_rgba(245,158,11,0.13)] ring-1 ring-amber-100',
  'Sin señal':
    'border-slate-300 bg-slate-50 shadow-[0_12px_30px_rgba(100,116,139,0.12)] ring-1 ring-slate-100',
}

const typeIcon: Record<string, ComponentType<any>> = {
  Flujo: Droplets,
  Presión: Gauge,
  Nivel: Activity,
  Calidad: ThermometerSun,
  Mixto: SlidersHorizontal,
}

export default function SensoresPage() {
  const [filter, setFilter] = useState<SensorFilter>('Todos')
  const [search, setSearch] = useState('')
  const [simulationCount, setSimulationCount] = useState(0)

  const filteredSensors = useMemo(() => {
    return sensorNodes.filter((sensor) => {
      const matchesFilter = filter === 'Todos' || sensor.status === filter
      const matchesSearch = `${sensor.name} ${sensor.location} ${sensor.type}`
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [filter, search])

  const online = sensorNodes.filter((sensor) => sensor.status === 'En línea').length
  const alerts = sensorNodes.filter((sensor) => sensor.status === 'Alerta').length

  const averageBattery = Math.round(
    sensorNodes.reduce((sum, sensor) => sum + sensor.battery, 0) / sensorNodes.length,
  )

  const averageSignal = Math.round(
    sensorNodes.reduce((sum, sensor) => sum + sensor.signal, 0) / sensorNodes.length,
  )

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-sky-200 bg-gradient-to-br from-sky-100 via-white to-cyan-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <RadioTower className="h-4 w-4" />
              Red IoT de monitoreo
            </div>

            <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
              Sensores de presión, flujo, nivel y calidad conectados al tablero
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
              Aquí el proyecto deja de ser solo una pantalla bonita: cada nodo representa datos que pueden venir
              de ESP32, sensores de flujo, presión, nivel o calidad. También permite simular lecturas para
              defender el MVP en el hackatón.
            </p>
          </div>

          <Button className="gap-2" onClick={() => setSimulationCount((value) => value + 1)}>
            <RefreshCw className="h-4 w-4" />
            Simular lectura IoT
          </Button>
        </div>
      </div>

      {simulationCount > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black tracking-tight text-foreground">Lectura simulada recibida</p>
              <p className="text-sm text-muted-foreground">
                Se actualizó la cola de telemetría local. En producción esto vendría por MQTT, API o carga
                programada desde los dispositivos.
              </p>
            </div>
            <Badge className="w-fit">Evento #{simulationCount}</Badge>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard icon={CheckCircle2} label="En línea" value={`${online}/${sensorNodes.length}`} />
        <SummaryCard icon={WifiOff} label="En alerta" value={alerts.toString()} />
        <SummaryCard icon={Battery} label="Batería promedio" value={`${averageBattery}%`} />
        <SummaryCard icon={Signal} label="Señal promedio" value={`${averageSignal}%`} />
      </div>

      <Card className="border-sky-200 bg-white/90 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar sensor, ubicación o tipo..."
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(['Todos', 'En línea', 'Alerta', 'Mantenimiento', 'Sin señal'] as const).map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={filter === item ? 'default' : 'outline'}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredSensors.map((sensor) => {
          const Icon = typeIcon[sensor.type] ?? Activity

          return (
            <Card
              key={sensor.id}
              className={`overflow-hidden rounded-[1.75rem] transition-all duration-200 hover:-translate-y-0.5 ${sensorCardStyle[sensor.status]}`}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ring-1 ring-sky-200">
                        <Icon className="h-5 w-5 text-primary" />
                      </span>
                      {sensor.name}
                    </CardTitle>

                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {sensor.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white/80">
                      {sensor.type}
                    </Badge>

                    <Badge variant="outline" className={`gap-2 ${statusStyle[sensor.status]}`}>
                      <span className={`h-2 w-2 animate-pulse rounded-full ${statusDot[sensor.status]}`} />
                      {sensor.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {sensor.pressurePsi !== undefined && (
                    <Reading label="Presión" value={`${sensor.pressurePsi} PSI`} />
                  )}

                  {sensor.flowLpm !== undefined && (
                    <Reading label="Flujo" value={`${sensor.flowLpm} L/min`} />
                  )}

                  {sensor.levelPercent !== undefined && (
                    <Reading label="Nivel" value={`${sensor.levelPercent}%`} />
                  )}

                  {sensor.ph !== undefined && <Reading label="pH" value={sensor.ph.toString()} />}

                  {sensor.turbidityNtu !== undefined && (
                    <Reading label="Turbidez" value={`${sensor.turbidityNtu} NTU`} />
                  )}

                  <Reading label="Última lectura" value={sensor.lastReading} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <SensorMeter icon={Battery} label="Batería" value={sensor.battery} />
                  <SensorMeter icon={Signal} label="Señal" value={sensor.signal} />
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
                  <p className="text-sm font-black tracking-tight text-foreground">Interpretación del sistema</p>
                  <p className="mt-1 text-sm text-muted-foreground">{sensor.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<any>
  label: string
  value: string
}) {
  return (
    <Card className="border-sky-200 bg-white/90 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-2xl font-black tracking-tight text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SensorMeter({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<any>
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <Icon className="h-4 w-4 text-primary" />
          {label}
        </span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}

function Reading({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-black tracking-tight text-foreground">{value}</p>
    </div>
  )
}