<template>
<div id='headerdetail'>
  <div class='hdcross'>
    <i id='logoi'  :style='{ backgroundImage: `url(${lj})` }'></i>
    <div id='tabswrap'>
      <el-menu   mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">曲库</el-menu-item>
        <el-menu-item index="MusicMenu">曲单</el-menu-item>
        <el-menu-item index="AlbumList">专辑</el-menu-item>
        <el-menu-item index="LabelList">厂牌</el-menu-item>
      </el-menu>
    </div>

    <div class='loginreg' v-if="!logined">
      <el-button type="text" @click='tologin'>登录</el-button>
      /
      <el-button type="text" @click='toregister'>注册</el-button>
    </div>
    <div id='lgedwraps'>
      <div class='phoverdrop' v-if='logined' >
        <i id='userid' @click='goto("UserCenter")'   :style='{ backgroundImage: `url(${detail.avatar})` }'>  </i>
        <div  class="dropdownitm">
          <span class='sitems'> {{detail.name}} </span>
          <span class='sitems'> 个人设置 </span>
          <span class='sitems'> 我的消息 <i class='ucount right' v-if='ucount > 0'> {{ucount}} </i> </span>
          <span class='sitems' @click='loginout'>  退出登录 </span>
        </div>

      </div>
    </div>
    <div class='wd250'>
      <el-input
        placeholder="搜索"
        suffix-icon="el-icon-search"
        v-model="search">
      </el-input>
    </div>

  </div>
</div>
</template>
<script src='../../assets/js/headerdetail.js'></script>
<style scoped src='../../assets/css/headerfooter.css'></style>
