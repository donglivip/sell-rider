<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/youjian.png" /></div>
			<div class="header-text">收支记录</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-one" v-for="i in tabdata">
				<div class="one-top">
					<div class="top-text">{{ i.usRiNote }}</div>
					<div class="top-news">{{ i.usRtType | shaixuan}}</div>
				</div>
				<div class="one-bottom">
					<div class="bottom-text">{{i.usRtCreateTimeString}}</div>
					<div class="bottom-news">¥{{i.usRiPrice}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shouzhijilu',
	data() {
		return {
			tabdata: []
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//			骑手收支记录
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/riderImportAnExport',
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
		opennew: function(target, id) {
			this.$store.state.msdNewsId = id;
			this.$router.push({
				name: target
			});
		}
	},
	mounted() {
		this.myajax()
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		}
	},
	filters: {
		shaixuan: function(id) {
			if (id == 1) {
				return '完成';
			} else if (id == 2) {
				return '申请中';
			} else if (id == 2) {
				return '提现失败';
			}
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
.main-one {
	background: #ffffff;
	margin: 0.2rem 0.2rem 0 0.2rem;
	border-radius: 0.12rem;
	padding: 0 0.3rem;
}
.one-top {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-top: 0.1rem;
}
.top-text {
	font-size: 0.32rem;
	color: #000000;
	flex: 1;
}
.top-news {
	font-size: 0.24rem;
	color: #000000;
}
.one-bottom {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 0.1rem;
}
.bottom-text {
	font-size: 0.24rem;
	color: #929292;
	flex: 1;
}
.bottom-news {
	font-size: 0.36rem;
	color: #272727;
}
</style>
