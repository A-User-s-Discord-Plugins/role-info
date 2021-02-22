import React from "react"

export default function MaterialFonts(props) {
    return <span className={`material-icons ${props.className}`}>{props.name}</span>;
}