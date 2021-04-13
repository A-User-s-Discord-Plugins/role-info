import React, { memo } from "react";

import { checkIfItHasPermission } from "../../index";

import { SearchBar } from "@vizality/components";

const RoleCheck = memo(({ title, displayCheckmark }) => {
    return (
        <>
            <div className="descriptionRow-m_KyqB roleinfo-permission-row">
                {displayCheckmark ? (
                    <svg
                        class="descriptionIcon-36p1fN"
                        aria-hidden="false"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle r="8" cx="12" cy="12" fill="#ffffff"></circle>
                        <g fill="none" fill-rule="evenodd">
                            <path
                                fill="#43b581"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            ></path>
                        </g>
                    </svg>
                ) : (
                    <svg
                        class="descriptionIcon-36p1fN"
                        aria-hidden="false"
                        width="24"
                        height="24"
                        viewBox="0 0 14 14"
                    >
                        <circle r="5" cx="7" cy="7" fill="#ffffff"></circle>
                        <path
                            fill="#f04747"
                            d="M7.02799 0.333252C3.346 0.333252 0.361328 3.31792 0.361328 6.99992C0.361328 10.6819 3.346 13.6666 7.02799 13.6666C10.71 13.6666 13.6947 10.6819 13.6947 6.99992C13.6947 3.31792 10.7093 0.333252 7.02799 0.333252ZM10.166 9.19525L9.22333 10.1379L7.02799 7.94325L4.83266 10.1379L3.89 9.19525L6.08466 6.99992L3.88933 4.80459L4.832 3.86259L7.02733 6.05792L9.22266 3.86259L10.1653 4.80459L7.97066 6.99992L10.166 9.19525Z"
                        ></path>
                    </svg>
                )}
                {title}
            </div>
        </>
    );
});

export default class RoleModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.role = this.props.role;

        this.state = {
            search: "",
        };

        this.listSection = [
            {
                "Add Reactions": <RoleCheck
                        title="Add Reactions"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "ADD_REACTIONS"
                        )}
                    />
            },
            {
                Administrator: <RoleCheck
                        title="Administrator"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "ADMINISTRATOR"
                        )}
                    />
            },
            {
                "Attach Files": <RoleCheck
                        title="Attach Files"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "ATTACH_FILES"
                        )}
                    />
            },
            {
                "Ban Members": <RoleCheck
                        title="Ban Members"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "BAN_MEMBERS"
                        )}
                    />
            },
            {
                "Change Nickname": <RoleCheck
                        title="Change Nickname"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "CHANGE_NICKNAME"
                        )}
                    />
            },
            {
                Connect: <RoleCheck
                        title="Connect"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "CONNECT"
                        )}
                    />
            }, // dont ask, i have no idea what it means
            {
                "Create Invites": <RoleCheck
                        title="Create Invites"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "CREATE_INSTANT_INVITE"
                        )}
                    />
            },
            {
                "Deafen Members": <RoleCheck
                        title="Deafen Members"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "DEAFEN_MEMBERS"
                        )}
                    />
            },
            {
                "Have Priority Speaker": <RoleCheck
                        title="Have Priority Speaker"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "PRIORITY_SPEAKER"
                        )}
                    />
            },
            {
                "Kick Members": <RoleCheck
                        title="Kick Members"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "KICK_MEMBERS"
                        )}
                    />
            },
            {
                "Manage Channels": <RoleCheck
                        title="Manage Channels"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_CHANNELS"
                        )}
                    />
            },
            {
                "Manage Emojis": <RoleCheck
                        title="Manage Emojis"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_EMOJIS"
                        )}
                    />
            },
            {
                "Manage Guild": <RoleCheck
                        title="Manage Guild"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_GUILD"
                        )}
                    />
            },
            {
                "Manage Messages": <RoleCheck
                        title="Manage Messages"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_MESSAGES"
                        )}
                    />
            },
            {
                "Manage Nicknames": <RoleCheck
                        title="Manage Nicknames"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_NICKNAMES"
                        )}
                    />
            },
            {
                "Manage Roles": <RoleCheck
                        title="Manage Roles"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_ROLES"
                        )}
                    />
            },
            {
                "Manage Webhooks": <RoleCheck
                        title="Manage Webhooks"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MANAGE_WEBHOOKS"
                        )}
                    />
            },
            {
                "Mention @everyone": <RoleCheck
                        title="Mention @everyone"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MENTION_EVERYONE"
                        )}
                    />
            },
            {
                "Move Members": <RoleCheck
                        title="Move Members"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MOVE_MEMBERS"
                        )}
                    />
            },
            {
                "Mute Members": <RoleCheck
                        title="Mute Members"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "MUTE_MEMBERS"
                        )}
                    />
            },
            {
                "Read Message history": <RoleCheck
                        title="Read Message history"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "READ_MESSAGE_HISTORY"
                        )}
                    />
            },
            {
                "Send Messages": <RoleCheck
                        title="Send Messages"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "SEND_MESSAGES"
                        )}
                    />
            },
            {
                "Send TTS Messages": <RoleCheck
                        title="Send TTS Messages"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "SEND_TTS_MESSAGES"
                        )}
                    />
            },
            {
                "Share Embedded Links": <RoleCheck
                        title="Share Embedded Links"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "EMBED_LINKS"
                        )}
                    />
            },
            {
                "Speak In Voice Channels": <RoleCheck
                        title="Speak In Voice Channels"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "SPEAK"
                        )}
                    />
            },
            {
                "Switch Between Voice Activity and Push to Talk Modes": <RoleCheck
                        title="Switch Between Voice Activity and Push to Talk Modes"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "USE_VAD"
                        )}
                    />
            },
            {
                "Stream In Voice Channels": <RoleCheck
                        title="Stream In Voice Channels"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "STREAM"
                        )}
                    />
            },
            {
                "Use Bot Commands": <RoleCheck
                        title="Use Bot Commands"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "USE_APPLICATION_COMMANDS"
                        )}
                    />
            },
            {
                "Use External Emojis": <RoleCheck
                        title="Use External Emojis"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "USE_EXTERNAL_EMOJIS"
                        )}
                    />
            },
            {
                "View Audit Log": <RoleCheck
                        title="View Audit Log"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "VIEW_AUDIT_LOG"
                        )}
                    />
            },
            {
                "View Channel": <RoleCheck
                        title="View Channel"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "VIEW_CHANNEL"
                        )}
                    />
            },
            {
                "View Guild Analytics": <RoleCheck
                        title="View Guild Analytics"
                        displayCheckmark={checkIfItHasPermission(
                            this.role.permissions,
                            "VIEW_GUILD_ANALYTICS"
                        )}
                    />
            },
        ];
    }

    render() {
		return <>
			<SearchBar
				style={{ marginTop: "13px" }}
				placeholder="Search for permission"
				query={this.state.search}
				onChange={(val) => {
					this.setState({ search: val });
				}}
			/>
			<div className="roleinfo-permission-grid">
				{this.listSection.map((element) => {
					let objname = Object.getOwnPropertyNames(element)[0];
					if (objname.toLowerCase().includes(this.state.search.toLowerCase()))
						return element[objname];
				})}
			</div>
		</>
    }
}
