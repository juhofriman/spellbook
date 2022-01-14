type HandlerPayload = number | string

export type ChangeMutator = (old: any) => any
export type ChangeListener = (change: StateChange) => void

export type StateChange = {
  old: any
  current: any
}

export interface EventBus {
  publish(key: string, payload?: HandlerPayload): void 
  subscribe(key: string, handler: (payload?: HandlerPayload) => void): void
  store(key: string, value: any): void 
  change(key: string, handler: ChangeMutator): void
  listen(key: string, handler: ChangeListener): void
  current(key: string): any
}

class EventBusImpl implements EventBus {

  readonly handlers: { [key:string]: ((payload?: HandlerPayload) => void)[] } = {}
  readonly state: { [key:string]: any } = {}
  readonly stateListeners: { [key: string ]: ((change: StateChange) => void)[] } = {}

  publish(key: string, payload?: HandlerPayload): void {
    if(!this.handlers[key]) {
      console.warn(`No listeners for ${key}`)
      return
    }
    this.handlers[key].forEach(handler => {
      handler(payload)
    })
  }

  subscribe(key: string, handler: (payload?: HandlerPayload) => void): void {
    if(!this.handlers[key]) {
      this.handlers[key] = []
    }
    this.handlers[key].push(handler)
  }

  store(key: string, value: any): void {
    const old = this.state[key]
    this.state[key] = value
    if(!this.stateListeners[key]) {
      return
    }
    this.stateListeners[key].forEach(handler => {
      handler({
        current: this.state[key],
        old
      })
    })
  }

  change(key: string, handler: ChangeMutator): void {
    const old = this.state[key]
    this.state[key] = handler(old)
    if(!this.stateListeners[key]) {
      return
    }
    this.stateListeners[key].forEach(handler => {
      handler({
        current: this.state[key],
        old
      })
    })
  }

  listen(key: string, handler: ChangeListener): void {
    if(!this.stateListeners[key]) {
      this.stateListeners[key] = []
    }
    this.stateListeners[key].push(handler)
  }

  current(key: string) {
      return this.state[key]
  }
}

export const create_eb = () => new EventBusImpl()