// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    swipers: [],
    cardInfo: [
      {
        id: '1',
        userNick:'小馋猫',
        desc: 'yyds ipad低价出了',
        img:'https://tse1-mm.cn.bing.net/th/id/R-C.36ab36dc47a25d58d322ae10d890050a?rik=9LNWR5ObWIDexg&riu=http%3a%2f%2f222.186.12.239%3a10010%2fmxr_160630%2f001.jpg&ehk=1EfQDMAAvk0CuRmPNiDbs8o7EZRPEgoX0CG0LYyFZuw%3d&risl=&pid=ImgRaw&r=0'
      },
      {
        id: "859059a5619657dc06a319d6133cb43e",
        userNick:'李逵',
        desc: '盘了十年的核桃，低价转噢，诚信第一，离柜概不负责',
        img:'https://tse1-mm.cn.bing.net/th/id/R-C.10692649036d639b609428bb9adf657a?rik=ACl8ezaNa37aQA&riu=http%3a%2f%2fattimg.woiyu.com%2fforum%2f201212%2f16%2f155708409p5py0rqzf212y.jpg&ehk=EGdspx7UY5kYG8sf9iFZsFgH6e26ZOEIsTtybe2ouz8%3d&risl=&pid=ImgRaw&r=0'
      }
    ]
  },
  // 事件处理函数

  onLoad() {
    this.getSwiper();
  },

  getSwiper() {
    wx.cloud.database().collection('swiper').get()
      .then(res => {
        // console.log(res)
        this.setData({
          swipers: res.data,
        })
      })
  },
  navToDetail(e) {
    // console.log(e);
    console.log(e.currentTarget.dataset.cardinfo.id)
    wx.navigateTo({
      
      url: '/pages/detail/detail?id='+ e.currentTarget.dataset.cardinfo.id,

    });
      
  }


})
