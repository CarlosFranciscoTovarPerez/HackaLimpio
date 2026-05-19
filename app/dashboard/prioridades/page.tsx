'use client'

import { useMemo, useState, type ComponentType } from 'react'
import {
  AlertTriangle,
  ArrowDownUp,
  CheckCircle2,
  Clock,
  Droplets,
  Gauge,
  MapPin,
  Search,
  ShieldAlert,
  Users,
  Wrench,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { priorityCases } from '@/lib/data'

type PriorityFilter = 'all' | 'critical' | 'high' | 'medium'

const severityLabel = {
  critical: 'Crítica',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

const severityStyle = {
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
  high: 'bg-danger/10 text-danger border-danger/30',
  medium: 'bg-warning/10 text-warning-foreground border-warning/40',
  low: 'bg-success/10 text-success border-success/30',
}

const statusStyle = {
  Nuevo: 'bg-destructive/10 text-destructive border-destructive/30',
  Asignado: 'bg-primary/10 text-primary border-primary/30',
  'En ruta': 'bg-warning/10 text-warning-foreground border-warning/40',
  'En reparación': 'bg-secondary/10 text-secondary border-secondary/30',
  Resuelto: 'bg-success/10 text-success border-success/30',
}

export default function PrioridadesPage() {
  const [filter, setFilter] = useState<PriorityFilter>('all')
  const [search, setSearch] = useState('')

  const filteredCases = useMemo(() => {
    return priorityCases
      .filter((item) => filter === 'all' || item.severity === filter)
      .filter((item) => {
        const text = `${item.title} ${item.location} ${item.assignedCrew}`.toLowerCase()
        return text.includes(search.toLowerCase())
      })
      .sort((a, b) => b.riskScore - a.riskScore)
  }, [filter, search])

  const totalLiters = priorityCases.reduce((sum, item) => sum + item.estimatedLossLiters, 0)
  const totalCost = priorityCases.reduce((sum, item) => sum + item.estimatedCostMXN, 0)
  const criticalCount = priorityCases.filter((item) => item.severity === 'critical').length
  const affectedPeople = priorityCases.reduce((sum, item) => sum + item.affectedPeople, 0)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <ShieldAlert className="h-4 w-4" />
              Motor de prioridad operativa
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Prioriza fugas, presión y calidad antes de perder agua o servicio
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
              Esta vista toma lecturas de presión, flujo, nivel y calidad para ordenar qué se atiende primero.
              Es clave para hoteles, escuelas, comunidades y después municipios: no solo muestra alertas,
              decide dónde conviene mandar recursos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[520px]">
            <MetricCard icon={AlertTriangle} label="Críticas" value={criticalCount.toString()} />
            <MetricCard icon={Droplets} label="Litros en riesgo" value={totalLiters.toLocaleString('es-MX')} />
            <MetricCard icon={Gauge} label="Costo evitable" value={`$${totalCost.toLocaleString('es-MX')}`} />
            <MetricCard icon={Users} label="Personas/huéspedes" value={affectedPeople.toLocaleString('es-MX')} />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por zona, caso o cuadrilla..."
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
              {(['all', 'critical', 'high', 'medium'] as const).map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={filter === item ? 'default' : 'outline'}
                  onClick={() => setFilter(item)}
                >
                  {item === 'all' ? 'Todas' : severityLabel[item]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCases.map((item, index) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid gap-0 lg:grid-cols-[1fr_330px]">
                <div className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          #{index + 1} prioridad
                        </Badge>
                        <Badge variant="outline" className={severityStyle[item.severity]}>
                          {severityLabel[item.severity]}
                        </Badge>
                        <Badge variant="outline" className={statusStyle[item.status]}>
                          {item.status}
                        </Badge>
                      </div>

                      <h2 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h2>

                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-center">
                      <p className="text-xs text-muted-foreground">AquaPrioridad</p>
                      <p className="text-3xl font-bold text-primary">{item.riskScore}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <InfoPill
                      label="Pérdida estimada"
                      value={`${item.estimatedLossLiters.toLocaleString('es-MX')} L`}
                    />
                    <InfoPill
                      label="Costo estimado"
                      value={`$${item.estimatedCostMXN.toLocaleString('es-MX')} MXN`}
                    />
                    <InfoPill label="Presión" value={`${item.pressurePsi} PSI`} />
                    <InfoPill label="Diferencia flujo" value={`${item.flowDeltaPercent}%`} />
                  </div>

                  <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-foreground">Acción recomendada</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.recommendedAction}</p>
                  </div>
                </div>

                <div className="border-t border-border bg-muted/30 p-5 lg:border-l lg:border-t-0">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">Nivel de urgencia</span>
                        <span className="text-muted-foreground">{item.riskScore}%</span>
                      </div>
                      <Progress value={item.riskScore} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <SideStat icon={Users} label="Impacto" value={`${item.affectedPeople}`} />
                      <SideStat icon={Clock} label="Activo" value={`${item.ageHours} h`} />
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Wrench className="h-4 w-4 text-primary" />
                        Cuadrilla asignada
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.assignedCrew}</p>
                      <p className="mt-3 text-xs text-muted-foreground">Debe atenderse en: {item.dueIn}</p>
                    </div>

                    <Button className="w-full gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Convertir en orden de trabajo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<any>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background/80 p-3 shadow-sm">
      <Icon className="mb-2 h-4 w-4 text-primary" />
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  )
}

function SideStat({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<any>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <Icon className="mb-2 h-4 w-4 text-primary" />
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}