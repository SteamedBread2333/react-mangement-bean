import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Tabs } from 'antd'
import SiderMenu from './SiderMenu'
import { getBreadInfo } from '../../utils'
import styles from './Main.less'
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';

// page
import NotFound from '../Pages/404'

import PropertyProfile from '../Pages/PropertyProfile'

import DeviceList from '../Pages/Device/DeviceList'
import DeviceCreate from '../Pages/Device/DeviceCreate'
import DeviceEdit from '../Pages/Device/DeviceEdit'

import HotelList from '../Pages/Hotel/HotelList'
import HotelCreate from '../Pages/Hotel/HotelCreate'
import HotelEdit from '../Pages/Hotel/HotelEdit'

import SkillList from '../Pages/Skill/SkillList'
import SkillCreate from '../Pages/Skill/SkillCreate'
import SkillEdit from '../Pages/Skill/SkillEdit'

import IntentList from '../Pages/Intent/IntentList'
import IntentCreate from '../Pages/Intent/IntentCreate'
import IntentEdit from '../Pages/Intent/IntentEdit'

import RoomList from '../Pages/Room/RoomList'
import RoomCreate from '../Pages/Room/RoomCreate'
import RoomEdit from '../Pages/Room/RoomEdit'

import RoomTypeList from '../Pages/RoomType/RoomTypeList'
import RoomTypeCreate from '../Pages/RoomType/RoomTypeCreate'
import RoomTypeEdit from '../Pages/RoomType/RoomTypeEdit'

import ContentList from '../Pages/Content/ContentList'
import ContentCreate from '../Pages/Content/ContentCreate'
import ContentEdit from '../Pages/Content/ContentEdit'

import ContactList from '../Pages/Contact/ContactList'
import ContactCreate from '../Pages/Contact/ContactCreate'
import ContactEdit from '../Pages/Contact/ContactEdit'

Icon.setTwoToneColor('#06789d');

// demoPage
import Demo from '../Pages/Demo/Demo'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane

@inject('appStore') @withRouter @observer
class Main extends Component {

  componentDidMount() {
    this.props.history.listen((location, type) => {
      const prePath = this.props.location.pathname
      const nextPath = location.pathname
      const { tabBarList, addTab, activeTabChanged } = this.props.appStore
      if (tabBarList.find((item, index) => item.pathname === nextPath) === undefined && (type === 'PUSH' || type === 'POP')) {
        if (prePath === '/' && nextPath === '/skills') return
        addTab({ pathname: nextPath, active: true, title: getBreadInfo(nextPath).reverse()[0] })
      }
      if (tabBarList.find((item, index) => item.pathname === nextPath) !== undefined) {
        activeTabChanged(nextPath)
      }
    })
  }

  onTabChange(activeKey) {
    if (this.props.location.pathname === activeKey) return
    this.props.history.push(activeKey)
  }

  onTabEdit(removeKey) {
    const { removeTab, tabBarList } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)
    if (tabBarList.length === 1) return
    removeTab(removeKey)
    if (removeKey === activeTab.pathname) {
      this.props.history.push(tabBarList[tabBarList.length - 1].pathname)
    }
  }

  render() {

    const { administratorInfo, tabBarList, langType, handleHeaderChick } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)
    const data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

    return (
      <IntlProvider locale="en" messages={langType}>
        <Layout>

          <Layout className={styles.layoutHasSider}>

            <SiderMenu store={this.props.appStore} />
            <Layout>
              <Header className={styles.header}>
                <div onClick={() => { history.back(-1) }}><Icon type="left" />&nbsp;&nbsp;&nbsp;Back</div>
                <Menu mode="horizontal" onClick={handleHeaderChick}>
                  {/* <SubMenu
                    title={<FormattedMessage id='LANGUAGE'></FormattedMessage>}
                  >
                    <Menu.Item value='ch' key="ch">中文</Menu.Item>
                    <Menu.Item value='en' key="en">English</Menu.Item>
                  </SubMenu> */}
                  <SubMenu
                    title={administratorInfo.name}
                  >
                    <Menu.Item key="logout"><FormattedMessage id='LOG_OUT'></FormattedMessage></Menu.Item>
                  </SubMenu>
                </Menu>

              </Header>
              <Content className={styles.contentWrapper}>
                <Breadcrumb className={styles.breadcrumb}>
                  {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div className={styles.content}>
                  <Switch>
                    <Route exact path="/" component={PropertyProfile} />
                    <Route path="/property-profile" component={PropertyProfile} />

                    <Route path="/devices" component={DeviceList} />
                    <Route path="/devicesCreate" component={DeviceCreate} />
                    <Route path="/devicesEdit/:id" component={DeviceEdit} />
                    
                    <Route path="/hotels" component={HotelList} />
                    <Route path="/hotelsCreate" component={HotelCreate} />
                    <Route path="/hotelsEdit/:id" component={HotelEdit} />

                    <Route path="/skills" component={SkillList} />
                    <Route path="/skillsCreate" component={SkillCreate} />
                    <Route path="/skillsEdit/:id" component={SkillEdit} />

                    <Route path="/intents" component={IntentList} />
                    <Route path="/intentsCreate" component={IntentCreate} />
                    <Route path="/intentsEdit/:id" component={IntentEdit} />

                    <Route path="/rooms" component={RoomList} />
                    <Route path="/roomsCreate" component={RoomCreate} />
                    <Route path="/roomsEdit/:id" component={RoomEdit} />

                    <Route path="/roomTypes" component={RoomTypeList} />
                    <Route path="/roomTypesCreate" component={RoomTypeCreate} />
                    <Route path="/roomTypesEdit/:id" component={RoomTypeEdit} />

                    <Route path="/contents" component={ContentList} />
                    <Route path="/contentsCreate" component={ContentCreate} />
                    <Route path="/contentsEdit/:id" component={ContentEdit} />

                    <Route path="/contacts" component={ContactList} />
                    <Route path="/contactsCreate" component={ContactCreate} />
                    <Route path="/contactsEdit/:id" component={ContactEdit} />

                    <Route path="/demo" component={Demo} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </IntlProvider>
    )
  }
}

export default Main
