// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  let { OPENID } = cloud.getWXContext();
  return cloud.database().collection("user").add({
    data: {
      _openid: OPENID,
      avatarUrl: event.avatarUrl,
      nickName: event.nickName
    }
  }).then(res => {
    // console.log(res);
  }).catch(error => {
    console.log(error);
  })


}