<template>
<div id='filterwraps'>
  <div class='filters'>
    <div class='btngrp' v-for='i in filterd' :key='i.id'>

      <el-popover
        v-if="i.type ==='MOOD'"
        trigger='click'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkList" @change='marksarr'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='STYLE'"
        trigger='hover'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkList" @change='marksarr'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='INSTRUMENT'"
        trigger='hover'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkList" @change='marksarr'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
    </div>
  </div>

  <div class='filtertags' v-if='tags.length >=1'>
    <el-tag
      v-for="i in tags"
      :key="i.id"
      closable
      @close="handleClose(i)">
      {{i.name}}
    </el-tag>

  </div>
</div>
</template>
<script>
import int from '@/apiconfig/int'
export default {
  name: 'Filtercomponents',
  data () {
    return {
      filterd: [],
      checkList: [],
      msclist: [],
      parm: [],
      tags: []
    }
  },
  created () {
    this.musiccategorys()
  },
  methods: {
    async musiccategorys () {
      try {
        let dt = await int.musiccategory()
        if (dt.status === 200) {
          this.filterd = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    marksarr (x) {
      this.tags = []
      this.tags = x
      this.parm = []
      for (var i = 0; i < x.length; i++) {
        this.parm.push(x[i].id)
      }
      this.msearch()
    },
    clearfilters () {
      this.checkList = []
      this.parm = []
      this.msearch()
    },
    msearch () {
      this.$emit('filterparams', this.parm)
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.parm = []
      for (var i = 0; i < this.tags.length; i++) {
        this.parm.push(this.tags[i].id)
      }
      this.msearch()
    }
  }
}
</script>
