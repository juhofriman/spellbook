import { ComponentForge } from ".";
import { eb } from "../preload";

type ComponentProps = {
  subscribe: string,
  render: (value: any) => string
}

export const Text: ComponentForge<ComponentProps> = {
  init: (props) => {
    const component = { node: document.createElement('div') }
    eb.listen(props.subscribe, ({ current }) => {
      component.node.textContent = props.render(current)
    })
    return component
  }
}