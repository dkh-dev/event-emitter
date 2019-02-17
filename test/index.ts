'use strict';

import test from 'tape';
import TapeHelper from '@dkh-dev/tape-helper';
import EventEmitter from '..';

test('Test basic functionalities', t => {
    const { counter } = new TapeHelper(t);
    const { expect, count } = counter;

    const expect1 = () => expect(1);
    const expect3 = () => expect(3);
    const expect4 = () => expect(4);
    const expect5 = () => expect(5);
    const expect7 = () => expect(7);

    t.plan(10);

    const emitter = new EventEmitter();
    const payload = { some: 'text' };

    emitter.on('a', expect1); // listeners.a [ expect1 ]
    emitter.on('a', expect1); // listeners.a [ expect1 ]

    // count is to be inserted before expect3

    emitter.on('a', expect3); // listeners.a [ expect1, expect3 ]
    emitter.on('a', count, { listenerAfter: expect1 }); // listeners.a [ count, expect1, expect3 ]
    // No! Please insert count right before expect3
    emitter.on('a', count, { listenerAfter: expect3 }); // listeners.a [ expect1, count, expect3 ]
    // If listener and listenerAfter are the same,
    // nothing should happen
    emitter.on('a', count, { listenerAfter: count }); // listeners.a [ expect1, count, expect3 ]

    emitter.on('b', expect4); // listeners.b [ expect4 ]

    emitter.on('b', expect7, { listenerAfter: expect4 }); // listeners.b [ expect7, expect4 ]
    // Oops! Something went wrong...
    emitter.off('b', expect7); // listeners.b [ expect4 ]

    // If listenerAfter does not exist,
    // listener should be put after the last listener in the list
    emitter.on('b', expect5, { listenerAfter: expect7 }); // listeners.b [ expect4, expect5 ]

    emitter.on('c', (...args: string[]) => {
        t.equal(args.length, 1, 'args.length should be 1');
        t.equal(args[0], payload, 'args.0 should be payload');
    });

    t.equal(emitter.hasListener('a', expect1), true, 'should be true');
    t.equal(emitter.hasListener('b', expect1), false, 'should be false');
    t.equal(emitter.hasListener('d', expect1), false, 'should be false');

    // Should be ok attempting to remove an unregistered listener
    t.doesNotThrow(() => {
        emitter.off('b', expect1);
        emitter.off('d', expect1);
    });

    emitter.emit('a');
    emitter.emit('b', payload, 'additional data');
    emitter.emit('c', payload);
});
