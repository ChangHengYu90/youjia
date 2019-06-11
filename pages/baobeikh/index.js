// pages/mine/mine.js
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();

var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,

    startDate: "请选择日期",

    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
    ishave: 0,
    khname: '',
    khphone: '',
    khphone2: '',
    loupanname: '',
    loupanid: '',
    isChecked1: false,
    kehums:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      loupanid: options.id,
      loupanname: options.name
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
    console.log(that.data.khphone.indexOf('*'))
    if (that.data.khphone.indexOf('*') != -1) {
      that.setData({
        isChecked1: true
      })
    } else {
      that.setData({
        isChecked1: false
      })
    }

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

  pickerTap: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },




  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        if (i < 10) {
          let n = '0' + i
          hours.push(n);
        } else {
          hours.push(i);
        }
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        if (i < 10) {
          let n = '0' + i
          minute.push(n);
        } else {
          minute.push(i);
        }
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        if (i < 10) {
          let n = '0' + i
          hours.push(n);
        } else {
          hours.push(i);
        }
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        if (i < 10) {
          let n = '0' + i
          minute.push(n);
        } else {
          minute.push(i);
        }
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      if (i < 10) {
        let n = '0' + i
        hours.push(n);
      } else {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      if (i < 10) {
        let n = '0' + i
        minute.push(n);
      } else {
        minute.push(i);
      }
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        if (i < 10) {
          let n = '0' + i
          hours.push(n);
        } else {
          hours.push(i);
        }
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        if (i < 10) {
          let n = '0' + i
          hours.push(n);
        } else {
          hours.push(i);
        }
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      if (i < 10) {
        let n = '0' + i
        minute.push(n);
      } else {
        minute.push(i);
      }
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];
    let monthDay2 = that.data.multiArray[0][e.detail.value[0]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
      if (month < 10) {

        if (day < 10) {
          monthDay2 = '0' + month + '-' + '0' + day
        } else {
          monthDay2 = '0' + month + '-' + day
        }
      } else {
        if (day < 10) {
          monthDay2 = month + '-' + '0' + day
        } else {
          monthDay2 = month + '-' + day
        }
      }


    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

      if ((date1.getMonth() + 1) < 10) {

        if ((date1.getDate() + 1) < 10) {
          monthDay2 = '0' + (date1.getMonth() + 1) + '-' + '0' + date1.getDate()
        } else {
          monthDay2 = '0' + (date1.getMonth() + 1) + '-' + date1.getDate()
        }
      } else {
        if (date1.getDate() < 10) {
          monthDay2 = (date1.getMonth() + 1) + '-' + '0' + date1.getDate()
        } else {
          monthDay2 = (date1.getMonth() + 1) + '-' + date1.getDate()
        }
      }

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
      if (month < 10) {

        if (day < 10) {
          monthDay2 = '0' + month + '-' + '0' + day
        } else {
          monthDay2 = '0' + month + '-' + day
        }
      } else {
        if (day < 10) {
          monthDay2 = month + '-' + '0' + day
        } else {
          monthDay2 = month + '-' + day
        }
      }
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    var startDate2 = monthDay2 + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate,
      startDate2: startDate2
    })
  },
  khphone(e) {
    var that = this
    var phone = that.data.khphone
    var phone2 = that.data.khphone2
    if (phone.length == 11) {
      if (e.detail.value.length == 10) {
        if (phone.indexOf('*') != -1) {
          that.setData({
            khphone: phone2,
            khphone2: phone2,
            isChecked1: false
          })
        } else {
          that.setData({
            khphone: e.detail.value,
            khphone2: e.detail.value,
          })
        }
      }

    } else {
      that.setData({
        khphone: e.detail.value,
        khphone2: e.detail.value,

      })
    }

    // if (e.detail.value.length == 11) {
    //   var that = this
    //   let id = wx.getStorageSync('user').id
    //   let foptions = [
    //     'brokerId' + id,
    //     'page1',
    //     'key' + e.detail.value
    //   ]
    //   let data = {
    //     brokerId: id,
    //     page: 1,
    //     key: e.detail.value
    //   }
    //   util.requestLoading(that.data.apis + '/api/user/phonebooklist.aspx', foptions, data, '', function (res) {
    //     console.log(res)
    //     if (res.code == '200') {
    //       if (res.data.length == 0) {
    //       } else {
    //         that.setData({
    //           ishave: 1,
    //           txl: res.data
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: res.message,
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //   }, function (res) {
    //     console.log(res)
    //   })
    // }
  },
  hqlpname(e) {
    var that = this
    that.setData({
      loupanname: e.detail.value
    })
  },
  hqname(e) {
    var that = this
    that.setData({
      khname: e.detail.value
    })
  },
  // gobaobei() {
  //   var that = this
  //   let loupan = that.data.name
  //   let loupanid = that.data.id
  //   let time = that.data.startDate
  //   let khname = that.data.khname
  //   let phone = that.data.phone
  //   if (khname == '' || khname == undefined || khname == null) {
  //     wx.showToast({
  //       title: '请填写姓名',
  //       icon: 'none',
  //       duration: 1000,
  //       mask: true
  //     })
  //     return
  //   }
  //   if (phone == '' || phone == undefined || phone == null) {
  //     wx.showToast({
  //       title: '请填写手机号',
  //       icon: 'none',
  //       duration: 1000,
  //       mask: true
  //     })
  //     return
  //   }
  // },
  goloupan() {
    wx.navigateTo({
      url: '../yijianbaobeixz/index',
    })
  },
  gotxlxz() {
    wx.navigateTo({
      url: '../txlxz/index',
    })
  },
  changeSwitch1(e) {
    var that = this
    let phone = that.data.khphone
    let phone2 = that.data.khphone2
    let isChecked1 = that.data.isChecked1
    console.log(isChecked1)
    console.log(phone)
    console.log(phone2)
    if (phone.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      that.setData({
        isChecked1: false
      })
    } else if (phone.length == 11 && phone.indexOf('*') == -1) {
      if (!(/^1[345789]\d{9}$/.test(phone))) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.setData({
          isChecked1: false,
        })

      } else {

        that.setData({
          isChecked1: e.detail.value,
          khphone: phone2.substring(0, 3) + '****' + phone2.substring(7, 11)
        })
      }
    } else if (phone.length == 11 && phone.indexOf('*') != -1) {
      if (phone2 == '' || phone2 == undefined || phone2 == null) {
        that.setData({
          isChecked1: true,
        })
      } else {
        that.setData({
          isChecked1: e.detail.value,
          khphone: phone2,
        })
      }
    }


    console.log(e.detail.value)

  },
  hqkhms(e){
   var that = this
    that.setData({
      kehums: e.detail.value.replace(/(^\s*)/g, "")
    })
  },
  submit() {
    var that = this
    let id = wx.getStorageSync('user').id
    let loupanname = that.data.loupanname
    let loupanid = that.data.loupanid
    let startDate = that.data.startDate
    let startDate2 = that.data.startDate2
    let khname = that.data.khname
    let phone = that.data.khphone
    let phone2 = that.data.khphone2
    let isChecked1 = that.data.isChecked1
    let isHide = 0
    let kehums = that.data.kehums
    if (isChecked1 == true) {
      isHide = 1
    }
    if (loupanname == '' || loupanname == undefined || loupanname == null) {
      wx.showToast({
        title: '请选择楼盘',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (startDate == '请选择日期') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (khname == '' || khname == undefined || khname == null) {
      wx.showToast({
        title: '请输入客户姓名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }

    if (phone == '' && phone2 == '' || phone == undefined && phone2 == '' || phone == null && phone2 == '') {
      wx.showToast({
        title: '请输入客户手机',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (!(/^1[345789]\d{9}$/.test(phone2)) && phone2 != '') {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let phone3 = phone
    if (phone2 != '') {
      phone3 = phone2
    }
    var myDate = new Date()
    let nian = myDate.getFullYear()
    let visitTime = nian + '-' + startDate2
    let foptions = [
      'id' + loupanid,
      'brokerId' + id,
      'visitTime' + visitTime,
      'name' + khname,
      'mobile' + phone3,
      'isHide' + isHide
    ]
    let data = {
      id: loupanid,
      brokerId: id,
      visitTime: visitTime,
      name: khname,
      mobile: phone3,
      isHide: isHide
    }
    if (kehums!=''){
      foptions.push('description' + kehums)
      data.description = kehums
    }
    util.requestLoading(that.data.apis + '/api/hourse/reporthourse.aspx', foptions, data, '加载中...', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
        setTimeout(function () {
          wx.redirectTo({
            url: '../bbsuccess/index?type=1',
          })

        }, 1000)

      } else {

      }
    }, function (res) {
      console.log(res)
    })
  } 
})