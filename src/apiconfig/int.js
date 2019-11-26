import axi from '@/apiconfig/axi'

export default {
  verifycode (data) {
    return axi().post('/api/verify_code/', data)
  },
  verifycheck (d) {
    return axi().post('/api/verify_code/check/', d)
  },
  telcode () {
    return axi().get('/api/tel_code?v=8')
  },
  userlogin (d) {
    return axi().post('/api/user/login/', d)
  },
  register (d) {
    return axi().post('/api/user/register/', d)
  },
  phonevlogin (d) {
    return axi().post('/api/user/sms_login/', d)
  },
  loginout () {
    return axi().get('/api/user/logout/')
  },
  resetpassword (d) {
    return axi().post('/api/user/reset_password/', d)
  },
  musiccategory () {
    return axi().get('/api/music_category/')
  },
  music () {
    return axi().get('/api/music')
  },
  recommend () {
    return axi().get('/api/playlist/recommend/')
  },
  usercheck (d) {
    return axi().post('/api/user/check/', d)
  },
  musicmenu (d) {
    return axi().get('/api/playlist/' + d)
  },
  userprofile () {
    return axi().get('/api/user/profile/')
  },
  project () {
    return axi().get('/api/project/')
  },
  addproject (d) {
    return axi().post('/api/project/', d)
  },
  projectsearch () {
    return axi().get('/api/project_search/')
  },
  label () {
    return axi().get('/api/label/')
  },
  album () {
    return axi().get('/api/album/')
  },
  message () {
    return axi().get('/api/message/')
  },
  unreadmessage () {
    return axi().get('/api/message/unread_count/')
  },
  downloadrecord () {
    return axi().get('/api/download/')
  }

}
