import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'

export default {
  name: 'Login',
  data () {
    return {
      bg: require('../img/bg.png'),
      lj: require('../img/ljw.png'),
      value: '',
      cities: [],
      activeName: 'first',
      areac: '+86',
      ptype: 'password',
      pho: '',
      phone: '',
      sentcode: '发送验证码',
      ph: {
        business_type: 'PHONE_SMS_LOGIN',
        phone: ''
      },
      em: {
        email: ''
      },
      labelPosition: 'right'
    }
  },
  created () {
    this.telcodes()
  },
  methods: {
    plogin () {
      console.log('loginp')
      this.$router.push('Loginp')
    },
    resetpass () {
      this.$router.push('ResetPassword')
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
      this.ph = {
        business_type: 'PHONE_SMS_LOGIN',
        phone: ''
      }
      this.phone = ''
    },
    pverifycode () {
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
        let dt = await axi().post('/api/user/check/', {'phone': this.ph.phone})
        if (dt.status === 200 && dt.data.exist === true) {
          this.verifycode()
        } else {
          this.$message.error('用户' + this.ph.phone + '没有注册')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async verifycode () {
      try {
        let dt = await int.verifycode(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.sentcode = '60秒后重新发送'
        }
      } catch (e) {
        console.log(e)
      }
    },
    logincfm () {
      this.ph.phone = '' + this.areac + this.phone
      this.ph.phone = '' + this.areac + this.phone
      if (this.ph.phone.length < 11) {
        this.$message.error('电话长度不符合')
      } else if (this.ph.phone.length >= 11) {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(this.phone)) {
          this.$message.error('请输入有效的手机号码')
        } else {
          this.verifychecks()
        }
      } else {
        this.verifychecks()
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
    async verifychecks () {
      try {
        let dt = await int.verifycheck(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          this.login()
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
      }
    },
    async login () {
      try {
        let dt = await int.phonevlogin(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          localStorage.setItem('uname', this.ph.phone)
          this.$router.push('/')
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
    },
    toggles () {
      if (this.ptype === 'password') {
        this.ptype = 'text'
      } else {
        this.ptype = 'password'
      }
    }
  }
}
