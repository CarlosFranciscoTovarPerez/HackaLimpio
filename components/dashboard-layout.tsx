'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Droplets,
  LayoutDashboard,
  Map,
  Brain,
  ListChecks,
  RadioTower,
  GitBranch,
  Users,
  FileText,
  Hotel,
  Shield,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { communities } from '@/lib/data'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mapa', href: '/dashboard/map', icon: Map },
  { name: 'HidroIA', href: '/dashboard/hidroia', icon: Brain },
  { name: 'Prioridades', href: '/dashboard/prioridades', icon: ListChecks },
  { name: 'Sensores', href: '/dashboard/sensores', icon: RadioTower },
  { name: 'Tubería 3D', href: '/dashboard/tuberia-3d', icon: GitBranch },
  { name: 'Cuadrillas', href: '/dashboard/cuadrillas', icon: Users },
  { name: 'Reportes', href: '/dashboard/reports', icon: FileText },
  { name: 'Modo Hotel', href: '/dashboard/hotel', icon: Hotel },
  { name: 'Administración', href: '/dashboard/admin', icon: Shield },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0])
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
                <Droplets className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="block font-bold">AquaComunidad</span>
                <span className="text-xs text-sidebar-foreground/60">
                  Monitoreo hídrico SaaS
                </span>
              </div>
            </Link>

            <button
              className="rounded p-1 hover:bg-sidebar-accent lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}

                      {item.name === 'HidroIA' && (
                        <span className="ml-auto rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300">
                          IA
                        </span>
                      )}

                      {item.name === 'Prioridades' && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                          3
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/60 px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary">
                <span className="text-sm font-medium text-sidebar-primary-foreground">
                  OP
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Operador</p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  Municipal / Hotel
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                className="rounded-lg p-2 hover:bg-muted lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h1 className="hidden text-lg font-semibold text-foreground sm:block">
                  Plataforma SaaS de Monitoreo Hídrico Inteligente
                </h1>
                <p className="hidden text-xs text-muted-foreground md:block">
                  Fugas, sensores, HidroIA, cuadrillas y reportes en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                  onClick={() => setCommunityOpen(!communityOpen)}
                >
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="hidden sm:inline">{selectedCommunity.name}</span>
                  <span className="sm:hidden">Comunidad</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground transition-transform',
                      communityOpen && 'rotate-180'
                    )}
                  />
                </button>

                {communityOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                    {communities.map((community) => (
                      <button
                        key={community.id}
                        className={cn(
                          'w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent',
                          selectedCommunity.id === community.id && 'bg-accent'
                        )}
                        onClick={() => {
                          setSelectedCommunity(community)
                          setCommunityOpen(false)
                        }}
                      >
                        {community.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" className="hidden sm:flex">
                Simular lectura IoT
              </Button>

              <Button size="sm">
                <span className="hidden sm:inline">Generar reporte</span>
                <FileText className="h-4 w-4 sm:hidden" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 pb-24 lg:p-6">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t bg-background p-2 shadow-lg lg:hidden">
        {navigation.slice(0, 5).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-medium',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}