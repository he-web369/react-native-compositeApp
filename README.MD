# React Native 综合应用
## 概览

- 使用react-navigation实现头部导航、底部导航及栈导航
- 使用webSocket进行前后台通信，消息分发，展示消息列表，未读消息数量
- 使用node+express+mongoose构建服务，存储用户数据及消息数据
- 使用redux、redux-thunk、react-redux 管理组件间共享状态数据
- 使用react-native及react-native-elements构建UI界面
- 使用react-native-asyncstorage配合redux实现登录验证、未登录跳转登录界面，并逻辑实现输入信息合法性验证
- 使用react-native-flatlist构建电影列表，实现下拉刷新，头部根据关键字、评分搜索
- 使用react-native-video实现视频播放，并自定义播放组件进行控制
- 使用axios/fetch进行简单封装实现数据请求
- 使用react-native-camera实现二维码识别
- 使用react-native-baidu-map实现地图定位、周边搜索、距离测算
- 使用webView展示html网页，使用react-native-vector-icons实现字体图标展示
- 使用react-native-swiper实现轮播图
- 使用react-native-image-picker实现照片选择，react-native-view-shot实现页面截图
- 自定义评论组件实现评论、点赞、评论翻页、评论跳转到指定页码；日历签到组件；首页三级列表
**********
##  详情
- 登录

    <img src="https://github.com/he-web369/imageStorage/blob/master/login1.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/login2.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/login3.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/login4.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/login5.jpg" width="150" height="300">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进入个人界面现在asyncStorage获取用户信息，没有则跳转登录界面，登录及注册界面利用正则进行输入格式验证，利用react-native-image-picker进行照片选择设置头像，登录及注册经后台校验后跳转个人界面并存储用户信息到asyncStorage<p>

- 聊天

    <img src="https://github.com/he-web369/imageStorage/blob/master/chat3.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/chat2.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/chat1.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/chat4.jpg" width="150" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/chat5.jpg" width="150" height="300">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用webSocket进行前后台通信，在后台设计好数据结构并保存消息数据到数据库，用户好友列表按名称排序展示，搜索好友，添加好友，充分利用redux来管理用户和消息数据，利用render props更新界面</p>

- 首页

    <img src="https://github.com/he-web369/imageStorage/blob/master/home1.jpg" width="200" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/home2.jpg" width="200" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/home3.jpg" width="200" height="300">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首页头部使用topTabNavigator,底部使用tabNavigator,并配合stackNavigator实现页面导航，将所有导航集成在App.js中;汽车板块由于找不到数据资源，只好先做了个静态页面，按品牌名字、按系列及按车型分组；地图板块可显示当前定位，搜索周边三公里内目标，选择两个poi点并测算距离</p>


- 电影

    <img src="https://github.com/he-web369/imageStorage/blob/master/movie1.jpg" width="200" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/movie2.jpg" width="200" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/movie3.jpg" width="200" height="300">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用豆瓣电影API获取电影列表数据，利用flatList展示数据，头部使用react-native-swiper组件实现循环轮播，头部可根据电影名字、演员名字、导演名字及评分实现搜索电影并展示，点击每个item跳转播放界面</p>

-  视频播放

    <img src="https://github.com/he-web369/imageStorage/blob/master/play2.jpg" width="160" height="320">
    <img src="https://github.com/he-web369/imageStorage/blob/master/play3.jpg" width="160" height="320">
    <img src="https://github.com/he-web369/imageStorage/blob/master/play4.jpg" width="160" height="320">
    <img src="https://github.com/he-web369/imageStorage/blob/master/play1.jpg" width="160" height="320">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用react-native-video播放视频，自定义播放控件控制播放、快进、循环播放、音量、全屏，使用progressBar控制时间跳转，使用react-native-view-shot截屏，下部添加简介和评论列表</p>

- 社区和搜索

    <img src="https://github.com/he-web369/imageStorage/blob/master/community2.jpg" width="160" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/community3.jpg" width="160" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/community1.jpg" width="160" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/search.jpg" width="160" height="300">
    <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实现社区板块静态界面，点击评论弹出二级评论列表，根据评论数进行分页，点击按钮跳转指定页面；搜索界面使用webView组件嵌入html页面</P>

- 二维码扫描和日历签到

    <img src="https://github.com/he-web369/imageStorage/blob/master/qrCode.jpg" width="160" height="300">
    <img src="https://github.com/he-web369/imageStorage/blob/master/sign.jpg" width="160" height="300">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用camera模块实现调用摄像头并扫描二维码，使用Animted组件实现橙色扫描线上下移动，简单实现日历签到</p>
****
### 总结
 - 这次做这个应用花了10天时间，由于找网络接口资源浪费了很多时间，很多现在经常使用的功能没有实现，主要是为了展示react-native的基本使用、redux、导航、前后台数据交互及后台数据管理，而且由于是windows系统，所以ios版本基本没有顾及到，后续再慢慢更层次的研究。

