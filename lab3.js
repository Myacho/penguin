/*
	Function  :击倒企鹅
	Author    :周锋
	Build_Date:2015-11-27
	Version   :3.0
 */

//1. 公共变量声明块........................................................

var canvas=document.getElementById("canvas"),
	context=canvas.getContext("2d"),
	image = new Image(),
	leveltime=[1000,800,600,400];//控制企鹅出现速度的数组
	level=["级别1","级别2","级别3","级别4"];//设置游戏难度的数组
var score = document.getElementById('score'),
    time = document.getElementById('time'),
    scaleSlider = document.getElementById('scaleSlider'),
    scaleOutput = document.getElementById('scaleOutput'),
    video = document.getElementById('video'),
    help = document.getElementById('help'),
    controlButton1 = document.getElementById('controlButton1'),
    controlButton2 = document.getElementById('controlButton2'),//获取页面元素对象
    mousedown = {},
    penguin = {},
    penguinEnd= {},
    n=1,
    i=60,
    num=0;//定义各个元素

//2. 函数定义块...........................................................
/*画图*/
function drawImage(){
	context.clearRect(0,0,800,800);
	scale=parseInt(Math.random()*3+1);//设置企鹅大小的随机数（最大为3）
	w=scale*image.width;//企鹅的宽度
    h=scale*image.height;//企鹅的高度
    x=Math.random()*(canvas.width-w);//画图的x坐标
    y=Math.random()*(canvas.width-h);//画图的y坐标
	context.drawImage(image,x,y,w,h);//画出企鹅
	penguin.x=x;//企鹅图像的起始x坐标
	penguin.y=y;//企鹅图像的起始y坐标
	penguinEnd.x=(x+w);//企鹅图像的末尾x坐标
	penguinEnd.y=(y+h);//企鹅图像的末尾y坐标
}

/*将鼠标当前的坐标变成canvas坐标函数*/
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height) };
}

/*游戏开始时出现的文字定义函数*/
function beginText(){
	context.textAlign="center";
	context.textBaseline="middle";
	context.font ="100px cursive";//设置字体大小
	context.strokeText("GAME START",400,300);//绘出文字
}

/*游戏结束时出现的文字定义函数*/
function endText(){
	context.textAlign="center";
	context.textBaseline="middle";
	context.font ="100px cursive";//设置字体大小
	context.strokeText("GAME OVER",400,300);//绘出文字
}

/*控制游戏时间函数*/
function timego(){
	if(i>=1)
	   i--;
    time.innerHTML=i;//控制时间的减少
    if(i==0){
    	clearInterval(id);//当时间为零时，结束间隔调用
    	endText();//时间结束的时候出现结束字体
    	canvas.style.cursor="default";//将鼠标指针形状改变成鼠标形状
    }
}

/*初始化工作函数*/
function cleanCream(){
	time.innerHTML=60;//将时间在html中变回60
    i=61;//控制起始时间为61，因为进行函数时，时间会自动减一
    timego();
    context.clearRect(0,0,800,800);//清屏
    beginText(); 
    score.innerHTML=0;//重置分数
    num=0;//起始分数变为0   
}

/*控制视频播放函数*/
function startPlaying() {
   video.play();//视频播放
}

/*控制视频暂停函数*/
function stopPlaying() {
   video.pause();//视频停止
}

//3. 事件注册块...........................................................

/*游戏难度改变事件，当滑动条滑动后，游戏重新开始，各个数据重置，初始化工作，且企鹅出现速度改变*/
scaleSlider.onchange = function(e) {
	n = e.target.value;//获取滑动后难度大小值
    scaleOutput.innerHTML=level[n-1];//显示不同难度
    clearInterval(id);//结束间隔调用
    id = setInterval(drawImage, leveltime[n-1]); //重置间隔调用
    cleanCream();//初始化工作函数
}

/*鼠标按下事件*/
canvas.onmousedown = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);
   
   mousedown.x = loc.x;
   mousedown.y = loc.y;
   if(i>0){
   if (mousedown.x >=penguin.x&&mousedown.x <=penguinEnd.x&&mousedown.y>=penguin.y&&mousedown.y<=penguinEnd.y){
   	canvas.style.cursor="pointer";//如果鼠标的坐标点到企鹅图像坐标内时，鼠标变成手状图标
   	num++;//分数加1
   	score.innerHTML=num; //html上分数的改变
   }
   else
   	canvas.style.cursor="default";//如果鼠标点到图像外，鼠标变成指针图标
}
}

/*鼠标松开事件*/
canvas.onmouseup = function (e) {
	canvas.style.cursor="default";//如果鼠标松开时，鼠标变成指针图标
}

/*帮助链接按下事件*/
help.onclick = function(e){
	controlButton1.style.display = 'inline';//如果帮助链接按下后，播放按钮出现
	controlButton2.style.display = 'inline';//如果帮助链接按下后，开始游戏按钮出现
}

/*视频播放按钮按下和松开事件*/
controlButton1.onclick = function(e) {
	video.style.display = 'inline';//如果视频按钮被按下后，视频出现
	clearInterval(id);//结束图像间隔调用
	clearInterval(ed);//结束时间间隔调用
	context.clearRect(0,0,800,800);//清屏
   if (controlButton1.value == '播放') {
      startPlaying();//播放视频
      controlButton1.value = '暂停';//视频开始播放后，将播放按钮变成暂停按钮
   }
   else {
      stopPlaying();
      controlButton1.value = '播放';//视频停止后，将暂停按钮变成播放按钮
   }
}

/*再玩一次按钮按下事件*/
controlButton2.onclick = function(e){ 
	video.pause();//视频停止播放
	video.style.display = 'none';//视频消失
	controlButton1.style.display = 'none';//播放按钮消失
	controlButton2.style.display = 'none';//重新开始按钮消失
	clearInterval(ed);//结束时间间隔调用
	ed = setInterval(timego, 1000);//开始时间间隔调用  
    scaleOutput.innerHTML=level[n-1];//设置游戏难度
    clearInterval(id);//结束图像间隔调用
    id = setInterval(drawImage, leveltime[n-1]); //开始图像间隔调用
    cleanCream();//清屏
}


//4. 初始化块............................................................
image.src = 'penguin.png';
image.onload = function(e) {
	drawImage();
}

/*页面载入后，编写初始化调用语句*/
window.onload = function(e) {
id = setInterval(drawImage, 1000);
ed = setInterval(timego, 1000);  
beginText();
}

