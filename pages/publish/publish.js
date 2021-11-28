// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
    fileList: [],
  },


  /**
   * 自定义事件
   */
  choseImg() {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.upload(res.tempFilePaths);
      }
    })

  },
  upload(filePath) {
    let OPENID = wx.getStorageSync('OPENID');
    let date = new Date().getTime();
    filePath.forEach((el, index) => {
      wx.cloud.uploadFile({
        cloudPath: `image/` + OPENID + '/' + date + index + '.jpg',
        filePath: el, // 文件路径
      }).then(res => {
        // get resource ID
        console.log(res.fileID)
        const { fileList = [] } = this.data;
        fileList.push({ url: res.fileID });
        this.setData({ fileList });
      }).catch(error => {
        console.log(error);
      })
    });
  },

  //提交回调函数
  onSubmit(options) {
    // console.log(this.data.fileList);
    if (this.data.desc!='') {
      // 云函数添加记录
      wx.cloud.callFunction({
        name: 'insertImg',
        data: {
          fileList: this.data.fileList,
          desc: this.data.desc
        }
      }).then(res => {
        this.setData({
          fileList: [],
          desc: '',
        })
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          image: '',
          duration: 2000,
          mask: true,

        });
      })
    }
    else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'error',
        duration: 2000,
        mask: true,
      });
    }

  },


})