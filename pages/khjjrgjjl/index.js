var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page: 1,
    istck:0,
    tjjlcon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
      that.setData({
        id: options.id,
        name: options.name,
        phone:options.phone
      })
    that.getgjjl()
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
  getgjjl(){
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let id = that.data.id
    let foptions = [
      'leadId' + institutionId,
      'reportRecordId' + id,
      'page' + that.data.page
    ]
    let data = {
      leadId: institutionId,
      reportRecordId:id,
      page: that.data.page
    }
    util.requestLoading(that.data.apis + '/api/project/followlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].remark = decodeURIComponent(shuju[i].remark)
          shuju[i].name = decodeURIComponent(shuju[i].name)
         
          
        }
        that.setData({
          gjjllist: shuju,
       
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
  gotjjl(){
    var that= this
    that.setData({
      istck:1
    })
  },
  closetcc(){
    var that = this
    that.setData({
      istck: 0,
      tjjlcon:'',
    })
  },
  hqaddgjjl(e){
     var that = this
     that.setData({
       tjjlcon:e.detail.value
     })
  },
  addgjjl(){
    var that = this
    let tjjlcon = that.data.tjjlcon
    if (tjjlcon==''){
       wx.showToast({
         title: '请输入记录内容',
         icon:'none',
         duration:1000,
         mask:true,
       })
       return
    }
    let institutionId = wx.getStorageSync('user').id
    let id = that.data.id
    let foptions = [
      'leadId' + institutionId,
      'reportRecordId' + id,
      'remark' + tjjlcon
    ]
    let data = {
      leadId: institutionId,
      reportRecordId: id,
      remark: tjjlcon
    }
    util.requestLoading(that.data.apis + '/api/project/addfollow.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
        that.setData({
          page:1,
          istck:0,
          tjjlcon:''
        })
        that.getgjjl()

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
  deljl(e){
   var that = this
   let id = e.currentTarget.id
   let institutionId = wx.getStorageSync('user').id
   wx.showModal({
     title: '提示',
     content: '您确定删除吗',
     success(res) {
       if (res.confirm) {
         let foptions = [
           'leadId' + institutionId,
           'id' + id,

         ]
         let data = {
           leadId: institutionId,
           id: id,

         }
         util.requestLoading(that.data.apis + '/api/project/deletefollow.aspx', foptions, data, '', function (res) {
           console.log(res)
           if (res.code == '200') {
             wx.showToast({
               title: res.message,
               icon: 'none',
               duration: 1000
             })
             that.getgjjl()
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
       } else if (res.cancel) {
        
       }
     }
   })
    
  },
  getname(e) {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let id = that.data.id
    let foptions = [
      'brokerId' + institutionId,
      'id' + that.data.id,
      'name' + e.detail.value
    ]
    let data = {
      brokerId: institutionId,
      id: that.data.id,
      name: e.detail.value
    }
    util.requestLoading(that.data.apis + '/api/user/addphonebook.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
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
})