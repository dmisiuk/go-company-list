import * as React from "react";
import { Button, Popover, Tooltip } from 'reactstrap';

export interface CompanyReloaderProps {
    onReload: () => any;
}

export class CompanyReloader extends React.Component<CompanyReloaderProps, {}> {
    render() {
        const {onReload} = this.props;
        return <div>
            <p>
                <Button color="warning" onClick={onReload}>
                    reload
                </Button>
            </p>
        </div>;
    }
}
