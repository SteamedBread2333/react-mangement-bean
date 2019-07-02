/**
 * 项目中存放iconfont.js的路径，并引入
 */
function addScript(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = 'http://at.alicdn.com/t/font_1138113_swq067vdji9.js';
	document.body.appendChild(script);
}

process.env.NODE_ENV === "development" ? addScript() : require('../Common/iconfont')

import React from 'react'

export default function SymbolIcon(props) {
    return <svg style={{ width: '1em', height: '1em', verticalAlign: '-0.15em', fill: 'currentColor', overflow: 'hidden', ...props.styles }} className="icon" aria-hidden="true">
        <use style={props.style} xlinkHref={`#${props.iconName}`}></use>
    </svg>
}