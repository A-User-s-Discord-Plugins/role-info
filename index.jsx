import React from "react"
import { Plugin } from '@vizality/entities';
import { patch, unpatch } from "@vizality/patcher"
import { getModule, getModuleByDisplayName } from '@vizality/webpack';
const { open: openModal } = require('@vizality/modal')
const { Permissions } = getModule('Permissions', 'ActivityTypes', 'StatusTypes');

import { ContextMenu } from '@vizality/components'
const DeveloperContextMenu = getModule(m => m.default?.displayName === 'DeveloperContextMenu')

import RoleModal from "./components/modals/RoleModal"

export default class RoleInfo extends Plugin {
    start () {
        console.log(Permissions)
        this.injectStyles("style.scss")
        this.patchRoleContextMenu()
    }

    stop () {
        unpatch('roleinfo-devcontextmenu')
    }

    patchRoleContextMenu(){
        patch('roleinfo-devcontextmenu', DeveloperContextMenu, 'default', function(args, res) {
            let id = args[0].id

            res.props.children.push(<ContextMenu.Item 
                id="roleinfo-open"
                label="Role informations"
                action={() => openModal(() => <RoleModal roleID={id} />)}
            />)
        
            return res;
        });
    }
}

export const Classes = {
    role: "roleinfo-role",
    normalColor: "roleinfo-rolecolor",
    ...getModule('listRow'),
    ...getModule('marginBottom8')
}

export const checkIfItHasPermission = function (rolePerm, permissionName) {
    return ((rolePerm & Permissions[permissionName]) === Permissions[permissionName].to32BitNumber());
}