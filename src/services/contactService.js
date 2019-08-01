import request from '../utils/request'

import config from './common'

export default {
    fetchContacts(userId = 1) {
        return request.get(`${config.BASE_URL}/contacts/${userId}`)
    },
    fetchContact(contactId, userId = 1) {
        return request.get(`${config.BASE_URL}/contacts/${userId}/contact/${contactId}`)
    },
    createContact(params, userId = 1) {
        return request.post(`${config.BASE_URL}/contacts/${userId}/add`, params)
    },
    updateContact(params, userId = 1) {
        return request.post(`${config.BASE_URL}/contacts/${userId}/update`, params)
    }
}