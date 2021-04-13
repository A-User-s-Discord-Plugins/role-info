import React, { memo } from "react";

import { Flex } from "@vizality/components";
import Section from "../custom/Section";

export default memo(({ role }) => {
	return (
		<Flex
			style={{ marginTop: "8px" }}
			justify={Flex.Justify.START}
			wrap={Flex.Wrap.WRAP}
		>
			<Section title="Mentionable">{role.mentionable ? "Yes" : "No"}</Section>
			{role.colorString && (
				<Section title="Color">
					<div className="roleifno-overall-color">
						<span
							className="roleifno-overall-color-block"
							style={{ background: role.colorString }}
						/>
						{role.colorString}
					</div>
				</Section>
			)}
			<Section title="Server Boost Role">{role.managed ? "Yes" : "No"}</Section>
		</Flex>
	);
});
