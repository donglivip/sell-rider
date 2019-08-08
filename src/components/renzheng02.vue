<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
			<div class="header-text">实名认证</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-one" @click="opennew('shimingrenzheng')">
				<div class="one-text">实名认证</div>
				<div class="one-news">{{ tabdata.type1 }}</div>
			</div>
			<div class="main-one" @click="opennew('bangdingzhifu')" v-if="tabdata.type2 != '已绑定'">
				<div class="one-text">绑定支付宝</div>
				<div class="one-news">{{ tabdata.type2 }}</div>
			</div>
			
			<div class="main-one" @click="opennew('xiugaizhifu')" v-if="tabdata.type2 == '已绑定'">
				<div class="one-text">修改支付宝</div>
				<div class="one-news">{{ tabdata.type2 }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'renzheng02',
	data() {
		return {
			tabdata: []
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//		骑手是否认证过和是否绑定过支付宝
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/queryRiderRealNameIs',
				data: {
					usRiderId: localStorage.getItem('myid')
				},
				success: function(res) {
					if (res.status == 200) {
						that.tabdata = res.data;
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
		opennew: function(target) {
			this.$router.push({
				name: target
			});
		}
	},
	mounted() {
		this.myajax();
	},
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
	margin-bottom: 0.1rem;
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
.main-one {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.3rem;
	margin-bottom: 0.1rem;
	background: #ffffff;
	height: 1rem;
}
.one-text {
	font-size: 0.28rem;
	color: #2c2c2c;
}
.one-news {
	font-size: 0.28rem;
	color: #ff8190;
}
</style>
