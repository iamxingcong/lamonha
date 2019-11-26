<template>
  <div class='containerl'  :style='{ backgroundImage: `url(${bg})` }'>
    <i id='logo'  :style='{ backgroundImage: `url(${lj})` }'></i>
    <span class='title_logo'>中国最专业的罐头音乐制作厂牌</span>
    <div class='logindiv'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机登录" name="first">
          <div class='loginforms'>
            <el-form :model="ph" :label-position='labelPosition'  ref="ph" >
              <div class='singrow'>
                <el-col :span="6">
                  <el-form-item>
                     <el-select v-model="areac" placeholder="请选择">
                      <el-option
                        v-for="item in cities"
                        :key="item.id"
                        :label="item.tel_code"
                        :value="item.tel_code">
                        <span style="float: left">{{ item.tel_code }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name_ch }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item>
                    <el-input v-model="phone" placeholder="手机号"></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <div class='singrow'>
                <el-col :span='16'>
                  <el-form-item label="验证码"    label-width="64px">
                    <el-input v-model="ph.code" placeholder="请输入验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-button type="text"  @click='pverifycode'> {{ sentcode }} </el-button>
                </el-col>
              </div>
              <div class='hide'>
                  <el-input v-model="ph.business_type" value='PHONE_SMS_LOGIN' type="hidden"></el-input>
              </div>
              <el-col :span='24'>
                <div class='left'>
                  <el-button size="mini" type='text' @click='plogin'>密码登录</el-button>
                </div>
                <div class='right'>
                  <el-button size="mini" type='text' @click='resetpass'>忘记密码</el-button>
                </div>
              </el-col>
              <div class='wcross'>
                <el-button @click='logincfm'>登录</el-button>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">

          <div class='loginforms'>
            <el-form :model="em" :label-position='labelPosition'  ref="em" >
              <div class='singrow'>
                <el-col :span="22">
                  <el-form-item>
                    <el-input v-model="em.email" placeholder="邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <div class='singrow'>
                <el-col :span='20'>
                  <el-form-item>
                    <el-input v-model="em.password"  :type='ptype'  placeholder="请输入密码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='4' class='woneh'>
                  <el-button type="text" icon="el-icon-search" @click='toggles'></el-button>
                </el-col>
              </div>

              <el-col :span='24'>
                <div class='right'>
                  <el-button size="mini" type='text'  @click='resetpass'>忘记密码</el-button>
                </div>
              </el-col>
              <div class='wcross'>
                <el-button @click='emlogincfm'>登录</el-button>
              </div>
            </el-form>
          </div>

        </el-tab-pane>
      </el-tabs>

      <el-col :span='24'>
        <span class='center'>
          没有账号，<el-button type="text" @click='registerg'>立即注册</el-button>
        </span>
      </el-col>
    </div>
  </div>
</template>
<script src='../../assets/js/login.js'></script>
<style scoped src='../../assets/css/login.css'></style>
