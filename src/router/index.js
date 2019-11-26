import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/login/Login'
import Home from '@/components/Home'
import Loginp from '@/components/login/Loginp'
import Register from '@/components/login/Register'
import MusicWarehouse from '@/components/page/musicwarehouse/MusicWarehouse'
import ResetPassword from '@/components/login/ResetPassword'
import MusicMenu from '@/components/page/musicmenu/MusicMenu'
import MenuDetail from '@/components/page/musicmenu/MenuDetail'
import UserCenter from '@/components/page/usercenter/UserCenter'

import ProjectDetail from '@/components/page/usercenter/ProjectDetail'
import MusicDetail from '@/components/page/musicwarehouse/MusicDetail'
import AlbumList from '@/components/page/album/AlbumList'
import AlbumDetail from '@/components/page/album/AlbumDetail'
import LabelList from '@/components/page/label/LabelList'
import LabelDetail from '@/components/page/label/LabelDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicWarehouse',
      component: MusicWarehouse
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Loginp',
      name: 'Loginp',
      component: Loginp
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/MusicMenu',
      name: 'MusicMenu',
      component: MusicMenu
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/MusicDetail',
      name: 'MusicDetail',
      component: MusicDetail
    },
    {
      path: '/MenuDetail',
      name: 'MenuDetail',
      component: MenuDetail
    },
    {
      path: '/AlbumList',
      name: 'AlbumList',
      component: AlbumList
    },
    {
      path: '/AlbumDetail',
      name: '/AlbumDetail',
      component: AlbumDetail
    },
    {
      path: '/LabelList',
      name: 'LabelList',
      component: LabelList
    },
    {
      path: '/LabelDetail',
      name: 'LabelDetail',
      component: LabelDetail
    },
    {
      path: '/ProjectDetail',
      name: 'ProjectDetail',
      component: ProjectDetail
    }
  ]
})
