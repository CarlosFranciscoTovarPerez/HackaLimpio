'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Droplets, 
  Camera, 
  MapPin, 
  Send,
  AlertTriangle,
  Waves,
  Wind,
  Thermometer,
  ArrowLeft,
  CheckCircle,
  Home,
  Map,
  Bell,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const problemTypes = [
  { id: 'no-water', label: 'Falta de agua', icon: Droplets },
  { id: 'turbid', label: 'Agua turbia', icon: Waves },
  { id: 'smell', label: 'Mal olor', icon: Wind },
  { id: 'leak', label: 'Fuga de agua', icon: AlertTriangle },
  { id: 'pressure', label: 'Baja presion', icon: Thermometer },
]

export default function ReportPage() {
  const [selectedProblem, setSelectedProblem] = useState<string>('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 text-foreground shadow-sm backdrop-blur-2xl">
          <div className="mx-auto flex max-w-lg items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-bold">AquaComunidad</span>
            </Link>
          </div>
        </header>

        <main className="flex min-h-[80vh] flex-col items-center justify-center p-4">
          <div className="aqua-glass max-w-sm rounded-[2rem] p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-success/10">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground mb-2">Reporte enviado</h1>
            <p className="text-muted-foreground mb-6">
              Tu reporte ha sido recibido. El equipo de monitoreo revisara la situacion y tomara las acciones necesarias.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Numero de seguimiento: <span className="font-mono font-medium text-foreground">RPT-2024-0156</span>
            </p>
            <div className="space-y-3">
              <Link href="/report">
                <Button className="w-full" onClick={() => setSubmitted(false)}>
                  Enviar otro reporte
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 text-foreground shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 p-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/10 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 font-black tracking-tight">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="font-bold">AquaComunidad</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-foreground">Reportar problema de agua</h1>
          <p className="text-muted-foreground mt-1">
            Tu reporte ayuda a detectar y solucionar problemas mas rapido.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Type Selection */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Tipo de problema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedProblem} 
                onValueChange={setSelectedProblem}
                className="grid grid-cols-2 gap-3"
              >
                {problemTypes.map((problem) => (
                  <div key={problem.id}>
                    <RadioGroupItem
                      value={problem.id}
                      id={problem.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={problem.id}
                      className={cn(
                        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all",
                        "hover:-translate-y-0.5 hover:bg-primary/5 hover:shadow-sm",
                        selectedProblem === problem.id
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-white/80"
                      )}
                    >
                      <problem.icon className={cn(
                        "w-6 h-6 mb-2",
                        selectedProblem === problem.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-sm font-medium text-center",
                        selectedProblem === problem.id ? "text-primary" : "text-foreground"
                      )}>
                        {problem.label}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight">
                <MapPin className="w-4 h-4 text-primary" />
                Ubicacion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Ej: Calle Principal #45, Col. Centro"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button type="button" variant="outline" className="w-full gap-2">
                <MapPin className="w-4 h-4" />
                Usar mi ubicacion actual
              </Button>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight">
                <FileText className="w-4 h-4 text-primary" />
                Descripcion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe el problema que observas. Incluye detalles como desde cuando ocurre, que tan grave es, etc."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="border-white/70 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight">
                <Camera className="w-4 h-4 text-primary" />
                Foto (opcional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cursor-pointer rounded-2xl border-2 border-dashed border-white/80 bg-white/60 p-8 text-center transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Toca para tomar o subir foto
                </p>
                <p className="text-xs text-muted-foreground">
                  Una imagen ayuda a entender mejor el problema
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full gap-2"
            disabled={!selectedProblem || !location}
          >
            <Send className="w-5 h-5" />
            Enviar reporte
          </Button>
        </form>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="safe-area-pb fixed bottom-0 left-0 right-0 border-t border-white/70 bg-white/90 shadow-[0_-18px_50px_-34px_rgba(15,23,42,0.65)] backdrop-blur-2xl">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Home className="w-5 h-5" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link href="/dashboard/map" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Map className="w-5 h-5" />
            <span className="text-xs">Mapa</span>
          </Link>
          <Link href="/dashboard/alerts" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Bell className="w-5 h-5" />
            <span className="text-xs">Alertas</span>
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-1 rounded-2xl bg-primary px-4 py-2 text-primary-foreground shadow-sm">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-medium">Reportar</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
