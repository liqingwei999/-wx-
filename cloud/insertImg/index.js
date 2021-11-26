// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lw-5gjbcpjn467864f1'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext();
  let fileLists=new Array;
  event.fileList.forEach(el => {
    fileLists.push(el);
  });
  
  return cloud.database().collection("good").add({
    data:{
      _openid: OPENID,
      imgUrl: event.fileList,
      desc:event.desc
    }
  }).then(res=>{
    console.log(event);
  }).catch(err=> {
    console.log(err);
  })
}