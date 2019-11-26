
import axi from '@/apiconfig/axi'
import int from '@/apiconfig/int'
export default {
  data () {
    return {
      eye: require('../img/eye.png'),
      bg: require('../img/bg.png'),
      play: require('../img/play.png'),
      addto: require('../img/addto.png'),
      download: require('../img/download.png'),
      del: require('../img/del.png'),
      downpop: false,
      delpops: false,
      dtlist: [],
      psearchl: [],
      formpro: {
        type: 'COMPANY'
      },
      musicuuid: [],
      projectuuid: '',
      projectuuidx: '',
      noprojsearch: true,
      addmusictoproject: false,
      addmtopproj: false,
      delid: 0,
      muuid: ''
    }
  },
  created () {
    this.xd()
  },
  methods: {
    async xd () {
      try {
        let ml = await int.downloadrecord()
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
    delpop (v) {
      this.delpops = true
      this.delid = v.id
    },
    async delcfm () {
      try {
        let dw = await axi().delete('/api/download/' + this.delid)
        if (dw.status === 200) {
          this.delpops = false
          this.xd()
        }
      } catch (e) {
        console.log(e)
        if (e.response) {
          this.delpops = false
          this.$message({
            message: e.response.data.detail,
            type: 'warning'
          })
        }
      }
    },
    downloadm (v) {
      this.downpop = true
      this.muuid = v.uuid
    },
    async downloadcfm () {
      try {
        let dw = await axi().post('/api/music/' + this.muuid + '/download_preview/')
        if (dw.status === 200) {
          this.xd()
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
    }
  }
}
