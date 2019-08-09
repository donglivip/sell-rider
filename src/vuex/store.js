import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态--里面定义一个名字：''
	state: {
		myurl:'http://47.104.101.165',//服务路径联华47.104.101.165   //领先 47.110.8.48  //我们 39.107.70.18
		dingdanid:'',//订单id
		jing:'117.272324',
		wei:'34.268702',
		sheng:'江苏省',
		shi:'徐州市',
		qu:'鼓楼区',
		wanzheng:'江苏省徐州市鼓楼区奥特莱斯',
	}
})

export default store
