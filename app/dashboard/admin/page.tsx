import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Hotel,
  Settings,
  Shield,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const planes = [
  {
    nombre: 'Software',
    precio: '$4,999 / mes',
    ideal: 'Hoteles que ya tienen sensores o medidores.',
  },
  {
    nombre: 'Software + sensores',
    precio: '$9,999 / mes',
    ideal: 'Hoteles que necesitan monitoreo desde cero.',
  },
  {
    nombre: 'Municipal',
    precio: 'Desde $29,999 / mes',
    ideal: 'Municipios o concesionarias con varias zonas.',
  },
]

const roles = [
  {
    nombre: 'Administrador',
    permiso: 'Configura usuarios, planes, zonas y reportes.',
  },
  {
    nombre: 'Operador',
    permiso: 'Revisa alertas, sensores y prioridades.',
  },
  {
    nombre: 'Cuadrilla',
    permiso: 'Consulta órdenes asignadas y actualiza avances.',
  },
]

const configuracion = [
  'Zonas monitoreadas',
  'Sensores activos',
  'Usuarios y permisos',
  'Reportes mensuales',
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">Administración</h1>
            <p className="text-sm text-muted-foreground">
              Controla usuarios, planes, configuración y operación del servicio.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <Resumen icon={<Hotel className="h-5 w-5" />} titulo="Cliente piloto" valor="Hotel" />
        <Resumen icon={<Building2 className="h-5 w-5" />} titulo="Zonas" valor="4" />
        <Resumen icon={<Users className="h-5 w-5" />} titulo="Usuarios" valor="8" />
        <Resumen icon={<CircleDollarSign className="h-5 w-5" />} titulo="Plan actual" valor="SaaS" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                Planes de cobro
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-3">
              {planes.map((plan) => (
                <div key={plan.nombre} className="rounded-2xl border bg-muted/30 p-4">
                  <Badge variant="outline" className="mb-3 bg-background">
                    {plan.nombre}
                  </Badge>

                  <p className="text-xl font-bold text-primary">{plan.precio}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.ideal}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Roles del sistema
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3 md:grid-cols-3">
              {roles.map((rol) => (
                <div key={rol.nombre} className="rounded-xl border bg-muted/30 p-4">
                  <p className="font-semibold text-foreground">{rol.nombre}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{rol.permiso}</p>
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
                Configuración rápida
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {configuracion.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <p className="font-medium text-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Uso en el proyecto
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Esta sección sirve para administrar el sistema: usuarios, permisos,
                planes de cobro y configuración del cliente. Para el MVP del hackatón,
                ayuda a demostrar que la solución puede venderse primero a hoteles
                y después escalar a municipios.
              </p>
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