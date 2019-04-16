import { observable, action, computed, runInAction } from "mobx"

import { login } from '../services/app'
import { getBreadInfo } from '../utils'

//导入语言包，路径为你语言包所在的路径
import enUS from '../assets/lang-package/en-US.json';
import zhCN from '../assets/lang-package/zh-CN.json';

class appStore {

  @observable administratorInfo
  @observable isLogin
  @observable siderMode
  @observable collapsed
  @observable loading
  @observable tabBarList
  @observable langType = enUS

  constructor() {
    this.administratorInfo = {
      name: 'Peter',
      level: 3
    }
    this.isLogin = true
    this.collapsed = false
    this.siderMode = 'inline'
    this.loading = false
    this.tabBarList = [{ pathname: window.location.pathname === '/' ? '/skills' : window.location.pathname, active: true, title: getBreadInfo(window.location.pathname).reverse()[0] }]
  }

  @action.bound addTab(tab) {
    this.tabBarList.map(item => item.active = false)
    this.tabBarList.push(tab)
  }

  @action.bound activeTabChanged(pathname) {
    this.tabBarList.map(item => item.active = item.pathname === pathname)
  }

  @action.bound removeTab(pathname) {
    const removeKey = this.tabBarList.findIndex((item, index) => pathname === item.pathname)
    this.tabBarList.splice(removeKey, 1)
    this.tabBarList[this.tabBarList.length - 1].active = true
  }

  @action.bound onCollapse(collapsed) {
    this.collapsed = !this.collapsed
    this.siderMode = collapsed ? 'vertical' : 'inline'
  }

  @action.bound handleHeaderChick = e => {
    switch (e.key) {
      case 'logout':
        this.logout()
        break;
      default:
        this.changeLang(e.key)
        break;
    }
  }

  @action.bound changeLang = key => {
    switch (key) {
      case 'ch':
        this.langType = zhCN
        break;
      case 'en':
        this.langType = enUS
        break;
      default:
        break;
    }
  }

  @action loginSubmit = async values => {
    try {
      const data = await login(values)
      runInAction(() => {
        this.isLogin = true
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  @action.bound logout() {
    this.isLogin = false
  }

  @action showLoading() {
    this.loading = true
  }

  @action hideLoading() {
    this.loading = false
  }

}

export default new appStore()