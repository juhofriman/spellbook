import { create_eb } from './eb'

describe('eb.ts', () => {
  describe('publish/subscribe', () => {
    it('Should create event bus with create_eb()', () => {
      const eb = create_eb()
      expect(eb).toBeDefined()
      expect(eb).toBe(eb)
      const other_eb = create_eb()
      expect(eb).not.toBe(other_eb)
    })
    it('Should not bail if no subscribers exist', () => {
      const eb = create_eb()
      eb.publish('HELLO')
      // IDEA: dead letter listener?
    })
    it('Should invoke handler with publish', () => {
      const eb = create_eb()
      const handler = jest.fn()
      eb.subscribe('HELLO', handler)
      eb.publish('HELLO')
      expect(handler).toHaveBeenCalledTimes(1)
    })
    it('Should invoke multiple handlers with publish', () => {
      const eb = create_eb()
      const handler = jest.fn()
      const other_handler = jest.fn()
      eb.subscribe('HELLO', handler)
      eb.subscribe('HELLO', other_handler)
      eb.publish('HELLO')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(other_handler).toHaveBeenCalledTimes(1)
    })
    it('Should support number payloads', () => {
      const eb = create_eb()
      const handler = jest.fn()
      eb.subscribe('HELLO', handler)
      eb.publish('HELLO', 1)
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(1)
    })
    it('Should support string payloads', () => {
      const eb = create_eb()
      const handler = jest.fn()
      eb.subscribe('HELLO', handler)
      eb.publish('HELLO', 'foobar')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith('foobar')
    })
  })

  describe('store/listen', () => {
    it('Should store given value', () => {
      const eb = create_eb()
      eb.store('foo', 'foo')
    })
    it('Should notify listeners when storing value', () => {
      const eb = create_eb()
      const handler = jest.fn()
      eb.listen('foo', handler)
      eb.store('foo', 'foo')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith({ old: undefined, current: 'foo' })
    })
    it('Should allow changing the value', () => {
      const eb = create_eb()
      const handler = jest.fn()
      eb.listen('foo', handler)
      eb.store('foo', 'foo')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith({ old: undefined, current: 'foo' })
      eb.change('foo', (old) => old + 'bar')
      expect(handler).toHaveBeenCalledTimes(2)
      expect(handler).toHaveBeenCalledWith({ old: 'foo', current: 'foobar' })
    })
  })
})