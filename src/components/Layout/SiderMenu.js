import { Layout, Menu, Icon } from 'antd'
// import DerbyIcon from '../Common/DerbyIcon'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { breadConfig } from '../../utils'
import styles from './SiderMenu.less'
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { logo } from '../../assets'
import menus from '../../assets/menu.json'
// import SymbolIcon from '../Common/SymbolIcon'



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
    let selectedMenu = menus.filter(menu => 
      location.pathname.search(menu.path) !== -1
    )

    defaultSelectedKeys = selectedMenu && selectedMenu.length ? selectedMenu[0].path : '/property-profile'

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
            {/* <SymbolIcon iconName={'icon-icon_shezhi'} style={{color: 'red'}} /> */}
          </div>
          <h4 className={styles.separator}></h4>
          <Menu
            theme="dark"
            style={{ border: 'none', background: '#06789d' }}
            mode={appStore.siderMode}
            inlineIndent={20}
            defaultSelectedKeys={[defaultSelectedKeys]}
            selectedKeys={[defaultSelectedKeys]}
            onClick={this.onSiderClick.bind(this)}
          >
            {menus.map(menu => {
              return <Menu.Item className={styles.menuItemTextColor} key={menu.path}><Icon type={menu.icon} /><span>{menu.name}</span></Menu.Item>
            })}
          </Menu>
        </Sider>
      </IntlProvider>
    )
  }
}

export default SiderMenu