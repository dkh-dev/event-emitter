'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(type, listener, options = {}) {
        const { listenerAfter } = options;
        if (listener === listenerAfter) {
            return this;
        }
        const list = this.listeners.get(type);
        if (list) {
            const index = list.indexOf(listener);
            const indexAfter = listenerAfter ? list.indexOf(listenerAfter) : -1;
            if (index === -1) {
                if (indexAfter === -1) {
                    list.push(listener);
                }
                else {
                    list.splice(indexAfter, 0, listener);
                }
            }
            else if (index + 1 !== indexAfter) {
                list.splice(index, 1);
                const newIndexAfter = indexAfter - (index < indexAfter ? 1 : 0);
                if (indexAfter === -1) {
                    list.push(listener);
                }
                else {
                    list.splice(newIndexAfter, 0, listener);
                }
            }
        }
        else {
            this.listeners.set(type, [listener]);
        }
        return this;
    }
    off(type, listener) {
        const list = this.listeners.get(type);
        if (list) {
            const index = list.indexOf(listener);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        return this;
    }
    emit(type, ...args) {
        const list = this.listeners.get(type);
        if (list) {
            list.forEach(listener => listener.apply(this, args));
        }
    }
    hasListener(type, listener) {
        const list = this.listeners.get(type);
        return !!list && list.includes(listener);
    }
}
exports.default = EventEmitter;
