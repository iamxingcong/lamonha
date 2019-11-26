import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import Header from '../../components/public/Header.vue'
import Footer from '../../components/public/Footer.vue'
import Filtercomponents from '../../components/common/Filtercomponents.vue'

export default {
  name: 'MusicWarehouse',
  components: {
    Header,
    Footer,
    Filtercomponents
  },
  data () {
    return {
      eye: require('../img/eye.png'),
      bg: require('../img/bg.png'),
      play: require('../img/play.png'),
      listenimg: require('../img/listen.png'),
      addto: require('../img/addto.png'),
      download: require('../img/download.png'),
      filterd: [],
      visible: false,
      vx: false,
      audio: false,
      audiourls: [],
      audiourl: '',
      msclist: [],
      popdata: [],
      recommends: [],
      dialogVisible: false,
      addmusictoproject: false,
      addmtopproj: false,
      downpop: false,
      uuid: '',
      df: {},
      psearchl: [],
      formpro: {
        type: 'COMPANY'
      },
      musicuuid: [],
      projectuuid: '',
      projectuuidx: '',
      noprojsearch: true,
      nghe: [],
      dang: null,
      playuuid: []
    }
  },
  created () {
    this.musiclist()
    this.recommendm()
  },
  methods: {
    async recommendm () {
      try {
        let dt = await int.recommend()
        if (dt.status === 200) {
          this.recommends = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async musiclist () {
      try {
        let dt = await int.music()
        if (dt.status === 200) {
          this.nghe = []
          this.msclist = dt.data.results
          for (var i = 0; i < dt.data.results.length; i++) {
            this.nghe.push({'listen': false})
          }
        }
      } catch (e) {
        console.log(e)
      }
      console.log(this.nghe)
    },
    async msearch () {
      try {
        let dt = await axi().get('/api/music?ordering=-created_at&styles=' + this.style + '&moods=' + this.mood + '&instruments=' + this.instrument + '&tempo_notes_id=' + this.speed.id)
        if (dt.status === 200) {
          this.msclist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async tracks (v) {
      try {
        let dt = await axi().get('/api/music/' + v + '/tracks/')
        if (dt.status === 200) {
          this.popdata = dt.data.results
          if (dt.data.results.length >= 1) {
            this.dialogVisible = true
          } else {
            this.dialogVisible = false
            this.$message({
              message: '暂时还没同版本音乐',
              type: 'warning'
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleClose () {

    },
    async showmore () {

    },
    async showmorebody () {

    },
    unlisten (v, ind) {
      this.nghe[ind].listen = false
      console.log(this.nghe)
      this.playuuid = v
      this.dang = null
      this.audio = false
    },
    listen (v, ind) {
      this.playuuid = v
      if (this.dang === null) {
        this.dang = ind
        this.nghe[ind].listen = true
      } else if (this.dang === ind) {
        this.nghe[ind].listen = true
        this.dang = ind
      } else {
        this.nghe[this.dang].listen = false
        this.nghe[ind].listen = true
        this.dang = ind
      }
      this.playingm()
    },
    async playingm () {
      try {
        let ms = await axi().post('/api/music/' + this.playuuid + '/preview/')
        if (ms.status === 200) {
          this.audio = true
          this.audiourl = ms.data.url
          var myVid = document.getElementById('audio')
          myVid.autoplay = true
          myVid.load()
        }
      } catch (e) {

      }
    },
    downloadpop (v) {
      console.log(v)
      this.downpop = true
      this.uuid = v.uuid
    },
    async downloadcfm () {
      try {
        let dw = await axi().post('/api/music/' + this.uuid + '/download_preview/')
        if (dw.status === 200) {
          this.downpop = false
          window.location.href = dw.data.url
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.downpop = false
          this.$router.push('Loginp')
          this.$message({
            message: e.response.data.detail,
            type: 'warning'
          })
        }
      }
    },
    goto (s) {
      this.$router.push(s)
    },
    parmfromchild (v) {
      this.df = v
      this.menussearch()
    },
    async menussearch () {
      try {
        let ml = await axi().get('/api/music/?ordering=-created_at&styles=' + this.df.style + '&moods=' + this.df.mood + '&instruments=' + this.df.instrument + '&tempo_notes_id=' + this.df.speed.id)
        if (ml.status === 200) {
          this.msclist = ml.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    toroute (x) {
      this.$router.push(
        {
          path: 'MusicDetail',
          query: {'uuid': x}
        }
      )
    },
    async addmusictoprojectcfm () {
      console.log(this.projectuuid)
      // this.addmusictoproject = false
      try {
        let dw = await axi().post('/api/project/' + this.projectuuid + '/music_add/', {'uuids': this.musicuuid})
        if (dw.status === 200) {
          this.addmusictoproject = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    addtopop (x) {
      console.log(x)
      this.musicuuid = []
      this.musicuuid.push(x.uuid)
      this.projectsearchi()
    },
    async projectsearchi () {
      // projectsearch
      try {
        let dt = await int.projectsearch()
        if (dt.status === 200) {
          this.psearchl = dt.data.results
          if (dt.data.results.length <= 1) {
            this.addmtopproj = false
            this.noprojsearch = true
          } else {
            this.noprojsearch = false
            this.addmusictoproject = true
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addmtoprocfm () {
      try {
        let dt = await int.addproject(this.formpro)
        if (dt.status === 200 || dt.status === 201) {
          console.log(dt)
          this.projectsearchi()
          this.noprojsearch = false
          this.addmusictoproject = true
          this.addmtopproj = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    addprojectp () {
      this.addmtopproj = true
      this.addmusictoproject = false
      this.formpro = {type: 'COMPANY'}
    },
    projectuuidadds (v) {
      console.log(v)
      this.projectuuid = v
    }
  }
}
