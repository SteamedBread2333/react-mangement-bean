import { Layout, Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { breadConfig } from '../../utils'
import styles from './SiderMenu.less'
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { logo } from '../../assets'



const SubMenu = Menu.SubMenu
const { Sider } = Layout


@inject('appStore') @withRouter @observer
class SiderMenu extends Component {


  onSiderClick(e) {
    const { location, history } = this.props
    if (location.pathname === e.key) return
    history.push(e.key)
  }

  render() {

    const { appStore, location } = this.props

    let defaultSelectedKeys = ''
    switch (true) {
      case ['/', '/skills'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/skills'
        break
    }

    const { langType } = this.props.appStore

    console.log(logo)
    return (
      <IntlProvider locale="en" messages={langType}>
        <Sider
          theme='light'
          collapsible
          style={{ borderRight: '1px solid #efefef', background: '#06789d' }}
          collapsed={appStore.collapsed}
          onCollapse={appStore.onCollapse}
        >
          <div className={styles.logo} style={{ visibility: appStore.collapsed ? 'hidden' : 'visible' }}>
            <img src={logo} alt='logo' style={{ width: 170, marginBottom: 15 }} />
            <FormattedMessage id='APP_NAME'></FormattedMessage>
          </div>
          <h4 className={styles.separator}></h4>
          <Menu
            theme="dark"
            style={{ border: 'none' }}
            mode={appStore.siderMode}
            defaultSelectedKeys={[defaultSelectedKeys]}
            selectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={['data-mangment']}
            onClick={this.onSiderClick.bind(this)}
          >

            <Menu.Item className={styles.menuItem} key="/skills">Skill Manage</Menu.Item>
          </Menu>
        </Sider>
      </IntlProvider>
    )
  }
}

export default SiderMenu