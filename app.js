// app.js
const file = require('./utils/getUserLicence.js')
App({
  onLaunch() {
    
    wx.cloud.init({
      env:'lw-5gjbcpjn467864f1'
    })
    file.getUserLicence()
  }
})
