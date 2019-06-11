var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isshowid: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    template.tabbar3("tabBar", 1, this)//0表示第一个tabbar
   
    var that = this
    let user = wx.getStorageSync('user')

    if (user == '' || user == undefined || user == null) {
      that.setData({
        isshowid: 0
      })
    } else {
      that.getkh()
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
   getkh() {
    var that = this
     let brokerId =wx.getStorageSync('user').id

    let foptions = [
      'brokerId' + brokerId
    ]
    let data = {
      brokerId: brokerId
    }
     util.requestLoading(that.data.apis + '/api/user/broker_customer.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        that.setData({
          kh: shuju
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
  txl(){
    wx.navigateTo({
      url: '../txl/index',
    })
  },
  gobblp(){
    wx.navigateTo({
      url: '../baobeilp/index',
    })
  },
  goywlc(){
    wx.navigateTo({
      url: '../ywjc/index',
    }) 
  },
  gologin() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  golookbybb(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../bybb/index?id=' + id,
    })
  }
})