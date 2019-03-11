//js库：某些函数使用率很高，封装放在这里，反复可以调用   vuejs  jquery  react

/*
 	ranNum():生成四位数的随机数
 	返回值：返回一个随机四位数(包含数字和大小字母组合)
*/

function ranNum() {
	var str = '0123456789zxcvbnmasdfghjklpoiuytrewqZXCVBNMLKJHGFDSAQWERTYUIOP';
	var num1 = parseInt(Math.random() * str.length);
	var num2 = parseInt(Math.random() * str.length);
	var num3 = parseInt(Math.random() * str.length);
	var num4 = parseInt(Math.random() * str.length);
	var res = str[num1] + str[num2] + str[num3] + str[num4];
	//要返回值
	return res;
}

/*
 	返回某个范围内的随机数
 	randomNum(min,max)  randomNum(5,10) :返回5-10之间的随机数，包括边界
 	参数：
 		min ： 最小值
 		max ： 最大值
 
 */

function randomNum(min, max) {
	//Math.random()    0.1 - 0.999
	//Math.random()*101   0.1- 100.999
	//parsInt(Math.random()*101)  0-100
	return parseInt(Math.random() * (max - min + 1)) + min;
}

/*
 	通过id获取元素
 	参数：id
 	返回值：节点
*/

function getid(id) {
	return document.getElementById(id);
}

/*
 	补零 toDb(num)
 	小于 10 补零
 */

function toDb(num) {
	if(num < 10) {
		return "0" + num;
	} else {
		return "" + num;
	}
}

/**
 norepeat() 去重
 */

function norepeat(arr) {
	var newarr = [];
	arr.forEach(function(item) {
		//在数组里面是否存在某个数，存在：true,不存在：false
		if(!newarr.includes(item)) {
			//不存在
			newarr.push(item); //1 2 3 4 5 6
		}
	});
	return newarr; //去重的数组
}

/*
 	将秒转成：xx天xx时xx分xx秒
 	timeset()
 	参数：秒数
 	返回值：返回相关数据，做成json
*/
function timeset(num) {
	//num：秒数
	var sec = toDb(num % 60); //秒
	var min = toDb(Math.floor(num / 60) % 60); //分
	var hour = toDb(Math.floor(num / 60 / 60) % 24); //时
	var day = Math.floor(num / 60 / 60 / 24); //天

	return {
		'secs': sec,
		'mins': min,
		'hours': hour,
		'days': day
	}
}

/*
 	毫秒转：年月日时分秒
 */
function setTimes(timer) {
	var time = new Date(timer);
	var year = time.getFullYear();//年
	var mon = toDb(time.getMonth() + 1);//0 
	var day = toDb(time.getDate());//24
	var hour = toDb(time.getHours());//时
	var min = toDb(time.getMinutes());//分
	var sec = toDb(time.getSeconds());//秒

	return {
		secs: sec,
		mins: min,
		hours: hour,
		days: day,
		mons: mon,
		years: year
	}

}

/*
 	strToObj(str):把字符串变成对象
 	输入参数：key0=0&key1=1&key2=2
 	输出数据：
 	var json = {
				key0 : 0,
				key1 : 1,
				key2 : 2
			}
 */

function strToObj(str) {
	var json = {};
	//第一次把&去掉
	var arr1 = str.split('&'); //['key0=0','key1=1','key2=2'];
	//第二次把=去掉
	for(var i = 0; i < arr1.length; i++) {
		var arr2 = arr1[i].split('='); //['key2','2']
		json[arr2[0]] = arr2[1]; //切割一组存一组
	}

	return json;
}

/*
 objToStr(obj):把对象变成字符串
 	输出参数：key0=0&key1=1&key2=2
 	输入数据：
 	var json = {
				key0 : 0,
				key1 : 1,
				key2 : 2
			}
*/

function objToStr(obj) {
	var html = '';
	for(var key in obj) {
		html += key + '=' + obj[key] + '&';
	}
	return html.slice(0, -1); //减去最后一个&号
}

/*
 	查找首节点：
 	参数： 父节点
 	返回值： 第一个子节点
 
 */

function firstChild(parent) {
	if(parent.firstElementChild) {
		//高级浏览器 IE9 +(不包括ie9)
		return parent.firstElementChild;
	} else {
		//低版本浏览器：IE 9 -
		return parent.firstChild;
	}
}
/*
 	查找首节点：
 	参数： 父节点
 	返回值： 第一个子节点
 
 */

function lastChild(parent) {
	if(parent.lastElementChild) {
		//高级浏览器
		return parent.lastElementChild;
	} else {
		return parent.lastChild;
	}
}

/*
 	getStyle() 获取样式
 	参数一：对象名
 	参数二：要获取样式的属性名
 	返回值：样式的值
*/
function getStyle(obj, attr) {
	if(getComputedStyle(obj, false)) {
		//高级浏览器
		return getComputedStyle(obj, false)[attr];
	} else {
		//低版本 IE6-9
		return obj.currentStyle[attr];
	}
}

/*
css():获取或设置样式
 获取：传两个参数  参数一：对象名    参数二：属性名
 设置：传三个参数    参数一：对象名    参数二：属性名  参数三：属性值
 
 */

function css() {
	var obj = arguments[0];
	var attr = arguments[1];
	var value = arguments[2];
	//arguments:系统提供的数组，能够帮你存实参
	if(arguments.length == 2) {
		//获取样式
		if(getComputedStyle(obj, false)[attr]) {
			//高级浏览器
			return getComputedStyle(obj, false)[attr];
		} else {
			//低版本浏览器
			return obj.currentStyle[attr];
		}
	} else if(arguments.length == 3) {
		//设置样式：设置行内样式  box.style.backgroundColor = 'red';
		obj.style[attr] = value;
	} else {
		alert('参数个数不正确');
	}
}

/*
 	事件监听：bind(ele, type, fn)
 	参数一：对象名
 	参数二：事件类型
 	参数三：执行函数
 */

function bind(ele, type, fn) {
	if(ele.addEventListener) {
		//高级浏览器 IE9+  'click'
		ele.addEventListener(type, fn, false);
	} else {
		//IE8-
		ele.attachEvent('on' + type, fn);
	}
}

/*
 
 滚轮方向判断：rollerDir(ele,callback)
 	参数：
 		ele 对象名
 		callback 回调函数
 	返回值： 返回true（向上滚了） 或者false(向下滚了)

 */
function rollerDir(ele, callback) {
	var istrue = true;
	//IE 谷歌
	ele.onmousewheel = fn;

	//火狐
	if(ele.addEventListener) {
		ele.addEventListener('DOMMouseScroll', fn, false);
	}

	function fn(ev) {
		//判断滚轮方向
		var ev = ev || event;
		//true:向上滚了，false：向下滚了

		if(ev.wheelDelta) {
			//ie 谷歌  规定：大于0 上滚，小于0下滚
			istrue = ev.wheelDelta > 0 ? true : false;
		} else {
			//火狐
			istrue = ev.detail < 0 ? true : false;
		}

		callback(istrue); //实参
	}

}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) { //key:键名   json[key] :键值
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') { //初始值
				cur = getStyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getStyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6; //出现小数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}

		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) {
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器

}

/*
  过滤敏感词：filterTex(str)
  参数：
   * str 传字符串进来
   * 返回值： 过滤好的字符串

 */
function filterTex(str) {
	//只要是直接可以发布留言不需要审核的内容，都应该过滤敏感词
	var sensitive = ['傻B', '妈蛋', 'bitch', 'fuck', '操', '小学生', '反清复明', '金正恩'];

	for(var i = 0; i < sensitive.length; i++) {
		var reg = new RegExp(sensitive[i], 'gi');
		str = str.replace(reg, '***');
	}

	return str; //处理好的数据
}

/*
 	表单验证的方法： 调用里面的子功能  (json对象里面有很多子功能)
 	var checkReg = {
 		tel : function() {}
 	}
 	
 	调用方法：
 	checkReg.tel();
 	
*/

var checkReg = {
	trim: function(str) { //去掉前后空格
		var reg = /^\s+|\s+$/g;
		return str.replace(reg, '');
	},
	tel: function(str) { //号码
		var reg = /^1[3-9]\d{9}$/
		return reg.test(str);
	},
	email: function(str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
		var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
		return reg.test(str);
	},
	idcard: function(str) { //身份证
		var reg = /^(\d{17}|\d{14})[\dX]$/;
		return reg.test(str);
	},
	psweasy: function(str) { //6-18位首字母开头
		var reg = /^[a-zA-Z]\w{5,17}$/;
		return reg.test(str);
	},
	pwwagain: function(str1, str2) { //确认密码
		return str1 === str2; //全等 恒等
	},
	urladr: function(str) { //路径：网址规则
		var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
		return reg.test(str);
	},
	name: function(str) { //账号字母开头,6-20位
		var reg = /^[a-zA-Z][\w\-]{5,19}$/;
		return reg.test(str);
	},
	chinese: function(str) { //中文
		var reg = /^[\u2E80-\u9FFF]+$/;
		return reg.test(str);
	},
	birthday: function(str) { //生日
		var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
		return reg.test(str);
	}
}

/*
 	cookie的相关操作：var cookie = {}
	子功能：
		存 ：set
		取：get
		删：remove
		
 */

var cookie = {
	set: function(name, value, prop) {
		//name和value是必写参数。prop是json格式的数据
		var str = name + '=' + value; //必写的

		//prop
		//expires:设置失效时间
		if(prop.expires) {
			str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
		}
		//prop.path :设置路径
		if(prop.path) {
			str += ';path=' + prop.path;
		}
		//设置访问权限domain
		if(prop.domain) {
			str += ';domain=' + prop.domain;
		}

		//设置：存
		document.cookie = str;

	},
	get: function(key) {
		//获取
		var str = document.cookie; //name=jingjing; psw=123456
		var arr = str.split('; '); //[name=jingjing , psw=123456]
		for(var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
			if(key == arr2[0]) {
				return arr2[1]; //通过键名取键值
			}
		}
	},
	remove: function(key) {
		//cookie:设置时间失效，设置时间为过去的某个时间
		var now = new Date();
		now.setDate(now.getDate() - 1); //设置成昨天
		cookie.set(key, '', {
			expires: now
		});
	}
}

/*
	封装：
		
*/

//封装函数设置cookie
function setCookie(key, val, iDay) {
	//key键、val值、iDay失效时间
	var time = new Date();
	time.setDate(time.getDate() + iDay);
	document.cookie = key + '=' + val + ';expires=' + time;
}

//封装一个函数：取cookie 要参数，传键名，给我对应键值
function getCookie(key) {
	var str = document.cookie; //name=lemon; age=18; price=88; like=男
	var arr = str.split('; '); //['name=lemon','age=18','price=88','like=男']
	for(var value of arr) {
		var arr2 = value.split('='); //['name','lemon'] ['age',18]
		if(key == arr2[0]) {
			return arr2[1];
		}
	}
}

//删掉cookie：把时间变成过去式
function removeCookie(key) {
	setCookie(key, '', -1);
}

/*
 	ajax()
 	参数一：请求方式  get  post
 	参数二：url接口路径不同
 	参数三：传输给后台的数据不同data
	参数四：回调函数
*/

function ajax(type,url,data,fn) {
	
	//1.创建对象
	var xhr = new XMLHttpRequest();
	
	//2.参数设置  open('')
	if(type.toLowerCase() == 'get') {
		if(data) {
			//如果是get方式并且有数据
			url = url +'?'+ data;
		}
		xhr.open(type,url,true);
		xhr.send(null);
	}else{
		//post方式
		xhr.open(type,url,true);
		//请求头设置
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	//接收数据
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				//成功接收数据
//				var str = xhr.responseText;
				if(fn) {
					//把数据传到外部使用
					fn(xhr.responseText);
				}
			}else{
				//如果出错给个提示
				alert('出错了，状态码是：' + xhr.status);
			}
		}
	}
	
	
}
