import api from '../lib/axios'

export default {
  getUser(){
    return api.get('/users')
  },
}