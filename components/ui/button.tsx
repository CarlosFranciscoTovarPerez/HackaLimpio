import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'border border-primary/10 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground shadow-[0_12px_30px_-18px_rgba(14,165,233,0.95)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(14,165,233,0.95)]',
        destructive:
          'border border-destructive/10 bg-gradient-to-r from-destructive to-red-500 text-white shadow-[0_12px_30px_-18px_rgba(239,68,68,0.95)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(239,68,68,0.9)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-white/80 bg-white/75 text-foreground shadow-sm backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'border border-secondary/10 bg-gradient-to-r from-secondary to-emerald-500 text-secondary-foreground shadow-[0_12px_30px_-18px_rgba(16,185,129,0.8)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(16,185,129,0.82)]',
        ghost:
          'hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-full gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-12 rounded-full px-7 has-[>svg]:px-5',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
