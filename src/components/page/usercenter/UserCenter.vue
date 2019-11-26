<template>
<div class='container'>
 <Header />
 <div class='content'>
  <div class='cross personinfo'  :style='{ backgroundImage: `url(${bguc})`}' >
    <i class='ucavatar'  :style='{ backgroundImage: `url(${detail.avatar})`}' ></i>
    <span class='ucname'> {{ detail.name }}</span>
  </div>
  <div id='uclists'>

    <el-tabs v-model="activeName" @tab-click="handleClick"   type="card">
      <el-tab-pane label="我的项目" name="MyProject">
        <MyProject />
      </el-tab-pane>
      <el-tab-pane label="下载记录" name="DownloadRecord">
        <DownloadRecord />
      </el-tab-pane>
      <el-tab-pane label="我的消息" name="Message">
        <Message />
      </el-tab-pane>
    </el-tabs>

  </div>
 </div>
 <Footer />
</div>
</template>
<script src='../../../assets/js/usercenter.js'></script>
<style scoped src='../../../assets/css/usercenter.css'></style>
