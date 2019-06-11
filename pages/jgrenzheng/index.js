var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isshow:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var  that = this
        that.setData({
          id: options.id,
          type: options.type
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  scpic(){
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
        // let timeStamp = new Date().getTime();
        // foptions.sort();
        // let newstr = foptions.join("");
        // let requestCheck = newstr + timeStamp + '3c4510874e6407bf53bbe';
        // console.log(requestCheck)
        // console.log(params)
        // requestCheck = md5(requestCheck).toLocaleLowerCase();
        // console.log(requestCheck)
        // let headerData = {
        //   "timeStamp": timeStamp,
        //   "requestCheck": requestCheck,
        //   "Content-Type": "application/x-www-form-urlencoded"
        // };
        let image = res.tempFilePaths[0]
        wx.showLoading({
          title: '识别中...',
          mask:true
        })
        wx.uploadFile({
          url: that.data.apis + '/api/user/businesslicensecertification.aspx',
          filePath: res.tempFilePaths[0],
          name: 'image',
          header:{

          },
          formData: {
            'institutionId': that.data.id
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            if(sss.code==200){
              that.setData({
                isshow: 2,
                shuju:sss.data,
                image: image
              })
            }
            wx.showToast({
              title: sss.message,
              icon: 'none',
              duration: 1000,
              mask: true
            })
            

            //do something  
          }, fail: function (err) {
            console.log(err)
          }
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  gomy(){
    var that = this
    let type = that.data.type
    if (type==0){
      wx.navigateBack({
        delta: 3
      })
    }else{
      wx.redirectTo({
        url: '../login/index',
      })
    }
    
  }
})