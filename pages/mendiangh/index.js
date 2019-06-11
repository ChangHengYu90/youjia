var app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isshow:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      mdname: options.name,
      naem: options.ygname,
      phone: options.phone,
      headimg: options.headimg,
      mdid: options.mdid,
      jjrid: options.id,
    })
    that.getmdlist()
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
  getmdlist(){
    var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,

    ]
    let data = {
      institutionId: userid,
    }
    util.requestLoading(that.data.apis + '/api/basic/institutionstorelist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        that.setData({
          mdlist: shuju
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
  gochoose(e){
    let that = this
    let id = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    that.setData({
      isshow:1,
      ghid:id,
      ghname:name
    })
  },
  qxgh(){
    let that = this
   
    that.setData({
      isshow: 0,
      
    })
  },
  qdgh(){
    var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'storeId' + that.data.ghid,
      'brokerId' + that.data.jjrid

    ]
    let data = {
      institutionId: userid,
      storeId: that.data.ghid,
      brokerId: that.data.jjrid
    }
    that.setData({
      isshow: 0,

    })
    util.requestLoading(that.data.apis + '/api/user/changestore.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },1000)
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
  }
})