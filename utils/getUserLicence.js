function getUserLicence(){
  wx.getStorage({
    key: 'OPENID',
    success: (result)=>{
      // console.log(result);
    },
    fail: ()=>{
      wx.cloud.callFunction({
        name:'getOpenId',
      }).then(res=>{
        console.log(res);
        wx.setStorage({
          key: 'OPENID',
          data: res.result.openid,
          success: (result)=>{
            // console.log(result);
          },
          fail: ()=>{},
        });
      })
    }
  });
}

module.exports={
  getUserLicence
}