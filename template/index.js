//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "/image/6.png",
      "selectedIconPath": "/image/2.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/mendian/index",
      "iconPath": "/image/3.png",
      "selectedIconPath": "/image/7.png",
      "text": "门店"

    },
    {
      "current": 0,
      "pagePath": "/pages/staff/index",
      "iconPath": "/image/4.png",
      "selectedIconPath": "/image/8.png",
      "text": "员工"
    },
    {
      "current": 0,
      "pagePath": "/pages/my/index",
      "iconPath": "/image/5.png",
      "selectedIconPath": "/image/9.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}
function tabbarinit2() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "/image/57.png",
      "selectedIconPath": "/image/58.png",
      "text": "楼盘"
    },
    {
      "current": 0,
      "pagePath": "/pages/customer/index",
      "iconPath": "/image/59.png",
      "selectedIconPath": "/image/62.png",
      "text": "客户"

    },
    {
      "current": 0,
      "pagePath": "/pages/Personnelmanagement/index",
      "iconPath": "/image/69.png",
      "selectedIconPath": "/image/70.png",
      "text": "人员"

    },
    {
      "current": 0,
      "pagePath": "/pages/sort/index",
      "iconPath": "/image/60.png",
      "selectedIconPath": "/image/63.png",
      "text": "排名"
    },
    {
      "current": 0,
      "pagePath": "/pages/my/index",
      "iconPath": "/image/61.png",
      "selectedIconPath": "/image/9.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain2(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit2();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain,
  tabbar2: tabbarmain2
}

function tabbarinit3() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "/image/57.png",
      "selectedIconPath": "/image/58.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/kh/index",
      "iconPath": "/image/59.png",
      "selectedIconPath": "/image/62.png",
      "text": "客户"

    },
    {
      "current": 0,
      "pagePath": "/pages/loupandt/index",
      "iconPath": "/image/67.png",
      "selectedIconPath": "/image/68.png",
      "text": "动态"
    },
    {
      "current": 0,
      "pagePath": "/pages/grzx/index",
      "iconPath": "/image/61.png",
      "selectedIconPath": "/image/9.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain3(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit3();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain,
  tabbar2: tabbarmain2,
   tabbar3: tabbarmain3
}

