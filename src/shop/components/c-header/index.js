'use strict'
require("../style/c-header.css")
var Core = require("../c-core")
module.exports = {
	mixins:[Core],
	template:require("./template.html"),
	events:{
		"hook:created":function(){
			this.type = "c-header"
		}
	}
}
