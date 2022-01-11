type Component = {
  node: HTMLElement
}

export type ComponentForge<T> = {
  init: (props: T) => Component
}

export const addClass = ({ node }: Component, clazz: string) => node.classList.add(clazz)

export const addClasses = (component: Component, ...clazz: string[]) => 
  clazz.forEach(c => addClass(component, c))