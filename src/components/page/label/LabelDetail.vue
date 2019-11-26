<template>
<div class='container'>
<HeaderDetail />
  <div id='menudetaildiv'>
      <div class='menutwrap'>

        <div class='right menuwrap'>
          <span class='menutitle'> {{ detail.name }}</span>
          <span class='mdesc'> {{ detail.desc }}</span>
          <span class='myear'> 发布于 {{ detail.created_at }} </span>
          <div class='mmarks'>
            <i v-for='v in detail.category_info_list' :key='v.id' >
              {{ v.name }}
            </i>
          </div>
        </div>
        <i class='right menuavatar' :style='{ backgroundImage: `url(${detail.logo})` }' ></i>
      </div>
  </div>
    <div class='content'>
      <div id='mlistswrapl'>
        <div class='mwrap'>

          <div class='msin' v-for='m in mlist' :key='m.uuid'  @click='rtto(m.uuid)'>
            <i class='mavatars'   :style='{ backgroundImage: `url(${m.cover})` }'></i>
            <span class='mtitle'> {{ m.name }} </span>
            <span class='mdesc'> {{ m.desc }}</span>
          </div>
        </div>
      </div>
    </div>

  <Footer />
</div>
</template>
<script src='../../../assets/js/labeldetail.js'></script>
<style scoped src='../../../assets/css/labeldetail.css'></style>

<style scoped src='../../../assets/css/musicmenu.css'></style>
