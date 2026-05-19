import type { Alert, WaterPoint } from '@/lib/data'

export type HidroIACategory = 'fuga' | 'calidad' | 'abasto' | 'mantenimiento'
export type HidroIASeverity = 'critical' | 'high' | 'medium' | 'low'

export interface HidroIAInsight {
  id: string
  category: HidroIACategory
  severity: HidroIASeverity
  title: string
  pointId: string
  pointName: string
  summary: string
  action: string
  impact: string
  confidence: number
  eta: string
  evidence: string[]
}

export interface HidroIAScenario {
  id: string
  title: string
  description: string
  expectedSaving: string
  riskReduction: number
  timeWindow: string
  steps: string[]
}

const severityWeight: Record<HidroIASeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export const hidroIACategoryLabels: Record<HidroIACategory | 'all', string> = {
  all: 'Todo',
  fuga: 'Fugas',
  calidad: 'Calidad',
  abasto: 'Abasto',
  mantenimiento: 'Mantenimiento',
}

export const hidroIAQuestions = [
  '¿Dónde debo actuar primero?',
  '¿Hay señales de fuga?',
  '¿Qué pasa si no atiendo hoy?',
  'Genera resumen ejecutivo',
]

function severityFromScore(score: number): HidroIASeverity {
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

function normalizeConfidence(value: number): number {
  return Math.max(62, Math.min(96, Math.round(value)))
}

export function analyzeWaterPoint(point: WaterPoint): HidroIAInsight[] {
  const insights: HidroIAInsight[] = []

  if (point.status === 'offline') {
    insights.push({
      id: `offline-${point.id}`,
      category: 'mantenimiento',
      severity: 'medium',
      title: 'Sensor sin comunicación',
      pointId: point.id,
      pointName: point.name,
      summary:
        'La IA no puede validar lectura reciente; se recomienda revisar energía, red o módulo IoT antes de tomar decisiones operativas.',
      action:
        'Reiniciar sensor, validar batería/conectividad y registrar lectura manual temporal.',
      impact:
        'Evita puntos ciegos en la operación y reduce falsas decisiones por datos incompletos.',
      confidence: 88,
      eta: 'Hoy',
      evidence: [
        'Última lectura: sin conexión',
        'No hay telemetría reciente',
        'Riesgo no calculable con datos vivos',
      ],
    })

    return insights
  }

  if (point.pressure === 'low') {
    const score = point.waterLevel < 45 ? 82 : 64

    insights.push({
      id: `leak-${point.id}`,
      category: 'fuga',
      severity: severityFromScore(score),
      title:
        point.waterLevel < 45
          ? 'Posible fuga con caída de nivel'
          : 'Presión baja anómala',
      pointId: point.id,
      pointName: point.name,
      summary:
        point.waterLevel < 45
          ? 'La presión baja combinada con nivel descendente sugiere pérdida en red, fuga o consumo no previsto.'
          : 'La presión baja requiere comparación con caudal de entrada/salida para descartar fuga o bloqueo.',
      action:
        'Comparar presión, caudal de entrada/salida y programar inspección en el tramo cercano.',
      impact:
        point.waterLevel < 45
          ? 'Puede evitar desperdicio continuo y desabasto parcial.'
          : 'Permite detectar fallas antes de que escalen.',
      confidence: normalizeConfidence(72 + point.aquaRisk / 4),
      eta: point.waterLevel < 45 ? '0-6 h' : '24 h',
      evidence: [
        `Presión: ${point.pressure}`,
        `Nivel: ${point.waterLevel}%`,
        `Autonomía estimada: ${point.autonomy} días`,
      ],
    })
  }

  if (
    point.turbidity === 'high' ||
    point.turbidity === 'medium' ||
    point.chlorine === 'low'
  ) {
    const isCritical = point.turbidity === 'high' && point.chlorine === 'low'

    insights.push({
      id: `quality-${point.id}`,
      category: 'calidad',
      severity: isCritical
        ? 'critical'
        : point.turbidity === 'high'
          ? 'high'
          : 'medium',
      title: isCritical
        ? 'Riesgo de calidad del agua'
        : 'Parámetros de calidad en revisión',
      pointId: point.id,
      pointName: point.name,
      summary: isCritical
        ? 'La combinación de turbidez alta y cloro bajo puede comprometer la seguridad del suministro.'
        : 'La calidad requiere seguimiento para prevenir afectaciones a usuarios sensibles.',
      action: isCritical
        ? 'Activar revisión de calidad, cloración preventiva y repetir muestra después de la corrección.'
        : 'Repetir medición, limpiar depósito si aplica y monitorear tendencia.',
      impact: isCritical
        ? 'Reduce riesgo sanitario y quejas por agua turbia.'
        : 'Evita que una desviación menor se convierta en alerta crítica.',
      confidence: normalizeConfidence(75 + point.aquaRisk / 5),
      eta: isCritical ? 'Inmediato' : '24 h',
      evidence: [
        `Turbidez: ${point.turbidity}`,
        `Cloro: ${point.chlorine}`,
        `pH: ${point.ph}`,
        `TDS: ${point.tds} ppm`,
      ],
    })
  }

  if (point.autonomy > 0 && point.autonomy < 4) {
    insights.push({
      id: `supply-${point.id}`,
      category: 'abasto',
      severity: point.autonomy < 3 ? 'critical' : 'high',
      title: 'Riesgo de desabasto operativo',
      pointId: point.id,
      pointName: point.name,
      summary:
        'La autonomía estimada está por debajo del margen seguro para operar sin contingencia.',
      action:
        'Programar abastecimiento preventivo y reducir pérdidas antes de que el punto quede sin reserva.',
      impact:
        'Ayuda a evitar interrupciones, quejas y compras urgentes de agua.',
      confidence: normalizeConfidence(80 + (4 - point.autonomy) * 4),
      eta: point.autonomy < 3 ? '0-12 h' : '24 h',
      evidence: [
        `Autonomía: ${point.autonomy} días`,
        `Nivel: ${point.waterLevel}%`,
        `AquaRiesgo: ${point.aquaRisk}/100`,
      ],
    })
  }

  if (point.aquaRisk >= 50 && insights.length === 0) {
    insights.push({
      id: `preventive-${point.id}`,
      category: 'mantenimiento',
      severity: severityFromScore(point.aquaRisk),
      title: 'Mantenimiento preventivo sugerido',
      pointId: point.id,
      pointName: point.name,
      summary:
        'El puntaje AquaRiesgo indica deterioro acumulado aunque no exista una alarma única dominante.',
      action:
        'Revisar tendencia histórica, validar sensor y abrir tarea preventiva.',
      impact:
        'Reduce fallas inesperadas y mantiene continuidad operativa.',
      confidence: normalizeConfidence(68 + point.aquaRisk / 6),
      eta: '48 h',
      evidence: [
        `AquaRiesgo: ${point.aquaRisk}/100`,
        `Última lectura: ${point.lastReading}`,
      ],
    })
  }

  return insights
}

export function getHidroIAInsights(
  points: WaterPoint[],
  activeAlerts: Alert[],
): HidroIAInsight[] {
  const insights = points.flatMap(analyzeWaterPoint)
  const alertPointIds = new Set(activeAlerts.map((alert) => alert.pointId))

  return insights
    .map((insight) => ({
      ...insight,
      confidence: alertPointIds.has(insight.pointId)
        ? normalizeConfidence(insight.confidence + 5)
        : insight.confidence,
    }))
    .sort((a, b) => {
      const severityDiff = severityWeight[b.severity] - severityWeight[a.severity]
      if (severityDiff !== 0) return severityDiff
      return b.confidence - a.confidence
    })
}

export function getHidroIASummary(
  points: WaterPoint[],
  activeAlerts: Alert[],
  insights: HidroIAInsight[],
) {
  const monitoredPoints = points.filter((point) => point.status !== 'offline')

  const criticalInsights = insights.filter(
    (insight) => insight.severity === 'critical',
  ).length

  const possibleLeaks = insights.filter(
    (insight) => insight.category === 'fuga',
  ).length

  const qualityRisks = insights.filter(
    (insight) => insight.category === 'calidad',
  ).length

  const averageRisk = Math.round(
    monitoredPoints.reduce((total, point) => total + point.aquaRisk, 0) /
      Math.max(monitoredPoints.length, 1),
  )

  const averageConfidence = Math.round(
    insights.reduce((total, insight) => total + insight.confidence, 0) /
      Math.max(insights.length, 1),
  )

  const priority = insights[0]

  return {
    monitoredPoints: monitoredPoints.length,
    activeAlerts: activeAlerts.filter((alert) => alert.status !== 'resolved')
      .length,
    criticalInsights,
    possibleLeaks,
    qualityRisks,
    averageRisk,
    averageConfidence,
    priorityTitle: priority?.title ?? 'Operación estable',
    priorityPoint: priority?.pointName ?? 'Sin punto crítico',
    executiveSummary: priority
      ? `HidroIA prioriza ${priority.pointName}: ${priority.summary} Acción sugerida: ${priority.action}`
      : 'HidroIA no detecta riesgos críticos con las lecturas actuales.',
  }
}

export const hidroIAScenarios: HidroIAScenario[] = [
  {
    id: 'leak-first',
    title: 'Atender fugas primero',
    description:
      'Prioriza presión baja y caída de nivel para reducir desperdicio continuo.',
    expectedSaving: 'Hasta 18-28% de agua no contabilizada',
    riskReduction: 32,
    timeWindow: 'Primeras 24 h',
    steps: [
      'Comparar presión por tramo',
      'Inspeccionar zona con caída',
      'Registrar reparación y nueva lectura',
    ],
  },
  {
    id: 'quality-first',
    title: 'Asegurar calidad del agua',
    description:
      'Activa revisión de turbidez, cloro y pH en puntos sensibles.',
    expectedSaving: 'Menos quejas y menor riesgo sanitario',
    riskReduction: 27,
    timeWindow: 'Mismo día',
    steps: [
      'Repetir medición',
      'Clorar si aplica',
      'Validar lectura después de corrección',
    ],
  },
  {
    id: 'supply-first',
    title: 'Evitar desabasto',
    description:
      'Usa autonomía y nivel para programar abastecimiento preventivo.',
    expectedSaving: 'Menos compras urgentes de pipa',
    riskReduction: 21,
    timeWindow: '0-12 h',
    steps: [
      'Calcular reserva real',
      'Priorizar zonas críticas',
      'Programar abastecimiento preventivo',
    ],
  },
]