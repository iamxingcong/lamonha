<template>
<div class='container'>
  <Header />

  <div class='filters'>
    <div class='btngrp' v-for='i in filterd' :key='i.id'>

      <el-popover
        v-if="i.type ==='MOOD'"
        trigger='click'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkList" @change='marksarrm'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x.id">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='STYLE'"
        trigger='click'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkLista" @change='marksarrs'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x.id">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='INSTRUMENT'"
        trigger='click'
        placement="bottom-start"
        width="600">
          <el-checkbox-group v-model="checkListb" @change='marksarri'>
            <el-checkbox-button v-for='x in i.children' :key='x.id' :label="x.id">{{x.name}}</el-checkbox-button>
          </el-checkbox-group>
          <el-button slot="reference" type='text'> {{ i.name }} </el-button>
      </el-popover>
      <el-popover
        v-if="i.type ==='SPEED'"
        trigger='click'
        placement="bottom-start"
        width="600">

          <el-radio-group v-model="checkListc"  @change='marksarrsp'>
            <el-radio-button
              v-for='x in i.children'
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
    <div class='btngrp'>
      <el-button type="text"  @click='clearfilters'>清空筛选</el-button>
    </div>
  </div>

  <div class='content'>

    <span class='vtitles'> Speaklow 的音乐</span>

    <div id='smusiclists'>
      <div class='msingle' v-for='x in msclist' :key='x.uuid'>
          <div class='avtarwraps'>
            <i :style='{ backgroundImage: `url(${bg})` }' class='mavatar'></i>
            <div  class='mcontrols' :style='{ backgroundImage: `url(${play})` }' @click='listen(x.uuid)'></div>
          </div>
          <div class='rwrap'>

            <div class='top'>
              <div class='left'>
                <div class='cross'>
                  <span class='mname'> {{x.name.substr(0, 8)}}</span>
                  <span class='track_count' @click='tracks(x.uuid)'> 版本 {{x.track_count}} </span>
                </div>
                <div class='composer'>
                  <span v-if='x.musician_info'> {{x.musician_info.name}} </span>
                  <span v-if='x.album_info'> / 《 {{x.album_info.name}} 》</span>
                </div>
              </div>
              <div class='right'>
                <i class='download' :style='{ backgroundImage: `url(${download})` }'  @click='downloadpop(x)'></i>
                <i class='addto' :style='{ backgroundImage: `url(${addto})` }' @click='addtopop(x)'></i>
                <span class='length'> {{  x.length_desc }}</span>
                <span class='bpm'> BPM {{ x.bpm }}</span>
              </div>
            </div>

            <div class='bottom'>
              <span class='desc'> {{ x.desc.substr(0, 100) }} </span>

              <div class='category_info_list'>
                <span v-for='y in x.category_info_list' :key='y.id'>
                  {{ y.name }}
                </span>
              </div>
            </div>

          </div>

      </div>
    </div>

    <el-button type="text"  size='mini' @click="showmorebody">加载更多</el-button>
  </div>

  <div id='mlistswrap'>
    <div class='mwrap'>
      <span class='vtitles cross' @click='goto("MusicMenu")'> Speaklow 的曲单 </span>
      <div class='msin' v-for='m in recommends' :key='m.uuid'>
        <i class='mavatars'   :style='{ backgroundImage: `url(${m.cover})` }'></i>
        <span class='mtitle'> {{ m.name }} </span>
        <span class='mdesc'> {{ m.desc }}</span>
      </div>
    </div>
  </div>

  <audio v-if='audio' id="audio" :src="audiourl"  controls='controls'>
      Your browser does not support HTML5 video.
  </audio>

  <el-dialog title="多版本音乐"
    :visible.sync="dialogVisible"
     width="1230px"
    :close-on-click-modal="false"
    :destroy-on-close='true'
    class='grey'
  >

    <div class='msingle' v-for='x in msclist' :key='x.uuid'>
      <div class='avtarwraps'>
        <i :style='{ backgroundImage: `url(${bg})` }' class='mavatar'></i>
        <div  class='mcontrols' :style='{ backgroundImage: `url(${play})` }' @click='listen(x.uuid)'></div>
      </div>
      <div class='rwrap'>

        <div class='top'>
          <div class='left'>
            <div class='cross'>
              <span class='mname'> {{x.name.substr(0, 8)}}</span>
              <span class='track_count' @click='tracks(x.uuid)'> 版本 {{x.track_count}} </span>
            </div>
            <div class='composer'>
              <span v-if='x.musician_info'> {{x.musician_info.name}} </span>
              <span v-if='x.album_info'> / 《 {{x.album_info.name}} 》</span>
            </div>
          </div>
          <div class='right'>
            <i class='download' :style='{ backgroundImage: `url(${download})` }'  @click='downloadpop(x)'></i>
            <i class='addto' :style='{ backgroundImage: `url(${addto})` }' @click='addtopop(x)'></i>
            <span class='length'> {{  x.length_desc }}</span>
            <span class='bpm'> BPM {{ x.bpm }}</span>
          </div>
        </div>

        <div class='bottom'>
          <span class='desc'> {{ x.desc.substr(0, 100) }} </span>

          <div class='category_info_list'>
            <span v-for='y in x.category_info_list' :key='y.id'>
              {{ y.name }}
            </span>
          </div>
        </div>

      </div>

      </div>

    <el-button type="text"  size='mini' @click="showmore">加载更多</el-button>
  </el-dialog>

  <el-dialog title="试听下载"
    :visible.sync="downpop"
    width="450px"
    :close-on-click-modal="false"
    :destroy-on-close='true'
  >
      <div class='cross titlerm'>
        你将下载带水印低音质版本的曲目音频，该版本仅提供学习和试用
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="downpop = false">取 消</el-button>
      <el-button size='mini' type='info' @click="downloadcfm"> 继续下载 </el-button>
    </span>
  </el-dialog>

  <Footer />

</div>
</template>
<script src='../../../assets/js/musicwarehouse.js'></script>
<style scoped src='../../../assets/css/musicwarehouse.css'></style>
