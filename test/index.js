import test from 'tape'
import EventEmitter from '@dkh-dev/event-emitter'


// eslint-disable-next-line max-statements
test('EventEmitter', t => {
  t.plan(3)

  const emitter = new EventEmitter()
  let i = 0

  const first = () => t.fail(`shouldn't have been called`)
  const second = () => t.fail(`shouldn't have been called`)
  const third = () => t.equal(++i, 1)

  emitter.on('test', first)
  emitter.on('test', second)
  emitter.on('test', third)
  emitter.off('test', second)
  emitter.off('test', first)

  emitter.emit('test')

  t.equal(emitter.hasListener('test', first), false)
  t.equal(emitter.hasListener('test', third), true)

  emitter.off('test', third)

  emitter.emit('test')
})
