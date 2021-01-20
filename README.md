# EventEmitter

_Something similar to Node.js EventEmitter._

## Installation

````bash
npm install @dkh-dev/event-emitter
````

## Example

````typescript
import EventEmitter from '@dkh-dev/event-emitter';

const emitter = new EventEmitter();

emitter.on('test', console.log);

emitter.emit('test', { error: false, result: [ 'Yay!' ] });
// => { error: false, result: [ 'Yay!' ] }
````
