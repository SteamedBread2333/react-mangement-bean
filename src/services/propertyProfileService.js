import request from '../utils/request'

import config from './common'

export default {
    fetchCount(moduleName, userId = 1) {
        return request.get(`${config.BASE_URL}/${moduleName}/count/${userId}`)
    },
}