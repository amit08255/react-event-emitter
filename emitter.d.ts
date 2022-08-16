interface EventsMap {
    [event: string]: any
  }

  interface DefaultEvents extends EventsMap {
    [event: string]: (...args: any) => void
  }

interface Unsubscribe {
    (): void
  }

type EventEmitter = {
    /**
     * Event names in keys and arrays with listeners in values.
     *
     * ```js
     * emitter1.events = emitter2.events
     * emitter2.events = { }
     * ```
     */
    events: Partial<{ [E in keyof Events]: Events[E][] }>;

    /**
     * Add a listener for a given event.
     *
     * ```js
     * const unbind = ee.on('tick', (tickType, tickDuration) => {
     *   count += 1
     * })
     *
     * disable () {
     *   unbind()
     * }
     * ```
     *
     * @param event The event name.
     * @param cb The listener function.
     * @param key Key used to prevent adding same callback again and again default key is index.
     * @returns Unbind listener from event.
     */
    on<K extends keyof Events>(this: this, event: K, cb: Events[K], key?:string): Unsubscribe

    /**
     * Calls each of the listeners registered for a given event.
     *
     * ```js
     * ee.emit('tick', tickType, tickDuration)
     * ```
     *
     * @param event The event name.
     * @param args The arguments for listeners.
     */
    emit<K extends keyof Events>(
      this: this,
      event: K,
      ...args: Parameters<Events[K]>
    ): void
}
