import { ComponentSpec } from "../components"
import { EventBus, create_eb } from '../eb/eb'


export const renderComponents = (
  { components, stateHook }: 
  { 
    stateHook?: (eb: EventBus) => void
    components: ComponentSpec[]
  }
  ) => {
  window.addEventListener('DOMContentLoaded', () => {
    const eb = create_eb()

    components.forEach(({ mount, init }) => {
      document.getElementById(mount)?.appendChild(init(eb).node)
    })

    if(stateHook) {
      stateHook(eb)
    }
  })
}