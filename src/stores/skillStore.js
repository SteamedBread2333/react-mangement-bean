import skillService from '../services/skillService'
import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class SkillStore {

    @observable _skillsList = null
    @observable loading = false

    @computed get skillsList() {
        return this._skillsList ? toJS(this._skillsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getSkills(userId) {
        this.loading = true
        this.service.fetchSkills(userId).then(res => {
            this._skillsList = res
        }).catch(err => {
            message.error('error')
        }).finally(() => {
            this.loading = false
        })
    }

    @action getSkill(skillId) {
        return this.service.fetchSkill(skillId)
    }

    @action addSkill(params) {
        this.loading = true
        this.service.createSkill(params).then(res => {
            message.success('Success')
            location.href = `./#/skills`
        }).catch(err => {
            message.error('Net Error')
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateSkill(params) {
        this.loading = true
        this.service.updateSkill(params).then(res => {
            message.success('Success')
            location.href = `./#/skills`
        }).catch(err => {
            message.error('Net Error')
        }).finally(() => {
            this.loading = false
        })
    }

}

let skillStore = new SkillStore(skillService)

export default skillStore