import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'

export default {
  name: 'Login',
  data () {
    return {
      bg: require('../img/bg.png'),
      eye: require('../img/eye.png'),
      lj: require('../img/ljw.png'),
      value: '',
      cities: [],
      activeName: 'first',
      ptype: 'password',
      areac: '+86',
      phone: '',
      pho: '',
      ph: {
        password: ''
      },
      em: {},
      labelPosition: 'right'
    }
  },
  created () {
    this.telcodes()
  },
  methods: {
    resetpass () {
      this.$router.push('ResetPassword')
    },
    toggles () {
      if (this.ptype === 'password') {
        this.ptype = 'text'
      } else {
        this.ptype = 'password'
      }
    },
    loginv () {
      this.$router.push('Login')
    },
    registerg () {
      this.$router.push('Register')
    },
    async telcodes () {
      try {
        let dt = await int.telcode()
        if (dt.status === 200) {
          console.log(dt.status)
          this.cities = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleClick (tab, event) {
      this.em = {}
      this.ph = {}
      this.phone = ''
    },
    logincfm () {
      console.log(this.ph)
      this.ph.phone = '' + this.areac + this.phone
      if (this.ph.phone.length < 11) {
        this.$message.error('电话长度不符合')
      } else if (this.ph.phone.length >= 11) {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(this.phone)) {
          this.$message.error('请输入有效的手机号码')
        } else {
          this.loginck()
        }
      } else {
        this.loginck()
      }
    },
    async loginck () {
      try {
        let dt = await int.usercheck({'phone': this.ph.phone})
        if (dt.status === 200 && dt.data.exist === true) {
          this.login()
        } else {
          this.$message.error('用户' + this.ph.phone + '没有注册')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async login () {
      try {
        let dt = await int.userlogin(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          localStorage.setItem('uname', JSON.stringify(dt.data.name))
          this.$router.push('/')
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
        console.log(e)
      }
    },
    emlogincfm () {
      this.em.email = '' + this.em.email
      if (this.em.email.length <= 9) {
        this.$message.error('请检查邮箱填写')
        return false
      } else if (this.em.email.length > 9) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(this.em.email)) {
          this.$message.error('请检查邮箱填写')
          return false
        } else {
          this.emloginck()
        }
      } else {
        this.emloginck()
      }
    },
    async emloginck () {
      try {
        let dt = await axi().post('/api/user/check/', {email: this.em.email})
        if (dt.status === 200 && dt.data.exist === true) {
          this.emlogin()
        } else {
          this.$message.error('用户' + this.em.email + '没有注册')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async emlogin () {
      try {
        let dt = await int.userlogin(this.em)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          localStorage.setItem('uname', this.em.email)
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
