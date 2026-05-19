'use client'

import { 
  Waves, 
  Bell, 
  Gauge, 
  Clock, 
  Droplet,
  AlertTriangle,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { waterPoints, alerts, waterLevelHistory, alertsByType } from '@/lib/data'
import { WaterLevelChart } from '@/components/charts/water-level-chart'
import { AlertsChart } from '@/components/charts/alerts-chart'
import { AquaRiskIndicator } from '@/components/aqua-risk-indicator'

export function DashboardContent() {
  const activeAlerts = alerts.filter(a => a.status === 'active').length
  const possibleLeaks = waterPoints.filter(p => p.pressure === 'low').length

  const stats = [
    { 
      label: 'Puntos monitoreados', 
      value: waterPoints.length.toString(), 
      icon: Waves,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      label: 'Alertas activas', 
      value: activeAlerts.toString(), 
      icon: Bell,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    { 
      label: 'Riesgo hídrico general', 
      value: 'Alto', 
      icon: Gauge,
      color: 'text-danger',
      bgColor: 'bg-danger/10'
    },
    { 
      label: 'Autonomía estimada', 
      value: '3.2 días', 
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    { 
      label: 'Posibles fugas', 
      value: possibleLeaks.toString(), 
      icon: Droplet,
      color: 'text-accent-foreground',
      bgColor: 'bg-accent/20'
    },
    { 
      label: 'Última lectura', 
      value: 'hace 2 min', 
      icon: Activity,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="group border-white/70 bg-white/80 transition-all hover:-translate-y-1 hover:shadow-[0_24px_70px_-46px_rgba(15,23,42,0.76)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-black tracking-tight text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AquaRiesgo Card */}
        <Card className="lg:col-span-1 overflow-hidden border-white/70 bg-white/80">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="w-5 h-5 text-primary" />
              AquaRiesgo General
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <AquaRiskIndicator score={78} />
            <div className="mt-6 rounded-2xl border border-danger/20 bg-danger/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Estado: Riesgo alto</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bajo nivel de agua, turbidez elevada y reportes ciudadanos recientes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Water Level Chart */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                Nivel de agua últimos 7 días
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <WaterLevelChart data={waterLevelHistory} />
            </CardContent>
          </Card>

          {/* Alerts by Type Chart */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-primary" />
                Alertas por tipo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <AlertsChart data={alertsByType} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Alerts */}
      <Card className="border-white/70 bg-white/80">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-destructive" />
            Alertas Recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-start gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${
                  alert.severity === 'critical' ? 'bg-destructive/10' :
                  alert.severity === 'high' ? 'bg-danger/10' :
                  alert.severity === 'medium' ? 'bg-warning/10' : 'bg-success/10'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === 'critical' ? 'text-destructive' :
                    alert.severity === 'high' ? 'text-danger' :
                    alert.severity === 'medium' ? 'text-warning' : 'text-success'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      alert.severity === 'critical' ? 'bg-destructive text-destructive-foreground' :
                      alert.severity === 'high' ? 'bg-danger text-danger-foreground' :
                      alert.severity === 'medium' ? 'bg-warning text-warning-foreground' : 'bg-success text-success-foreground'
                    }`}>
                      {alert.severity === 'critical' ? 'Crítica' :
                       alert.severity === 'high' ? 'Alta' :
                       alert.severity === 'medium' ? 'Media' : 'Baja'}
                    </span>
                    <span className="font-medium text-foreground">{alert.pointName}</span>
                    <span className="text-sm text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.cause}</p>
                  <p className="text-sm text-foreground mt-2">
                    <span className="font-medium">Recomendación:</span> {alert.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
