
import int from '@/apiconfig/int'
import axi from '@/apiconfig/axi'
import Header from '../../components/public/Header.vue'
import Footer from '../../components/public/Footer.vue'
import Filtercomponents from '../../components/common/Filtercomponentsnospeed.vue'

export default {
  name: 'LabelList',
  components: {
    Header,
    Footer,
    Filtercomponents
  },
  data () {
    return {
      lbl: []
    }
  },
  created () {
    this.labellist()
  },
  methods: {
    parmfromchild (v) {
      this.df = v
      this.albsearch()
    },
    async labellist () {
      try {
        let dt = await int.label()
        if (dt.status === 200) {
          this.lbl = dt.data.results
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
    rtto (v) {
      console.log(v)
    },
    goto (x) {
      this.$router.push(
        {
          path: 'LabelDetail',
          query: {'uuid': x}
        }
      )
    }
  }
}
