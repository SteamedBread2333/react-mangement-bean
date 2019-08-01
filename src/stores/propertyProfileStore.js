import propertyProfileService from '../services/propertyProfileService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

const modules = [
    {
        name: 'hotel',
        routeLinks: ['hotels', 'hotelsCreate'],
    },
    {
        name: 'device',
        routeLinks: ['devices', 'devicesCreate'],
    },
    {
        name: 'skill',
        routeLinks: ['skills', 'skillsCreate'],
    },
    {
        name: 'intent',
        routeLinks: ['intents', 'intentsCreate'],
    },
    {
        name: 'roomtype',
        routeLinks: ['roomTypes', 'roomTypesCreate'],
    },
    {
        name: 'room',
        routeLinks: ['rooms', 'roomsCreate'],
    },
    {
        name: 'content',
        routeLinks: ['contents', 'contentsCreate'],
    },
    {
        name: 'contact',
        routeLinks: ['contacts', 'contactsCreate'],
    },
]

const moduleNames = modules.map(module => module.name)

class PropertyProfileStore {

    @observable _countMap = null
    @observable loading = false

    @computed get countMap() {
        return this._countMap ? toJS(this._countMap) : [{}, {}, {}, {}, {}, {}, {}, {},];
    }

    constructor(service) {
        this.service = service
    }

    getCount(moduleName, userId) {
        return this.service.fetchCount(moduleName, userId).then(res => {
            return { ...res.data, routeLinks: modules.find(module => module.name === moduleName).routeLinks }
        })
    }

    getCountMap(userId) {
        this.loading = true
        Promise.all(moduleNames.map(module => this.getCount(module, userId))).then(countList => {
            this._countMap = countList
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false;
        })
    }

}

let propertyProfileStore = new PropertyProfileStore(propertyProfileService)

export default propertyProfileStore