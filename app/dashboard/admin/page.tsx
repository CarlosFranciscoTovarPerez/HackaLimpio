import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Droplets,
  Gauge,
  MapPin,
  Power,
  Settings,
  SlidersHorizontal,
} from 'lucide-react'

import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const zonasPresion = [
  {
    zona: 'Línea principal',
    ubicacion: 'Entrada general del hotel',
    presion: '18 PSI',
    estado: 'Baja',
    color: 'border-destructive/30 bg-destructive/10 text-destructive',
    accion: 'Revisar fuga o válvula parcialmente abierta.',
  },
  {
    zona: 'Torre huéspedes',
    ubicacion: 'Habitaciones y baños',
    presion: '32 PSI',
    estado: 'Normal',
    color: 'border-green-300 bg-green-100 text-green-700',
    accion: 'Mantener monitoreo automático.',
  },
  {
    zona: 'Lavandería',
    ubicacion: 'Área de servicio',
    presion: '46 PSI',
    estado: 'Alta',
    color: 'border-yellow-300 bg-yellow-100 text-yellow-700',
    accion: 'Regular presión para evitar desgaste en tuberías.',
  },
  {
    zona: 'Riego exterior',
    ubicacion: 'Jardines y áreas comunes',
    presion: '24 PSI',
    estado: 'Aceptable',
    color: 'border-blue-300 bg-blue-100 text-blue-700',
    accion: 'Programar riego fuera de horas pico.',
  },
]

const reglasPresion = [
  {
    titulo: 'Presión mínima',
    valor: '25 PSI',
    descripcion: 'Si baja de este valor, se genera alerta por posible fuga o falta de suministro.',
  },
  {
    titulo: 'Presión ideal',
    valor: '30 - 40 PSI',
    descripcion: 'Rango recomendado para mantener buen servicio sin forzar la red.',
  },
  {
    titulo: 'Presión máxima',
    valor: '45 PSI',
    descripcion: 'Si supera este valor, se recomienda regular válvula o bomba.',
  },
]

const accionesAutomaticas = [
  {
    titulo: 'Alerta por presión baja',
    estado: 'Activa',
    descripcion: 'Notifica cuando una zona baja del mínimo permitido.',
  },
  {
    titulo: 'Registro de presión cada minuto',
    estado: 'Activa',
    descripcion: 'Guarda lecturas para detectar patrones anormales.',
  },
  {
    titulo: 'Modo ahorro nocturno',
    estado: 'Programado',
    descripcion: 'Reduce presión en zonas de bajo consumo durante la noche.',
  },
  {
    titulo: 'Bloqueo por presión crítica',
    estado: 'Manual',
    descripcion: 'Permite cerrar una zona si hay fuga grave.',
  },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Gauge className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Administración de presión
            </h1>
            <p className="text-sm text-muted-foreground">
              Configura zonas, límites y acciones para controlar la presión del agua.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <Resumen
          icon={<Gauge className="h-5 w-5" />}
          titulo="Presión promedio"
          valor="30 PSI"
        />

        <Resumen
          icon={<AlertTriangle className="h-5 w-5" />}
          titulo="Zonas en alerta"
          valor="2"
        />

        <Resumen
          icon={<Droplets className="h-5 w-5" />}
          titulo="Zonas activas"
          valor="4"
        />

        <Resumen
          icon={<Activity className="h-5 w-5" />}
          titulo="Lecturas hoy"
          valor="1,284"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Zonas de presión
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 lg:grid-cols-2">
              {zonasPresion.map((zona) => (
                <div key={zona.zona} className="rounded-2xl border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{zona.zona}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {zona.ubicacion}
                      </p>
                    </div>

                    <Badge variant="outline" className={zona.color}>
                      {zona.estado}
                    </Badge>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Dato
                      icon={<Gauge className="h-4 w-4" />}
                      label="Presión actual"
                      value={zona.presion}
                    />

                    <Dato
                      icon={<Clock className="h-4 w-4" />}
                      label="Última lectura"
                      value="hace 1 min"
                    />
                  </div>

                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <p className="text-sm font-medium text-foreground">
                      Acción sugerida
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {zona.accion}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                Límites de presión
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-3">
              {reglasPresion.map((regla) => (
                <div key={regla.titulo} className="rounded-2xl border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">{regla.titulo}</p>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    {regla.valor}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {regla.descripcion}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Acciones automáticas
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {accionesAutomaticas.map((accion) => (
                <div key={accion.titulo} className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{accion.titulo}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {accion.descripcion}
                      </p>
                    </div>

                    <Badge variant="outline">{accion.estado}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Power className="h-5 w-5 text-primary" />
                Control operativo
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <ControlItem
                icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                titulo="Bomba principal"
                estado="Encendida"
              />

              <ControlItem
                icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                titulo="Válvula línea principal"
                estado="Abierta"
              />

              <ControlItem
                icon={<AlertTriangle className="h-5 w-5 text-yellow-600" />}
                titulo="Válvula lavandería"
                estado="Regular presión"
              />

              <ControlItem
                icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                titulo="Modo monitoreo"
                estado="Activo"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Resumen({
  icon,
  titulo,
  valor,
}: {
  icon: ReactNode
  titulo: string
  valor: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-bold text-foreground">{valor}</p>
          <p className="text-sm text-muted-foreground">{titulo}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function Dato({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-background p-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  )
}

function ControlItem({
  icon,
  titulo,
  estado,
}: {
  icon: ReactNode
  titulo: string
  estado: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background">
        {icon}
      </div>

      <div>
        <p className="font-medium text-foreground">{titulo}</p>
        <p className="text-sm text-muted-foreground">{estado}</p>
      </div>
    </div>
  )
}