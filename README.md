[https://github.com/dounine/clouddisk](CloudDisk) 页面测试
===
快速向导
===
* 安装依赖的环境
  * 安装 `npm`
  * 下载所需要的环境
    * 在项目根目录执行bash命令: `npm install`
    * 继续执行bash命令: `bower install`
    * 执行 `grunt` 命令: `grunt begin`
  * 打包发布: `mvn clean package`
* 项目访问地址: `http://localhost:端口/上下文/`

CloudDisk 使用说明
===
* 功能使用
  * 所有功能解析器都需要传递 `LoginUserToken` 这个对象
    * `LoginUserToken` 使用说明
      * 属性
        * `account` : 360云盘帐号
        * `password` : 帐号密码
        * `md5` : 是否是md5加密(使用 `com.dounine.clouddisk360.util.MD5Util.MD5` 方法进行加载)
      * 修改`public/js/app.js`中的`$cookies.clouddisk_account = "102535481@qq.com";`为你登录的对应帐号
      * 构造参数:
        * `LoginUserToken(String account, String password)`
          * `account` : 云盘帐号
          * `password` : md5加密后的密码
        * `LoginUserToken(String account, String password,boolean md5Enc)`
          * `account` : 云盘帐号
          * `password` : 根据`md5Enc`行参的值决定是否传入加密的密码
          * `md5Enc` : 是否md5加密
  * 多个解析器一起使用只需要给第一个解析器构造函数传递
