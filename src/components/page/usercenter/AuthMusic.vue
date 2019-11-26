<template>
<div class='tblist'>

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
            @click="deletep(scope.row.uuid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import int from '@/apiconfig/int'
export default {
  data () {
    return {
      dtlist: []
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
    }
  }
}
</script>
<style scoped>

</style>
