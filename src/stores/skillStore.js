import skillService from '../services/skillService'
import {observable, computed, action} from 'mobx';
import {message} from 'antd'

class SkillStore {

    @observable skills = null

    constructor(service) {
        this.service = service
    }

    @action getSkills(userId) {
        return this.service.fetchSkills(userId).then(res => {
            this.skills = res.data
        }).catch(err => {
            console.log(err)
            message.error('error')
        })
    }

}

let skillStore = new SkillStore(skillService)

export default skillStore