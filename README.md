# React Event Emitter

This is simple component for emitting emit in React app. Every event can have one or more subscribers. When an event is emitted, all subscribers of the event captures it and are executed.

## How to Use Event Emitter

First wrap all components inside `EventEmitterProvider`. This is required to automatically reset events to prevent conflict when using client-side routing.

```tsx
<EventEmitterProvider>
    <AppShell>
        <Navbar />
    </AppShell>
</EventEmitterProvider>
```

## How to Use Emitter with Component

To use event emitter with component there is a HOC `withEmitter`. You need to pass the props of your target component to this HOC. The target component will work exactly like normal component except it will have an additional props `emitter`.

```tsx
import withEmitter from 'components/EventEmitter/withEmitter';

interface Props {
    children: React.ReactNode,
}

interface PropsMain extends Props {
    emitter: EventEmitter,
}

const AccountShellMain = (props:PropsMain) => {
    const { children, emitter } = props;

    useEffect(() => {
        // registering event subscribers
        emitter.on('create/new-account', (promise: Promise<any>) => {
            promise.then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    return (
        <>
         {children}
        </>
    );
};

const AccountShell = withEmitter<Props>(AccountShellMain);

export default AccountShell;
```

## APIs

Below are list of emitter APIs which can be used to handle events:

* **emit(eventName:string, arguments:array[])**: This function allows you to emit an event by specific name and all the data after event name will be passed to subscriber callback.

* **on(eventName:string, callback:Function, key?:string)**: This function allows you to add subscriber to event emitter. The callback function will be executed when the provided event will be trigerred. The main thing to notice here is the optional parameter `key`. The default value of `key` is `index`. This parameter is used to identify the callback being added for particular event and prevent duplication of the callback function. If no `key` is passed then every callback function passed for same event will replace the previous callback function. It simply means that if you need to add multiple callback functions for an event then you need to pass `key`.
