// pages/customer/index.js
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
    zyname:'',
    isshow:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.lpid,
      ygid: options.id,
      num: options.num,
    })
    that.getlist()
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
    var that = this
    let yeshu = that.data.page
    yeshu++
    that.setData({
      page:yeshu
    })
    that.getlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlist() {
    var that = this
    let id = wx.getStorageSync('user').id
    let name = that.data.name
    let foptions = [

      'leadId' + id,
      'page' + that.data.page,
      'housingResourcesId' + that.data.id
    ]
    let data = {
      leadId: id,
      housingResourcesId: that.data.id,
      page: that.data.page
    }
    util.requestLoading(that.data.apis + '/api/project/mypropertyconsultantlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
         let shuju = res.data
         for(let i=0;i<shuju.length;i++){
           shuju[i].name = decodeURIComponent(shuju[i].name)
         }
         if(that.data.page==1){
           that.setData({
             list:shuju
           })
         }else{
           that.setData({
             list: that.data.list.concat(shuju)
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
  choose(e){
   var that = this
   let zyid = e.currentTarget.dataset.id
    let zyname = e.currentTarget.dataset.name
    that.setData({
      isshow:2,
      zyid: zyid,
      zyname: zyname
    })
  },
  qxgh(){
    var that = this
    that.setData({
      isshow: 1,
    })
  },

  qdgh(){
    var that = this
    that.setData({
      isshow: 1,
    })
    let id = wx.getStorageSync('user').id
    let zyid = that.data.zyid
    let foptions = [

      'leadId' + id,
      'propertyconsultantId' + zyid,
      'customerId' + that.data.ygid
    ]
    let data = {
      leadId: id,
      customerId: that.data.ygid,
      propertyconsultantId: zyid
    }
    util.requestLoading(that.data.apis + '/api/project/changepropertyconsultant.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
        setTimeout(function(){
          wx.navigateBack({
            
          })
        },1000)
      } else {
        
      }
    }, function (res) {
      console.log(res)
    })
  }

})