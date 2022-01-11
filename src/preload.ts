import { Button } from './components/button'
import { Text } from './components/text'
import { create_eb } from './eb/eb';

export const eb = create_eb()

const components = [
  {
    mount: 'buttons',
    component: Button.init({
      value: 'Increase',
      onClick: () => {
        eb.change('VALUE', (old) => old + 1)
      }
    }),
  },
  {
    mount: 'buttons',
    component: Button.init({
      value: 'Decrease',
      onClick: () => {
        eb.change('VALUE', (old) => old - 1)
      }
    }),
  },
  {
    mount: 'buttons',
    component: Button.init({
      value: 'Reset',
      onClick: () => {
        eb.change('VALUE', (_) => 0)
      }
    }),
  },
  {
    mount: 'value',
    component: Text.init({
      subscribe: 'VALUE',
      render: (value) => `Value is ${value} and you friggin' rule!`,
    }),
  },
  {
    mount: 'value',
    component: Text.init({
      subscribe: 'CHROMIUM_VERSION',
      render: (value) => `Chromium version is ${value}`,
    }),
  },
  {
    mount: 'value',
    component: Text.init({
      subscribe: 'ELECTRON_VERSION',
      render: (value) => `Electron version is ${value}`,
    }),
  },
]

// render application
window.addEventListener('DOMContentLoaded', () => {
  components.forEach(({ mount, component }) => {
    document.getElementById(mount)?.appendChild(component.node)
  })
})

// Initial state broadcast
eb.store('VALUE', 0)
eb.store('CHROMIUM_VERSION', process.versions.chrome)
eb.store('ELECTRON_VERSION', process.versions.electron)