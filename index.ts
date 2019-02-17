'use strict';

interface EventListenerOptions {
    listenerAfter?: Function;
}

export default class EventEmitter {
    private readonly listeners: Map<string, Function[]> = new Map();

    on(
        type: string,
        listener: Function,
        options: EventListenerOptions = {},
    ): this {
        const { listenerAfter } = options;
        if (listener === listenerAfter) {
            return this;
        }

        const list = this.listeners.get(type);
        if (list) {
            const index = list.indexOf(listener);
            const indexAfter = listenerAfter ? list.indexOf(listenerAfter) : -1;

            if (index === -1) {
                // If listener doesn't exists
                if (indexAfter === -1) {
                    //     and if listenerAfter doesn't exists
                    //     append it to the list
                    list.push(listener);
                } else {
                    //     insert it before listenerAfter
                    list.splice(indexAfter, 0, listener);
                }
            } else if (index + 1 !== indexAfter) {
                // if it exists but it isn't before listenerAfter
                // temprarily remove it from the list
                list.splice(index, 1);

                // As an listener has been removed from the list
                // indexAfter might have been updated
                const newIndexAfter = indexAfter - (index < indexAfter ? 1 : 0);

                // and now adding it to the list
                if (indexAfter === -1) {
                    list.push(listener);
                } else {
                    list.splice(newIndexAfter, 0, listener);
                }
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
        return !!list && list.includes(listener);
    }
}
