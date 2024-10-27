import { useController, useFormContext } from "react-hook-form";

/**
 * useController 공통 훅 분리
 * 이 안 에서 CONTROL 관리되든 안 되든 재렌더링에 관계 없음
 */
function useOptionField( name, rules) {
    const { control } = useFormContext();
    return useController({
        name,
        control,
        rules
    });
}

export default useOptionField;