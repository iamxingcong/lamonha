<template>
<div class='tblist'>
  <el-row class='pdt25'>
  <el-button type='text' class='left'>
      项目列表
  </el-button>
  <el-button round class='right' size='mini'  @click='addproject'>
    新建项目
  </el-button>
  </el-row>
  <el-table
    :data="dtlist"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="项目名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="music_count"
      label="音乐数字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="uuid"
      label="操作"
      width="105">
      <template slot-scope="scope">
          <el-button
            type="text"
          @click="checkp(scope.row.uuid)">查看</el-button>
          <el-button
            type="text"
            @click="deletep(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <template v-if='count >=  11  && num >= 1 && morepage '>
    <el-button type="text"  size='mini' @click="showmore">加载更多</el-button>
   </template>

  <el-dialog title="删除提示"
      :visible.sync="downpop"
      width="450px"
      :close-on-click-modal="false"
      :destroy-on-close='true'
    >
      <div class='cross titlerm'>
       确定删除项目：{{ name }}?
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="downpop = false">取 消</el-button>
      <el-button size='mini' type='info' @click="deletecfm"> 确定 </el-button>
    </span>
  </el-dialog>

 <el-dialog title="添加至项目"
      :visible.sync="addproj"
      width="450px"
      :close-on-click-modal="false"
      :destroy-on-close='true'
    >
    <el-form ref="form" :model="form">
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="请选择项目类型">
        <el-radio v-model="form.type" label="COMPANY">公司</el-radio>
        <el-radio v-model="form.type" label="PERSONAL">个人</el-radio>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.use_name" placeholder="使用名称"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-input type="textarea" v-model="form.desc" placeholder="项目描述"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="addproj = false">取 消</el-button>
      <el-button size='mini' type='info' @click="addcfm"> 确定 </el-button>
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
      downpop: false,
      name: '',
      uuid: '',
      addproj: false,
      form: {
        type: 'COMPANY'
      },
      count: 0,
      nexturl: '',
      num: 0,
      morepage: false
    }
  },
  created () {
    this.x()
  },
  methods: {
    async x () {
      try {
        let ml = await int.project()
        if (ml.status === 200) {
          this.dtlist = ml.data.results
          this.count = ml.data.count
          this.num = ml.data.results.length
          if (ml.data.next) {
            var str = ml.data.next
            var search = 'api'
            var start = str.indexOf(search)
            var result = str.substring(start, str.length)
            this.nexturl = result
            if (ml.data.count >= 11) {
              this.morepage = true
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkp (v) {
      console.log(v)
      this.$router.push(
        {
          path: 'ProjectDetail',
          query: {'uuid': v}
        }
      )
    },
    deletep (v) {
      console.log(v)
      this.uuid = v.uuid
      this.name = v.name
      this.downpop = true
    },
    async deletecfm (v) {
      try {
        let dt = await axi().delete('/api/project/' + this.uuid)
        if (dt.status === 200) {
          this.downpop = false
          this.x()
        }
      } catch (e) {
        console.log(e)
      }
    },
    addproject () {
      this.addproj = true
      this.form = {type: 'COMPANY'}
    },
    async addcfm () {
      try {
        let dt = await int.addproject(this.form)
        if (dt.status === 200 || dt.status === 201) {
          this.addproj = false
          this.x()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async showmore () {
      try {
        let ml = await axi().get(this.nexturl)
        if (ml.status === 200 && this.nexturl) {
          for (var i = 0; i < ml.data.results.length; i++) {
            this.dtlist.push(ml.data.results[i])
          }
          if (ml.data.next) {
            this.count = ml.data.count
            this.num = ml.data.results.length
            var str = ml.data.next
            var search = 'api'
            var start = str.indexOf(search)
            var result = str.substring(start, str.length)
            this.nexturl = result

            if (result === '/api/project/') {
              return false
            }

            this.count = ml.data.count
          } else {
            this.morepage = false
            return false
          }
        } else {
          this.morepage = false
          return false
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.el-tabs__content{
  background-color: #fff;
}
.tblist{
  padding: 0px 20px;
  background-color: #fff
}
.pdt25{
  padding-top: 25px;
  padding-bottom: 25px;
}
.pdt25 .left{
  color: #34363A;
}
.pdt25 .right{
  color: #6C717C;
}
.el-form-item__content{
  color: #6C717A;
}
.tblist{
  padding-bottom: 150px;
}
</style>
