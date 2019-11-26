import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import Header from '../../components/public/Header.vue'
import Footer from '../../components/public/Footer.vue'
import Filtercomponents from '../../components/common/Filtercomponentsnospeed.vue'
export default {
  name: 'MusicMenu',
  components: {
    Header,
    Footer,
    Filtercomponents
  },
  data () {
    return {
      mscmenu: [],
      params: '?ordering=-created_at',
      df: []
    }
  },
  created () {
    this.menus()
  },
  methods: {
    async menus () {
      try {
        let ml = await int.musicmenu(this.params)
        if (ml.status === 200) {
          this.mscmenu = ml.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    parmfromchild (v) {
      this.df = v

      // console.log(this.df)

      this.menussearch()
    },
    async menussearch () {
      try {
        let ml = await axi().get('/api/playlist/?ordering=-created_at&categories=' + this.df)
        if (ml.status === 200) {
          this.mscmenu = ml.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    rtto (x) {
      this.$router.push(
        {
          path: 'MenuDetail',
          query: {'uuid': x}
        }
      )
    }
  }
}
