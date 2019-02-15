'use strict';

interface EventListenerOptions {
    listenerAfter?: Function;
}

export default class EventEmitter {
    private readonly listeners: Map<string, Function[]> = new Map();

    on(
        type: string,
        listener: Function,
        options?: EventListenerOptions,
    ): this {
        const list = this.listeners.get(type);
        if (list) {
            const listenerAfter = options && options.listenerAfter;

            const index = list.indexOf(listener);
            const indexAfter = listenerAfter
                ? list.indexOf(listenerAfter)
                : -1;

            // If the listener has been registered
            if (index !== -1) {
                //     and it is already before listenerAfter,
                //     leave it as it is
                if (index + 1 === indexAfter) {
                    return this;
                }

                //     else,
                //     remove it from the list
                //         to insert it to the list later
                list.splice(index, 1);
            }

            if (indexAfter !== -1) {
                list.splice(indexAfter, 0, listener);
            } else {
                list.push(listener);
            }
        } else {
            this.listeners.set(type, [listener]);
        }

        return this;
    }

    off(type: string, listener: Function): this {
        const list = this.listeners.get(type);
        if (list) {
            const index = list.indexOf(listener);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }

        return this;
    }

    emit(type: string, ...args: any[]): void {
        const list = this.listeners.get(type);
        if (list) {
            list.forEach(listener => listener.apply(this, args));
        }
    }

    hasListener(type: string, listener: Function): boolean {
        const list = this.listeners.get(type);
        if (list) {
            return list.includes(listener);
        }
        return false;
    }
}
