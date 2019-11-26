<template>

 <div id='smusiclists'>
  <div class='msingle' v-for='x in dtlist' :key='x.uuid'>
      <div class='avtarwraps'>
        <i :style='{ backgroundImage: `url(${bg})` }' class='mavatar'></i>
        <div  class='mcontrols' :style='{ backgroundImage: `url(${play})` }' @click='listen(x.music_info.uuid)'></div>
      </div>
      <div class='rwrap'>
        <div class='top'>
          <div class='cross'>
            <span class='mname' @click='toroute(x.music_info.uuid)'> {{x.music_info.name.substr(0, 8)}}</span>
            <span class='track_count' @click='tracks(x.music_info.uuid)'> 版本 {{x.music_info.track_count}} </span>

            <div class='composer'>
              <span v-if='x.music_info.musician_info'> {{x.music_info.musician_info.name}} </span>
              <span v-if='x.music_info.album_info'> / 《 {{x.music_info.album_info.name}} 》</span>
            </div>

          <span class='bpm'> BPM {{ x.music_info.bpm }}</span>
          <span class='composerm'> 作词：{{ x.music_info.composer }}</span>
          <span class='lyricist'> 作曲： {{ x.music_info.lyricist }} </span>
          </div>

         <span class='desc'> {{ x.music_info.desc.substr(0, 100) }} </span>
        <div class='rightlogowrap'>
            <i class='download' :style='{ backgroundImage: `url(${del})` }'  @click='delpop(x)'></i>
            <i class='addto' :style='{ backgroundImage: `url(${download})` }' @click='downloadm(x.music_info)'></i>
            <span class='length'> {{  x.music_info.length_desc }}</span>

        </div>
      </div>
      <div class='bottom'>
        <div class='category_info_list'>
          <span v-for='y in x.music_info.category_info_list' :key='y.id'>
            {{ y.name }}
          </span>
        </div>
      </div>

    </div>

  </div>

   <el-dialog title="删除提示"
      :visible.sync="delpops"
      width="450px"
      :close-on-click-modal="false"
      :destroy-on-close='true'
    >
      <div class='cross titlerm'>
        是否将该歌曲在下载列表中移除？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size='mini' @click="delpops = false">取 消</el-button>
        <el-button size='mini' type='info' @click="delcfm"> 确定 </el-button>
      </span>
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
</div>

</template>
<script src='../../../assets/js/downloadrecord.js'></script>

<style scoped src='../../../assets/css/musccrosslist.css'></style>
