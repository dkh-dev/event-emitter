'use strict';

import test from 'tape';
import EventEmitter from '../index';
import TapeCounter from '@dkh-dev/tape-counter';

test('Test basic functionalities', t => {
    const emitter = new EventEmitter();

    const {count, expect} = new TapeCounter(t);

    t.plan(7);
    const expect1 = expect(1);
    const expect3 = expect(3);
    const expect5 = expect(5);

    const countOrDoNotCount = () => count();

    emitter.on('a', expect1);
    // expect1 should be re-added
    emitter.on('a', expect1);

    // count is to be inserted before expect3

    emitter.on('a', expect3);
    emitter.on('a', count, { listenerAfter: expect3 });

    // count is to be inserted before expect5

    emitter.on('b', expect5);
    emitter.on('b', count, { listenerAfter: expect5 });

    emitter.on('b', countOrDoNotCount, { listenerAfter: count });
    emitter.off('b', countOrDoNotCount);

    t.equal(emitter.hasListener('a', expect1), true, 'should be true');
    t.equal(emitter.hasListener('b', expect1), false, 'should be false');
    t.equal(emitter.hasListener('c', expect1), false, 'should be false');

    // Should be ok attempting to remove an unregistered listener
    t.doesNotThrow(() => {
        emitter.off('b', expect1);
        emitter.off('d', expect1);
    });

    emitter.emit('a');
    emitter.emit('b');
});
