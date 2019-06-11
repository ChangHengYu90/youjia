var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
  hqname(e) {
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  hqnffzh(e) {
    var that = this
    that.setData({
      sfzh: e.detail.value
    })
  },

  submit() {
    var that = this
    let name = that.data.name
    let sfzh = that.data.sfzh
    if (name == '' || name == undefined || name == null) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (sfzh == '' || sfzh == undefined || sfzh == null) {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    let uid = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + uid,
      'name' + name,
      'cardNo' + sfzh
    ]
    let data = {
      brokerId: uid,
      name: name,
      cardNo: sfzh
    }
    util.requestLoading(that.data.apis + '/api/user/broker_authentication.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
      }

    }, function (res) {
      console.log(res)
      wx.hideLoading()
    })
  },
})
