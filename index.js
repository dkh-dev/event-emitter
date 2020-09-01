'use strict'

const insert = require('./lib/utils/insert')

class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }

  // eslint-disable-next-line max-statements
  on(type, listener, options = {}) {
    const { listenerAfter } = options

    if (listener === listenerAfter) {
      return this
    }

    const listeners = this.listeners.get(type)

    if (listeners) {
      insert(listeners, listener, listenerAfter)
    } else {
      this.listeners.set(type, [ listener ])
    }

    return this
  }

  off(type, listener) {
    const listeners = this.listeners.get(type)

    if (listeners) {
      const index = listeners.indexOf(listener)

      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }

    return this
  }

  emit(type, ...args) {
    const listeners = [
      ...this.listeners.get(this.constructor.wildcard) || [],
      ...this.listeners.get(type) || [],
    ]

    listeners.forEach(listener => listener.apply(this, args))

    return this
  }

  hasListener(type, listener) {
    const list = this.listeners.get(type)

    return Boolean(list) && list.includes(listener)
  }
}

EventEmitter.wildcard = '*'

module.exports = EventEmitter
