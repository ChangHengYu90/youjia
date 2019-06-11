const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    lpisshow:0,
    istcc:0,
    page: 1,
    sscon: '',
    tjlist:[],
    multiId:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      name: options.name,
      mobile: options.mobile,
      isHide: options.isHide,
      visitTime: decodeURIComponent(options.visitTime) ,
      kehums: options.kehums
      
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
    var that = this
    let yeshu = parseInt(that.data.page)+1
    that.setData({
      page:yeshu
    })
    that.getlp()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  chooselp(){
    var that = this
    let id = that.data.lpisshow
    if(id==0){
      that.setData({
        lpisshow: 1
      })
    }else{
      that.setData({
        lpisshow: 0
      })
    }
    
  },
  close(){
    var that = this
    let id = that.data.lpisshow
   
      that.setData({
        lpisshow: 0
      })
  },
  getlp() {
    var that = this
    let cityid = wx.getStorageSync('cityid')
    let sscon = that.data.sscon
    let foptions = [
      'cityId' + cityid,
      'sortType0',
      'page' + that.data.page
    ]
    let data = {
      cityId: cityid,
      sortType: 0,
      page: that.data.page
    }
    if (sscon != '') {
      foptions.push('name' + sscon)
      data.name = sscon
    }
    util.requestLoading(that.data.apis + '/api/hourse/hourselist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].istj = false
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
  // chooselp(e) {
  //   let that = this
  //   let id = e.currentTarget.id
  //   let name = e.currentTarget.dataset.name
  //   var pages = getCurrentPages(); // 获取页面栈
  //   var currPage = pages[pages.length - 1]; // 当前页面
  //   var prevPage = pages[pages.length - 2]; // 上一个页面
  //   prevPage.setData({
  //     loupanname: name,
  //     loupanid: id
  //   })
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  gossmd(e) {
    var that = this
    let con = e.detail.value
    that.setData({
      sscon: con,
      page: 1,
    })
    that.getlp()
  },
  gotianjia(e){
   var that = this
    let tjlist = that.data.tjlist
    if (tjlist.length>4){
      wx.showToast({
        title: '最多选择5个',
        icon: 'none',
        duration: 1000
      })
       return
    }
   let index = e.currentTarget.dataset.index 
    let shuju = that.data.loupan
    
    shuju[index].istj = true
    shuju[index].index = index
    let a = tjlist.concat(shuju[index])
    let multiId = that.data.multiId
    multiId.push(shuju[index].id)
    that.setData({
      loupan:shuju,
      tjlist: a,
      multiId: multiId
    })
 
  },
  godel(e){
    var that = this
    let index = e.currentTarget.dataset.index 
    let faterindex = e.currentTarget.dataset.faterindex 
    let tjlist = that.data.tjlist
    let loupan = that.data.loupan
    loupan[faterindex].istj = false
    let multiId = that.data.multiId
    tjlist.splice(index,1)
    multiId.splice(index, 1)
    that.setData({
      tjlist: tjlist,
      loupan: loupan,
      multiId: multiId
    })
  },
  qingkong(){
    var that = this
    let tjlist = that.data.tjlist
    let loupan = that.data.loupan
    for (let i = 0; i < loupan.length;i++){
      loupan[i].istj = false
    }
    that.setData({
      tjlist: [],
      loupan: loupan,
      multiId:[]
    })
  },
  gobaobei(){
    var that = this
    let tjlist = that.data.tjlist
    let multiId = that.data.multiId
    if (tjlist.length==0){
      wx.showToast({
        title: '请选择楼盘',
        icon: 'none',
        duration: 1000
      })
      return
    }
    console.log(multiId)
    multiId = multiId.join(',')
 
    let userid = wx.getStorageSync('user').id
    console.log(multiId)
    let kehums = that.data.kehums
    let foptions = [
      'brokerId' + userid,
      'multiId' + multiId,
      'visitTime' + that.data.visitTime,
      'name' + that.data.name,
      'mobile' + that.data.mobile,
      'isHide' + that.data.isHide,
      'description'+kehums
    ]
    let data = {
      brokerId: userid,
      multiId: multiId,
      visitTime: that.data.visitTime,
      name: that.data.name,
      mobile: that.data.mobile,
      isHide: that.data.isHide,
      description: kehums
    }
    util.requestLoading(that.data.apis + '/api/hourse/onebuttonreport.aspx', foptions, data, '提交中...', function (res) {
      console.log(res)
      if (res.code == '200') {
     
        setTimeout(function(){
          wx.redirectTo({
            url: '../baobeisuccess/index?num=' + res.data.successCount + '&name=' + res.data.fileHourseName,
          })
        },1000)
        
      } else if (res.code == '1') {
        that.setData({
          istcc:1
        })
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask:true
        })
      }

    }, function (res) {
      console.log(res)
    })
  },
  cxchoose(){
    var that = this
    let shuju = that.data.loupan
    for (let i = 0; i < shuju.length; i++) {
      shuju[i].name = decodeURIComponent(shuju[i].name)
      shuju[i].istj = false
    }
    that.setData({
      multiId:[],
      loupan:shuju,
      istcc:0,
      tjlist:[]
    })

  }
})