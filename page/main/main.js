var log = require('../../log/log.js');// 引用上面的log.js文件
Page({
  data: {
    showMirrorVideo: false,
  },

  onMirrorButtonClick: function () {
    if (!this.data.showMirrorVideo) {
      console.log('hello') 
    } else {
      console.log('test hahaha');
    }
  },

  takePhoto() {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    }
 


});
