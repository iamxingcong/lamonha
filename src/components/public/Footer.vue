<template>
<div id='footer'>
  <div id='footwrap'  :style='{ backgroundImage: `url(${lj})` }'>
    <div class='cpright'>
      <span> cmusiccopyright </span> |
      <span> 中国版权保护中心 </span>
    </div>
    <div class='cpb'> 2019・cmcr 版权所有 ・京ICP备 XXXXXXXX号 ・京公安网备 1XXXXXXXXXXX9号</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      eye: require('../../assets/img/eye.png'),
      lj: require('../../assets/img/lj.png')
    }
  }
}
</script>
<style scoped>
#footer{
  width: 100%;
  height: 180px;
  background:rgba(108,113,122,1);
}
#footwrap{
  max-width: 1230px;
  margin:0px auto;
  text-align: left;
  background-position: 96%  center;
  background-repeat: no-repeat;
  background-size:  87px 90px;
  height: 180px;
  padding: 0px 20px;
}
.cpright{
  display: block;
  float: left;
  margin-top: 65px;
  color: #DADBE0;
}
.cpright span{
  padding-right: 14px;
}
.cpright span:nth-child(2){
  padding-left: 14px;
}
.cpb{
  display: block;
  clear: both;
  padding-top: 20px;
  color:rgba(218,219,224,1);
}
</style>
