import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Collapse, Popover } from 'antd'
import { FormattedMessage } from 'react-intl';
// import DerbyIcon from '../../Common/DerbyIcon'
// import SymbolIcon from '../../Common/SymbolIcon'
import Truncate from 'react-truncate';
import ReadMore from './ReadMore';
import moment from 'moment'

const Panel = Collapse.Panel;

const { Content } = Layout

const demos = ['language', 'DerbyIcon', 'SymbolIcon', 'textOverflowS', 'textOverflowM', 'readMore', 'dateFormat'];

const textOverflowStyle = {
    width: 100,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
}

const textOverflowText = "If Text is overflow then let the more show as '...'If Text is overflow then let the more show as '...'If Text is overflow then let the more show as '...'If Text is overflow then let the more show as '...'"

@observer
class Demo extends Component {

    render() {
        return (
            <Layout>
                <Collapse activeKey={demos}>
                    <Panel header="More Language Support" key={demos[0]}>
                        <FormattedMessage id='APP_NAME'></FormattedMessage>
                    </Panel>
                    <Panel header="Iconfont DerbyIcon based on Ant-Icon" key={demos[1]}>
                        {/* <DerbyIcon type="icon-icon_shezhi" /> */}
                    </Panel>
                    <Panel header="Iconfont private SymbolIcon" key={demos[2]}>
                        {/* <SymbolIcon iconName={'icon-icon_shezhi'} style={{ color: 'red' }} /> */}
                    </Panel>
                    <Panel header="If Text is overflow then let the more show as '...'.(single-line support all explorers)" key={demos[3]}>
                        <Popover content={textOverflowText}>
                            <p style={textOverflowStyle}>{textOverflowText}</p>
                        </Popover>
                    </Panel>
                    <Panel header="If Text is overflow then let the more show as '...'.(multi-line support all explorers)" key={demos[4]}>
                        <Popover content={textOverflowText}>
                            <Truncate width={200} lines={3} children={<FormattedMessage id='DEMO_LONG_TEXT'></FormattedMessage>}>
                                
                            </Truncate>
                        </Popover>
                    </Panel>
                    <Panel header="If Text is overflow then let the more show as '...'.(multi-line support all explorers && a component that support Read More Button!)" key={demos[5]}>
                        <div style={{ width: 200 }}>
                            <ReadMore lines={2} children={<FormattedMessage id='DEMO_LONG_TEXT'></FormattedMessage>} />
                        </div>
                    </Panel>
                    <Panel header="Date Format(Moment Lib has Supported)" key={demos[6]}>
                        {moment().format('YYYY-MM-DD hh:mm:ss')}
                    </Panel>
                </Collapse>
            </Layout>
        )
    }
}

export default Demo