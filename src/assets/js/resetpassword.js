import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import Rheaders from '../../components/public/Rheader.vue'

export default {
  name: 'ResetPassword',
  data () {
    return {
      disabled: false,
      value: '',
      cities: [],
      firststep: true,
      secondstep: false,
      firststepem: true,
      secondstepem: false,
      activeName: 'first',
      phone: '',
      ph: {
        business_type: 'PHONE_RESET_PWD',
        phone: '',
        name: '',
        code: '',
        password: ''
      },
      em: {
        business_type: 'EMAIL_RESET_PWD',
        email: '',
        code: '',
        password: ''
      },
      passwordcfm: '',
      empasswordcfm: '',
      areac: '+86',
      sentcode: '发送验证码',
      sentcodeemail: '发送验证邮件',
      labelPosition: 'right'
    }
  },
  components: {
    Rheaders
  },
  created () {
    this.telcodes()
  },
  methods: {
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
    nextstep () {
      if (this.ph.code.length !== 4 || this.ph.phone.length < 11) {
        this.$message.error('输入不正确')
        return false
      } else {
        this.phonevcheck()
      }
    },
    async phonevcheck () {
      try {
        let dt = await int.verifycheck(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.firststep = false
          this.secondstep = true
        }
      } catch (e) {
        if (e.response) {
          alert(e.response.data.detail)
        }
        console.log(e)
      }
    },
    nextstepemail () {
      this.nextstepemailvcheck()
    },
    async nextstepemailvcheck () {
      try {
        let dt = await int.verifycheck(this.em)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.firststepem = false
          this.secondstepem = true
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
        console.log(e)
      }
    },
    handleClick (tab, event) {
      console.log(tab.label, event.type)
    },
    pverifycodeemail () {
      if (this.em.email.length <= 9) {
        this.$message.error('请检查邮箱填写')
        return false
      } else if (this.em.email.length > 9) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(this.em.email)) {
          this.$message.error('请检查邮箱填写')
          return false
        } else {
          this.emregck()
        }
      } else {
        this.emregck()
      }
    },
    async emregck () {
      try {
        let dt = await axi().post('/api/user/check/', {'email': this.em.email})
        if (dt.status === 200 && dt.data.exist === true) {
          this.verifycodeemail()
        } else {
          this.$message.error('用户' + this.em.email + '未注册')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async verifycodeemail () {
      try {
        let dt = await int.verifycode(this.em)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.sentcodeemail = '再次发送邮件'
        }
      } catch (e) {
        console.log(e)
      }
    },
    pverifycode () {
      this.ph.phone = '' + this.areac + this.phone
      if (this.ph.phone.length < 11) {
        console.log('电话长度不符合')
        this.$message.error('输入不正确')
      } else if (this.ph.phone.length >= 11) {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(this.phone)) {
          this.$message.error('请输入有效的手机号码')
        } else {
          this.regck()
        }
      } else {
        this.regck()
      }
    },
    async regck () {
      try {
        let dt = await axi().post('/api/user/check/', {'phone': this.ph.phone})
        if (dt.status === 200 && dt.data.exist === true) {
          this.verifycode()
        } else {
          this.$message.error('用户' + this.ph.phone + '未注册')
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
          this.disabled = true
          this.settim()
        }
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.detail)
        }
        console.log(e)
      }
    },
    settim () {
      let s = 60
      let timer = setInterval(() => {
        s--
        this.sentcode = s + '秒后重新发送'
        if (s <= 0) {
          clearInterval(timer)
          this.sentcode = '发送验证码'
          this.disabled = false
        }
      }, 1000)
    },
    registemail () {
      if (this.empasswordcfm !== this.em.password) {
        this.$message.error('密码不一致')
        return false
      } else {
        this.resetpwemail()
      }
    },
    async resetpwemail () {
      try {
        let dt = await int.resetpassword(this.em)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.$router.push('Loginp')
        }
      } catch (e) {
        console.log(e)
      }
    },
    regist () {
      this.ph.phone = '' + this.areac + this.phone
      console.log(this.ph)
      this.ph.name = this.ph.phone
      if (this.passwordcfm !== this.ph.password) {
        this.$message.error('密码不一致')
        return false
      } else {
        this.resetpw()
      }
    },
    async resetpw () {
      try {
        let dt = await int.resetpassword(this.ph)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt.status)
          this.$router.push('Loginp')
        }
      } catch (e) {
        console.log(e)
      }
    }

  }
}
