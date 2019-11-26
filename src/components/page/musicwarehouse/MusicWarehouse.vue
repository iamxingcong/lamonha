<template>
<div class='container'>
  <Header />
  <Filtercomponents   v-on:filterparams="parmfromchild"></Filtercomponents>

  <div class='content'>
    <div class='mplayingdiv'>
      <audio v-if='audio' id="audio" :src="audiourl"  controls='controls'>
          Your browser does not support HTML5 video.
      </audio>
    </div>
    <span class='vtitles'> Speaklow 的音乐</span>

    <div id='smusiclists'>
      <div class='msingle' v-for='(x, indexs) in msclist' :key='x.uuid'>
          <div class='avtarwraps'>
            <i :style='{ backgroundImage: `url(${bg})` }' class='mavatar'></i>
            <template v-if='nghe[indexs].listen'>
              <div  class='unmcontrols' :style='{ backgroundImage:  `url(${listenimg})`  }' @click='unlisten(x.uuid, indexs)'></div>
            </template>
            <template v-else>
              <div  class='mcontrols' :style='{ backgroundImage:  `url(${play})`  }' @click='listen(x.uuid, indexs)'></div>
            </template>

          </div>
          <div class='rwrap'>

            <div class='top'>

                <div class='cross'>
                  <span class='mname' @click='toroute(x.uuid)'> {{x.name.substr(0, 8)}}</span>
                  <span class='track_count' @click='tracks(x.uuid)'> 版本 {{x.track_count}} </span>
                  <div class='composer'>
                    <span v-if='x.musician_info'> {{x.musician_info.name}} </span>
                    <span v-if='x.album_info'> / 《 {{x.album_info.name}} 》</span>
                  </div>

                  <span class='bpm'> BPM {{ x.bpm }}</span>
                  <span class='composerm'> 作词：{{ x.composer }}</span>
                  <span class='lyricist'> 作曲： {{ x.lyricist }} </span>
              </div>
              <span class='desc'> {{ x.desc.substr(0, 100) }} </span>

              <div class='rightlogowrap'>
                <i class='download' :style='{ backgroundImage: `url(${download})` }'  @click='downloadpop(x)'></i>
                <i class='addto' :style='{ backgroundImage: `url(${addto})` }' @click='addtopop(x)'></i>
                <span class='length'> {{  x.length_desc }}</span>
              </div>
            </div>

            <div class='bottom'>

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

            <div class='cross'>
              <span class='mname' @click='toroute(x.uuid)'> {{x.name.substr(0, 8)}}</span>
              <span class='track_count' @click='tracks(x.uuid)'> 版本 {{x.track_count}} </span>
              <div class='composer'>
                <span v-if='x.musician_info'> {{x.musician_info.name}} </span>
                <span v-if='x.album_info'> / 《 {{x.album_info.name}} 》</span>
              </div>

              <span class='bpm'> BPM {{ x.bpm }}</span>
              <span class='composerm'> 作词：{{ x.composer }}</span>
              <span class='lyricist'> 作曲： {{ x.lyricist }} </span>
          </div>
          <span class='desc'> {{ x.desc.substr(0, 100) }} </span>

          <div class='rightlogowrap'>
            <i class='download' :style='{ backgroundImage: `url(${download})` }'  @click='downloadpop(x)'></i>
            <i class='addto' :style='{ backgroundImage: `url(${addto})` }' @click='addtopop(x)'></i>
            <span class='length'> {{  x.length_desc }}</span>
          </div>
        </div>

        <div class='bottom'>

          <div class='category_info_list'>
            <span v-for='y in x.category_info_list' :key='y.id'>
              {{ y.name }}
            </span>
          </div>
        </div>

      </div>

  </div>

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

  <el-dialog title="添加至项目"
    :visible.sync="addmusictoproject"
    width="450px"
    :close-on-click-modal="false"
    :destroy-on-close='true'
  >
      <div class='cross poptitle'>
        项目管理便利于您对音乐的收藏使用
      </div>

      <div class='cross addprojectbtn'>
        <el-button type='text' size='mini' class='left'  @click='addprojectp'> 创建项目 </el-button>
      </div>
      <div id='projechoose'>
         <el-radio-group v-model="projectuuidx" @change='projectuuidadds'>
            <el-radio-button v-for='i in psearchl' :key='i.uuid' :label='i.uuid'>{{i.name}}</el-radio-button>
         </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="addmusictoproject = false">取 消</el-button>
      <el-button size='mini' type='info' @click="addmusictoprojectcfm"> 创建 </el-button>
    </span>
  </el-dialog>

  <el-dialog title="添加至项目"
      :visible.sync="addmtopproj"
      width="450px"
      :close-on-click-modal="false"
      :destroy-on-close='true'
    >
    <div class='cross  poptitle' v-if='noprojsearch'>
      你还没有任何项目，请创建新项目
    </div>
    <div class='cross poptitle' v-else>
        项目管理便利于您对音乐的收藏使用
    </div>
    <el-form ref="form" :model="formpro">
      <el-form-item label="">
        <el-input v-model="formpro.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="请选择项目类型">
        <el-radio v-model="formpro.type" label="COMPANY">公司</el-radio>
        <el-radio v-model="formpro.type" label="PERSONAL">个人</el-radio>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="formpro.use_name" placeholder="使用名称"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-input type="textarea" v-model="formpro.desc" placeholder="项目描述"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button size='mini' @click="addmtopproj = false">取 消</el-button>
      <el-button size='mini' type='info' @click="addmtoprocfm"> 确定 </el-button>
    </span>
  </el-dialog>

  <Footer />

</div>
</template>
<script src='../../../assets/js/musicwarehouse.js'></script>
<style scoped src='../../../assets/css/musicwarehouse.css'></style>
<style scoped src='../../../assets/css/musccrosslist.css'></style>
