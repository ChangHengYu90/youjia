// pages/mendian/index.js
var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
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
    let user = wx.getStorageSync('user')
    let usertype = 1
    console.log(user.role)
    if (user.role == '4') {
      usertype = 1

      that.getxx()
      template.tabbar("tabBar", 3, that)//0表示第一个tabbar

    } else if (user.role == '5') {
      usertype = 2
      template.tabbar2("tabBar", 4, this)//0表示第一个tabbar
      that.getjlxx()
    }  
    that.setData({
      usertype: usertype
    })
    that.setData({
      isrz: user.authenticationState
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
    var that = this
    let user= wx.getStorageSync('user')

    that.setData({
      userid: user.id
    })
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
  gologin(){
    wx.navigateTo({
      url: '../login/index',
    })
  },
  getxx(){
    var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,

    ]
    let data = {
      institutionId: userid,
    }
    util.requestLoading(that.data.apis + '/api/user/institution_myinfo.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
      
          shuju.name = decodeURIComponent(shuju.name)
     
        that.setData({
          userxx: shuju
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }, function (res) {
      console.log(res)
    })
  },
  goxgpwd(){
    wx.navigateTo({
      url: '../changpwd/index',
    })
  },
  gotc(){
    wx.removeStorageSync('user')

    wx.reLaunch({
      url: '../login/index',
    })
  },
  getjlxx() {
    var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'leadId' + userid,

    ]
    let data = {
      leadId: userid,
    }
    util.requestLoading(that.data.apis + '/api/user/lead_myinfo.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data

        shuju.name = decodeURIComponent(shuju.name)

        that.setData({
          userxx: shuju
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }, function (res) {
      console.log(res)
    })
  },
  gorenz(){
    var that = this
    let user = wx.getStorageSync('user').id
    wx.navigateTo({
      url: '../jgrenzheng/index?id=' + user + '&type=1',
    })
  }
})