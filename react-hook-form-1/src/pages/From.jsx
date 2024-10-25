import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import DropdownEllipsis   from "../layouts/DropdownEllipsis";
import MultiStepForm         from "../layouts/MultiStepForm";

function From(props) {
    const methods = useForm();
    return (
        <FormProvider {...methods} >
            {/*<DropdownEllipsis />*/}
            <MultiStepForm />
        </FormProvider>
    );
}

export default From;