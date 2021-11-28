// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    swipers: [],
    cardInfo: [
      
    ]
  },
  

  onLoad() {
    this.getSwiper();
    this.getGoodsInfo();
  },
  // 事件处理函数

  //从数据库获取轮播图信息
  getSwiper() {
    wx.cloud.database().collection('swiper').get()
      .then(res => {
        // console.log(res)
        this.setData({
          swipers: res.data,
        })
      })
  },

  getGoodsInfo(){
    wx.cloud.callFunction({
      name:'getGoodUserInfo'
    }).then(res=>{
      console.log(res);
      this.setData({
        cardInfo: res.result.list
      })
    })
  },

  //页面跳转，并携带商品id
  navToDetail(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.cardinfo.id)
    wx.navigateTo({
      
      url: '/pages/detail/detail?id='+ e.currentTarget.dataset.cardinfo.id,

    });
      
  }


})
