import {
  Clock,
  MapPin,
  Phone,
  Route,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cuadrillas = [
  {
    nombre: 'Cuadrilla hidráulica',
    lider: 'Luis May',
    zona: 'Zona hotelera',
    estado: 'En sitio',
    estadoColor: 'border-blue-300 bg-blue-100 text-blue-700',
    tarea: 'Revisar fuga probable en línea principal',
    tiempo: 'En sitio',
    integrantes: '4 técnicos',
  },
  {
    nombre: 'Mantenimiento de cisternas',
    lider: 'Ana Pech',
    zona: 'Hotel Bahía Norte',
    estado: 'En ruta',
    estadoColor: 'border-yellow-300 bg-yellow-100 text-yellow-700',
    tarea: 'Revisar cisterna con nivel bajo',
    tiempo: '18 min',
    integrantes: '3 técnicos',
  },
  {
    nombre: 'Calidad del agua',
    lider: 'Carlos Tun',
    zona: 'Escuelas y edificios',
    estado: 'Disponible',
    estadoColor: 'border-green-300 bg-green-100 text-green-700',
    tarea: 'Disponible para revisión de calidad',
    tiempo: 'Disponible',
    integrantes: '2 técnicos',
  },
]

const ordenes = [
  'Fuga probable en línea principal',
  'Cisterna con nivel bajo',
  'Presión baja en zona habitacional',
]

export default function CuadrillasPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">Cuadrillas</h1>
            <p className="text-sm text-muted-foreground">
              Asigna técnicos a los problemas detectados por el sistema.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Resumen icon={<Users className="h-5 w-5" />} titulo="Cuadrillas" valor="3" />
        <Resumen icon={<Wrench className="h-5 w-5" />} titulo="Atendiendo" valor="2" />
        <Resumen icon={<UserCheck className="h-5 w-5" />} titulo="Disponible" valor="1" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 lg:grid-cols-2">
          {cuadrillas.map((cuadrilla) => (
            <Card key={cuadrilla.nombre}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{cuadrilla.nombre}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Líder: {cuadrilla.lider}</p>
                  </div>

                  <Badge variant="outline" className={cuadrilla.estadoColor}>
                    {cuadrilla.estado}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Dato icon={<MapPin className="h-4 w-4" />} label="Zona" value={cuadrilla.zona} />
                  <Dato icon={<Clock className="h-4 w-4" />} label="Tiempo" value={cuadrilla.tiempo} />
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-foreground">Tarea actual</p>
                  <p className="mt-1 text-sm text-muted-foreground">{cuadrilla.tarea}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Dato icon={<Users className="h-4 w-4" />} label="Integrantes" value={cuadrilla.integrantes} />
                  <Dato icon={<Route className="h-4 w-4" />} label="Ruta" value="Asignada" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Llamar
                  </Button>

                  <Button className="gap-2">
                    <Route className="h-4 w-4" />
                    Ruta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Órdenes del día</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {ordenes.map((orden, index) => (
              <div key={orden} className="rounded-xl border bg-muted/30 p-3">
                <p className="font-medium text-foreground">
                  {index + 1}. {orden}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pendiente de seguimiento operativo.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Resumen({
  icon,
  titulo,
  valor,
}: {
  icon: React.ReactNode
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
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  )
}