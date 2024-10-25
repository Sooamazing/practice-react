import React, { useState } from 'react';
import { FormattedMessage } from "react-intl";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

function DropdownEllipsis(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="size-full" style={{ flex: 1, overflow: 'hidden' }}>
                <DropdownToggle
                    caret
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%'
                    }}
                >
                    Dropdownㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <div className="size-full font-extrabold" style={{ flex: 1 }}>
                <FormattedMessage style={{ color: "red" }} id="zz" defaultMessage="안녕하세요? 이건 기본 메시지" />
            </div>
            <div className="size-full" style={{ flex: 1 }}>
                <FormattedMessage style={{ color: "red" }} id="zz" defaultMessage="안녕하세요? 이건 기본 메시지" />
            </div>
        </div>
    );
}

export default DropdownEllipsis;