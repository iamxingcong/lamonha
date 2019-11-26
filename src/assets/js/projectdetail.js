import axi from '@/apiconfig/axi'
import int from '@/apiconfig/int'
import Header from '../../components/public/HeaderDetail.vue'
import Footer from '../../components/public/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      dtlist: [],
      bguc: require('../img/bguc.png'),
      addto: require('../img/addto.png'),
      download: require('../img/download.png'),
      bg: require('../img/bg.png'),
      play: require('../img/play.png'),
      back: require('../img/back.png'),
      detail: {},
      prolist: {},
      mlist: [],
      uuid: '',
      downpop: false,
      form: {
        desc: '',
        name: '',
        use_name: '',
        type: ''
      },
      reviseproj: false,
      count: 0
    }
  },
  created () {
    this.prf()
    this.projectl()
    this.mlists()
  },
  methods: {
    async prf () {
      try {
        let ml = await int.userprofile()
        if (ml.status === 200) {
          this.detail = ml.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async projectl () {
      try {
        let ml = await axi().get('/api/project/' + this.$route.query.uuid)
        if (ml.status === 200) {

          this.prolist = ml.data
          this.form.desc = ml.data.desc
          this.form.name = ml.data.name
          this.form.use_name = ml.data.use_name
          this.form.type = ml.data.type
        }
      } catch (e) {
        console.log(e)
      }
    },
    async mlists () {
      try {
        let ml = await axi().get('/api/project/' + this.$route.query.uuid + '/musics/')
        if (ml.status === 200) {
          this.mlist = ml.data.results
          this.count = ml.data.count
        }
      } catch (e) {
        console.log(e)
      }
    },
    downloadpop (v) {
      console.log(v)
      this.downpop = true
      this.uuid = v.uuid
    },
    async downloadcfm () {
      try {
        let dw = await axi().post('/api/project/' + this.$route.query.uuid + '/download_preview/', {'music_id': this.uuid})
        if (dw.status === 200) {
          this.downpop = false
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
    addtopop (x) {
      console.log(x)
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
    revisepro () {
      this.reviseproj = true
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
    gobackhistory () {
      this.$router.go(-1)
    },
    async revisecfm () {
      try {
        let dt = await axi().put('/api/project/' + this.$route.query.uuid, this.form)
        if (dt.status === 200) {
          this.reviseproj = false
          this.projectl()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
