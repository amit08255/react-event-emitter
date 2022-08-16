/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';

type Props = {
    children: React.ReactNode,
}

const EventEmitterProvider = ({ children }:Props) => {
    useEffect(() => {
        const windowObj:any = window;
        windowObj.emitter = null;
    }, []);

    return (
        <>{children}</>
    );
};

export default EventEmitterProvider;
