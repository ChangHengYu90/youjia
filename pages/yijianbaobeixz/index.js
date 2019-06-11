var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
    sscon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getlp()
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
  getlp(){
    var that = this
    let cityid = wx.getStorageSync('cityid')
    let sscon = that.data.sscon
    let foptions = [
      'cityId' + cityid,
      'sortType0' ,
      'page'+that.data.page
    ]
    let data = {
      cityId: cityid,
      sortType:0,
      page: that.data.page
    }
    if (sscon!=''){
      foptions.push('name' + sscon)
      data.name = sscon
    }
    util.requestLoading(that.data.apis + '/api/hourse/hourselist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        that.setData({
          loupan: shuju
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
  chooselp(e){
   let that = this
   let id = e.currentTarget.id
   let name = e.currentTarget.dataset.name
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      loupanname: name,
      loupanid: id
    })
    wx.navigateBack({
      delta:1
    })
  },
  gossmd(e){
   var that = this
   let con = e.detail.value
   that.setData({
     sscon:con,
     page:1,
   })
    that.getlp()
  }
})