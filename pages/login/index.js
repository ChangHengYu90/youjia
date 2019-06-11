// pages/login/index.js
var app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    phone:'',
    pwd:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let user = wx.getStorageSync('user')
    let logintime = wx.getStorageSync('logintime')
    if (user && logintime) {
      wx.reLaunch({
        url: '../index/index',
      })
    }
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
  hqphone(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      phone:e.detail.value
    })
  },
  hqpwd(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      pwd: e.detail.value
    })
  },
  godl(){
    var that =this
    let phone = that.data.phone
    let pwd = that.data.pwd
    if(phone==''){
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 1000,
        mask:true
      })
      return
    }
    // if (!(/^1[345789]\d{9}$/.test(phone))) {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true
    //   })   
    //   return
    //  }
    // if (phone.length !=11) {
    //   wx.showToast({
    //     title: '手机号长度有误',
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true
    //   })
    //   return
    // }
    if (pwd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
  
    if (pwd.length <6) {
      wx.showToast({
        title: '密码至少6位数',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let newpwd = pwd + '3c4510874e6407bf53bbe'
    newpwd = util.md5(newpwd).toLocaleLowerCase()
    let foptions = [
      'mobile' + phone,
      'pwd' + newpwd
    ]
    let data = {
      mobile: phone,
      pwd: newpwd
    }
    util.requestLoading(that.data.apis + '/api/user/login.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
          // if (res.data.authenticationState == 0) {
          //   wx.redirectTo({
          //     url: '../jgrenzheng/index?id=' + res.data.id + '&type=1',
          //   })

          // } else {
            wx.setStorageSync('user', res.data)
        let logintime = util.formatTime(new Date())
        wx.setStorageSync('logintime', logintime)
            wx.reLaunch({
               url: '../index/index',
            })
          // }
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
  // 忘记密码
  gowjmm(){
    wx.navigateTo({
      url: '../forgetpwd/index',
    })
  },
  // zhuce
  gozhuce(){
    wx.navigateTo({
      url: '../zhucelx/index',
    })
  }
})