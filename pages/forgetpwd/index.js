var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    VerifyCode: '获取验证码',
    zcbtn: 1,
    apis: app.data.href,
    phone: '',
    pwd: '',
    jgyqm: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      typeid: options.type,

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
  hqphone(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  hqyzm(e) {
    var that = this
    that.setData({
      yzm: e.detail.value
    })
  },
  hqpwd(e) {
    var that = this
    that.setData({
      pwd: e.detail.value
    })
  },
  hqqrpwd(e) {
    var that = this
    that.setData({
      qrpwd: e.detail.value
    })
  },
  huoquyzm() {
    var that = this
    let phone = that.data.phone
    var phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请先填写手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    console.log(phoneRexp.test(phone))
    if (!phoneRexp.test(phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none',
        duration: 1500,
      })
      return

    }
    let zcbtn = that.data.zcbtn
    if (zcbtn == 2) {
      return
    }
    wx.showLoading({
      title: '发送中',
      mask: true,
    })
    let foptions = [
      'mobile' + phone,
      'type2'
    ]
    let data = {
      mobile: phone,
      type: 2,
    }
    util.requestLoading(that.data.apis + '/api/user/obtainverifycode.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.code == '200') {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        that.data.zcbtn = 2
        var total_micro_second = 59;
        count_down(that, total_micro_second);
        wx.showToast({
          title: '发送成功',
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
      }

    }, function (res) {
      console.log(res)
      wx.hideLoading()
    })

  },
  submit() {
    var that = this
    let phone = that.data.phone
    let yzm = that.data.yzm
    let pwd = that.data.pwd
    let qrpwd = that.data.qrpwd
 
    var phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (!phoneRexp.test(phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none',
        duration: 1500,
      })
      return

    }
    if (yzm == '' || yzm == undefined || yzm == null) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (pwd == '' || pwd == undefined || pwd == null) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (qrpwd == '' || qrpwd == undefined || qrpwd == null) {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (qrpwd != pwd) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    let newpwd = pwd + '3c4510874e6407bf53bbe'
    newpwd = util.md5(newpwd).toLocaleLowerCase()
    let foptions = [
      'mobile' + phone,
      'code' + yzm,
      'pwd' + newpwd,
  
    ]
    let data = {
      mobile: phone,
      code: yzm,
      pwd: newpwd,

    }

    util.requestLoading(that.data.apis + '/api/user/findpwd.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
      }

    }, function (res) {
      console.log(res)
      wx.hideLoading()
    })
  }
})
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送",
      inDis: false,
      zcbtn: 1,
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒",
    inDis: true
  });
  setTimeout(function () {
    // 放在最后--
    console.log(date_format(total_micro_second))
    total_micro_second -= 1;
    count_down(that, total_micro_second);
  }, 1000)
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second);
  // 小时位
  var hr = Math.floor(second / 360);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 360) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 360 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second)));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}