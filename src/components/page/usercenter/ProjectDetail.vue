<template>
<div class='container'>
 <Header />
 <div class='content'>
  <div class='cross personinfo'  :style='{ backgroundImage: `url(${bguc})`}' >
    <i class='ucavatar'  :style='{ backgroundImage: `url(${detail.avatar})`}' ></i>
    <span class='ucname'> {{ detail.name }}</span>
  </div>
  <div class='pbginfo'>
    <el-row class='mgb50'>
      <i class='goback' @click='gobackhistory'  :style='{ backgroundImage: `url(${back})`}'></i>
      <span class='left'>背景音乐</span>
      <el-button round class='right' id='revsieinfo' size='mini' @click='revisepro'>
        修改信息
      </el-button>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <span class='alflw100'>
          被授权公司： {{ prolist.use_name }}
        </span>
      </el-col>

      <el-col :span='12'>
        <span class='alflw100'>
          创建时间： {{ prolist.created_at }}
        </span>
      </el-col>

      <el-col :span='24'>
        <span class='alflw100'>
          描述： {{ prolist.desc }}
        </span>
      </el-col>

    </el-row>
    </div>
    <div id='smusiclists'>
      <div class='msingle' v-for='x in mlist' :key='x.uuid'>
          <div class='avtarwraps'>
            <i :style='{ backgroundImage: `url(${bg})` }' class='mavatar'></i>
            <div  class='mcontrols' :style='{ backgroundImage: `url(${play})` }' @click='listen(x.uuid)'></div>
          </div>
          <div class='rwrap'>

            <div class='top'>
              <div class='left'>
                <div class='cross'>
                  <span class='mname' @click='toroute(x.uuid)'> {{x.name.substr(0, 8)}}</span>
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
    <template v-if='count >  20'>
      <el-button type="text"  size='mini' @click="showmore">加载更多</el-button>
    </template>
    <template v-else-if='count === 0'>
      <span class='noproj'>该项目内暂无作品</span>
    </template>
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

 <el-dialog title="修改项目信息"
      :visible.sync="reviseproj"
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
      <el-button size='mini' @click="reviseproj = false">取 消</el-button>
      <el-button size='mini' type='info' @click="revisecfm"> 确定 </el-button>
    </span>
  </el-dialog>

 <Footer />
</div>
</template>
<script src='../../../assets/js/projectdetail.js'></script>
<style scoped src='../../../assets/css/usercenter.css'></style>
<style scoped src='../../../assets/css/musccrosslist.css'></style>
