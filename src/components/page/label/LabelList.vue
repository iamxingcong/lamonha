<template>
<div class='container'>
  <Header />
<Filtercomponents   v-on:filterparams="parmfromchild"></Filtercomponents>
<div class='content'>
  <span class='vtitles cross'> Speaklow 入驻的厂牌</span>
  <div id='labelwraps'>
    <div class='lsin' v-for='g in lbl' :key='g.id' @click='goto(g.uuid)'>
      <i class='lblogo'   :style='{ backgroundImage: `url(${g.logo})` }'></i>
      <span class='ltitle'>{{ g.name }}</span>
    </div>

  </div>
</div>

<Footer />

</div>
</template>
<script src='../../../assets/js/labellist.js'></script>
<style scoped src='../../../assets/css/labellist.css'></style>
