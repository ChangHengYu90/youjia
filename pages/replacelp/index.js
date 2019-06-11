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
   isshow:1,
    lpname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    let uesr=wx.getStorageSync('zygwgh')
    that.setData({
      uesr: uesr
    })
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
  getlp() {
    var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'leadId' + userid,

    ]
    let data = {
      leadId: userid,
    }
    util.requestLoading(that.data.apis + '/api/project/myhourselist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        let shuju2=[]
        let housingResourcesName = that.data.uesr.housingResourcesName
         for(let i=0;i<shuju.length;i++){
           shuju[i].name = decodeURIComponent(shuju[i].name)
           if (housingResourcesName != shuju[i].name){
             shuju2.push(shuju[i])
           }
         }
        

        that.setData({
          list: shuju2
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
  choose(e){
    var that = this
    let lpid = e.currentTarget.dataset.id
    let lpname = e.currentTarget.dataset.name
    that.setData({
      isshow:2,
      lpid: lpid,
      lpname: lpname
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
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'leadId' + userid,
      'propertyconsultantId'+that.data.uesr.id,
      'housingResourcesId' + that.data.lpid
    ]
    let data = {
      leadId: userid,
      propertyconsultantId: that.data.uesr.id,
      housingResourcesId: that.data.lpid
    }
    util.requestLoading(that.data.apis + '/api/project/changepropertyconsultanthousingresources.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000,
        mask: true
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