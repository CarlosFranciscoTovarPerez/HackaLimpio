'use client'

import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Cog,
  FileText,
  Hotel,
  LifeBuoy,
  LockKeyhole,
  Shield,
  UsersRound,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { adminMetrics, adminPlans, crews, priorityCases, sensorNodes } from '@/lib/data'

const operationChecklist = [
  {
    title: 'Conectar sensores o carga manual',
    description:
      'Permite vender primero el software aunque el hotel ya tenga medidores o todavía no compre sensores.',
    done: true,
  },
  {
    title: 'Definir SLA de atención',
    description: 'Crítica: 2 h, alta: 6 h, media: 24 h. Esto ordena prioridades y cuadrillas.',
    done: true,
  },
  {
    title: 'Configurar plan de contingencia',
    description: 'Acciones ante fuga crítica, cisterna baja, presión anormal o riesgo de calidad.',
    done: true,
  },
  {
    title: 'Cerrar reporte ejecutivo mensual',
    description: 'Litros evitados, dinero recuperado, puntos más conflictivos y recomendaciones.',
    done: false,
  },
]

const roles = [
  {
    name: 'Administrador',
    access: 'Usuarios, planes, zonas, costos y reportes ejecutivos',
  },
  {
    name: 'Operador',
    access: 'Sensores, alertas, prioridades y creación de órdenes',
  },
  {
    name: 'Cuadrilla',
    access: 'Órdenes asignadas, evidencia y estado de reparación',
  },
  {
    name: 'Cliente hotel/municipio',
    access: 'Dashboard, indicadores, reportes y ahorro estimado',
  },
]

export default function AdminPage() {
  const openCases = priorityCases.filter((item) => item.status !== 'Resuelto').length
  const sensorsInAlert = sensorNodes.filter((sensor) => sensor.status === 'Alerta').length
  const activeCrews = crews.filter((crew) => crew.status !== 'Disponible' && crew.status !== 'Fuera de turno').length

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-sidebar/10 via-background to-primary/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Administración del servicio
            </div>

            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Control comercial, operativo y de configuración del sistema
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
              Esta sección sirve para defender cómo se opera y cómo se cobra el proyecto. La fase 1 puede
              venderse a hoteles y grandes consumidores; después se escala a concesionarias, municipios y
              comunidades con más sensores y cobertura.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Cog className="h-4 w-4" />
              Configurar zonas
            </Button>

            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generar propuesta
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {adminMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                Planes de cobro para hacerlo viable
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 lg:grid-cols-3">
                {adminPlans.map((plan) => (
                  <div key={plan.id} className="flex flex-col rounded-2xl border border-border bg-muted/20 p-4">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-3 bg-background">
                        {plan.target}
                      </Badge>

                      <h2 className="text-lg font-semibold text-foreground">{plan.name}</h2>

                      <p className="mt-2 text-2xl font-bold text-primary">{plan.monthlyPrice}</p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Implementación: {plan.implementation}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {plan.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Uso recomendado:</span> {plan.idealFor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Configuración operativa mínima
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {operationChecklist.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {item.done ? (
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <LifeBuoy className="h-4 w-4 text-warning" />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <LockKeyhole className="h-5 w-5 text-primary" />
                Roles y permisos
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {roles.map((role) => (
                  <div key={role.name} className="rounded-xl border border-border bg-background p-4">
                    <p className="font-semibold text-foreground">{role.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{role.access}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                Estado del cliente piloto
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Hotel className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">Hotel Bahía Norte</p>
                    <p className="text-sm text-muted-foreground">Piloto privado · Cancún</p>
                  </div>
                </div>
              </div>

              <SideMetric label="Casos abiertos" value={openCases.toString()} progress={75} />
              <SideMetric label="Sensores en alerta" value={sensorsInAlert.toString()} progress={40} />
              <SideMetric label="Cuadrillas activas" value={activeCrews.toString()} progress={65} />

              <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
                <p className="font-semibold text-foreground">¿Qué es contingencia?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Es el colchón operativo para emergencias: refacciones, visitas extra, sensores de reemplazo,
                  soporte fuera de horario o acciones rápidas cuando una fuga o cisterna baja pone en riesgo el
                  servicio.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UsersRound className="h-5 w-5 text-primary" />
                Modelo de crecimiento
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {[
                ['Fase 1', 'Hoteles y grandes consumidores para validar ahorro y cobrar rápido.'],
                ['Fase 2', 'PYMES, plazas, escuelas privadas, edificios y desarrollos residenciales.'],
                ['Fase 3', 'Municipios, concesionarias y organismos operadores con mapas por sectores.'],
              ].map(([phase, text]) => (
                <div key={phase} className="rounded-xl border border-border bg-muted/30 p-4">
                  <Badge variant="outline" className="mb-2 bg-background">
                    {phase}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SideMetric({
  label,
  value,
  progress,
}: {
  label: string
  value: string
  progress: number
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <Progress value={progress} />
    </div>
  )
}