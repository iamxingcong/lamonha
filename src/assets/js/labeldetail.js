
import axi from '@/apiconfig/axi'
import HeaderDetail from '../../components/public/HeaderDetail.vue'
import Footer from '../../components/public/Footer.vue'
export default {
  name: 'MenuDetail',
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
      downpop: false
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
        let dw = await axi().get('/api/label/' + this.uuid)
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
        let dw = await axi().get('/api/label/' + this.uuid + '/albums/')
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
    rtto (v) {
      console.log(v)
      this.$router.push(
        {
          path: 'AlbumDetail',
          query: {'uuid': v}
        }
      )
    }
  }

}
