var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page: 1,
    sscon: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      that.gettxllist()
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
  gettxllist() {
    var that = this
    let page = that.data.page
    let brokerId = wx.getStorageSync('user').id
    let sscon = that.data.sscon
    let foptions = [
      'brokerId' + brokerId,
      'page' + page
    ]
    let data = {
      brokerId: brokerId,
      page: page
    }
    if (sscon != '') {
      foptions.push('key' + sscon)
      data.key = sscon
    }
    util.requestLoading(that.data.apis + '/api/user/phonebooklist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].isTouchMove == false
        }
        if (page == 1) {
          that.setData({
            items: res.data
          })
        } else {
          that.setData({
            items: that.data.items.concat(res.data)
          })
        }

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
  gosearch(e) {
    var that = this
    let con = e.detail.value
    that.setData({
      sscon: con,
      page: 1
    })
    that.gettxllist()

  },
  goxz(e){
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (phone.indexOf('*')==-1){
      prevPage.setData({
        khname: name,
        khphone: phone,
        khphone2: phone
      })
    }else{
      prevPage.setData({
        khname: name,
        khphone: phone,
        khphone2: ''
      })
    }
    
    wx.navigateBack({
      delta: 1
    })
  }
})