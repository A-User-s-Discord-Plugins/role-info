import React, { memo } from 'react';

import { getModule, getModuleByDisplayName } from '@vizality/webpack';
const { getGuildId } = getModule('getGuildId');
const { getGuild } = getModule('getGuild', 'getGuilds')
const FormSection = getModuleByDisplayName('FormSection')
const { AdvancedScrollerThin } = getModule('AdvancedScrollerThin', false);

import { Classes, checkIfItHasPermission } from "../../index"

import { Flex, TabBar, Clickable, Tooltip, Icon } from "@vizality/components"
import OverallLook from "../sections/OverallLook"
import Permissions from "../sections/Permissions"
import MaterialIcons from "../custom/MaterialIcons"

let Role = memo(({ children, color }) => {
    return <>
        <div className={`role-2irmRk flex-1O1GKY alignCenter-1dQNNs ${Classes.normalColor} ${Classes.role}`} style={{ borderColor: color }}>
            <div className="roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style={{ backgroundColor: color }} />
            <div className="roleName-32vpEy">{children}</div>
        </div>
    </>
})

export default class RoleModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tab: "Overall",
        };
    }

    render() {
        const { roleID, guild = getGuild(getGuildId()) } = this.props
        const role = getRoleInfo(roleID, guild)
        const features = listAllFeatures(role)
        const color = role.colorString ? role.colorString : "#ffffffcc"

        return <>
            <Flex className={Classes.root} direction={Flex.Direction.VERTICAL}>
                <div className={Classes.topSectionNormal}>
                    <header className={Classes.header}>
                        <Role color={color}></Role>
                        <div className={Classes.headerInfo}>
                            <div className={Classes.nameTag}>
                                <span className={Classes.username}>{role.name}</span>
                            </div>
                            {getIconFromFeatures(features)}
                        </div>
                    </header>
                    <div>
                        <div className={Classes.tabBarContainer}>
                            <TabBar
                                className={Classes.tabBar}
                                selectedItem={this.state.tab}
                                type={TabBar.Types.TOP}
                                onItemSelect={(tab) => this.setState({ tab })}
                            >
                            <TabBar.Item
                                className={Classes.tabBarItem}
                                id="Overall"
                            >
                                Overall
                            </TabBar.Item>
                            <TabBar.Item
                                className={Classes.tabBarItem}
                                id="Permissions"
                            >
                                Permissions
                            </TabBar.Item>
                            </TabBar>
                        </div>
                    </div>
                </div>
                <div className={Classes.body + " roleinfo-body"}>
                    <AdvancedScrollerThin fade={true}
                        className={[
                            "infoScroller-3EYYns",
                            Classes.listScroller,
                            Classes.fade,
                            Classes.thin,
                            Classes.scrollerBase,
                        ].join(' ')}
                    >
                        {
                            renderTab(role, this.state.tab)
                        }
                    </AdvancedScrollerThin>
                </div>
            </Flex>
        </>
    }
}

const getRoleInfo = function(roleid, guild) {
    return Object.values(guild.roles).find(role => role.id === roleid)
}

const renderTab = function(role, tabname){
    switch (tabname) {
        case "Overall": return <OverallLook role={role}></OverallLook>
        case "Permissions": return <Permissions role={role}></Permissions>

        default: return <OverallLook role={role}></OverallLook>
    }
}

const getIconFromFeatures = function(features){
    return <Flex className={Classes.profileBadges + " roleinfo-badges"}>
        {Object.entries(features).map(key => {
            return <>
                <Tooltip
                    className={Classes.profileBadgeWrapper}
                    position='top'
                    text={(key[0][0].toUpperCase() + key[0].slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2').trim()}
                >
                    <Clickable role='button' tag='div'>
                        {key[0] === "boost" && key[1] && <Icon name='PremiumGuildTier3'/>}
                        {key[0] === "administrator" && key[1] && <MaterialIcons name="account_circle"/>}
                        {key[0] === "ban" && key[1] && <MaterialIcons name="hardware"/>}
                        {key[0] === "kick" && key[1] && <MaterialIcons name="remove_circle_outline"/>}
                        {key[0] === "mentionEveryone" && key[1] && <MaterialIcons name="alternate_email"/>}
                        {key[0] === "manageMessages" && key[1] && <MaterialIcons name="chat_bubble"/>}
                        {key[0] === "manageGuild" && key[1] && <MaterialIcons name="dns"/>}
                        {key[0] === "manageChannels" && key[1] && <MaterialIcons name="tag"/>}
                    </Clickable>
                </Tooltip>
            </>;
        })}
    </Flex>
}

const listAllFeatures = function(role) {
    return {
        boost: role.managed,
        administrator: checkIfItHasPermission(role.permissions, 'ADMINISTRATOR'),
        ban: checkIfItHasPermission(role.permissions, 'BAN_MEMBERS'),
        kick: checkIfItHasPermission(role.permissions, 'KICK_MEMBERS'),
        mentionEveryone: checkIfItHasPermission(role.permissions, 'MENTION_EVERYONE'),
        manageMessages: checkIfItHasPermission(role.permissions, 'MANAGE_MESSAGES'),
        manageGuild: checkIfItHasPermission(role.permissions, 'MANAGE_GUILD'),
        manageChannels: checkIfItHasPermission(role.permissions, 'MANAGE_CHANNELS')
    }
}