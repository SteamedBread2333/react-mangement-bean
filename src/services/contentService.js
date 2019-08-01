import request from '../utils/request'

import config from './common'

export default {
    fetchContents(userId = 1) {
        return request.get(`${config.BASE_URL}/contents/${userId}`)
    },
    fetchContent(contentId, userId = 1) {
        return request.get(`${config.BASE_URL}/contents/${userId}/content/${contentId}`)
    },
    createContent(params, userId = 1){
        return request.post(`${config.BASE_URL}/contents/${userId}/add`, params)
    },
    updateContent(params, userId = 1){
        return request.post(`${config.BASE_URL}/contents/${userId}/update`, params)
    }
}