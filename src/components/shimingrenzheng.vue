<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
			<div class="header-text">实名认证</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-one">
					<div class="one-text">姓名</div>
					<input type="text" placeholder="姓名" class="name" v-model="name" />
				</div>
				<div class="main-two">
					<div class="two-left">性别</div>
					<div class="two-right" @click="xuanze(1)">
						<img src="../../static/xuan.png" v-if="index == 1" />
						<img src="../../static/weixuan.png" v-if="index != 1" />
						<div class="two-text" :class="index == 1 ? ' two-news' : ''">男</div>
					</div>
					<div class="two-right" @click="xuanze(2)">
						<img src="../../static/xuan.png" v-if="index == 2" />
						<img src="../../static/weixuan.png" v-if="index != 2" />
						<div class="two-text" :class="index == 2 ? ' two-news' : ''">女</div>
					</div>
				</div>
				<div class="main-one">
					<div class="one-text">身份证号</div>
					<input type="text" placeholder="输入身份证号" class="name" v-model="shenfen" />
				</div>
        <div class="main-three">上传头像<small>(请上传真实头像)</small></div>
        <div class="main-four">
        	<img src="../../static/shenfen.png" @click="upload('timg')" v-if="timg==''"/>
        	<img :src="myurl + zimg" @click="upload('timg')" v-if="timg!=''"/>
        	<div class="four-text">头像</div>
        </div>
				<div class="main-three">上传身份证</div>
				<div class="main-four">
					<img src="../../static/shenfen.png" @click="upload('zimg')" v-if="zimg==''"/>
					<img :src="myurl + zimg" @click="upload('zimg')" v-if="zimg!=''"/>
					<div class="four-text">身份证正面</div>
				</div>
				<div class="main-four">
					<img src="../../static/shenfenfan.png" @click="upload('fimg')" v-if="fimg==''"/>
					<img :src="myurl + fimg" @click="upload('fimg')" v-if="fimg!=''"/>
					<div class="four-text">身份证反面</div>
				</div>
				<div class="main-four">
					<img src="../../static/shenfen.png" @click="upload('simg')" v-if="simg==''"/>
					<img :src="myurl + simg" @click="upload('simg')" v-if="simg!=''"/>
					<div class="four-text">手持身份证</div>
				</div>
			</div>
			<div class="bottom" @click="myajax()">提交认证</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shimingrenzheng',
	data() {
		return {
			tabdata: [],
			name: '',
			shenfen: '',
			index: 1,
			uploadtarget: '',
			zimg: '',
			fimg: '',
			simg: '',
      timg:''
		};
	},
	methods: {
		//实名认证调取相册
		upload: function(target) {
			var that = this;
			that.uploadtarget = target;
			var btnArray = [
				{
					title: '照相机'
				},
				{
					title: '相册'
				}
			]; //选择按钮  1 2 3
			plus.nativeUI.actionSheet(
				{
					title: '请选择',
					cancel: '取消',
					buttons: btnArray
				},
				function(e) {
					var index = e.index;
					switch (index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				}
			);
		},
		camera: function() {
			var that = this;
			var cmr = plus.camera.getCamera();
			cmr.captureImage(
				function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(
						p,
						function(entry) {
							var img_name = entry.name;
							var img_path = entry.toLocalURL();
							that.upload_img(img_path);
						},
						function(e) {
							alert('读取拍照文件错误：' + e.message);
						}
					);
				},
				function(e) {
					alert('失败：' + e.message);
				},
				{
					filename: '_doc/camera/',
					index: 1
				}
			);
		},
		album: function() {
			var that = this;
			plus.gallery.pick(
				function(path) {
					that.upload_img(path);
				},
				function(e) {
					alert('取消选择图片');
				},
				{
					filter: 'image'
				}
			);
		},
		upload_img: function(p) {
			var thats = this;
			var img = new Image();
			img.src = p; // 传过来的图片路径在这里用。
			img.onload = function() {
				var that = this;
				//生成比例
				var w = that.width,
					h = that.height,
					scale = w / h;
				w = 280 || w; //480  你想压缩到多大，改这里
				h = w / scale;
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				$(canvas).attr({
					width: w,
					height: h
				});
				ctx.drawImage(that, 0, 0, w, h);
				$.ajax({
					type: 'post',
					url: thats.myurl + '/rider/imageRiderImage',
					dataType: 'json',
					data: {
						imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
					},
					success: function(res) {
						if (thats.uploadtarget == 'zimg') {
							thats.zimg = res.data;
						} else if (thats.uploadtarget == 'fimg') {
							thats.fimg = res.data;
						} else if (thats.uploadtarget == 'simg') {
							thats.simg = res.data;
						}else if (thats.uploadtarget == 'timg') {
            	thats.timg = res.data;
            }
					}
				});
			};
		},
		//判断性别
		xuanze: function(id) {
			this.index = id;
		},
		myajax: function() {
			var that = this;
			//判断身份证号，姓名是否为空
			if (that.name == '') {
				alert('姓名不能为空');
				return;
			}
			if (that.shenfen == '') {
				alert('身份证号不能为空');
				return;
			}
			//			骑手实名认证
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/updateRiderRealName',
				data: {
					usRiderId: localStorage.getItem('myid'),
					usRiName: that.name,
					usRiSex: that.index,
					usRriProvince: localStorage.getItem('sheng'),
					usRiCity: localStorage.getItem('shi'),
					usRiArea: localStorage.getItem('qu'),
					usRiDetailed: localStorage.getItem('xiangxi'),
					usRiCardId: that.shenfen,
					usRiCardFrontImgUrl: that.zimg,
					usRiCardBackImgUrl: that.fimg,
					usRiCardHandheldImgUrl: that.simg,
          usRiHeadImgUrl:that.timg
				},
				success: function(res) {
					if (res.status == 200) {
						plus.nativeUI.toast('已为您提交认证');
						that.back()
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		back: function() {
			this.$router.back();
		},
		opennew: function(target, id) {
			this.$store.state.msdNewsId = id;
			this.$router.push({
				name: target
			});
		}
	},
	mounted() {},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		}
	}
};
</script>

<style scoped>
.wrapper {
	background: #f7f7f9;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ffffff;
	padding: 0 0.3rem;
	height: 1rem;
	margin-bottom: 0.2rem;
}
.header-aside {
	width: 0.3rem;
}
.header-aside img {
	height: 0.4rem;
}
.header-text {
	font-size: 0.32rem;
	color: #000000;
}
.main {
	height: calc(100% - 1rem);
	overflow-x: hidden;
	overflow-y: scroll;
}
.main-box {
	margin: 0 0.2rem;
	background: #ffffff;
	border-radius: 0.12rem;
	padding: 0 0.3rem;
}
.main-one {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #d8d8d8;
}
.one-text {
	font-size: 0.28rem;
	color: #000000;
}
.name {
	height: 0.8rem;
	font-size: 0.28rem;
	color: #929292;
	border: 0;
	width: 4rem;
}
input::-webkit-input-placeholder {
	color: #b8b8b8;
	font-size: 0.28rem;
	text-align: right;
}
.main-two {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #d8d8d8;
}
.two-left {
	font-size: 0.28rem;
	color: #000000;
	flex: 1;
}
.two-right {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 0.8rem;
	margin-left: 0.3rem;
}
.two-right img {
	height: 0.4rem;
}
.two-text {
	font-size: 0.28rem;
	color: #131313;
}
.two-news {
	color: #ff8190;
}
.main-three {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 0.28rem;
	color: #272727;
}
.main-four {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.main-four img {
	width: 4rem;
	height: 2.8rem;
}
.four-text {
	font-size: 0.28rem;
	color: #c9c9c9;
	margin: 0.3rem 0;
}
.bottom {
	background: #ff8190;
	height: 0.8rem;
	font-size: 0.32rem;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.12rem;
	width: 6rem;
	margin: 0.6rem;
}
</style>
