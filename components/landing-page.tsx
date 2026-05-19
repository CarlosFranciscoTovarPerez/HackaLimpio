'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Droplets,
  Menu,
  X,
  Activity,
  ShieldCheck,
  Bell,
  MapPin,
  ArrowRight,
  Radio,
  AlertTriangle,
  CheckCircle,
  FileText,
  Waves,
  Gauge,
  ThermometerSun,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const valueCards = [
  {
    icon: Activity,
    title: 'Monitoreo en tiempo real',
    desc: 'Sensores IoT que miden nivel, calidad y presión del agua cada minuto.',
    style: 'from-sky-500/20 to-cyan-500/10 text-primary',
  },
  {
    icon: ShieldCheck,
    title: 'Prevención de desabasto',
    desc: 'Detecta niveles bajos y programa abastecimiento antes de la crisis.',
    style: 'from-emerald-500/20 to-teal-500/10 text-secondary',
  },
  {
    icon: Waves,
    title: 'Calidad del agua',
    desc: 'Mide turbidez, pH, cloro y temperatura para garantizar agua segura.',
    style: 'from-cyan-500/20 to-sky-500/10 text-accent-foreground',
  },
  {
    icon: Bell,
    title: 'Alertas comunitarias',
    desc: 'Notificaciones automáticas a operadores y ciudadanos cuando hay riesgo.',
    style: 'from-amber-500/20 to-orange-500/10 text-warning-foreground',
  },
]

const solutionFlow = [
  { icon: Radio, label: 'Sensor IoT', color: 'bg-primary' },
  { icon: Activity, label: 'Plataforma', color: 'bg-secondary' },
  { icon: Gauge, label: 'AquaRiesgo', color: 'bg-accent' },
  { icon: Bell, label: 'Alerta', color: 'bg-warning' },
  { icon: CheckCircle, label: 'Acción', color: 'bg-success' },
  { icon: FileText, label: 'Reporte', color: 'bg-primary' },
]

const modules = [
  { icon: MapPin, title: 'Mapa Comunitario', desc: 'Visualiza todos los puntos de agua con su estado en tiempo real.' },
  { icon: Gauge, title: 'AquaRiesgo', desc: 'Índice de riesgo hídrico que combina múltiples indicadores.' },
  { icon: Bell, title: 'Sistema de Alertas', desc: 'Notificaciones por severidad con recomendaciones automáticas.' },
  { icon: CheckCircle, title: 'Acciones Correctivas', desc: 'Registro y seguimiento de acciones hasta su resolución.' },
  { icon: FileText, title: 'Reportes', desc: 'Informes semanales para municipios y autoridades.' },
  { icon: Users, title: 'Reportes Ciudadanos', desc: 'Permite a la comunidad reportar problemas desde el móvil.' },
]

const impactStats = [
  { value: '80%', label: 'Reducción de crisis hídricas' },
  { value: '24/7', label: 'Monitoreo continuo' },
  { value: '15 min', label: 'Tiempo de alerta' },
  { value: '100+', label: 'Comunidades potenciales' },
]

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 shadow-[0_18px_40px_-24px_rgba(14,165,233,0.9)]">
                <div className="absolute inset-0 rounded-2xl bg-white/20" />
                <Droplets className="relative h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">AquaComunidad</span>
            </div>

            <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/60 px-2 py-2 shadow-sm backdrop-blur-xl md:flex">
              <Link href="#inicio" className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                Inicio
              </Link>
              <Link href="#solucion" className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                Solución
              </Link>
              <Link href="#modulos" className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                Módulos
              </Link>
              <Link href="#impacto" className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                Impacto
              </Link>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link href="/dashboard">
                <Button variant="outline">Ver Dashboard</Button>
              </Link>
              <Link href="/dashboard?simulate=true">
                <Button>Simular Alerta</Button>
              </Link>
            </div>

            <button
              className="rounded-2xl border border-white/70 bg-white/70 p-2 text-foreground shadow-sm backdrop-blur-xl md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/70 bg-white/90 backdrop-blur-2xl md:hidden">
            <div className="space-y-3 px-4 py-4">
              <Link href="#inicio" className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary">
                Inicio
              </Link>
              <Link href="#solucion" className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary">
                Solución
              </Link>
              <Link href="#modulos" className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary">
                Módulos
              </Link>
              <Link href="#impacto" className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary">
                Impacto
              </Link>
              <div className="space-y-2 pt-3">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full">Ver Dashboard</Button>
                </Link>
                <Link href="/dashboard?simulate=true" className="block">
                  <Button className="w-full">Simular Alerta</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden py-20 lg:py-28">
        <div className="aqua-hero-grid absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur-xl">
                <Radio className="h-4 w-4" />
                Plataforma IoT de Alerta Temprana
              </div>
              <h1 className="aqua-gradient-text text-4xl font-black leading-tight tracking-[-0.04em] text-balance sm:text-5xl lg:text-7xl">
                Alerta temprana para proteger el agua de las comunidades
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground text-pretty sm:text-xl">
                AquaComunidad usa sensores IoT, mapas, alertas y reportes para detectar riesgos de calidad, fugas y desabasto antes de que se conviertan en una crisis.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full gap-2 px-8 sm:w-auto">
                    Ver Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard?simulate=true">
                  <Button size="lg" variant="outline" className="w-full gap-2 px-8 sm:w-auto">
                    <AlertTriangle className="h-5 w-5" />
                    Simular Alerta
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-[0_35px_90px_-55px_rgba(15,23,42,0.8)] backdrop-blur-2xl">
                <div className="rounded-[1.5rem] border border-border/70 bg-slate-950 p-5 text-white shadow-inner">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">AquaRiesgo</p>
                      <p className="mt-1 text-2xl font-black">78/100</p>
                    </div>
                    <div className="rounded-full border border-red-400/30 bg-red-500/20 px-3 py-1 text-xs font-bold text-red-200">
                      Riesgo alto
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ['Nivel', '34%', 'bg-sky-400'],
                      ['Presión', 'Baja', 'bg-amber-400'],
                      ['Turbidez', 'Elevada', 'bg-red-400'],
                      ['Alertas', '3 activas', 'bg-cyan-400'],
                    ].map(([label, value, color]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <div className={`mb-3 h-2 w-10 rounded-full ${color}`} />
                        <p className="text-xs text-slate-300">{label}</p>
                        <p className="mt-1 text-lg font-bold">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <div className="flex items-start gap-3">
                      <Bell className="mt-0.5 h-5 w-5 text-cyan-200" />
                      <div>
                        <p className="text-sm font-bold">Alerta preventiva generada</p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">
                          Notificar operador, validar sensor y enviar cuadrilla antes de que el riesgo escale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Cards */}
      <section className="relative py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((card) => (
              <Card key={card.title} className="group border-white/70 bg-white/75 transition-all hover:-translate-y-1 hover:shadow-[0_28px_80px_-48px_rgba(15,23,42,0.8)]">
                <CardContent className="p-6">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.style} shadow-sm`}>
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {card.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-200/60 bg-white/75 p-8 text-center shadow-[0_24px_80px_-55px_rgba(239,68,68,0.8)] backdrop-blur-xl sm:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">El Problema</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Muchas comunidades detectan problemas de agua demasiado tarde: cuando ya hay escasez, quejas, agua turbia o riesgos de salud. La falta de monitoreo preventivo causa crisis evitables.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucion" className="relative overflow-hidden py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.45),transparent_32rem),linear-gradient(135deg,#071827,#0f2d44_45%,#0b3f4a)]" />
        <div className="absolute inset-0 aqua-hero-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight">La Solución</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Un sistema integral que conecta sensores, análisis y acción preventiva.
            </p>
          </div>

          {/* Solution Flow */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-2">
            {solutionFlow.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2 lg:gap-4">
                <div className="flex flex-col items-center">
                  <div className="rounded-[1.35rem] border border-white/20 bg-white/10 p-2 shadow-[0_20px_60px_-35px_rgba(14,165,233,0.75)] backdrop-blur-xl">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-white/90">{item.label}</span>
                </div>
                {index < 5 && (
                  <ArrowRight className="hidden h-5 w-5 text-white/30 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modulos" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Módulos del Sistema</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Todo lo que necesitas para monitorear y proteger el agua de tu comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.title} className="group border-white/70 bg-white/75 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_80px_-48px_rgba(15,23,42,0.8)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                      <module.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-black tracking-tight text-foreground">{module.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="relative py-20">
        <div className="absolute inset-x-0 top-1/2 h-52 -translate-y-1/2 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Impacto</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Menos reacción tardía, más prevención comunitaria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="aqua-stat-card text-center">
                <div className="text-4xl font-black tracking-tight text-primary lg:text-5xl">{stat.value}</div>
                <div className="mt-3 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-white/70 bg-slate-950 text-white shadow-[0_35px_90px_-55px_rgba(15,23,42,0.95)]">
            <CardContent className="relative p-8 text-center lg:p-12">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl font-black tracking-tight">Comienza a monitorear tu comunidad</h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/70">
                  Únete a AquaComunidad y protege el recurso más valioso de tu comunidad con tecnología IoT de alerta temprana.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full gap-2 px-8 sm:w-auto">
                      Explorar Dashboard
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/report">
                    <Button size="lg" variant="outline" className="w-full gap-2 border-white/20 bg-white/10 px-8 text-white hover:bg-white/20 hover:text-white sm:w-auto">
                      <ThermometerSun className="h-5 w-5" />
                      Reportar Problema
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/70 bg-white/70 py-12 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400">
                <Droplets className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-black tracking-tight text-foreground">AquaComunidad</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma IoT de alerta temprana para comunidades.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm font-semibold text-muted-foreground hover:text-primary">
                Contacto
              </Link>
              <Link href="#" className="text-sm font-semibold text-muted-foreground hover:text-primary">
                Documentación
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
