import intentService from '../services/intentService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class IntentStore {

    @observable _intentsList = null
    @observable loading = false

    @computed get intentsList() {
        return this._intentsList ? toJS(this._intentsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getIntents(userId) {
        this.loading = true
        this.service.fetchIntents(userId).then(res => {
            this._intentsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getIntent(id, userId) {
        return this.service.fetchIntent(id, userId)
    }

    @action addIntent(params, userId) {
        this.loading = true
        this.service.createIntent(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/intents`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateIntent(params, userId) {
        this.loading = true
        this.service.updateIntent(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/intents`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let intentStore = new IntentStore(intentService)

export default intentStore