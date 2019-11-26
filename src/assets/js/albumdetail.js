import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import HeaderDetail from '../../components/public/HeaderDetail.vue'
import Footer from '../../components/public/Footer.vue'
export default {
  name: 'AlbumDetail',
  components: {
    HeaderDetail,
    Footer
  },
  data () {
    return {
      addto: require('../img/addto.png'),
      download: require('../img/download.png'),
      bg: require('../img/bg.png'),
      play: require('../img/play.png'),
      uuid: '',
      detail: {},
      mlist: [],
      downpop: false,
      psearchl: [],
      formpro: {
        type: 'COMPANY'
      },
      musicuuid: [],
      projectuuid: '',
      projectuuidx: '',
      noprojsearch: true,
      addmusictoproject: false,
      addmtopproj: false
    }
  },
  created () {
    this.uuid = this.$route.query.uuid
    this.menudetail()
    this.mlists()
  },
  methods: {
    async menudetail () {
      try {
        let dw = await axi().get('/api/album/' + this.uuid)
        if (dw.status === 200) {
          this.detail = dw.data
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.downpop = false
          this.$message({
            message: e.response.data.detail,
            type: 'warning'
          })
        }
      }
    },
    async mlists () {
      try {
        let dw = await axi().get('/api/album/' + this.uuid + '/musics/')
        if (dw.status === 200) {
          this.mlist = dw.data.results
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.downpop = false
          this.$message({
            message: e.response.data.detail,
            type: 'warning'
          })
        }
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
    toroute (x) {
      this.$router.push(
        {
          path: 'MusicDetail',
          query: {'uuid': x}
        }
      )
    },
    showmore () {
      console.log('showmore')
    },
    async listen () {
      console.log('listen')
    },
    tracks () {
      console.log('pop')
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
