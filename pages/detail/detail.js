// pages/detail/detail.js

let goodInfo = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: {
      _id: '1',
      userNick: '小馋猫',
      desc: 'yyds ipad低价出了',
      imgUrl: 'https://tse1-mm.cn.bing.net/th/id/R-C.36ab36dc47a25d58d322ae10d890050a?rik=9LNWR5ObWIDexg&riu=http%3a%2f%2f222.186.12.239%3a10010%2fmxr_160630%2f001.jpg&ehk=1EfQDMAAvk0CuRmPNiDbs8o7EZRPEgoX0CG0LYyFZuw%3d&risl=&pid=ImgRaw&r=0'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    this.getCardInfo(id);
  },
  //自定义事件
  getCardInfo(id) {
    wx.cloud.database().collection("good")
      .doc(id)
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          goodInfo:res.data
        })

      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})