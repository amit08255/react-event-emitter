/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';

/* eslint-disable react/jsx-props-no-spreading */
const globalEmitter = {
    events: {},
    emit(event, ...args) {
        const callbacks = this.events[event] || {};
        const keys = Object.keys(callbacks);

        keys.forEach((key) => {
            callbacks[key](...args);
        });
    },
    on(event, cb, key = 'index') {
        if (!this.events[event]) {
            this.events[event] = {};
        }

        this.events[event][key] = cb;

        return () => {
            delete this.events[event][key];
        };
    },
};

function withEmitter<Props>(Component:React.FC<Props>) {
    return (props:Props) => {
        const [emitter, setEmitter] = useState<EventEmitter>(null);

        useEffect(() => {
            const windowObj:any = window;
            windowObj.emitter = windowObj.emitter ? windowObj.emitter : globalEmitter;
            setEmitter(windowObj.emitter);
        }, []);

        if (!emitter) {
            return null;
        }

        return (
            <Component {...props} emitter={emitter} />
        );
    };
}

export default withEmitter;
