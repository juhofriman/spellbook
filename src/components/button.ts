import { BaseProps, Component } from "."
import { addClass, addClasses } from "../dom"
import { StateChange } from "../eb/eb"

type ButtonProps = BaseProps & {
  text: string
  onClick?: () => void
  listen?: {
    [key: string]: (change: StateChange, me: { disable: () => void, activate: () => void}) => void
  }
  on?: {
    [key: string]: (me: { disable: () => void, activate: () => void}) => void
  }
}

export const Button = (props: ButtonProps): Component => {
  const component = { node: document.createElement('button') }
  component.node.textContent = props.text

  if(props.on) {
    for (const [key, value] of Object.entries(props.on)) {
      props.eb.subscribe(key, () => {
        value({
          activate: () => {
            component.node.disabled = false
          },
          disable: () => {
            component.node.disabled = true
          }
        })
      })
    }
  }
  if(props.listen) {
    for (const [key, value] of Object.entries(props.listen)) {
      props.eb.listen(key, (change: StateChange) => {
        value(change, {
          activate: () => {
            component.node.disabled = false
          },
          disable: () => {
            component.node.disabled = true
          }
        })
      })
    }
  }
  if(props.onClick) {
    component.node.addEventListener('click', () => {
      props.onClick!()
    })
  }
  addClasses(component,
    'bg-blue-500',
    'hover:bg-blue-700',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'ml-2',
    'rounded',
    'disabled:bg-gray-50', 
    'disabled:text-gray-500', 
    'disabled:border-gray-200', 
    'disabled:shadow-none')

  return component
}