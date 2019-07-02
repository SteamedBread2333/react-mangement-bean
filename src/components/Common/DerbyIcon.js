import { Icon } from 'antd'
import iconfont from './iconfont'

const DerbyIcon = Icon.createFromIconfontCN({
    scriptUrl: process.env.NODE_ENV === "development" 
    ? '//at.alicdn.com/t/font_1138113_swq067vdji9.js'
    : iconfont,
});

export default DerbyIcon