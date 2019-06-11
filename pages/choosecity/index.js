
var app = getApp()
const util = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    gdid:'re',
    type:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          pmheight: res.windowHeight,
          type: options.type
        })
        
      },
    })
    that.getcity()
    var demo = new QQMapWX({
      key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.address_component.city);

            that.setData({
              city: res.result.address_component.city
            })

            that.getcity()
          },
          fail: function (res) {
            console.log(res);
            that.setData({
              city: ''
            })

          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (e) {
        that.setData({
          city: ''
        })
      }
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
  getcity(){
    var that = this
    let foptions = [

    ]
    let data = {

    }
    util.requestLoading(that.data.apis + '/api/basic/citylist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.hotList.length;i++){
          shuju.hotList[i].name = decodeURIComponent(shuju.hotList[i].name)
        }
        for (let j = 0; j < shuju.info.length; j++) {

          for (let n = 0; n < shuju.info[j].cityList.length; n++) {
            shuju.info[j].cityList[n].name = decodeURIComponent(shuju.info[j].cityList[n].name)
          }
         
        }
        that.setData({
          citylist: shuju
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
  gochoose(e){
    var that = this
    let id = e.currentTarget.id
    that.setData({
      gdid:id
    })
  },
  choosecity(e){
    var that = this
   let id = e.currentTarget.id
   let name = e.currentTarget.dataset.name
   wx.setStorageSync('city', name)
    wx.setStorageSync('cityid', id)
    if(that.data.type==1){
      wx.reLaunch({
        url: '../index/index',
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
    }
    
  }
})