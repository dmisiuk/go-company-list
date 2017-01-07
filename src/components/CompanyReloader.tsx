import * as React from "react";

export interface CompanyReloaderProps {
    onReload: () => any;
}

export class CompanyReloader extends React.Component<CompanyReloaderProps, {}> {
    render() {
        const {onReload} = this.props;
        return <div>
            <p>
                <button onClick={onReload}>
                    reload
                </button>
            </p>
        </div>;
    }
}
