<template>
<div id='lheaders'>
  <div class='hwraps'>
    <span class='left'>
      <i class='reslogo'  :style='{ backgroundImage: `url(${lj})` }'></i>
      <el-button type="text" @click='register'>注册账号</el-button>
    </span>
    <span class='right'>
      已有账号，
      <el-button type="text" @click='login'> 马上登录 </el-button>
    </span>
  </div>
</div>
</template>
<script>
export default {
  name: 'Lheaders',
  data () {
    return {
      lj: require('../../assets/img/ljw.png')
    }
  },
  methods: {
    login () {
      this.$router.push('Loginp')
    },
    register () {
      console.log('register')
      window.location.reload()
    }
  }
}
</script>
<style scoped>
#lheaders{
  height: 70px;
  display: block;
  clear: both;
  background: #34363A;
  margin-bottom: 141px;
}
.hwraps{
  max-width: 1068px;
  margin: 0px auto;
  line-height: 70px;
}
.hwraps span,
.hwraps button{
  color:#fff;
}
.hwraps .left{
  padding-left:20px;
}
.hwraps .right{
  padding-right: 20px;
}
.reslogo{
  width: 38px;
  height: 70px;
  display: block;
  float: left;
  background-size: 37px 38px;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 20px;
}
</style>
