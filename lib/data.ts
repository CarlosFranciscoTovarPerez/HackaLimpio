// Datos de ejemplo para AquaComunidad

export type RiskLevel = 'stable' | 'review' | 'high' | 'critical' | 'offline'

export interface WaterPoint {
  id: string
  name: string
  type: 'well' | 'tank' | 'school' | 'health' | 'residential' | 'supply'
  status: RiskLevel
  aquaRisk: number
  waterLevel: number
  autonomy: number
  turbidity: 'low' | 'medium' | 'high'
  ph: number
  tds: number
  temperature: number
  chlorine: 'low' | 'normal' | 'high'
  pressure: 'low' | 'normal' | 'high'
  lastReading: string
  coordinates: { x: number; y: number }
}

export interface Alert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  pointId: string
  pointName: string
  cause: string
  time: string
  status: 'active' | 'in-progress' | 'resolved'
  recommendation: string
}

export interface CorrectiveAction {
  id: string
  alertId: string
  action: string
  responsible: string
  date: string
  evidence?: string
  status: 'pending' | 'in-progress' | 'resolved'
  newReading?: string
}

export const communities = [
  { id: 'cedral', name: 'Comunidad El Cedral' },
  { id: 'esperanza', name: 'Colonia La Esperanza' },
  { id: 'valle', name: 'Ejido Valle Verde' },
]

export const waterPoints: WaterPoint[] = [
  {
    id: 'pozo-principal',
    name: 'Pozo Principal',
    type: 'well',
    status: 'critical',
    aquaRisk: 78,
    waterLevel: 24,
    autonomy: 2.8,
    turbidity: 'high',
    ph: 6.4,
    tds: 480,
    temperature: 31,
    chlorine: 'low',
    pressure: 'low',
    lastReading: 'hace 2 min',
    coordinates: { x: 30, y: 25 }
  },
  {
    id: 'tinaco-comunitario',
    name: 'Tinaco Comunitario',
    type: 'tank',
    status: 'stable',
    aquaRisk: 25,
    waterLevel: 85,
    autonomy: 8.5,
    turbidity: 'low',
    ph: 7.2,
    tds: 320,
    temperature: 26,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 5 min',
    coordinates: { x: 45, y: 40 }
  },
  {
    id: 'escuela-primaria',
    name: 'Escuela Primaria',
    type: 'school',
    status: 'review',
    aquaRisk: 52,
    waterLevel: 62,
    autonomy: 4.2,
    turbidity: 'medium',
    ph: 7.0,
    tds: 380,
    temperature: 28,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 3 min',
    coordinates: { x: 60, y: 55 }
  },
  {
    id: 'centro-salud',
    name: 'Centro de Salud',
    type: 'health',
    status: 'stable',
    aquaRisk: 18,
    waterLevel: 92,
    autonomy: 12.3,
    turbidity: 'low',
    ph: 7.4,
    tds: 290,
    temperature: 24,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'hace 1 min',
    coordinates: { x: 55, y: 30 }
  },
  {
    id: 'zona-norte',
    name: 'Zona Habitacional Norte',
    type: 'residential',
    status: 'high',
    aquaRisk: 65,
    waterLevel: 38,
    autonomy: 3.1,
    turbidity: 'low',
    ph: 7.1,
    tds: 350,
    temperature: 27,
    chlorine: 'normal',
    pressure: 'low',
    lastReading: 'hace 4 min',
    coordinates: { x: 75, y: 20 }
  },
  {
    id: 'punto-pipa',
    name: 'Punto de Pipa',
    type: 'supply',
    status: 'offline',
    aquaRisk: 0,
    waterLevel: 0,
    autonomy: 0,
    turbidity: 'low',
    ph: 0,
    tds: 0,
    temperature: 0,
    chlorine: 'normal',
    pressure: 'normal',
    lastReading: 'sin conexión',
    coordinates: { x: 20, y: 65 }
  }
]

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    pointId: 'pozo-principal',
    pointName: 'Pozo Principal',
    cause: 'Nivel bajo + turbidez alta + cloro bajo',
    time: 'hace 15 min',
    status: 'active',
    recommendation: 'Enviar brigada, revisar cloración y abastecer con pipa.'
  },
  {
    id: 'alert-2',
    severity: 'high',
    pointId: 'zona-norte',
    pointName: 'Zona Habitacional Norte',
    cause: 'Presión baja y posible fuga',
    time: 'hace 45 min',
    status: 'in-progress',
    recommendation: 'Revisar tubería y comparar caudal de entrada/salida.'
  },
  {
    id: 'alert-3',
    severity: 'medium',
    pointId: 'escuela-primaria',
    pointName: 'Escuela Primaria',
    cause: 'Turbidez elevada',
    time: 'hace 2 horas',
    status: 'active',
    recommendation: 'Limpiar tinaco y repetir medición.'
  }
]

export const correctiveActions: CorrectiveAction[] = [
  {
    id: 'action-1',
    alertId: 'alert-1',
    action: 'Se realizó limpieza de tinaco, cloración preventiva y revisión de válvula de entrada.',
    responsible: 'Juan Pérez - Operador de agua',
    date: '2024-01-15',
    status: 'in-progress'
  },
  {
    id: 'action-2',
    alertId: 'alert-2',
    action: 'Inspección de tubería en zona norte programada.',
    responsible: 'María García - Técnico municipal',
    date: '2024-01-15',
    status: 'pending'
  }
]

export const waterLevelHistory = [
  { day: 'Lun', level: 78 },
  { day: 'Mar', level: 72 },
  { day: 'Mié', level: 65 },
  { day: 'Jue', level: 58 },
  { day: 'Vie', level: 45 },
  { day: 'Sáb', level: 32 },
  { day: 'Hoy', level: 24 },
]

export const alertsByType = [
  { type: 'Nivel bajo', count: 5 },
  { type: 'Turbidez', count: 3 },
  { type: 'Cloro bajo', count: 2 },
  { type: 'Presión baja', count: 4 },
  { type: 'Reporte ciudadano', count: 2 },
]

export function getRiskColor(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'bg-success text-success-foreground'
    case 'review': return 'bg-warning text-warning-foreground'
    case 'high': return 'bg-danger text-danger-foreground'
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'offline': return 'bg-muted text-muted-foreground'
  }
}

export function getRiskBorderColor(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'border-success'
    case 'review': return 'border-warning'
    case 'high': return 'border-danger'
    case 'critical': return 'border-destructive'
    case 'offline': return 'border-muted'
  }
}

export function getSeverityColor(severity: Alert['severity']): string {
  switch (severity) {
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'high': return 'bg-danger text-danger-foreground'
    case 'medium': return 'bg-warning text-warning-foreground'
    case 'low': return 'bg-success text-success-foreground'
  }
}

export function getStatusLabel(status: RiskLevel): string {
  switch (status) {
    case 'stable': return 'Estable'
    case 'review': return 'En revisión'
    case 'high': return 'Riesgo alto'
    case 'critical': return 'Crítico'
    case 'offline': return 'Sin conexión'
  }
}

// Datos operativos para convertir las secciones nuevas en módulos útiles del MVP.
// En producción estos arreglos saldrían de la base de datos y de lecturas IoT reales.
export interface PriorityCase {
  id: string
  title: string
  location: string
  sector: 'Hotel' | 'Comunidad' | 'Escuela' | 'Municipio'
  severity: Alert['severity']
  riskScore: number
  estimatedLossLiters: number
  estimatedCostMXN: number
  pressurePsi: number
  flowDeltaPercent: number
  affectedPeople: number
  ageHours: number
  recommendedAction: string
  assignedCrew: string
  status: 'Nuevo' | 'Asignado' | 'En ruta' | 'En reparación' | 'Resuelto'
  dueIn: string
}

export interface SensorNode {
  id: string
  name: string
  location: string
  type: 'Flujo' | 'Presión' | 'Nivel' | 'Calidad' | 'Mixto'
  status: 'En línea' | 'Alerta' | 'Mantenimiento' | 'Sin señal'
  battery: number
  signal: number
  lastReading: string
  pressurePsi?: number
  flowLpm?: number
  levelPercent?: number
  ph?: number
  turbidityNtu?: number
  recommendation: string
}

export interface Crew {
  id: string
  name: string
  lead: string
  members: number
  status: 'Disponible' | 'Asignada' | 'En ruta' | 'En sitio' | 'Fuera de turno'
  zone: string
  skills: string[]
  activeTask: string
  eta: string
  workloadPercent: number
}

export interface AdminPlan {
  id: string
  name: string
  target: string
  monthlyPrice: string
  implementation: string
  includes: string[]
  idealFor: string
}

export interface AdminMetric {
  label: string
  value: string
  detail: string
}

export const priorityCases: PriorityCase[] = [
  {
    id: 'prio-001',
    title: 'Posible fuga nocturna en línea principal',
    location: 'Hotel Bahía Norte · Cuarto de máquinas',
    sector: 'Hotel',
    severity: 'critical',
    riskScore: 94,
    estimatedLossLiters: 18200,
    estimatedCostMXN: 1480,
    pressurePsi: 18,
    flowDeltaPercent: 42,
    affectedPeople: 620,
    ageHours: 3,
    recommendedAction:
      'Cerrar válvula del ramal, inspeccionar presión y enviar cuadrilla hidráulica antes del siguiente pico de consumo.',
    assignedCrew: 'Cuadrilla Hidráulica A',
    status: 'Asignado',
    dueIn: '2 h',
  },
  {
    id: 'prio-002',
    title: 'Cisterna por debajo del nivel mínimo operativo',
    location: 'Torre huéspedes · Cisterna 2',
    sector: 'Hotel',
    severity: 'high',
    riskScore: 86,
    estimatedLossLiters: 0,
    estimatedCostMXN: 950,
    pressurePsi: 24,
    flowDeltaPercent: 12,
    affectedPeople: 410,
    ageHours: 1,
    recommendedAction:
      'Reprogramar bombeo, revisar flotador electrónico y activar protocolo de ahorro temporal.',
    assignedCrew: 'Mantenimiento Hotelero B',
    status: 'En ruta',
    dueIn: '3 h',
  },
  {
    id: 'prio-003',
    title: 'Turbidez fuera de rango en punto sensible',
    location: 'Escuela Primaria · Bebederos',
    sector: 'Escuela',
    severity: 'high',
    riskScore: 81,
    estimatedLossLiters: 0,
    estimatedCostMXN: 620,
    pressurePsi: 31,
    flowDeltaPercent: 5,
    affectedPeople: 290,
    ageHours: 5,
    recommendedAction:
      'Bloquear consumo directo, limpiar tinaco, tomar nueva lectura y documentar evidencia fotográfica.',
    assignedCrew: 'Calidad de Agua C',
    status: 'Nuevo',
    dueIn: '4 h',
  },
  {
    id: 'prio-004',
    title: 'Presión inestable en zona habitacional',
    location: 'Colonia La Esperanza · Sector 4',
    sector: 'Comunidad',
    severity: 'medium',
    riskScore: 67,
    estimatedLossLiters: 6400,
    estimatedCostMXN: 430,
    pressurePsi: 21,
    flowDeltaPercent: 23,
    affectedPeople: 180,
    ageHours: 8,
    recommendedAction:
      'Comparar caudal entrada/salida y programar inspección por manzana para ubicar fuga oculta.',
    assignedCrew: 'Cuadrilla Hidráulica A',
    status: 'En reparación',
    dueIn: '12 h',
  },
]

export const sensorNodes: SensorNode[] = [
  {
    id: 'sn-101',
    name: 'Nodo presión principal',
    location: 'Hotel Bahía Norte · Línea principal',
    type: 'Presión',
    status: 'Alerta',
    battery: 88,
    signal: 91,
    lastReading: 'hace 40 s',
    pressurePsi: 18,
    flowLpm: 154,
    recommendation: 'Presión baja con caudal alto: probable fuga o válvula parcialmente abierta.',
  },
  {
    id: 'sn-102',
    name: 'Medidor de flujo nocturno',
    location: 'Hotel Bahía Norte · Entrada de red',
    type: 'Flujo',
    status: 'Alerta',
    battery: 76,
    signal: 84,
    lastReading: 'hace 1 min',
    pressurePsi: 22,
    flowLpm: 198,
    recommendation: 'Consumo fuera de horario: revisar lavandería, riego y tubería principal.',
  },
  {
    id: 'sn-103',
    name: 'Nivel cisterna 2',
    location: 'Torre huéspedes · Cisterna 2',
    type: 'Nivel',
    status: 'Alerta',
    battery: 69,
    signal: 78,
    lastReading: 'hace 2 min',
    levelPercent: 19,
    recommendation: 'Nivel crítico: activar bombeo y revisar flotador/sensor ultrasónico.',
  },
  {
    id: 'sn-104',
    name: 'Calidad bebederos',
    location: 'Escuela Primaria · Bebederos',
    type: 'Calidad',
    status: 'Mantenimiento',
    battery: 55,
    signal: 72,
    lastReading: 'hace 9 min',
    ph: 6.6,
    turbidityNtu: 6.8,
    recommendation: 'Turbidez elevada: limpiar tinaco, purgar línea y repetir lectura.',
  },
  {
    id: 'sn-105',
    name: 'Nodo mixto sector 4',
    location: 'Colonia La Esperanza · Sector 4',
    type: 'Mixto',
    status: 'En línea',
    battery: 93,
    signal: 96,
    lastReading: 'hace 30 s',
    pressurePsi: 31,
    flowLpm: 81,
    levelPercent: 74,
    ph: 7.2,
    turbidityNtu: 1.9,
    recommendation:
      'Lecturas estables. Mantener como punto de comparación contra sectores con presión baja.',
  },
]

export const crews: Crew[] = [
  {
    id: 'crew-a',
    name: 'Cuadrilla Hidráulica A',
    lead: 'Luis May · Técnico hidráulico',
    members: 4,
    status: 'En sitio',
    zone: 'Zona norte / hoteles',
    skills: ['Fugas', 'Presión', 'Válvulas'],
    activeTask: 'Inspección de línea principal en Hotel Bahía Norte',
    eta: 'En sitio',
    workloadPercent: 82,
  },
  {
    id: 'crew-b',
    name: 'Mantenimiento Hotelero B',
    lead: 'Ana Pech · Supervisora de mantenimiento',
    members: 3,
    status: 'En ruta',
    zone: 'Zona hotelera',
    skills: ['Cisternas', 'Bombas', 'Flotadores'],
    activeTask: 'Revisión de cisterna 2 y sistema de bombeo',
    eta: '18 min',
    workloadPercent: 64,
  },
  {
    id: 'crew-c',
    name: 'Calidad de Agua C',
    lead: 'Carlos Tun · Analista de calidad',
    members: 2,
    status: 'Disponible',
    zone: 'Escuelas y edificios públicos',
    skills: ['Turbidez', 'pH', 'Cloración'],
    activeTask: 'Disponible para alerta de calidad',
    eta: '35 min',
    workloadPercent: 38,
  },
  {
    id: 'crew-d',
    name: 'Cuadrilla Comunitaria D',
    lead: 'María Chan · Operadora municipal',
    members: 5,
    status: 'Asignada',
    zone: 'Colonias',
    skills: ['Reportes ciudadanos', 'Sectorización', 'Reparación menor'],
    activeTask: 'Barrido por presión inestable en Sector 4',
    eta: '42 min',
    workloadPercent: 71,
  },
]

export const adminMetrics: AdminMetric[] = [
  {
    label: 'Agua en riesgo hoy',
    value: '24,600 L',
    detail: 'Suma de fugas probables y operación anormal detectada por sensores.',
  },
  {
    label: 'Costo evitable estimado',
    value: '$2,860 MXN',
    detail: 'Estimación diaria para priorizar reparaciones y justificar el servicio.',
  },
  {
    label: 'Tiempo medio de atención',
    value: '3.4 h',
    detail: 'Desde alerta crítica hasta cuadrilla asignada.',
  },
  {
    label: 'Cumplimiento operativo',
    value: '87%',
    detail: 'Alertas atendidas dentro del SLA definido por administración.',
  },
]

export const adminPlans: AdminPlan[] = [
  {
    id: 'software',
    name: 'Software sin instalación',
    target: 'Hoteles con sensores o medidores existentes',
    monthlyPrice: '$4,999 - $8,999 MXN/mes',
    implementation: '$8,000 - $15,000 MXN inicial',
    includes: [
      'Dashboard de presión, flujo, nivel y alertas',
      'Priorización automática por litros, costo e impacto',
      'Gestión de cuadrillas y reportes ejecutivos',
      'Soporte para carga manual o integración con sensores existentes',
    ],
    idealFor: 'Vender rápido el SaaS sin asumir costo de hardware.',
  },
  {
    id: 'integral',
    name: 'Software + sensores aliados',
    target: 'Hoteles sin telemetría o con lectura manual',
    monthlyPrice: '$9,999 - $18,999 MXN/mes',
    implementation: '$25,000 - $60,000 MXN inicial',
    includes: [
      'Todo lo del plan software',
      'Alta de nodos IoT de presión, flujo, nivel o calidad',
      'Mapa operativo por zonas críticas',
      'Mantenimiento preventivo y plan de contingencia',
    ],
    idealFor: 'Pilotos más completos donde el hotel necesita medición desde cero.',
  },
  {
    id: 'municipal',
    name: 'Escalamiento municipal',
    target: 'Concesionarias, municipios y organismos operadores',
    monthlyPrice: 'Desde $29,999 MXN/mes',
    implementation: 'Cotización por sectorización',
    includes: [
      'Múltiples comunidades, pozos, tanques y escuelas',
      'Reportes ciudadanos y tablero público/privado',
      'Matriz de prioridades por impacto social',
      'Indicadores para programas hídricos y auditoría',
    ],
    idealFor: 'Fase 3: escalar después de validar ingresos con sector privado.',
  },
]