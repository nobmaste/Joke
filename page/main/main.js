var log = require('../../log/log.js'); // 引用上面的log.js文件

Page({
  data: {
    cameraContext: null,
    data_status: true,
    lastLogTime: 0,
    logInterval: 1000, // 设置输出时间间隔为1秒
    listener: null, // 存储监听器对象
  },

  onLoad() {
    // 获取摄像头上下文对象
    this.setData({
      cameraContext: wx.createCameraContext(),
    });

    // 定义listener
    this.setData({
      listener: this.data.cameraContext.onCameraFrame((frame) => {
        if (!this.data.lastLogTime || Date.now() - this.data.lastLogTime >= this.data.logInterval) { // 设置输出时间
          console.log('Received camera frame:');
          console.log(frame.data);
          this.setData({
            lastLogTime: Date.now(), // 更新 lastLogTime
           });
        }
      }),
    });

    this.data.listener.start();
    
},

  change: function () {
    if (this.data.data_status) {
      console.log('stop');
      this.data.listener.stop();
      this.setData({
        data_status: false,
      });
    } else {
      console.log('start');
      this.data.listener.start();
      this.setData({
        data_status: true,
      });
    }
  },
});
