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
import SkillList from '../Skill/SkillList'
import SkillCreate from '../Skill/SkillCreate'
import SkillEdit from '../Skill/SkillEdit'

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
              <Header className={styles.header} style={{ borderBottom: '1px solid #efefef', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ cursor: 'pointer', marginLeft: 15, lineHeight: '45px' }} onClick={() => { history.back(-1) }}><Icon type="left" />&nbsp;&nbsp;&nbsp;Back</div>
                <Menu style={{ border: 'none', lineHeight: '45px', flexDirection: 'row' }} mode="horizontal" onClick={handleHeaderChick}>
                  <SubMenu
                    title={<FormattedMessage id='LANGUAGE'></FormattedMessage>}
                  >
                    <Menu.Item value='ch' key="ch">中文</Menu.Item>
                    <Menu.Item value='en' key="en">English</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    title={administratorInfo.name}
                  >
                    <Menu.Item key="logout"><FormattedMessage id='LOG_OUT'></FormattedMessage></Menu.Item>
                  </SubMenu>
                </Menu>

              </Header>
              {/* <Tabs hideAdd type="editable-card" activeKey={activeTab.pathname} onChange={this.onTabChange.bind(this)} onEdit={this.onTabEdit.bind(this)}>
              {
                tabBarList.map((item, index) => {
                  return (
                    <TabPane tab={item.title} key={item.pathname} >
                      {activeTab.pathname === item.pathname ? (<Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                          {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <div className={styles.content}>
                          <Switch>
                            <Route exact path="/" component={User} />
                            <Route path="/users" component={User} />
                            <Route render={() => <h1 className={styles.noMatch}>找不到此页面</h1>} />
                          </Switch>
                        </div>
                      </Content>) : ''}
                    </TabPane>
                  )
                })
              }
            </Tabs> */}
              <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                  {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div className={styles.content}>
                  <Switch>
                    <Route exact path="/" component={SkillList} />
                    <Route path="/skills" component={SkillList} />
                    <Route path="/skillsCreate" component={SkillCreate} />
                    <Route path="/skillsEdit/:id" component={SkillEdit} />
                    <Route render={() => <h1 className={styles.noMatch}><FormattedMessage id='404_NOTFOUND'></FormattedMessage></h1>} />
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
