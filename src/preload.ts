import { Button } from './components/Button'
import { TextBlock } from './components/TextBlock'
import { TextInput } from './components/TextInput'
import { renderComponents } from './render'



renderComponents({
  stateHook: (eb) => {
    eb.store('fancyAppNameVersion', '0.23.41-alpha-1')
    eb.store('todoItems', [])
    eb.store('newTodo', '')
  }, 
  components: [
    {
      mount: 'version-number',
      init: (eb) => TextBlock({
        eb,
        listen: ['fancyAppNameVersion'],
        content: ({ fancyAppNameVersion }) => `Version ${fancyAppNameVersion}`
      })
    },
    {
      mount: 'todo-form',
      init: (eb) => TextInput({
        eb,
        key: 'newTodo'
      })
    },
    {
      mount: 'todo-form',
      init: (eb) => Button({
        eb,
        text: 'Add',
        listen: {
          'newTodo': ({ current }, me) => {
            if(current === null || current === undefined || current === '') {
              me.disable()
            } else {
              me.activate()
            }
          }
        },
        onClick: () => {
          eb.change('todoItems', (old) => {
            old.push(eb.current('newTodo'))
            eb.change('newTodo', () => '')
            return old
          })
        }
      })
    },
    {
      mount: 'todo-items',
      init: (eb) => TextBlock({
        eb,
        listen: ['todoItems'],
        content: ({ todoItems }) => todoItems.map((item: any) => `${item}`).join(', '),
      })
    },
  ]
})