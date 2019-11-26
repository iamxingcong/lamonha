<template>
<div class='tblist'>
  <div class='msgsin' v-for='(y, ind) in dtlist' :key='y.id'>
    <i class='iconav left'  :style='{ backgroundImage: `url(${lj})` }' ></i>
    <span class='sent left'> {{ y.title }}</span>
    <span class='time left'> {{ y.created_at.substr(0, 10) }}</span>
    <span class='delete right'    :style='{ backgroundImage: `url(${lj})` }' @click='deleid(y.id, y.title)' ></span>
    <span class='ttitle right'> {{ y.title }}</span>
    <template v-if='btn[ind].show === false'>
      <span class='cont right'> {{ y.content.substr(0, 120) }}</span>
    </template>
    <template v-else>
      <span class='cont right'> {{ y.content }}</span>
    </template>
    <el-col v-if='btn[ind].long'>
      <template v-if='btn[ind].show === true'  >
        <i type="text" class='left  wrapunwrap' @click='wrap(ind)'  :style='{ backgroundImage: `url(${unwra})` }' >收起</i>
      </template>
      <template  v-else >
        <i type="text" class='left wrapunwrap' @click='unwrap(ind)'  :style='{ backgroundImage: `url(${wra})` }' >展开</i>
      </template>
    </el-col>

  </div>

  <el-dialog title="删除提示"
      :visible.sync="downpop"
      width="450px"
      :close-on-click-modal="false"
      :destroy-on-close='true'
    >
      <div class='cross titlerm'>
       确定删除消息：{{ name }}?
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="downpop = false">取 消</el-button>
      <el-button size='mini' type='info' @click="deletecfm"> 确定 </el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
import axi from '@/apiconfig/axi'
import int from '@/apiconfig/int'
export default {
  data () {
    return {
      dtlist: [],
      btn: [],
      lj: require('../../../assets/img/lj.png'),
      back: require('../../../assets/img/back.png'),
      wra: require('../../../assets/img/wrap.png'),
      unwra: require('../../../assets/img/unwra.png'),
      downpop: false,
      uuid: '',
      name: ''
    }
  },
  created () {
    this.x()
  },
  methods: {
    async x () {
      try {
        let ml = await int.message()
        if (ml.status === 200) {
          this.dtlist = ml.data.results
          var i = 0
          for (i = 0; i < ml.data.results.length; i++) {
            if (ml.data.results[i].content.length > 120) {
              this.btn.push({'long': true, 'show': false})
            } else {
              this.btn.push({'long': false, 'show': false})
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkp (v) {
      console.log(v)
    },
    deletep (v) {
      console.log(v)
    },
    deleid (v, x) {
      console.log(v, x)
      this.uuid = v
      this.name = x
      this.downpop = true
    },
    async deletecfm () {
      try {
        let dt = await axi().delete('/api/message/' + this.uuid)
        if (dt.status === 200) {
          this.downpop = false
          this.x()
        }
      } catch (e) {
        console.log(e)
      }
    },
    wrap (x) {
      this.btn[x].show = false
    },
    unwrap (v) {
      this.btn[v].show = true
    }
  }
}
</script>
<style scoped>
.iconav{
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
}
.sent{
  color: #6C717A;
  font-size: 1.1em;
}
.clear{
  margin-left: 70px;
}
.sent{
  margin-left: 20px;
  line-height: 20px;
}
.ttitle,
.cont{
 width: calc(100% - 70px);
 display: block;
 float: right;
 text-align: left;
 color: #34363A;
 line-height: 2em;
}
.ttitle{
   margin-top: 18px;
}
.time{
  color: #6C717A;
  margin-left: 18px;
  line-height: 20px;
}
#uclists{
  background-color: #E2E2E2;
}
.delete{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  display: none;
  position: absolute;
  top: 30px;
  cursor: pointer;
  right: 30px;
}
.msgsin{
  display: block;
  overflow: auto;
  position: relative;
  background: #FFF;
  margin-bottom: 15px;
  padding: 20px 30px;
}
.msgsin:hover .delete{
  display: block;
}
.wrapunwrap{
  margin-left: 70px;
  color:#7180A4;
  padding-right: 30px;
  cursor: pointer;
  background-position: right center;
  background-size: 10px 5px;
  background-repeat: no-repeat;
  margin-top: 11px;
}
</style>
