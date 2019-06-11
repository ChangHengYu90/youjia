// pages/mendian/index.js
var template = require('../../template/index.js');
var app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
    name:'',

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
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
    that.getmd()
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
    let yeshu = parseInt(that.data.page)+1
    that.setData({
      page:yeshu
    })
    that.getmd()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getmd(){
    var that = this
    let page = that.data.page
    let id = wx.getStorageSync('user').id
    let name = that.data.name
    let foptions = [
      'institutionId' + id,
      'page' + page
    ]
    let data = {
      institutionId: id,
      page: page
    }
    if(name !=''){
      foptions.push('name' + name)
      data.name = name
    }
    util.requestLoading(that.data.apis + '/api/user/mystorelist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          for (let j = 0; j < shuju[i].brokerList.length; j++){
            shuju[i].brokerList[j].name = decodeURIComponent(shuju[i].brokerList[j].name)
            shuju[i].isshow = false
          }
        }
        if(page==1){
          that.setData({
            mdlist: shuju
          })
        }else{
          that.setData({
            mdlist: that.data.mdlist.concat(shuju)
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
  goaddmd(){
    wx.navigateTo({
      url: '../addmendian/index',
    })
  },
  gobj(e){
    let id = e.currentTarget.id
    let name  = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../mendianbj/index?id=' + id + '&name=' + name
    })
  },
  goshow(e){
   var that = this
   let index = e.currentTarget.dataset.index
    let mdlist = that.data.mdlist
    if (mdlist[index].isshow==false){
      mdlist[index].isshow = true
    }else{
      mdlist[index].isshow = false
    }
    that.setData({
      mdlist: mdlist
    })
  },
  golookxq(e) {
    wx.navigateTo({
      url: '../staffxq/index?id=' + e.currentTarget.id,
    })
  },
  gosearch(e){
    var that = this
    let name = e.detail.value
    that.setData({
      name: name,
      page:1
    })
    that.getmd()
  }
})