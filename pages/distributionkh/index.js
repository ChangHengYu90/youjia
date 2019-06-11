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
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    that.setData({
      id: options.id
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
    that.getlist()
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
  choosegw(){
    var that = this
    let list = that.data.list
    let num = 0
    let id = ''
    for(let i=0;i<list.length;i++){
       if(list[i].isshow==2){
         num++
         if (id == '') {
           id = list[i].id
         } else {
           id = id + ',' + list[i].id
         }
       } else if (list[i].isshow == 1){
         
       }
       if(i==list.length-1){
         if (num==0){
           wx.showToast({
             title: '请选择待分配客户',
             icon: 'none',
             duration: 1000
           })
         }else{
           wx.navigateTo({
             url: '../choosegw/index?lpid=' + that.data.id + '&id=' + id + '&num=' + num,
           })
         }
       }
    }
    
  },
  getlist() {
    var that = this
    let id = wx.getStorageSync('user').id
    let name = that.data.name
    let foptions = [

      'leadId' + id,
      'housingResourcesId'+that.data.id,
      'page' + that.data.page,
    ]
    let data = {
      leadId: id,
      page: that.data.page,
      housingResourcesId: that.data.id
    }

    util.requestLoading(that.data.apis + '/api/project/waitassignedlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
       let shuju = res.data
       for(let i=0;i<shuju.length;i++){
         shuju[i].isshow = 1
         shuju[i].name = decodeURIComponent(shuju[i].name)
       }
       if(that.data.page==1){
         that.setData({
           list: shuju
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
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let list = that.data.list
    if (id==1){
      list[index].isshow = 2
    }else{
      list[index].isshow = 1
    }
    that.setData({
      list: list
    })
  }
})