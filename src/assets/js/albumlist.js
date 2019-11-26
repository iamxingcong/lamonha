
import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import Header from '../../components/public/Header.vue'
import Footer from '../../components/public/Footer.vue'
import Filtercomponents from '../../components/common/Filtercomponentsnospeed.vue'

export default {
  name: 'AlbumList',
  components: {
    Header,
    Footer,
    Filtercomponents
  },
  data () {
    return {
      lblist: {},
      df: []
    }
  },
  created () {
    this.albumlist()
  },
  methods: {
    parmfromchild (v) {
      this.df = v
      this.albsearch()
    },
    async albumlist () {
      try {
        let dt = await int.album()
        if (dt.status === 200) {
          this.lblist = dt.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    async albsearch () {
      try {
        let ml = await axi().get('/api/album/?ordering=-created_at&categories=' + this.df)
        if (ml.status === 200) {
          this.msclist = ml.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    rtto (x) {
      console.log(x)
      this.$router.push(
        {
          path: 'AlbumDetail',
          query: {'uuid': x}
        }
      )
    }
  }
}
