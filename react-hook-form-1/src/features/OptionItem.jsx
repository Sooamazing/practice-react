import React from 'react';
import {Button} from "reactstrap";
import OptionNameField from "./OptionNameField";
import OptionValueField from "./OptionValueField";
import OptionPriceField from "./OptionPriceField";

/**
 * field 옵션 추가 및 삭제
 * 입력 시 렌더링 같이 되는 문제 - 각 필드에 대한 컴포넌트로 분리(useController 분리)
 */
function OptionItem({index, onClickRemoveOption, showDeleteButton}) {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
            {showDeleteButton && <Button onClick={onClickRemoveOption}>삭제</Button>}
            <OptionNameField index={index}/>
            <OptionValueField index={index}/>
            <OptionPriceField index={index}/>
        </div>
    );
}

export default OptionItem;