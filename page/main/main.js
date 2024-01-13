var log = require('../../log/log.js'); // 引用上面的log.js文件

Page({
  data: {
    cameraContext: null,
    data_status: false,
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
          console.log('camera open');
          console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height);
          console.log(frame.data);//直接打印
          this.setData({
            lastLogTime: Date.now(), // 更新 lastLogTime
           });

           var data = new Uint8Array(frame.data);
          var clamped = new Uint8ClampedArray(data);
          let that = this
            wx.canvasPutImageData({
              canvasId: 'myCanvas',
              x: 0,
              y: 0,
              width: frame.width,
              height: frame.height,
              data: clamped,
              success(res) {
                // 转换临时文件
                console.log('转换临时文件');
                console.log(res)
                wx.canvasToTempFilePath({
                  x: 0,
                  y: 0,
                  width: frame.width,
                  height: frame.height,
                  canvasId: 'myCanvas',
                  fileType: 'jpg',
                  destWidth: frame.width,
                  destHeight: frame.height,
                  // 精度修改
                  quality: 0.8,
                  success(res) {
                    // 临时文件转base64
                    wx.getFileSystemManager().readFile({
                      filePath: res.tempFilePath, //选择图片返回的相对路径
                      encoding: 'base64', //编码格式
                      success: res => {
                        // 保存base64
                        let base64 = res.data;    
                        // 拿到数据后的其他操作   
                    }
                  })
                },
                fail(res) {
                  console.log(res)
                  wx.showToast({
                    title: '图片生成失败，重新检测',
                    icon: 'none',
                    duration: 1000
                  })
                  // 测试的时候发现安卓机型，转为临时文件失败，这里从新获取帧数据，再转码就能成功，不知道为什么
                  that.startTacking()
                }
              }, that)
            }
          })
        }

        
      

      }),
    });

    //this.data.listener.start();
    
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
