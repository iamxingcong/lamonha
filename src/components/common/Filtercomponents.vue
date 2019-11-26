<template>
<div id='filterwraps'>
  <div class='filters'>
    <div class='btngrp' v-for='i in filterd' :key='i.id'>

      <el-popover
        v-if="i.type ==='MOOD'"
        trigger='hover'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkList" @change='marksarrm'>
            <el-checkbox-button v-for='x in parm.mood' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='STYLE'"
        trigger='hover'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkLista" @change='marksarrs'>
            <el-checkbox-button v-for='x in parm.style' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='INSTRUMENT'"
        trigger='hover'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkListb" @change='marksarri'>
            <el-checkbox-button v-for='x in parm.instrument' :key='x.id' :label="x">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='SPEED'"
        trigger='hover'
        placement="bottom-start"
        width="600">

          <el-radio-group v-model="checkListc"  @change='marksarrsp'>
            <el-radio-button
              v-for='x in parm.speed'
              :label="x"
              :key='x.id'
              :border="false"
            >
              {{x.name}}
            </el-radio-button>
          </el-radio-group>

          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
    </div>
  </div>
  <div class='filtertags' v-if='tags.length >=1  || stags.length >=1 || itags.length >=1 || dtags.id'>
    <el-tag
      v-for="i in tags"
      :key="i.id"
      closable
      @close="handleClose(i)">
      {{i.name}}
    </el-tag>
    <el-tag
      v-for="i in stags"
      :key="i.id"
      closable
      @close="shandleClose(i)">
      {{i.name}}
    </el-tag>
    <el-tag
      v-for="i in itags"
      :key="i.id"
      closable
      @close="ihandleClose(i)">
      {{i.name}}
    </el-tag>
    <el-tag
      v-if='dtags.id'
      :key="dtags.id"
      closable
      @close="dhandleClose(dtags)">
      {{dtags.name}}
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
      checkLista: [],
      checkListb: [],
      checkListc: [],
      msclist: [],
      parm: {
        mood: [],
        style: [],
        instrument: [],
        speed: {id: ''}
      },
      sparm: {
        mood: [],
        style: [],
        instrument: [],
        speed: {id: ''}
      },
      tags: [],
      stags: [],
      itags: [],
      dtags: {}
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

          this.parm.mood = []
          this.parm.style = []
          this.parm.instrument = []
          this.parm.speed = {id: ''}

          var that = this
          dt.data.results.forEach(function (x) {
            if (x.type === 'MOOD') {
              that.parm.mood = x.children
            }
            if (x.type === 'STYLE') {
              that.parm.style = x.children
            }
            if (x.type === 'INSTRUMENT') {
              that.parm.instrument = x.children
            }
            if (x.type === 'SPEED') {
              that.parm.speed = x.children
            }
          })
        }
        console.log(this.parm)
      } catch (e) {
        console.log(e)
      }
    },
    marksarrm (x) {
      this.tags = []
      this.sparm.mood = []
      for (var i = 0; i < x.length; i++) {
        this.tags.push(x[i])
        this.sparm.mood.push(x[i].id)
      }
      this.msearch()
    },
    marksarrs (y) {
      this.stags = []
      this.sparm.style = []
      for (var i = 0; i < y.length; i++) {
        this.stags.push(y[i])
        this.sparm.style.push(y[i].id)
      }
      console.log(this.stags)
      this.msearch()
    },
    marksarri (z) {
      this.itags = []
      this.sparm.instrument = []
      for (var i = 0; i < z.length; i++) {
        this.itags.push(z[i])
        this.sparm.instrument.push(z[i].id)
      }
      this.msearch()
    },
    marksarrsp (v) {
      console.log(v)
      this.sparm.speed = {id: ''}
      this.dtags = v
      this.sparm.speed = {id: v.id}
      this.msearch()
    },
    msearch () {
      this.$emit('filterparams', this.sparm)
    },
    handleClose (tag) {
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.sparm.mood = []
      for (var i = 0; i < this.tags.length; i++) {
        this.sparm.mood.push(this.tags[i].id)
      }
      this.msearch()
    },
    shandleClose (tag) {
      console.log(tag)
      this.stags.splice(this.stags.indexOf(tag), 1)
      this.sparm.style = []
      for (var i = 0; i < this.stags.length; i++) {
        this.sparm.style.push(this.stags[i].id)
      }
      this.msearch()
    },
    ihandleClose (tag) {
      console.log(tag)
      this.itags.splice(this.itags.indexOf(tag), 1)
      this.sparm.instrument = []
      for (var i = 0; i < this.itags.length; i++) {
        this.sparm.instrument.push(this.itags[i].id)
      }
      this.msearch()
    },
    dhandleClose (tag) {
      console.log(tag)
      this.dtags = {}
      this.sparm.speed = {id: ''}
      this.msearch()
    }
  }
}
</script>
