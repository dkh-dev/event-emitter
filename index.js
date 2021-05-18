class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }

  on(type, listener) {
    const stack = this.listeners.get(type)

    if (stack) {
      stack.push(listener)
    } else {
      this.listeners.set(type, [ listener ])
    }

    return this
  }

  off(type, listener) {
    const stack = this.listeners.get(type)

    if (stack) {
      const index = stack.lastIndexOf(listener)

      if (index !== -1) {
        stack.splice(index, 1)
      }
    }

    return this
  }

  emit(type, ...args) {
    const stack = this.listeners.get(type)

    if (stack) {
      stack
        .slice()
        .forEach(listener => listener(...args))
    }

    return this
  }

  hasListener(type, listener) {
    const stack = this.listeners.get(type)

    return !!stack && stack.includes(listener)
  }
}

export default EventEmitter
