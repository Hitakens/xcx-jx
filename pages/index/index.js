var app = getApp();

Page({
  data: {
    url: "",
    getUserInfoFail: !0,
    showModal: !1,
  },
  btn: function() {
    this.setData({
      showModal: !0
    });
  },
  ok: function() {
    this.setData({
      showModal: !1
    });
  },
  onLoad: function() {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    if (true) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res1) {
                var objz = {};
                objz.avatarUrl = res1.userInfo.avatarUrl;
                objz.nickName = res1.userInfo.nickName;
                objz.code = res.code;
                wx.setStorageSync('userInfo', objz); //存储userInfo
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  onShow: function() {
    var n = this;
    app.globalData.webShowed ? wx.navigateBack({
      delta: 1
    }) : wx.getSetting({
      success: function(t) {
        t.authSetting["scope.userInfo"] || n.setData({
          showModal: !0
        });
      }
    });
  },
  login: function() {
    wx.showLoading({
      title: "正在努力登录...",
      mask: !0
    }),
    wx.request({
                url: app.globalData.pathUrl +'/getOpenid',
                  method: "GET",
                  data: {
                    js_code: wx.getStorageSync('userInfo').code,
                    avatarUrl:wx.getStorageSync('userInfo').avatarUrl,
                    nickName: wx.getStorageSync('userInfo').nickName
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    console.log(res)
                    wx.hideLoading();
                    var ul = app.globalData.pathUrl+'/getcz.html?js_code=' + wx.getStorageSync('userInfo').code + '&avatarUrl=' + wx.getStorageSync('userInfo').avatarUrl + '&nickName='+wx.getStorageSync('userInfo').nickName;
                    console.log(ul)
                    if (res.data=="0"){
                      wx.navigateTo({
                        url: "../web/web?url=" + encodeURIComponent(ul)
                      });
                    }else{
                      wx.navigateTo({
                        url: "../web/web?url=" + encodeURIComponent(app.globalData.pathUrl+"/main/index?openid=" + res.data)
                      });
                    }
                     
                  },
                  fail: function() {
                    wx.hideLoading(), wx.showToast({
                      title: "登录失败,请稍后重试!",
                      icon: "none"
                    });
                  }
                });
          
 },
  agentlogin: function() {
    wx.showLoading({
      title: "正在努力登录...",
      mask: !0
    }), wx.getSetting({
      success: function(t) {
        wx.hideLoading(), t.authSetting["scope.userInfo"] ? wx.navigateTo({
          url: "../web/web?url=" + encodeURIComponent("https://f2.fastvip.cn/agentlogin.html")
        }) : wx.showToast({
          title: "您没有授权!无法登录.",
          icon: "none"
        });
      },
      fail: function() {
        wx.hideLoading(), wx.showToast({
          title: "登录失败,请稍后重试!",
          icon: "none"
        });
      }
    });
  }
});