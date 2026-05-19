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
    <div className="min-h-screen bg-[#dff0f7] text-foreground">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-md lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 border-r border-sidebar-border bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.26),transparent_18rem),linear-gradient(180deg,#071827,#0b1f35_50%,#081522)] text-sidebar-foreground shadow-[24px_0_80px_-60px_rgba(15,23,42,0.9)] transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 shadow-[0_16px_34px_-22px_rgba(14,165,233,0.95)]">
                <Droplets className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="block font-bold">Hydrix</span>
                <span className="text-xs text-sidebar-foreground/60">
                  Monitoreo hídrico
                </span>
              </div>
            </Link>

            <button
              className="rounded-xl border border-white/10 p-2 hover:bg-white/10 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
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
                        'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'bg-white text-slate-950 shadow-[0_18px_34px_-24px_rgba(14,165,233,0.75)]'
                          : 'text-sidebar-foreground/70 hover:bg-white/10 hover:text-white'
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

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3 py-3 shadow-inner backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-400">
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
        <header className="sticky top-0 z-30 border-b border-white/70 bg-white/75 backdrop-blur-2xl">
          <div className="flex h-20 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                className="rounded-2xl border border-white/70 bg-white/70 p-2 shadow-sm hover:bg-primary/10 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h1 className="hidden text-lg font-black tracking-tight text-foreground sm:block">
                  Plataforma de Monitoreo Hídrico Inteligente
                </h1>
                <p className="hidden text-xs font-medium text-muted-foreground md:block">
                  Fugas, sensores, HidroIA, cuadrillas y reportes en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                

                {communityOpen && (
                  <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_22px_60px_-35px_rgba(15,23,42,0.65)] backdrop-blur-2xl">
                    {communities.map((community) => (
                      <button
                        key={community.id}
                        className={cn(
                          'w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary',
                          selectedCommunity.id === community.id && 'bg-primary/10 text-primary'
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

              

              <Button size="sm">
                <span className="hidden sm:inline">Generar reporte</span>
                <FileText className="h-4 w-4 sm:hidden" />
              </Button>
            </div>
          </div>
        </header>

        <main className="relative p-4 pb-24 lg:p-6"><div className="pointer-events-none fixed inset-x-72 top-24 -z-10 hidden h-80 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent blur-3xl lg:block" />{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-white/70 bg-white/90 p-2 shadow-[0_-18px_50px_-34px_rgba(15,23,42,0.65)] backdrop-blur-2xl lg:hidden">
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
                'flex flex-col items-center gap-1 rounded-2xl p-2 text-[10px] font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
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