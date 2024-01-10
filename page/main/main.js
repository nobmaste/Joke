var log = require('../../log/log.js');// 引用上面的log.js文件
// pages/index/index.js

Page({
  data: {
    cameraContext: null,
    isDataArrayBuffer: false,
    frameWidth: 0,
    frameHeight: 0,
    imageDataUrl: '',
  },

  onLoad() {
    // 获取摄像头上下文对象
    this.data.cameraContext = wx.createCameraContext();

    // 注册 onCameraFrame 事件
    this.data.cameraContext.onCameraFrame(this.onCameraFrame);
  },

  onCameraFrame(frame) {
    // 判断帧数据是否为 ArrayBuffer 类型
    this.data.isDataArrayBuffer = frame.data instanceof ArrayBuffer;

    // 更新帧的相关信息
    this.setData({
      frameWidth: frame.width,
      frameHeight: frame.height,
    });

    // 打印帧的相关信息
    console.log('Received camera frame:');
    console.log('Width:', frame.width);
    console.log('Height:', frame.height);
    console.log('Data is ArrayBuffer:', this.data.isDataArrayBuffer);

    // 如果帧数据是 ArrayBuffer 类型，你可以进一步处理数据，例如将其转换为图片进行展示
    if (this.data.isDataArrayBuffer) {
      this.data.imageDataUrl = this.arrayBufferToDataURL(frame.data, frame.width, frame.height);
      console.log('Image Data URL:', this.data.imageDataUrl);
      // 在这里你可以使用 imageDataUrl 进行进一步的展示或处理
    }
  },

  // 将 ArrayBuffer 转换为 Data URL（Base64 编码）
  arrayBufferToDataURL(arrayBuffer, width, height) {
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  },
});
