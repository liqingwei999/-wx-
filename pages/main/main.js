Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo, hasUserInfo: true
      })
    }


  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    let user = wx.getStorageSync('userInfo');
    if (user) {
      this.setData({
        userInfo: user.data,
        hasUserInfo: true
      })
    }
    else {
      wx.getUserProfile({
        desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          let OPENID = wx.getStorageSync('OPENID');

          wx.cloud.database().collection("user").where({
            _openid: OPENID
          }).get()
            .then(result => {
              // console.log(result);
              if(result.data.length==0) {
                this.userInfoAdd(res.userInfo);
              }
            }).catch(err => {
              
            })

          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
            success: (result) => {
              // console.log(result);
            }
          });

          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: (result) => {
    //     this.setData({
    //       userInfo: result.data,
    //       hasUserInfo: true
    //     })
    //   },
    //   fail: () => {
    //     wx.getUserProfile({
    //       desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //       success: (res) => {
    //         // this.userInfoAdd(res.userInfo);
    //         wx.setStorage({
    //           key: 'userInfo',
    //           data: res.userInfo,
    //           success: (result) => {
    //             // console.log(result);
    //           }
    //         });

    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         })
    //       }
    //     })
    //   }
    // });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  userInfoAdd(user) {
    wx.cloud.callFunction({
      name: 'addUserInfo',
      data: {
        avatarUrl: user.avatarUrl,
        nickName: user.nickName
      }
    }).then(res => {
      // console.log(res);
    })
  }

})