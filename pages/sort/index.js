// pages/sort/index.js
var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    typeid:1,
    page:1,
    array: ['到访量','成交量'],
    lxindex:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    template.tabbar2("tabBar", 3, this)//0表示第一个tabbar
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        
        that.setData({
          windowHeight: res.windowHeight - res.windowWidth / 375 * 180-50,

          windowWidth: res.windowWidth

        })
      }
    })
    that.getjjr()
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
  choosetype(e){
   let id = e.currentTarget.id
   var that  = this
   that.setData({
     typeid:id,
     list:''
   })
   if(id==1){
     that.getjjr()
   }
    if (id == 2) {
      that.getjjr2()
    }
  },
  getjjr(){
    var that = this
    let page = that.data.page
    let type = parseInt(that.data.lxindex)+1
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'leadId' + userid,
      'page' + page,
      'type' + type
    ]
    let data = {
      leadId: userid,
      page: page,
      type: type
    }


    util.requestLoading(that.data.apis + '/api/project/mybrokerrank.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].storeName = decodeURIComponent(shuju[i].storeName)
        }
        that.setData({
          list: shuju
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
  getjjr2() {
    var that = this
    let page = that.data.page
    let userid = wx.getStorageSync('user').id
    let type = parseInt(that.data.lxindex) + 1
    let foptions = [
      'leadId' + userid,
      'page' + page,
      'type' + type
    ]
    let data = {
      leadId: userid,
      page: page,
      type: type
    }


    util.requestLoading(that.data.apis + '/api/project/myinstitutionrank.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].storeName = decodeURIComponent(shuju[i].storeName)
        }
        that.setData({
          list: shuju
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
  bindPickerChange(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      lxindex: e.detail.value,
      page:1
    })
    if (that.data.typeid==1){
      that.getjjr()
    }else{
      that.getjjr2()
    }
  },
})