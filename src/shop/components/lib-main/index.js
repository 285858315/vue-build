'strict'
module.exports = {
	data:function(){
		return {
			api_header:{
				
			},
			header_height:0
		}
	},
	computed:{
		query:function(){
			return require("url").parse(document.location.href,true).query || {}
		},
		hash:function(){
			return require("url").parse(document.location.href,true).hash
		},
		full_height:function(){
			return document.getElementsByTagName("html")[0].clientHeight
		},
		full_width:function(){
			return document.getElementsByTagName("html")[0].clientWidth
		},
		view_width:function(){
			return this.full_width
		},
		view_height:function(){
			return this.full_width - this.header_height
		}
	},
	methods:{
		getQuery:function(a){
			return require("url").parse(a || document.location.href,true).query || {}
		},
		getHash:function(a){
			return require("url").parse(a || document.location.href,true).hash
		},
		broadcast:function(a,b){
			this.$broadcast(a,b)
		}
	},
	events:{
		"hook:created":function(){

		}
	}
}
