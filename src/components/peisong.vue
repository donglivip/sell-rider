<template>
	<div class="wrapper">
		<!-- 主页 -->
		<div class="header">
			<div class="header-top">
				<div class="header-aside"><img src="../../static/wode.png" @click="xianshi()" /></div>
				<div class="header-content">美邦跑腿</div>
				<div class="header-aside"><img src="../../static/tixing.png" @click="opennew('tongzhixiaoxi')" /></div>
			</div>
			<div class="header-bottom">
				<div class="header-text" @click="opennew('index')">首页</div>
				<div class="header-text header-news">外卖</div>
				<div class="header-text" @click="opennew('paotui-mai')">跑腿</div>
				<div class="header-text" @click="opennew('renwu')">
					<div class="num">
						{{ydata}}
					</div>
					任务
				</div>
			</div>
		</div>
		<div class="main">
			<div class="main-box" v-for="i in tabdata" @click="jump(i.usOrderId)">
				<div class="main-one">
					<div class="one-text">{{ i.usTsCompanyName }}</div>
					<div class="one-news">{{ i.changeUsOrCreateTime }}</div>
				</div>
				<div class="main-two">
					<div class="two-text">取</div>
					<div class="two-news">{{ i.traderAddress }}</div>
					<div class="two-word">{{ i.disTrader }}km</div>
				</div>
				<div class="main-two">
					<div class="two-text">送</div>
					<div class="two-news">{{ i.address }}</div>
					<div class="two-word">{{ i.dis }}km</div>
				</div>
				<div class="main-three" @click.stop="queren(i.usOrderId)">确认接单</div>
			</div>
		</div>
		<!-- 首页-我的 -->
		<div class="mengceng" v-if="wode" @click="dian">
			<div class="m-box">
				<div class="m-top">
					<img src="../../static/234564.jpg" v-if="tdata.usRiHeadImgUrl ==null">
					<img :src="myurl + tdata.usRiHeadImgUrl" v-if="tdata.usRiHeadImgUrl !=null">
					<div class="m-text">{{tdata.usRiName==null?'未实名骑手':tdata.usRiName}}</div>
				</div>
				<div class="m-coment" @click.stop="opennew('waimaidingdan')">
					<img src="../../static/wodedingdan.png" />
					<div class="m-news">我的订单</div>
				</div>
				<div class="m-coment" @click.stop="opennew('renzheng02')">
					<img src="../../static/yirenzheng.png" />
					<div class="m-news">实名认证</div>
				</div>
				<div class="m-coment" @click.stop="opennew('caiwuzhongxin')">
					<img src="../../static/caiwu.png" />
					<div class="m-news">财务中心</div>
				</div>
				<div class="m-coment" @click.stop="opennew('fuwuzhongxin')">
					<img src="../../static/kefu.png" />
					<div class="m-news">服务中心</div>
				</div>
				<div class="m-coment" @click.stop="opennew('jiaonayajin')">
					<img src="../../static/guanyu.png">
					<div class="m-news">缴纳押金</div>
				</div>
				<a class="m-coment" href="tel:0572-5129628">
					<img src="../../static/qq.png">
					<div class="m-news">在线客服</div>
				</a>
				<div class="m-coment" @click.stop="opennew('rule')">
					<img src="../../static/rule.png">
					<div class="m-news">服务标准</div>
				</div>
				<div class="m-coment" @click.stop="opennew('aboutus')">
					<img src="../../static/about.png">
					<div class="m-news">关于我们</div>
				</div>
				<div class="m-bottom" @click="opennew('denglu')">退出登录</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'peisong',
		data() {
			return {
				tabdata: [],
				wode: false,
				ydata: 0,
				set: '',
				tdata: ''
			};
		},
		methods: {
			queren: function(id) {
				var that = this;
				//		查询当前骑手有没有审核通过 通过返回
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/selectUsRiderByUsRiderIdRetrunOk',
					data: {
						usRiderId: localStorage.getItem('myid')
					},
					success: function(res) {
						if (res.status == 200) {
							//		骑手接单
							$.ajax({
								type: 'post',
								url: that.myurl + '/rider/triderReceipt',
								data: {
									usOrderId: id,
									usOrUpdateName: localStorage.getItem('name'),
									usRiderId: localStorage.getItem('myid'),
									lng: that.jing,
									lat: that.wei
								},
								success: function(res) {
									if (res.status == 200) {
										//接单声音
										var music = new Audio();
										music.src = "./static/jiedanchenggong.wav";
										music.play()
										alert('接单成功');
										that.myajax();
									} else {
										alert(res.msg);
									}
								},
								error: function(res) {
									alert('网络连接失败，请检查网络后再试！');
								}
							});
						} else {
							alert(res.msg);
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！');
					}
				});
			},
			//点击跳转--订单详情
			jump: function(id) {
				this.$store.state.dingdanid = id;
				this.$router.push({
					name: 'xiangqing02'
				});
			},
			// 点击蒙层返回主页
			dian: function() {
				this.wode = false;
			},
			// 点击我的小图标显示蒙层
			xianshi: function() {
				this.wode = true;
			},
			myajax: function() {
				var that = this;
				// plus.nativeUI.showWaiting('查询订单')
				//			向骑手推送的订单
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/riderOrder',
					data: {
						log: that.jing,
						lat: that.wei,
						usRiServingRange: 5,
						usRiderId: localStorage.getItem('myid')
					},
					success: function(res) {
						// plus.nativeUI.closeWaiting()
						if (res.status == 200) {
							if (res.data.listUserAddre.length != 0) {
								//接单声音
								var music = new Audio();
								music.src = "./static/xindingdan.wav";
								music.play()
							}
							that.tabdata = res.data.listUserAddre;
						} else {
							alert(res.msg);
						}
					},
					error: function(res) {
						plus.nativeUI.closeWaiting()
						alert('网络连接失败，请检查网络后再试！');
					}
				});
				//			 查询已接单数
				$.ajax({
					type: 'post',
					url: that.myurl + '/rider/queryRiderFristNum',
					data: {
						id: localStorage.getItem('myid')
					},
					dataType: 'json',
					success: function(res) {
						if (res.status == 200) {
							that.ydata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				//			 查询头像和用户名
				$.ajax({
				  type: 'post',
				  url: that.myurl + '/rider/selectUsRiderName',
				  data: {
				    usRiderId : localStorage.getItem('myid')
				  },
				  dataType: 'json',
				  success: function(res) {
				    if (res.status == 200) {
				      that.tdata = res.data
				    } else {
				      alert(res.msg)
				    }
				  },
				  error: function(res) {
				    alert('网络连接失败，请检查网络后再试！')
				  }
				})
				that.set = setTimeout(function() {
					that.myajax()
				}, 30000);
			},
			back: function() {
				this.$router.back();
			},
			opennew: function(target, id) {
				this.$store.state.msdNewsId = id
				clearTimeout(this.set)
				this.$router.push({
					name: target
				});
			}
		},
		mounted() {
			var that = this;
			that.myajax()

		},
		computed: {
			myurl() {
				return this.$store.state.myurl;
			},
			jing() {
				return this.$store.state.jing
			},
			wei() {
				return this.$store.state.wei
			},
			shi() {
				return this.$store.state.shi
			}
		}
	};
</script>

<style scoped>
	/* 蒙层 */
	.mengceng {
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	a {
		text-decoration: none;
	}

	.m-box {
		width: 5.8rem;
		height: 100%;
		background: #f7f7f9;
	}

	.m-top {
		height: 2.4rem;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 0.3rem;
		margin-bottom: 0.1rem;
	}

	.m-top img {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.4rem;
		border-radius: 0.72rem;
	}

	.m-text {
		font-size: 0.32rem;
		color: #272727;
	}

	.m-coment {
		height: 0.8rem;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 0.3rem;
		margin-bottom: 0.1rem;
	}

	.m-coment img {
		height: 0.4rem;
		margin-right: 0.2rem;
	}

	.m-news {
		font-size: 0.28rem;
		color: #272727;
	}

	.m-bottom {
		width: 2.6rem;
		height: 0.6rem;
		border: 1px solid #929292;
		font-size: 0.28rem;
		color: #272727;
		border-radius: 0.08rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0.4rem;
		left: 1.5rem;
	}

	/* 主页 */
	.wrapper {
		background: #f7f7f9;
	}

	.header {
		height: 2rem;
		background: #ffffff;
	}

	.header-top {
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.3rem;
	}

	.header-aside {
		width: 0.3rem;
	}

	.header-aside img {
		height: 0.3rem;
	}

	.header-content {
		font-size: 0.32rem;
		color: #000000;
	}

	.header-bottom {
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.header-text {
		font-size: 0.32rem;
		height: 0.8rem;
		line-height: 0.8rem;
		box-sizing: border-box;
		width: 0.4rem;
		white-space: nowrap;
		text-indent: -0.14rem;
		position: relative;
	}

	.header-text .num {
		position: absolute;
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
		top: 0rem;
		right: -.3rem;
		background: red;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .2rem;
		text-indent: 0;
	}

	.header-news {
		color: #000000;
		border-bottom: 3px solid #ff8a97;
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
		font-weight: 600;
	}

	.main {
		height: calc(100% - 2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.main-box {
		height: 5.4rem;
		background: #ffffff;
		margin: 0.2rem;
		padding: 0 0.3rem;
	}

	.main-one {
		height: 1.1rem;
		border-bottom: 1px solid #d8d8d8;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.one-text {
		font-size: 0.36rem;
		color: #272727;
	}

	.one-news {
		font-size: 0.28rem;
		color: #ff8190;
	}

	.main-two {
		height: 1.4rem;
		border-bottom: 1px solid #d8d8d8;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.two-text {
		font-size: 0.24rem;
		color: #ffffff;
		background: #ff8190;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 0.64rem;
		margin-right: 0.3rem;
		text-align: center;
		line-height: 0.4rem;
	}

	.two-news {
		font-size: 0.36rem;
		color: #272727;
		margin-right: 0.3rem;
		flex: 1;
	}

	.two-word {
		font-size: 0.24rem;
		color: #ffffff;
		background: #ff8190;
		padding: 0.02rem 0.1rem;
	}

	.main-three {
		height: 0.9rem;
		width: 5.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.28rem;
		color: #ffffff;
		background: #ff8190;
		padding: 0 0.2rem;
		margin-top: 0.4rem;
		border-radius: 0.1rem;
	}

	.bottom {
		height: 1.6rem;
		background: #ffffff;
		position: relative;
	}

	.bottom-text {
		background: #ff8a97;
		height: 1.6rem;
		width: 1.6rem;
		border-radius: 50%;
		font-size: 0.32rem;
		color: #ffffff;
		text-align: center;
		line-height: 1.6rem;
		position: absolute;
		bottom: 0.4rem;
		left: 2.7rem;
		border: 6px solid #ffffff;
	}
</style>
