'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(type, listener, options) {
        const list = this.listeners.get(type);
        if (list) {
            const listenerAfter = options && options.listenerAfter;
            const index = list.indexOf(listener);
            const indexAfter = listenerAfter
                ? list.indexOf(listenerAfter)
                : -1;
            if (index !== -1) {
                if (index + 1 === indexAfter) {
                    return this;
                }
                list.splice(index, 1);
            }
            if (indexAfter !== -1) {
                list.splice(indexAfter, 0, listener);
            }
            else {
                list.push(listener);
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
        if (list) {
            return list.includes(listener);
        }
        return false;
    }
}
exports.default = EventEmitter;
