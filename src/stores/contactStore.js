import contactService from '../services/contactService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class ContactStore {

    @observable _contactsList = null
    @observable loading = false

    @computed get contactsList() {
        return this._contactsList ? toJS(this._contactsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getContacts(userId) {
        this.loading = true
        this.service.fetchContacts(userId).then(res => {
            this._contactsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getContact(id, userId) {
        return this.service.fetchContact(id, userId)
    }

    @action addContact(params, userId) {
        this.loading = true
        this.service.createContact(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/contacts`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateContact(params, userId) {
        this.loading = true
        this.service.updateContact(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/contacts`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let contactStore = new ContactStore(contactService)

export default contactStore