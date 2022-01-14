import { EventBus } from '../eb/eb'

export type BaseProps = {
  eb: EventBus
}

export type Component = {
  node: HTMLElement
}

export type ComponentSpec = {
  mount: string,
  init: (eb: EventBus) => Component
  listen?: any
}