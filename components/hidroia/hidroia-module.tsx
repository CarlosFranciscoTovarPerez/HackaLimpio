'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Gauge,
  Lightbulb,
  MessageSquare,
  Microscope,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Waves,
  Wrench,
  Zap,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { alerts, waterPoints } from '@/lib/data'
import {
  getHidroIAInsights,
  getHidroIASummary,
  hidroIACategoryLabels,
  hidroIAQuestions,
  hidroIAScenarios,
  type HidroIACategory,
  type HidroIAInsight,
  type HidroIASeverity,
} from '@/lib/hidroia'
import { cn } from '@/lib/utils'

type CategoryFilter = HidroIACategory | 'all'

const categoryIcons: Record<HidroIACategory, React.ElementType> = {
  fuga: Droplets,
  calidad: Microscope,
  abasto: Waves,
  mantenimiento: Wrench,
}

const severityLabels: Record<HidroIASeverity, string> = {
  critical: 'Crítica',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

const severityStyles: Record<HidroIASeverity, string> = {
  critical: 'bg-destructive text-destructive-foreground border-destructive/30',
  high: 'bg-danger text-danger-foreground border-danger/30',
  medium: 'bg-warning text-warning-foreground border-warning/30',
  low: 'bg-success text-success-foreground border-success/30',
}

const categoryStyles: Record<HidroIACategory, string> = {
  fuga: 'bg-primary/10 text-primary',
  calidad: 'bg-secondary/10 text-secondary',
  abasto: 'bg-accent/20 text-accent-foreground',
  mantenimiento: 'bg-muted text-muted-foreground',
}

function answerQuestion(question: string, priority?: HidroIAInsight) {
  const lowerQuestion = question.toLowerCase()

  if (!priority) {
    return 'Con las lecturas actuales no hay una prioridad crítica. Mantén el monitoreo, valida sensores sin conexión y genera una lectura manual si falta telemetría.'
  }

  if (lowerQuestion.includes('fuga')) {
    return `Sí. La señal más fuerte está en ${
      priority.category === 'fuga' ? priority.pointName : 'los puntos con presión baja'
    }. Revisa presión, nivel y caudal de entrada/salida antes de enviar cuadrilla.`
  }

  if (
    lowerQuestion.includes('hoy') ||
    lowerQuestion.includes('primero') ||
    lowerQuestion.includes('prioridad')
  ) {
    return `Actúa primero en ${priority.pointName}. Motivo: ${priority.summary} La acción recomendada es: ${priority.action}`
  }

  if (
    lowerQuestion.includes('resumen') ||
    lowerQuestion.includes('ejecutivo')
  ) {
    return `Resumen ejecutivo: HidroIA detecta como prioridad ${priority.pointName}, con severidad ${severityLabels[
      priority.severity
    ].toLowerCase()} y ${priority.confidence}% de confianza. Impacto esperado: ${priority.impact}`
  }

  return `HidroIA recomienda revisar ${priority.pointName}. ${priority.summary} Acción sugerida: ${priority.action}`
}

export function HidroIAModule() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [question, setQuestion] = useState('¿Dónde debo actuar primero?')
  const [answer, setAnswer] = useState('')

  const insights = useMemo(() => getHidroIAInsights(waterPoints, alerts), [])
  const summary = useMemo(
    () => getHidroIASummary(waterPoints, alerts, insights),
    [insights],
  )

  const priority = insights[0]

  const filteredInsights = insights.filter((insight) => {
    const matchesCategory =
      categoryFilter === 'all' || insight.category === categoryFilter

    const matchesSearch =
      searchQuery === '' ||
      insight.pointName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const stats = [
    {
      label: 'Riesgo promedio',
      value: `${summary.averageRisk}/100`,
      icon: Gauge,
      bg: 'bg-primary/10',
      color: 'text-primary',
    },
    {
      label: 'Alertas IA críticas',
      value: summary.criticalInsights.toString(),
      icon: AlertTriangle,
      bg: 'bg-destructive/10',
      color: 'text-destructive',
    },
    {
      label: 'Posibles fugas',
      value: summary.possibleLeaks.toString(),
      icon: Droplets,
      bg: 'bg-accent/20',
      color: 'text-accent-foreground',
    },
    {
      label: 'Confianza IA',
      value: `${summary.averageConfidence}%`,
      icon: ShieldCheck,
      bg: 'bg-success/10',
      color: 'text-success',
    },
  ]

  function handleAsk(customQuestion?: string) {
    const nextQuestion = customQuestion ?? question
    setQuestion(nextQuestion)
    setAnswer(answerQuestion(nextQuestion, priority))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
        <Card className="overflow-hidden bg-card">
          <CardContent className="p-0">
            <div className="relative overflow-hidden border-b border-border bg-primary/5 p-5 sm:p-6">
              <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-primary/10 blur-2xl sm:block" />

              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <Badge className="mb-3 bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    IA interna de operación hídrica
                  </Badge>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    HidroIA: prioriza fugas, calidad y desabasto antes de que escalen
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    Analiza lecturas de presión, nivel, turbidez, cloro y autonomía
                    para convertir telemetría en decisiones operativas claras.
                  </p>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-background/80 p-4 shadow-sm lg:w-72">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Prioridad actual
                      </p>
                      <p className="font-black tracking-tight text-foreground">
                        {summary.priorityPoint}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Confianza del diagnóstico</span>
                      <span>{summary.averageConfidence}%</span>
                    </div>
                    <Progress value={summary.averageConfidence} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-warning" />
              Decisión inmediata
            </CardTitle>
            <CardDescription>
              Lo que la IA recomienda atender primero.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
              <p className="text-sm font-black tracking-tight text-foreground">
                {summary.priorityTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {summary.executiveSummary}
              </p>
            </div>

            <Button
              className="w-full gap-2"
              onClick={() => handleAsk('¿Dónde debo actuar primero?')}
            >
              Generar recomendación
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    stat.bg,
                  )}
                >
                  <stat.icon className={cn('h-5 w-5', stat.color)} />
                </div>

                <div className="min-w-0">
                  <p className="text-2xl font-black tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Asistente operativo
                  </CardTitle>
                  <CardDescription>
                    Haz preguntas rápidas con base en las lecturas actuales.
                  </CardDescription>
                </div>

                <Badge variant="outline">Modo demo con reglas IA</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-2">
                {hidroIAQuestions.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAsk(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <Textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ejemplo: ¿Qué punto tiene mayor probabilidad de fuga?"
                  className="min-h-[92px] resize-none"
                />

                <Button className="gap-2 md:self-end" onClick={() => handleAsk()}>
                  <Send className="h-4 w-4" />
                  Preguntar
                </Button>
              </div>

              {answer && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-black tracking-tight text-foreground">
                        Respuesta de HidroIA
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Diagnósticos detectados ({filteredInsights.length})
                  </CardTitle>
                  <CardDescription>
                    Explicación, evidencia y acción recomendada por punto.
                  </CardDescription>
                </div>

                <div className="relative w-full lg:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Buscar diagnóstico..."
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(
                  [
                    'all',
                    'fuga',
                    'calidad',
                    'abasto',
                    'mantenimiento',
                  ] as const
                ).map((category) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? 'default' : 'outline'}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setCategoryFilter(category)}
                  >
                    {hidroIACategoryLabels[category]}
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredInsights.map((insight) => {
                  const Icon = categoryIcons[insight.category]

                  return (
                    <div
                      key={insight.id}
                      className={cn(
                        'rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50',
                        insight.severity === 'critical' &&
                          'border-l-4 border-l-destructive',
                        insight.severity === 'high' &&
                          'border-l-4 border-l-danger',
                        insight.severity === 'medium' &&
                          'border-l-4 border-l-warning',
                        insight.severity === 'low' &&
                          'border-l-4 border-l-success',
                      )}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                            categoryStyles[insight.category],
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-black tracking-tight text-foreground">
                              {insight.title}
                            </h3>

                            <Badge className={severityStyles[insight.severity]}>
                              {severityLabels[insight.severity]}
                            </Badge>

                            <Badge variant="outline">
                              {insight.confidence}% confianza
                            </Badge>
                          </div>

                          <p className="mt-1 text-sm font-medium text-primary">
                            {insight.pointName}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {insight.summary}
                          </p>

                          <div className="mt-3 grid gap-3 lg:grid-cols-2">
                            <div className="rounded-lg bg-background p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Acción sugerida
                              </p>
                              <p className="mt-1 text-sm text-foreground">
                                {insight.action}
                              </p>
                            </div>

                            <div className="rounded-lg bg-background p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Impacto esperado
                              </p>
                              <p className="mt-1 text-sm text-foreground">
                                {insight.impact}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {insight.evidence.map((item) => (
                              <Badge
                                key={item}
                                variant="outline"
                                className="bg-background"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-warning" />
                Plan recomendado
              </CardTitle>
              <CardDescription>
                Ruta corta para justificar decisiones en el hackatón.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {priority ? (
                <>
                  <div className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
                    <p className="text-sm font-black tracking-tight text-foreground">
                      1. Diagnóstico
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {priority.summary}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
                    <p className="text-sm font-black tracking-tight text-foreground">
                      2. Acción
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {priority.action}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
                    <p className="text-sm font-black tracking-tight text-foreground">
                      3. Validación
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Registrar nueva lectura y comprobar que el riesgo disminuya.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No hay acciones prioritarias con los datos actuales.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="h-5 w-5 text-primary" />
                Simulador de escenarios
              </CardTitle>
              <CardDescription>
                Opciones de operación generadas por IA.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-4">
              {hidroIAScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black tracking-tight text-foreground">
                        {scenario.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {scenario.description}
                      </p>
                    </div>

                    <Badge className="bg-primary/10 text-primary">
                      -{scenario.riskReduction}%
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Reducción de riesgo</span>
                      <span>{scenario.riskReduction}%</span>
                    </div>
                    <Progress value={scenario.riskReduction} />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {scenario.expectedSaving}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}