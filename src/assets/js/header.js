import int from '@/apiconfig/int'

export default {
  name: 'Header',
  data () {
    return {
      eye: require('../img/eye.png'),
      lj: require('../img/lj.png'),
      search: '',
      uname: '',
      logined: false,
      detail: {},
      ucount: 0
    }
  },
  created () {
    this.prf()
    this.uname = localStorage.getItem('uname')
    console.log(this.uname)
    this.unreadmessaged()
  },
  methods: {
    toregister () {
      this.$router.push('Register')
    },
    tologin () {
      this.$router.push('Loginp')
    },
    async loginout () {
      try {
        let dt = await int.loginout(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          localStorage.setItem('uname', null)
          this.logined = false
        }
      } catch (e) {
        console.log(e)
      }
      window.location.reload()
    },
    goto (v) {
      console.log(this.$route.path)
      console.log(v)
      let ur = '/' + v
      if (ur !== this.$route.path && v !== this.$route.path) {
        this.$router.push(v)
      } else {
        console.log('same page')
      }
    },
    handleSelect (key, keyPath) {
      let ur = '/' + key
      if (ur !== this.$route.path && key !== this.$route.path) {
        this.$router.push(key)
      } else {
        console.log('same page')
      }
      console.log(key, keyPath)
    },
    async prf () {
      try {
        let ml = await int.userprofile()
        if (ml.status === 200) {
          this.detail = ml.data
          this.logined = true
        } else {
          this.$router.push('/')
          this.logined = false
        }
      } catch (e) {
        this.logined = false
        if (e.response) {
          console.log(e.response.data.detail)
        }
      }
    },
    async unreadmessaged () {
      try {
        let ml = await int.unreadmessage()
        if (ml.status === 200) {
          this.ucount = ml.data.count
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
