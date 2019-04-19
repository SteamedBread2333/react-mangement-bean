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
    // console.log(location)
    switch (true) {
      case location.pathname === '/':
        defaultSelectedKeys = '/skills'
        break
      case location.pathname.search('/skills') !== -1:
        defaultSelectedKeys = '/skills'
        break
      case location.pathname.search('/lalal') !== -1:
        defaultSelectedKeys = '/lalal'
        break
    }

    const { langType } = this.props.appStore
    return (
      <IntlProvider locale="en" messages={langType}>
        <Sider
          theme='dark'
          collapsible
          className={styles.silder}
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
            style={{ border: 'none', background: '#06789d' }}
            mode={appStore.siderMode}
            inlineCollapsed={appStore.collapsed}
            inlineIndent={20}
            defaultSelectedKeys={[defaultSelectedKeys]}
            selectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={['data-mangment']}
            onClick={this.onSiderClick.bind(this)}
          >

            <Menu.Item className={styles.menuItemTextColor} key="/skills"><Icon type="setting" /><span>Skills</span></Menu.Item>
            {/* <Menu.Item className={`${styles.menuItem} ${styles.menuItemTextColor}`} key="/lalal">Skill Manage</Menu.Item> */}
          </Menu>
        </Sider>
      </IntlProvider>
    )
  }
}

export default SiderMenu