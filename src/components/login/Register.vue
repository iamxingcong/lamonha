<template>
<div class='container'>
    <Lheaders />
    <div class='logindiv'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机注册" name="first">
          <div class='loginforms'>
             <el-form :model="ph" :label-position='labelPosition' ref="ph" >
              <div class='firststeps' v-if='firststep'>

                <el-col :span="24">
                  <span class='left reminders'> 验证码将发送至你的手机 </span>
                </el-col>
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
                    <el-form-item label="验证码"    label-width="84px">
                      <el-input v-model="ph.code" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span='8'>
                      <el-button type="text"  @click='pverifycode'> {{ sentcode }} </el-button>
                  </el-col>
                </div>

                <el-input v-model="ph.business_type" value='PHONE_REGISTER' type="hidden"></el-input>

                <div class='wcross'>
                  <el-button @click='nextstep'>下一步</el-button>
                </div>

              </div>
              <div class='secondsteps' v-if='secondstep'>
                <span class='cross titles'> 设置密码</span>
                <div class='singrow'>
                  <el-form-item>
                    <el-input v-model="ph.password" placeholder="设置密码（至少8位）"></el-input>
                  </el-form-item>
                </div>
                <div class='singrow'>
                  <el-form-item>
                    <el-input v-model="passwordcfm" placeholder="请重新输入密码"></el-input>
                  </el-form-item>
                </div>
                 <div class='wcross'>
                  <el-button @click='regist'>注册</el-button>
                </div>
              </div>
              </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="second">

        <div class='loginforms'>
             <el-form :model="em" :label-position='labelPosition' ref="ph" >
              <div class='firststeps' v-if='firststepem'>

                <el-col :span="24">
                  <span class='left reminders'> 验证码将发送至你的邮箱 </span>
                </el-col>
                <div class='singrow'>

                  <el-col :span="24">
                    <el-form-item  label="邮箱" label-width="64px">
                      <el-input v-model="em.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class='singrow'>
                  <el-col :span='16'>
                    <el-form-item label="验证码"    label-width="64px">
                      <el-input v-model="em.code" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span='8'>
                      <el-button type="text"  @click='pverifycodeemail'> {{ sentcodeemail }} </el-button>
                  </el-col>
                </div>

                <el-input v-model="em.business_type" value='EMAIL_REGISTER' type="hidden"></el-input>

                <div class='wcross'>
                  <el-button @click='nextstepemail'>下一步</el-button>
                </div>

              </div>
              <div class='secondsteps' v-if='secondstepem'>
                <span class='cross titles'> 设置密码</span>
                <div class='singrow'>
                  <el-form-item>
                    <el-input v-model="em.password" placeholder="设置密码（至少8位）"></el-input>
                  </el-form-item>
                </div>
                <div class='singrow'>
                  <el-form-item>
                    <el-input v-model="empasswordcfm" placeholder="请重新输入密码"></el-input>
                  </el-form-item>
                </div>
                 <div class='wcross'>
                  <el-button @click='registemail'>注册</el-button>
                </div>
              </div>
              </el-form>
            </div>

        </el-tab-pane>
      </el-tabs>

    </div>

</div>
</template>
<script src='../../assets/js/register.js'></script>
<style scoped src='../../assets/css/login.css'></style>
