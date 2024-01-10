var log = require('../../log/log.js');// 引用上面的log.js文件

Page({
  data: {
    cameraContext: null,
   
  },

  onLoad() {
    // 获取摄像头上下文对象
    const cameraContext=wx.createCameraContext()
    const listener = cameraContext.onCameraFrame((frame)=>{
      console.log('Received camera frame:'),
      console.log(frame.data)
    })
    listener.start()
  },
 
});
