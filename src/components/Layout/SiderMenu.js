import { Layout, Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { breadConfig } from '../../utils'
import styles from './SiderMenu.less'
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';



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
      case ['/', '/users'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/users'
        break
      case ['/hotel', '/hotel/edit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/'
        break
      case ['/net', '/net/edit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/'
        break
      case ['/area', '/area/edit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/area'
        break
    }

    const { langType } = this.props.appStore

    return (
      <IntlProvider locale="en" messages={langType}>
        <Sider
          collapsible
          collapsed={appStore.collapsed}
          onCollapse={appStore.onCollapse}
        >
          <div className={styles.logo} style={{ visibility: appStore.collapsed ? 'hidden' : 'visible' }}><FormattedMessage id='APP_NAME'></FormattedMessage></div>
          <Menu
            theme="dark"
            mode={appStore.siderMode}
            defaultSelectedKeys={[defaultSelectedKeys]}
            selectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={['data-mangment']}
            onClick={this.onSiderClick.bind(this)}
          >
            <SubMenu
              key="data-mangment"
              title={<span><Icon type="user" /><span className="nav-text">数据管理</span></span>}
            >
              <Menu.Item key="/users">用户管理</Menu.Item>
              <Menu.Item key="/hotel">酒店管理</Menu.Item>
              <Menu.Item key="/net">网点管理</Menu.Item>
              <Menu.Item key="/area">地区管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </IntlProvider>
    )
  }
}

export default SiderMenu