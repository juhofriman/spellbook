import { BaseProps, Component } from "."
import { addClasses } from "../dom"

type ButtonProps = BaseProps & {
  key: string
  onChange?: () => void
}

export const TextInput = (props: ButtonProps): Component => {
  const component = { node: document.createElement('input') }
  component.node.setAttribute('type', 'text')
  addClasses(component, 
    'shadow',  
    'appearance-none', 
    'border',
    'rounded', 
    'py-2',
    'px-3', 
    'text-gray-700', 
    'leading-tight', 
    'focus:outline-none',
    'focus:shadow-outline')
  props.eb.store(props.key, '')
  props.eb.listen(props.key, ({ current}) => {
    component.node.value = current
  })
  component.node.addEventListener('input', (e) => {
    if (e.target instanceof HTMLInputElement) {
      props.eb.change(props.key, () => (e.target as HTMLInputElement).value)
      if(props.onChange) {
        props.onChange()
      }
    }
  })
  return component
}