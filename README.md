# EventEmitter

_Something similar to Node.js EventEmitter._

## Installation

````bash
npm install @dkh-dev/event-emitter
````

## Examples

Example 1

````typescript
import EventEmitter from '@dkh-dev/event-emitter';

const emitter = new EventEmitter();

const listener = (...args: any): void => console.log(...args);
const anotherListener = (): void => console.log('Hi there!');

emitter.on('test', listener);
// Insert anotherListener before listener
emitter.on('test', anotherListener, { listenerAfter: listener });

emitter.emit('test', { error: false, result: [ 'Yay!' ] });
// => Hi there!
//    { error: false, result: [ 'Yay!' ] }
````

Example 2

````typescript
import EventEmitter from '@dkh-dev/event-emitter';

class Phone extends EventEmitter {
    public isUnlocked: boolean = false;

    constructor(public name: string) {
        super();
    }

    public unlock(): this {
        this.isUnlocked = true;

        this.emit('unlocked');

        return this;
    }
}

const phone = new Phone("Mom's phone");

// Mom's setting
phone.on('unlocked', (): void => console.warn('Is that you, kid?'));

// When 'someone' unlocks the phone
phone.unlock();
// => Is that you, kid?
````
