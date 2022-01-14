import { BaseProps, Component } from "."

type TextProps = BaseProps & {
  listen?: string[]
  content: string | ((localState?: any) => string)
}

export const TextBlock = (props: TextProps): Component => {
  const component = { node: document.createElement('div') }
  let state: any = {}
  if(typeof props.content === 'string') {
    component.node.textContent = props.content
  } else {
    if(props.listen) {
      props.listen.forEach(key => {
        props.eb.listen(key, ({ current }) => {
          state[key] = current
          component.node.textContent = (props.content as any)(state)  
        })
      })
    } else {
      component.node.textContent = props.content()
    }
  }
  
  return component
}