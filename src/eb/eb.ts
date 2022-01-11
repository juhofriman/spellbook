type HandlerPayload = number | string

type StateChange = {
  old: any
  current: any
}

class EventBus {

  readonly handlers: { [key:string]: ((payload?: HandlerPayload) => void)[] } = {}
  readonly state: { [key:string]: any } = {}
  readonly stateListeners: { [key: string ]: ((change: StateChange) => void)[] } = {}

  publish(key: string, payload?: HandlerPayload): void {
    if(!this.handlers[key]) {
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

  change(key: string, handler: (old: any) => any): void {
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

  listen(key: string, handler: (change: StateChange) => void): void {
    if(!this.stateListeners[key]) {
      this.stateListeners[key] = []
    }
    this.stateListeners[key].push(handler)
  }
}

export const create_eb = () => new EventBus()