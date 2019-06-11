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
    state: 0,
    page: 1,
    name:'',
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      state: options.id
    })
    if (options.id==3){
       wx.setNavigationBarTitle({
         title: '累计成交',
       })
    }
    if (options.id == 2) {
      wx.setNavigationBarTitle({
        title: '本月到访',
      })
    }
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '本月报备',
      })
    }
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
    let yeshu = parseInt(that.data.page) +1
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

      'brokerId' + id,
      'page' + that.data.page,
      'state' + that.data.state
    ]
    let data = {
      brokerId: id,
      state: that.data.state,
      page: that.data.page
    }
    if (name!=''){
      foptions.push('name' + name)
      data.name=name
    }
    util.requestLoading(that.data.apis + '/api/user/conditionreportlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res
        for (let i = 0; i < shuju.data.length;i++){
          shuju.data[i].hourseName = decodeURIComponent(shuju.data[i].hourseName)
          shuju.data[i].name = decodeURIComponent(shuju.data[i].name)
          shuju.data[i].description = decodeURIComponent(shuju.data[i].description)
      } 
      console.log(shuju)
       if(that.data.page==1){
         let num = that.data.num
         num++
         if(num==1){
           that.setData({
             bblist: shuju.data,
             toplist: shuju,
             num: num
           })
         }else{
           that.setData({
             bblist: shuju.data,
             toplist: shuju,
           })
         }
         
       }else{
         let ysj = that.data.bblist
   
         let a = ysj.concat(shuju.data)
         console.log(a)
         that.setData({
           bblist: a,
           toplist: shuju,
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
  hqname(e){
   var that = this
   that.setData({
     name: e.detail.value.replace(/\s+/g, '')
   })
    that.getlist()
  },
  goqhtype(e){
     var that = this
     that.setData({
       state:e.currentTarget.id,
       page:1,

     })
    that.getlist()
  },
  godel(e){
   var that = this
   let bbid = e.currentTarget.id
    let id = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + id,
      'id' + bbid,
    
    ]
    let data = {
      brokerId: id,
      id: bbid,
    }
 
    util.requestLoading(that.data.apis + '/api/user/deletereport.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
        that.setData({
          page:1,
          num:0,
        })
        that.getlist()
      } else {
        
      }
    }, function (res) {
      console.log(res)
    })
  },
  closekhms() {
    var that = this
    that.setData({
      khmsid: 0
    })
  },
  showkhms(e) {
    var that = this
    let content = e.currentTarget.dataset.content
    that.setData({
      khmsid: 1,
      content: content
    })
  }
})