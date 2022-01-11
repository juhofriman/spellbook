import { addClasses, ComponentForge } from ".";

type ComponentProps = {
  value: string
  readonly onClick?: (component: HTMLElement) => void
}

export const Button: ComponentForge<ComponentProps> = {
  init: (props) => {
    const component = { node: document.createElement('button') }
    component.node.textContent = props.value
    if(props.onClick) {
      component.node.addEventListener('click', (ev: MouseEvent) => {
        props.onClick!(component.node)
        ev.preventDefault()
      })
    }
    addClasses(component, 
      'bg-blue-500', 
      'hover:bg-blue-700', 
      'text-white', 
      'font-bold', 
      'py-2', 
      'px-4', 
      'rounded')

    return component
  }
}