interface EventListenerOptions {
    listenerAfter?: Function;
}
export default class EventEmitter {
    private readonly listeners;
    on(type: string, listener: Function, options?: EventListenerOptions): this;
    off(type: string, listener: Function): this;
    emit(type: string, ...args: any[]): void;
    hasListener(type: string, listener: Function): boolean;
}
export {};
