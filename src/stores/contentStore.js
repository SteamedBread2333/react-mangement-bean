import contentService from '../services/contentService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class ContentStore {

    @observable _contentsList = null
    @observable loading = false

    @computed get contentsList() {
        return this._contentsList ? toJS(this._contentsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getContents(userId) {
        this.loading = true
        this.service.fetchContents(userId).then(res => {
            this._contentsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getContent(id, userId) {
        return this.service.fetchContent(id, userId)
    }

    @action addContent(params, userId) {
        this.loading = true
        this.service.createContent(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/contents`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateContent(params, userId) {
        this.loading = true
        this.service.updateContent(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/contents`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }
}

let contentStore = new ContentStore(contentService)

export default contentStore