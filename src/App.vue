<template>
	<div id="app"><router-view /></div>
</template>

<script>

export default {
	name: 'App',
	methods: {
		weizhi: function() {
			var that=this
			$.ajax({
				type: 'post',
				url: that.myurl + '/rider/updateUsRiMapPlace',
				dataType: 'json',
				data: {
					usRiMapPlace: JSON.stringify([that.jing, that.wei]),
					usRiderId: localStorage.getItem('myid')
				},
				success: function(res) {
           console.log(JSON.stringify( {
					usRiMapPlace: JSON.stringify([that.jing, that.wei]),
					usRiderId: localStorage.getItem('myid')
				}));
            console.log("res: " + JSON.stringify(res));
        },error:function(err){

        }
			});
			setTimeout(function(){
				that.weizhi()
			},10000)
		}
	},
	mounted:function(){
		var that=this
		that.weizhi()
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		},
		jing() {
			return this.$store.state.jing;
		},
		wei() {
			return this.$store.state.wei;
		}
	}
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
}
html,
body,
.wrapper,
#app {
	width: 100%;
	height: 100%;
	overflow: hidden;
	font-size: 0.22rem;
}
</style>
