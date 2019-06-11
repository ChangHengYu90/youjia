var wxCharts = require('../../utils/wxcharts.js');
var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();
var ringChart = null;
Page({
  data: {
    apis: app.data.href,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meid: 'all',
    mdindex: 0,
    mdisshow: 1,
    usertype: 3,
    page: 1,
    city: '',
    jjrshuju: {
      user: {
        mobile: ''
      }
    },
    array: ['失效', '有效'],
    index: 1,
    name: ''
  },
  onLoad: function() {
    var that = this
    var time = util.formatTime(new Date());
    console.log(time)

    let riqi = time.replace(/\//g, '-');
    let riqi2 = riqi.split('-')
    console.log(riqi)
    if (riqi2[1] < 10) {
      that.setData({
        endtime: riqi,
        choosetime: riqi2[0] + '年' + riqi2[1] + '月',
        choosetime2: riqi2[0] + '-' + riqi2[1],
      })
    } else {
      that.setData({
        endtime: riqi,
        choosetime: riqi2[0] + '年' + riqi2[1] + '月',
        choosetime2: riqi2[0] + '-' + riqi2[1],
      })
    }



  },
  onShow: function() {
    var that = this
    let user = wx.getStorageSync('user')
    let usertype = 3
    console.log(user.role)
    if (user.role == '6') {
      usertype = 4

      that.getzysj()


    } else if (user.role == '4') {
      usertype = 1

      that.getjgsj()
      that.getjgmd()
      template.tabbar("tabBar", 0, that) //0表示第一个tabbar

    } else if (user.role == '5') {
      usertype = 2
      template.tabbar2("tabBar", 0, this) //0表示第一个tabbar
      that.getxmjjrsj()
      that.getxmjjrlp()

    } else {
      template.tabbar3("tabBar", 0, this) //0表示第一个tabbar
      var demo = new QQMapWX({
        key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
      });
      let chengshi = wx.getStorageSync('city')
      if (chengshi) {
        that.setData({
          city: chengshi
        })
        that.getjjrsj()
      } else {
        wx.getLocation({
          type: 'gcj02',
          success: function(res) {
            // 经纬度
            var latitude = res.latitude
            var longitude = res.longitude
            // 调用接口
            demo.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function(res) {
                console.log(res.result.address_component.city);

                that.setData({
                  city: res.result.address_component.city
                })

                that.getcity()
              },
              fail: function(res) {
                console.log(res);

              },
              complete: function(res) {
                console.log(res);
              }
            });
          },
          fail: function(e) {
            console.log('失败了')
            let city = wx.getStorageSync('city')
            console.log(city)
            if (!city) {
              wx.reLaunch({
                url: '../choosecity/index?type=1',
              })
            } else {
              that.getjjrsj()
            }

          }
        })
      }
      that.getgrxx()


    }


    that.setData({

      usertype: usertype
    })



  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    let yeshu = parseInt(that.data.page) + 1
    that.setData({
      page: yeshu
    })
    if (that.data.usertype==4){
      that.getzysj()
    }
    if (that.data.usertype == 2){
      that.getxmjjrlp()
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  touchHandler: function(e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  updateData: function() {
    ringChart.updateData({
      title: {
        name: '80%'
      },
      subtitle: {
        color: '#ff0000'
      }
    });
  },
  onReady: function(e) {

  },
  // 门店显示
  choosemd() {
    var that = this
    let mdisshow = that.data.mdisshow
    if (mdisshow == 1) {
      that.setData({
        mdisshow: 2
      })
    } else {
      that.setData({
        mdisshow: 1
      })
    }
  },
  // 全部房源
  goallfy() {
    wx.navigateTo({
      url: '../allfangyuan/index',
    })
  },
  // 选择日期  // 选择日期
  bindDateChange(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let riqi = e.detail.value
    let riqi2 = riqi.split('-')
    this.setData({
      choosetime: riqi2[0] + '年' + riqi2[1] + '月',
      choosetime2: riqi
    })
    that.getjgsj()
  },
  // 机构
  getjgsj() {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let choosetime2 = that.data.choosetime2
    let meid = that.data.meid
    let foptions = [
      'institutionId' + institutionId,
      'date' + choosetime2
    ]
    let data = {
      institutionId: institutionId,
      date: choosetime2
    }
    if (meid != 'all') {
      data.storeId = meid
      foptions.push('storeId' + meid)
    }
    console.log(foptions)
    util.requestLoading(that.data.apis + '/api/institution_homedata.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let jgshuju = res.data
        jgshuju.user.companyName = decodeURIComponent(jgshuju.user.companyName)
        that.setData({
          jgshuju: jgshuju
        })

        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
          animation: true,
          canvasId: 'ringCanvas',
          type: 'ring',
          extra: {
            ringWidth: 25,
            pie: {
              offsetAngle: -45
            }
          },
          title: {
            name: '',
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '',
            color: '',
            fontSize: 15
          },
          series: [{
            name: '成交量1',
            data: parseInt(jgshuju.stateReport.reportCount),
            stroke: false,

          }, {
            name: '成交量2',
            data: parseInt(jgshuju.stateReport.visitCount),
            stroke: false
          }, {
            name: '成交量3',
            data: parseInt(jgshuju.stateReport.subscribeCount),
            stroke: false
          }, {
            name: '成交量4',
            data: parseInt(jgshuju.stateReport.turnoverCount),
            stroke: false
          }, {
            name: '成交量5',
            data: parseInt(jgshuju.stateReport.commissionCount),
            stroke: false
          }, {
            name: '成交量6',
            data: parseInt(jgshuju.stateReport.loseEfficacyCount),
            stroke: false
          }],

          disablePieStroke: true,
          height: wx.getSystemInfoSync().windowWidth / 375 * 200,
          width: wx.getSystemInfoSync().windowWidth / 375 * 345,
          dataLabel: false,
          legend: false,
          background: '#f5f5f5',
          padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
          console.log('renderComplete');
        });
        setTimeout(() => {
          ringChart.stopAnimation();
        }, 500);
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function(res) {
      console.log(res)
    })
  },
  // 机构门店
  getjgmd() {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + institutionId,
    ]
    let data = {
      institutionId: institutionId,
    }
    util.requestLoading(that.data.apis + '/api/basic/institutionstorelist.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        shuju.unshift({
          id: 'all',
          name: '全部门店'
        })
        that.setData({
          mdlist: res.data
        })


      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function(res) {
      console.log(res)
    })
  },
  fuzhi(e) {
    var that = this
    wx.setClipboardData({
      data: e.currentTarget.id,
      success: function(res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }
    })
  },
  choosemdcon(e) {
    var that = this
    console.log(e)
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    console.log(id)
    console.log(index)
    that.setData({
      meid: id,
      mdindex: index,
      mdisshow: 1,
    })
    that.getjgsj()
  },
  // 经纪人
  getjjrsj() {
    var that = this
    let cityid = wx.getStorageSync('cityid')
    let user = wx.getStorageSync('user')
    let foptions = [
      'cityId' + cityid,

    ]
    let data = {
      cityId: cityid,

    }
    if (user) {
      data.brokerId = user.id
      foptions.push('brokerId' + user.id)
    }
    util.requestLoading(that.data.apis + '/api/broker_homedata.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.hourse.length; i++) {
          shuju.hourse[i].name = decodeURIComponent(shuju.hourse[i].name)
        }
        that.setData({
          jjrshuju: shuju
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function(res) {
      console.log(res)
    })
  },
  getcity() {
    var that = this

    let foptions = [

    ]
    let data = {

    }

    util.requestLoading(that.data.apis + '/api/basic/citylist.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let dwcity = that.data.city
        let shuju = res.data.info
        let isyou = 1

        for (let i = 0; i < shuju.length; i++) {

          for (let j = 0; j < shuju[i].cityList.length; j++) {
            let city = decodeURIComponent(shuju[i].cityList[j].name)
            if (dwcity.indexOf(city) != -1) {
              console.log(22)
              wx.setStorageSync('city', city)
              wx.setStorageSync('cityid', shuju[i].cityList[j].id)
              that.getjjrsj()
              isyou++
              return
            }

            if (i == shuju.length - 1 && j == shuju[i].cityList.length) {
              console.log(222222222)
              if (isyou == 1) {
                let hccity = wx.getStorageSync('city')
                if (!hccity) {
                  wx.reLaunch({
                    url: '../choosecity/index',
                  })
                }

              }
            }
          }
        }
      } else {

      }

    }, function(res) {
      console.log(res)
    })
  },
  gologin() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  golooklp(e) {
    var that = this
    let id = e.currentTarget.id
    let user = wx.getStorageSync('user')
    if (user) {
      wx.navigateTo({
        url: '../loupanxq/index?id=' + id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您未登录，请登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  golookxmxq(e) {
    var that = this
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../xmloupanxq/index?id=' + id,
    })
  },
  // 项目经理
  getxmjjrsj() {
    var that = this
    let cityid = wx.getStorageSync('cityid')
    let user = wx.getStorageSync('user')
    let foptions = [

    ]
    let data = {

    }
    if (user) {
      data.leadId = user.id
      foptions.push('leadId' + user.id)
    }
    util.requestLoading(that.data.apis + '/api/lead_homereport.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data

        that.setData({
          xmjl: res.data
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function(res) {
      console.log(res)
    })
  },
  // 项目经理
  getxmjjrlp() {
    var that = this
    let cityid = wx.getStorageSync('cityid')
    let user = wx.getStorageSync('user')
    let page = that.data.page
    let foptions = [
      'page' + page
    ]
    let data = {
      page: page
    }
    if (user) {
      data.leadId = user.id
      foptions.push('leadId' + user.id)
    }
    util.requestLoading(that.data.apis + '/api/lead_homehourse.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        if(page==1){
          that.setData({
            lplist: shuju
          })
        }else{
          that.setData({
            lplist: that.data.lplist.concat(shuju)
          })
        }
        
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function(res) {
      console.log(res)
    })
  },
  goyjbb(e) {

    var that = this
    let id = e.currentTarget.id
    let user = wx.getStorageSync('user')
    if (user) {
      wx.navigateTo({
        url: '../yijianbaobeikh/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您未登录，请登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  gochoosecity() {
    wx.navigateTo({
      url: '../choosecity/index',
    })
  },
  gofd() {
    wx.navigateTo({
      url: '../fangdaijsq/index',
    })
  },
  getgrxx() {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + institutionId,
    ]
    let data = {
      brokerId: institutionId,
    }
    util.requestLoading(that.data.apis + '/api/user/broker_myinfo.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        shuju.institutionName = decodeURIComponent(shuju.institutionName)
        that.setData({
          grxx: shuju
        })


      } else {

      }

    }, function(res) {
      console.log(res)
    })
  },
  lookljba(e) {
    let id = e.currentTarget.id

    let user = wx.getStorageSync('user')
    if (user) {
      wx.navigateTo({
        url: '../ljbb/index?id=' + id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您未登录，请登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  lookjgljba(e) {
    var that = this
    wx.navigateTo({
      url: '../jgljbb/index?mdid=' + that.data.meid,
    })
  },
  golooklpbb(e) {
    let id = e.currentTarget.id
    let state = e.currentTarget.dataset.state
    wx.navigateTo({
      url: '../loupanlj/index?id=' + id + '&state=' + state,
    })
  },
  getzysj() {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let name = that.data.name
    let foptions = [
      'propertyconsultantId' + institutionId,
      'isValid' + that.data.index,
      'page' + that.data.page
    ]
    let data = {
      propertyconsultantId: institutionId,
      isValid: that.data.index,
      page: that.data.page
    }
    if (name != '') {
      foptions.push('name' + name)
      data.name = name
    }
    util.requestLoading(that.data.apis + '/api/propertyconsultant_homedata.aspx', foptions, data, '', function(res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)

        }
        if(that.data.page==1){
          that.setData({
            grxx: shuju
          })
        }else{
          that.setData({
            grxx: that.data.grxx.concat(shuju)
          })
        }
        


      } else {

      }

    }, function(res) {
      console.log(res)
    })
    let foptions2 = [
      'propertyconsultantId' + institutionId,
    ]
    let data2 = {
      propertyconsultantId: institutionId,
    }
    util.requestLoading(that.data.apis + '/api/user/propertyconsultant_myinfo.aspx', foptions2, data2, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        shuju.housingResourcesName = decodeURIComponent(shuju.housingResourcesName)
        shuju.name = decodeURIComponent(shuju.name)
        that.setData({
          zygrxx: shuju
        })
      } else {

      }

    }, function (res) {
      console.log(res)
    })
  },
  gosearch(e) {
    var that = this
    var name = e.detail.value
    that.setData({
      name: name
    })
    that.getzysj()
  },
  gogjjl(e){
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone
    wx.navigateTo({
      url: '../zykhgjjl/index?id=' + id + '&name=' + name + '&phone=' + phone,
    })
  },
  goaddzy(){
    var that = this
    wx.navigateTo({
      url: '../zyaddkh/index?name=' + that.data.zygrxx.housingResourcesName,
    })
  },
  gosetup(){
    wx.navigateTo({
      url: '../setup/index',
    })
  },
  choosepic(){
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
        let image = res.tempFilePaths[0]
        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        let institutionId = wx.getStorageSync('user').id
        let foptions = [
          'propertyconsultantId' + institutionId,
        ]

        let timeStamp = new Date().getTime();
        foptions.sort();
        let newstr = foptions.join("");
        let requestCheck = newstr + timeStamp + '3c4510874e6407bf53bbe';
        requestCheck = util.md5(requestCheck).toLocaleLowerCase();
        console.log(requestCheck)
        let headerData = {
          "timeStamp": timeStamp,
          "requestCheck": requestCheck,
          "Content-Type": "application/x-www-form-urlencoded"
        };
        wx.uploadFile({
          url: that.data.apis + '/api/user/propertyconsultant_perfectinfo.aspx',
          filePath: res.tempFilePaths[0],
          name: 'headImg',
          header: headerData,
          formData: {
            'propertyconsultantId': institutionId
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            if (sss.code == 200) {
              that.setData({

                headImg: image
              })
            }
            wx.showToast({
              title: sss.message,
              icon: 'none',
              duration: 1000,
              mask: true
            })


            //do something  
          }, fail: function (err) {
            console.log(err)
          }
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindPickerChange(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      page:1
    })
    that.getzysj()
  },
})