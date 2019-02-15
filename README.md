# EventEmitter

_Something similar to Node.js EventEmitter._

## Examples

Example 1

````typescript
import EventEmitter from '@dkh-dev/event-emitter';

const emitter = new EventEmitter();

const listener = (...args: any): void => {
    console.log(...args);
};
emitter.on('test', listener);

const anotherListener = (): void => {
    console.log('Hello!');
};
// Insert anotherListener before listener
emitter.on('test', anotherListener, { listenerAfter: listener });

emitter.emit('test', { error: false, result: [ 'Yay!' ] });
// => Hello!
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
phone.on('unlocked', () => console.warn('Is that you, kid?'));

// When 'someone' unlocks the phone
phone.unlock();
// => Is that you, kid?
````
