'use strict'
window.onerror = function(a){
	alert(a)
}
require("../style/normalize.css")
require("../style/main.css")
var Vue = require("vue")
var Api = require("../lib-api")
var Main = require("../lib-main")
var components = require("./components")
var App = new Vue({
	replace:false,
	el:"body",
	data:function(){
		return {
			components:components
		}
	},
	mixins:[Main,Api],
	template:require("./template.html"),
	components:{
		"c-header":function(resolve){
			require(["../c-header"],resolve)
		},
		"c-button":function(resolve){
			require(["../c-button"],resolve)
		}
	},
	events:{
		"hook:created":function(){
			var user_key = this.query.user_key
			if(user_key){
				this.api_header.user_key = user_key
			}
		}
	}
})

window.app = App