'use client'

import { useMemo, useState, type ElementType } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Map,
  MapPin,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { crews, priorityCases } from '@/lib/data'

type CrewFilter = 'Todas' | 'Disponible' | 'Asignada' | 'En ruta' | 'En sitio' | 'Fuera de turno'

const statusStyle = {
  Disponible: 'bg-success/10 text-success border-success/30',
  Asignada: 'bg-primary/10 text-primary border-primary/30',
  'En ruta': 'bg-warning/10 text-warning-foreground border-warning/40',
  'En sitio': 'bg-secondary/10 text-secondary border-secondary/30',
  'Fuera de turno': 'bg-muted text-muted-foreground border-border',
}

export default function CuadrillasPage() {
  const [filter, setFilter] = useState<CrewFilter>('Todas')
  const [search, setSearch] = useState('')

  const filteredCrews = useMemo(() => {
    return crews.filter((crew) => {
      const matchesFilter = filter === 'Todas' || crew.status === filter
      const matchesSearch = `${crew.name} ${crew.lead} ${crew.zone} ${crew.skills.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [filter, search])

  const activeCrews = crews.filter((crew) => crew.status !== 'Disponible' && crew.status !== 'Fuera de turno').length
  const availableCrews = crews.filter((crew) => crew.status === 'Disponible').length
  const activeTasks = priorityCases.filter((item) => item.status !== 'Resuelto').length
  const totalMembers = crews.reduce((sum, crew) => sum + crew.members, 0)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/10 via-background to-primary/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
              <Users className="h-4 w-4" />
              Gestión de cuadrillas
            </div>

            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Asigna técnicos según urgencia, zona y tipo de problema
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
              Esta sección convierte las alertas en operación real: quién va, a dónde va, qué sabe reparar y
              cuánto tardará. Es la parte que demuestra que el sistema no solo detecta fugas, también ayuda a
              resolverlas.
            </p>
          </div>

          <Button className="gap-2">
            <Route className="h-4 w-4" />
            Optimizar ruta del día
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard icon={Users} label="Cuadrillas activas" value={activeCrews.toString()} />
        <SummaryCard icon={CheckCircle2} label="Disponibles" value={availableCrews.toString()} />
        <SummaryCard icon={AlertTriangle} label="Órdenes abiertas" value={activeTasks.toString()} />
        <SummaryCard icon={ShieldCheck} label="Técnicos totales" value={totalMembers.toString()} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar cuadrilla, zona o habilidad..."
                    className="pl-9"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['Todas', 'Disponible', 'Asignada', 'En ruta', 'En sitio', 'Fuera de turno'] as const).map(
                    (item) => (
                      <Button
                        key={item}
                        size="sm"
                        variant={filter === item ? 'default' : 'outline'}
                        onClick={() => setFilter(item)}
                      >
                        {item}
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredCrews.map((crew) => (
              <Card key={crew.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                          <Wrench className="h-5 w-5 text-secondary" />
                        </span>
                        {crew.name}
                      </CardTitle>

                      <p className="mt-2 text-sm text-muted-foreground">{crew.lead}</p>
                    </div>

                    <Badge variant="outline" className={statusStyle[crew.status]}>
                      {crew.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Info label="Integrantes" value={crew.members.toString()} />
                    <Info label="ETA" value={crew.eta} />
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Zona de cobertura
                    </p>
                    <p className="text-sm text-muted-foreground">{crew.zone}</p>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Especialidad</p>
                    <div className="flex flex-wrap gap-2">
                      {crew.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-muted/40">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-foreground">Tarea actual</p>
                    <p className="mt-1 text-sm text-muted-foreground">{crew.activeTask}</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">Carga operativa</span>
                      <span className="text-muted-foreground">{crew.workloadPercent}%</span>
                    </div>
                    <Progress value={crew.workloadPercent} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Contactar
                    </Button>

                    <Button className="gap-2">
                      <Map className="h-4 w-4" />
                      Ver ruta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Cola de trabajo sugerida
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {priorityCases.map((item, index) => (
              <div key={item.id} className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {index + 1}. {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                  </div>

                  <Badge variant="outline" className="bg-background">
                    {item.riskScore}
                  </Badge>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Asignar a: <span className="font-medium text-foreground">{item.assignedCrew}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
            <Icon className="h-5 w-5 text-secondary" />
          </div>

          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  )
}