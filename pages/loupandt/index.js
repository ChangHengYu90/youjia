// pages/login/index.js
var template = require('../../template/index.js');
var app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
    loupanid:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      type: options.type,
      loupanid: options.id,
    })
    that.getloupan()
    template.tabbar3("tabBar", 2, this)//0表示第一个tabbar

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
  getloupan(){
    var that = this
    let page = that.data.page
    let loupanid = that.data.loupanid
    let foptions = [
      'page' + page
    ]
    let data = {
      page: page
    }
    if (loupanid != '' && loupanid != undefined && loupanid!=null){
      foptions.push('id' + loupanid)
      data.id = loupanid
    }
    util.requestLoading(that.data.apis + '/api/hourse/newslist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length;i++){
          shuju[i].title = decodeURIComponent(shuju[i].title)
          shuju[i].hourseInfo.name = decodeURIComponent(shuju[i].hourseInfo.name)
        }
        if (page == 1) {
          that.setData({
            loupanlist: shuju
          })
        } else {
          that.setData({
            loupanlist: that.data.loupanlist.concat(shuju)
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
  golookxq(e){
   
    var that = this
    let id = e.currentTarget.id
    let user = wx.getStorageSync('user')
    if (user) {
     
      wx.navigateTo({
        url: '../loupanxq/index?id=' + id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您未登录，请登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  golookdtxq(e){
    var that = this
    let id = e.currentTarget.id
    let url = 'https://youjiahouse.cn/api/news_detail.aspx?id='+id
    wx.navigateTo({
      url: '../wangye/index?url='+encodeURIComponent(url),
    })
  }
})