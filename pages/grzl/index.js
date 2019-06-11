var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    array:['男','女'],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      let institutionId = wx.getStorageSync('user').id
      let foptions = [
        'brokerId' + institutionId,
      ]
      let data = {
        brokerId: institutionId,
      }
      util.requestLoading(that.data.apis + '/api/user/broker_myinfo.aspx', foptions, data, '', function (res) {
        console.log(res)
        if (res.code == '200') {
          let shuju = res.data
          shuju.name = decodeURIComponent(shuju.name)
          shuju.institutionName = decodeURIComponent(shuju.institutionName)
          that.setData({
            grxx: shuju,
            headImg: shuju.headImg
          })


        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }

      }, function (res) {
        console.log(res)
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
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  gobjtx(){
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
        let image = res.tempFilePaths[0]
        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        let institutionId = wx.getStorageSync('user').id
        let foptions = [
          'brokerId' + institutionId,
        ]
       
        let timeStamp = new Date().getTime();
        foptions.sort();
        let newstr = foptions.join("");
        let requestCheck = newstr + timeStamp + '3c4510874e6407bf53bbe';
        requestCheck = util.md5(requestCheck).toLocaleLowerCase();
        console.log(requestCheck)
        let headerData = {
          "timeStamp": timeStamp,
          "requestCheck": requestCheck,
          "Content-Type": "application/x-www-form-urlencoded"
        };
        wx.uploadFile({
          url: that.data.apis + '/api/user/broker_perfectinfo.aspx',
          filePath: res.tempFilePaths[0],
          name: 'headImg',
          header: headerData,
          formData: {
            'brokerId': institutionId
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            if (sss.code == 200) {
              that.setData({
                
                headImg: image
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
  }
})