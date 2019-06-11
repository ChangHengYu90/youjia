var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isshowid:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    template.tabbar3("tabBar", 3, this)//0表示第一个tabbar

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
    let user = wx.getStorageSync('user')
    
    if (user == '' || user == undefined || user==null){
     that.setData({
       isshowid:0
     })
    }else{
      that.getgrxx()
    }
    
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
  huanjigou(){
    wx.navigateTo({
      url: '../huanjigou/index',
    })
  },
  gosetup(){
    wx.navigateTo({
      url: '../setup/index',
    })
  },
  gomyxx(){
    wx.navigateTo({
      url: '../mymessage/index',
    })
  },
  gomygz() {
    wx.navigateTo({
      url: '../mygz/index',
    })
  },
  getgrxx() {
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
       that.setData({
         grxx:res.data
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
  gogrzl(){
    wx.navigateTo({
      url: '../grzl/index',
    })
  },
  gologin() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  gorenzheng(){
    
    wx.navigateTo({
      url: '../smrz/index', 
    })
  }
})