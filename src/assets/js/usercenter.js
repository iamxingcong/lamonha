import int from '@/apiconfig/int'
import Header from '../../components/public/HeaderDetail.vue'
import Footer from '../../components/public/Footer.vue'
import MyProject from '../../components/page/usercenter/MyProject.vue'
import DownloadRecord from '../../components/page/usercenter/DownloadRecord.vue'
import Message from '../../components/page/usercenter/Message.vue'
export default {
  name: 'UserCenter',
  components: {
    Header,
    Footer,
    MyProject,
    DownloadRecord,
    Message
  },
  data () {
    return {
      bguc: require('../img/bguc.png'),
      activeName: 'MyProject',
      detail: {},
      prolist: []
    }
  },
  created () {
    this.prf()
    this.projectl()
  },
  methods: {
    async prf () {
      try {
        let ml = await int.userprofile()
        if (ml.status === 200) {
          this.detail = ml.data
        }
      } catch (e) {
        this.$router.push('/')
        console.log(e)
      }
    },
    async projectl () {
      try {
        let ml = await int.project()
        if (ml.status === 200) {
          this.prolist = ml.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleClick (tab, event) {
      // console.log(tab, event)
      console.log(tab.name)
    }
  }
}
