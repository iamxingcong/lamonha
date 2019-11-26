<template>
<div class='container'>

<Header />
<Filtercomponents   v-on:filterparams="parmfromchild"></Filtercomponents>
<div class='content'>

  <div id='mlistswrap'>
    <div class='mwrap'>
      <span class='vtitles cross'> Speaklow 的音乐  《专辑 》</span>
      <div class='msin' v-for='m in lblist' :key='m.uuid'  @click='rtto(m.uuid)'>
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
<script src='../../../assets/js/albumlist.js'></script>
<style scoped src='../../../assets/css/albumlist.css'></style>
<style scoped src='../../../assets/css/musicmenu.css'></style>
