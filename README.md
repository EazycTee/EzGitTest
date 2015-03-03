#基本说明  
##文档说明  
请使用Web板式视图浏览本文档。  
##术语定义  
模块：根据一套需求业务逻辑定制的由各种逻辑文件和一到多个模板形成的结合，实际表现是一个文件夹。  
模板：一个页面及其逻辑，实际表现是一个js文件和两个html文件（手机端、平板端）。  
路由：一个可以根据浏览器地址实现跳转的功能。  
DEMO 目录结构  
```html
[com.infinitus.demo] // demo 模块文件夹  
	+[images] // 图片文件夹，用于存放只属于该模块的图片  
	CubeModule.json // 手机端版本阐释文件  
	CubeModule_pad.json // 平板端版本阐释文件  
	app.js // 用于指定路由文件和配置路由规则  
	router.js // 用于配置具体路由跳转路径  
	index.html // 默认首页  
	template.js // 模板逻辑文件（处理该模板的前端业务逻辑）  
	template.html // 手机端模板  
	template_pad.html // 平板端模板  
	pag.css // 模块手机端公共样式文件  
	pag_pad.css // 模块平板端公共样式文件  
+[vendor] // 资源文件夹，不需要动  
cordova.js // js插件，不需要动  
infinitus.js // 封装了一些原生的公共方法，不需要动（包括弹框提示、显示对话框等等）
```

```javascript
define(["zepto", // zepto.js 简写路径，定义详见 vendor/cube/js/launcher.js  
"cube/router", // router.js 路径  
"com.infinitus.demo/template"], // template.js 路径  
    function($, CubeRouter, Template) { // 这些参数依次对应上一行加载的文件  
        var context;  
        var Router = CubeRouter.extend({  
            module: "com.infinitus.demo",  
            navigationStack: [],  
            // 这里设置路由  
            routes: {  
                "": "showTemplate", // 表示地址 hash 为空时，执行 showTemplate 方法  
                "template": "showTemplate" // 表示地址 hash 为”template”时，执行 showTemplate 方法  
            },  
            showTemplate: function() { // showTemplate 方法  
                this.changePage(new Template()); // 表示创建一个 Template 视图，覆盖当前视图  
            }  
        });  
        return Router;  
    });  
```