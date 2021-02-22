import React, { memo } from "react"

import { getModuleByDisplayName } from '@vizality/webpack';
import { Text } from "@vizality/components"
import { Classes } from "../../index"

const FormSection = getModuleByDisplayName('FormSection')

export default memo(({ children, title }) => {
    return <FormSection
        className={Classes.marginBottom8 + " userInfoSection-2acyCx roleinfo-sections"}
        tag='h5'
        title={title}
    >
            <Text selectable={true}>{children}</Text>
    </FormSection>
})