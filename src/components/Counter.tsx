import * as React from "react";

export interface CounterProps {
    compiler: string;
    framework: string;
    version: number;
    onIncrement: () => any;
    onDecrement: () => any;
}

export class Counter extends React.Component<CounterProps, {}> {
    render() {
        const {compiler, framework, version, onIncrement, onDecrement} = this.props;
        return <div>
            <h1>Counter based on {compiler} and {framework} # {version}!</h1>
            <p>
                <button onClick={onIncrement}>
                    +
                </button>
                <button onClick={onDecrement}>
                    -
                </button>
            </p>
        </div>;
    }
}
