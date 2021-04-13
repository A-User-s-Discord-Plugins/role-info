import React from "react";
import { Plugin } from "@vizality/entities";
import { patch } from "@vizality/patcher";
import { getModule } from "@vizality/webpack";
import { findInReactTree } from "@vizality/util/React";
const { open: openModal } = require("@vizality/modal");
const { Permissions } = getModule("Permissions", "ActivityTypes", "StatusTypes");
const { getGuildId } = getModule("getGuildId");
const { getGuild } = getModule("getGuild", "getGuilds");

import { ContextMenu } from "@vizality/components";

import RoleModal from "./components/modals/RoleModal";

let unpatchDevContextMenu = () => {
    this.log("Unable to unpatch roleinfo-devcontextmenu");
};
let unpatchGuildHeaderPopout = () => {
    this.log("Unable to unpatch roleinfo-guildheaderpopout");
};
let unpatchGuildContextMenu = () => {
    this.log("Unable to unpatch roleinfo-guildcontextmenu");
};

export default class RoleInfo extends Plugin {
    start() {
        // console.log(Permissions);
        this.injectStyles("style.scss");
        this.patchRoleContextMenu();
        this.patchGuildHeaderPopout();
        this.patchGuildContextMenu();
    }

    stop() {
        unpatchDevContextMenu();
        unpatchGuildHeaderPopout();
        unpatchGuildContextMenu();
    }

    patchRoleContextMenu() {
        unpatchDevContextMenu = patch("roleinfo-devcontextmenu", getModule((m) => m.default?.displayName === "DeveloperContextMenu"), "default", function (args, res) {
                let id = args[0].id;

                res.props.children = [res.props.children];
                res.props.children.push(
                    <ContextMenu.Item
                        id="roleinfo-open"
                        label="Role Information"
                        action={() => openModal(() => <RoleModal roleID={id} />)}
                    />
                );

                return res;
            }
        );
    }

    patchGuildHeaderPopout() {
        unpatchGuildHeaderPopout = patch("roleinfo-guildheaderpopout", getModule("MenuItem"), "default", function (args, res) {
                if (res.props.id !== "guild-header-popout" || findInReactTree(res, (c) => c.props?.id == "roleinfo-open-everyone")) return res;

                args[0].children.splice(args[0].children.length - 1, 0,
                    <ContextMenu.Item
                        id="roleinfo-open-everyone"
                        label="View @everyone Permissions"
                        action={() =>
                            openModal(() => (
                                <RoleModal
                                    roleID={
                                        Object.values(getGuild(getGuildId()).roles).find(
                                            (role) => role.name === "@everyone"
                                        ).id
                                    }
                                />
                            ))
                        }
                    />
                );

                return res;
            }
        );
    }

    patchGuildContextMenu() {
        unpatchGuildContextMenu = patch("roleinfo-guildcontextmenu", getModule((m) => m.default?.displayName === "GuildContextMenu"), "default", function (args, res) {
                const whereToAdd = res.props.children.find((e) => e.props?.children?.key === "devmode-copy-id") ? res.props.children.length - 2 : res.props.children.length - 1;

                res.props.children.splice(whereToAdd, 0,
                    <ContextMenu.Item
                        id="roleinfo-open-everyone"
                        label="View @everyone Permissions"
                        action={() =>
							openModal(() => <RoleModal
								guild={args[0].guild}
								roleID={
									Object.values(args[0].guild.roles).find(
										(role) => role.name === "@everyone"
									).id
								}
							/>)
                        }
                    />
                );

                return res;
            }
        );
    }
}

export const Classes = {
    role: "roleinfo-role",
    normalColor: "roleinfo-rolecolor",
    ...getModule("listRow"),
    ...getModule("marginBottom8"),
};

export const checkIfItHasPermission = function (rolePerm, permissionName) {
    return (
        (rolePerm & Permissions[permissionName]) ===
        Permissions[permissionName].to32BitNumber()
    );
};
