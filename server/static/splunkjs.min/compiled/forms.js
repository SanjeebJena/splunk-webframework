define("splunkjs/compiled/forms",function(){}),define("splunkjs/mvc/baseinputview",["require","exports","module","underscore","jquery","./simplesplunkview"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("./simplesplunkview"),o=s.extend({output_mode:"json",options:{disabled:!1,managerid:null,data:"preview"},initialize:function(e){s.prototype.initialize.apply(this,arguments),this.settings.enablePush("value");var t=this.settings.get("default");if(t===undefined){var n=r.contains(r.keys(this.constructor.prototype.options),"seed");n&&(t=this.settings.get("seed"))}t!==undefined&&this.settings.get("value")===undefined&&this.val(t),this.settings.on("change:disabled",this._onDisable,this)},_onChange:function(e){this.trigger("change",this)},_onDisable:function(e){var t=this.settings.get("disabled");this.$("input").prop("disabled",t)},render:function(){return this._updateView(this._viz,this._data||[]),this},_updateView:function(){var e=this._data||[];this._viz||this._createView(e);if(!this._viz)return;this.updateView(this._viz,e),this._onDisable()},createView:function(){return!0},val:function(e,t){t=t||"input";var n=i(t,this.$el);return e?n.val(e):n.val()}});return o}),define("splunkjs/mvc/checkboxview",["require","exports","module","underscore","jquery","./baseinputview"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("./baseinputview"),o=s.extend({moduleId:n.id,className:"splunk-checkbox",inputType:"checkbox",options:{"default":undefined,value:undefined,disabled:!1},events:{"change input:checkbox":"_onChange"},initialize:function(){this.options=r.extend({},s.prototype.options,this.options),s.prototype.initialize.apply(this,arguments),this.settings.on("change",this.render,this);var e=this;this.on("change",function(){e.settings.set("value",this.val())})},createView:function(){var e=i("<input type='"+this.inputType+"'>");return this.$el.html(e),e},updateView:function(e,t){return this.val(this.settings.get("value")||!1),this},val:function(e){var t=i("input",this.$el);return e===undefined?t.prop("checked"):(e!==this.val()&&(t.prop("checked",Boolean(e)),this._onChange(),this.settings.set("value",Boolean(e))),this.val())}});return o}),define("splunkjs/mvc/basechoiceview",["require","exports","module","underscore","util/console","./baseinputview"],function(e,t,n){var r=e("underscore"),i=e("util/console"),s=e("./baseinputview"),o=s.extend({options:{choices:[]},initialize:function(){var e=this;this.options=r.extend({},s.prototype.options,this.options),s.prototype.initialize.apply(this,arguments),this.manager=null,this.resultsModel=null,this.settings.on("change:value",this._onValueChange,this),this.settings.on("change:choices change:valueField change:labelField change:default",r.debounce(this.render,0),this)},updateDomVal:function(e){throw new Error("Abstract method.  Must override")},_onValueChange:function(e,t,n){this.updateDomVal(t),this.trigger("change",this)},convertDataToChoices:function(e){e=e||this._data;var t=this.settings.get("valueField")||"value",n=this.settings.get("labelField")||t,s=Array.prototype.slice.call(this.settings.get("choices")||[]);s=s.concat(r.map(e||[],function(e){return{label:e[n],value:e[t]}}));var o=s.length;return s=r.uniq(s,!1,function(e){return e.value}),o!=s.length&&i.log("Choice control received search result with duplicate values. Recommend dedupe of data source."),s},_updateView:function(e,t){t=this.convertDataToChoices(t);if(!this._viz){this._createView(t);if(!this._viz)return}this.updateView(this._viz,t),this._onDisable()},val:function(e){return arguments.length===0?this.settings.get("value"):(e!==this.settings.get("value")&&this.settings.set("value",e),this.settings.get("value"))}});return o}),define("splunkjs/mvc/basemultichoiceview",["require","exports","module","underscore","./basechoiceview"],function(e,t,n){var r=e("underscore"),i=e("./basechoiceview"),s=function(e){return e===undefined?[]:r.isArray(e)?e:[e]},o=i.extend({val:function(e){var t=this.settings.get("value")||[];return e=e||[],arguments.length===0?t:(e=s(e),t.sort(),e.sort(),r.isEqual(t,e)?t:(this.settings.set("value",e),e))}});return o}),define("splunkjs/mvc/checkboxgroupview",["require","exports","module","underscore","jquery","./basemultichoiceview"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("./basemultichoiceview"),o=function(e){return e===undefined?[]:r.isArray(e)?e:[e]},u=s.extend({moduleId:n.id,className:"splunk-checkboxgroup",options:{valueField:"",labelField:"","default":undefined,choices:[],value:undefined,disabled:!1},events:{"change input:checkbox":"onDomChange"},initialize:function(){this.options=r.extend({},s.prototype.options,this.options),s.prototype.initialize.apply(this,arguments)},_domVal:function(){return this.$("input:checkbox:checked").map(function(e,t){return i(t).val()}).get()},onDomChange:function(e){this.val(this._domVal())},updateDomVal:function(e){this.$("input:checkbox:checked").prop("checked",!1),r.each(e,function(e){this.$('input:checkbox[value="'+e+'"]').prop("checked","checked")})},updateView:function(e,t){this.$el.empty();if(!t)return this.$el.html(r("No results").t()),this;var n=this,s=this.settings.get("value"),o=this.id;return r.each(t||[],function(e,t){var u=o+t,a=i('<input type="checkbox" />').attr({name:o,value:e.value,id:u});r.contains(s,e.value)&&a.prop({checked:"checked"});var f=i('<div class="choice" />').append(a).append(i("<label />").attr("for",u).text(e.label||"(null)"));n.$el.append(f)}),this}});return u}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.addBuffer("splunkjs/css/radio.css")}),requirejs.s.contexts._.nextTick=requirejs.nextTick,define("splunkjs/mvc/radiogroupview",["require","exports","module","underscore","jquery","./basechoiceview","css!../css/radio.css"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("./basechoiceview");e("css!../css/radio.css");var o=s.extend({moduleId:n.id,className:"splunk-radiogroup",options:{valueField:"",labelField:"","default":undefined,choices:[],disabled:!1,value:undefined},events:{"change input:radio":"onDomChange"},initialize:function(){this.options=r.extend({},s.prototype.options,this.options),s.prototype.initialize.apply(this,arguments)},_domVal:function(){return this.$("input:radio:checked").val()},onDomChange:function(){this.val(this._domVal())},updateDomVal:function(e){this.$("input:radio").prop("checked",!1),this.$('input:radio[value="'+e+'"]').prop("checked","checked")},updateView:function(e,t){this.$el.empty();if(!t)return this.$el.text(r("No results").t()),this;var n=this,s=this.settings.get("value"),o=this.id;return r.each(t||[],function(e,t){var r=o+String(t),u=i('<input type="radio" />').attr({name:o,value:e.value,id:r});e.value==s&&u.prop({checked:"checked"});var a=i('<div class="choice" />').append(u).append(i("<label />").attr("for",r).text(e.label));n.$el.append(a)}),this}});return o}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.addBuffer("splunkjs/css/select.css")}),requirejs.s.contexts._.nextTick=requirejs.nextTick,requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.addBuffer("contrib/select2-3.3.1/select2.css")}),requirejs.s.contexts._.nextTick=requirejs.nextTick,define("splunkjs/mvc/baseselectviewmixin",["require","exports","module","underscore","jquery","select2/select2","util/console","css!../css/select.css","css!contrib/select2-3.3.1/select2.css"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("select2/select2"),o=e("util/console");e("css!../css/select.css"),e("css!contrib/select2-3.3.1/select2.css");var u={options:{managerid:null,valueField:"",labelField:"",choices:[],"default":undefined,width:200,minimumResultsForSearch:8,showClearButton:!0,disabled:!1,value:undefined},events:{"change select":"onDomChange"},updateDomVal:function(e){this.$(".select2-container.placeholder").length==0&&(this.$("option:selected").prop("selected",!1),this._viz.val(this.settings.get("value")),this._select2(this._viz))},_domVal:function(){return this._viz.val()||(this.valueIsList?[]:undefined)},onDomChange:function(){this.val(this._domVal())},_onDisable:function(e){var t=this.settings.get("disabled");this._viz.prop("disabled",t)},_displayMessage:function(e){this._viz.html(i("<option>")),this._select2(this._viz,{placeholder:e})},_select2:function(e,t){var n=r.extend({minimumResultsForSearch:parseInt(this.settings.get("minimumResultsForSearch"),10),allowClear:this.settings.get("showClearButton"),placeholder:""},t||{});e.select2("close"),e.select2(n)},createView:function(){var e=i(this.selectRoot);return this.$el.html(e),e.width(this.settings.get("width")),e},updateView:function(e,t){e.empty(),r.any(t,function(e){return e.value===""})&&o.log("The empty string is not a valid value for HTML select controls.");if(t.length===0)return this._displayMessage(r("No results").t()),this;e.append(i("<option />"));var n=this.valueIsList?this.settings.get("value"):[this.settings.get("value")];return r.each(t,function(t){var s=i("<option />").text(t.label||"").attr("value",t.value);r.contains(n,t.value)&&s.prop("selected","selected"),e.append(s)}),this._select2(e,{placeholder:""}),this}};return u}),define("splunkjs/mvc/multiselectview",["require","exports","module","underscore","./basemultichoiceview","./baseselectviewmixin"],function(e,t,n){var r=e("underscore"),i=e("./basemultichoiceview"),s=e("./baseselectviewmixin"),o=i.extend(r.extend({},s,{moduleId:n.id,className:"splunk-multiselect",selectRoot:'<select multiple="multiple"/>',valueIsList:!0,initialize:function(){this.options=r.extend({},i.prototype.options,this.options),i.prototype.initialize.apply(this,arguments),this.settings.on("change:width",r.debounce(this.render,0),this)}}));return o}),define("splunkjs/mvc/selectview",["require","exports","module","underscore","./basechoiceview","./baseselectviewmixin"],function(e,t,n){var r=e("underscore"),i=e("./basechoiceview"),s=e("./baseselectviewmixin"),o=i.extend(r.extend({},s,{moduleId:n.id,className:"splunk-select",selectRoot:"<select />",valueIsList:!1,initialize:function(){this.options=r.extend({},i.prototype.options,this.options),i.prototype.initialize.apply(this,arguments),this.settings.on("change:width",r.debounce(this.render,0),this)}}));return o}),define("splunkjs/mvc/textboxview",["require","exports","module","underscore","jquery","./baseinputview"],function(e,t,n){var r=e("underscore"),i=e("jquery"),s=e("./baseinputview"),o=s.extend({moduleId:n.id,className:"splunk-textbox",options:{"default":undefined,type:"text",seed:undefined,value:undefined,disabled:!1},events:{"change input":"_onChange"},initialize:function(){this.options=r.extend({},s.prototype.options,this.options),s.prototype.initialize.apply(this,arguments),this.settings.on("change",this.render,this);var e=this;this.on("change",function(){e.settings.set("value",e.val())}),r.contains(["text","password"],this.settings.get("type"))||this.settings.set("type","text")},createView:function(){var e=i("<input type='"+this.settings.get("type")+"'>");return this.$el.html(e),e},updateView:function(e,t){return this.val(this.settings.get("value")||""),this},val:function(e){var t=i("input",this.$el);return e===undefined?t.val():(e!==this.val()&&(t.val(e),this._onChange(),this.settings.set("value",e)),this.val())}});return o}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.setBuffer(".splunk-radio input {\n    margin-left: 2px;\n    margin-right: 10px;\n}\n.splunk-radio .choice label {\n    display: inline;\n}.splunk-select div.select2-container {\n    margin-bottom: 9px;\n}\n\n.splunk-select .select2-container .select2-choice {\n    height: 24px;\n    line-height: 24px;\n}\n.splunk-select .select2-container .select2-choice div b {\n\n}\n/*\nVersion: 3.3.1 Timestamp: Wed Feb 20 09:57:22 PST 2013\n*/\n.select2-container {\n    position: relative;\n    display: inline-block;\n    /* inline-block for ie7 */\n    zoom: 1;\n    *display: inline;\n    vertical-align: top;\n}\n\n.select2-container,\n.select2-drop,\n.select2-search,\n.select2-search input{\n  /*\n    Force border-box so that % widths fit the parent\n    container without overlap because of margin/padding.\n\n    More Info : http://www.quirksmode.org/css/box.html\n  */\n  -webkit-box-sizing: border-box; /* webkit */\n   -khtml-box-sizing: border-box; /* konqueror */\n     -moz-box-sizing: border-box; /* firefox */\n      -ms-box-sizing: border-box; /* ie */\n          box-sizing: border-box; /* css3 */\n}\n\n.select2-container .select2-choice {\n    display: block;\n    height: 26px;\n    padding: 0 0 0 8px;\n    overflow: hidden;\n    position: relative;\n\n    border: 1px solid #aaa;\n    white-space: nowrap;\n    line-height: 26px;\n    color: #444;\n    text-decoration: none;\n\n    -webkit-border-radius: 4px;\n       -moz-border-radius: 4px;\n            border-radius: 4px;\n\n    -webkit-background-clip: padding-box;\n       -moz-background-clip: padding;\n            background-clip: padding-box;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n       -khtml-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n\n    background-color: #fff;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eeeeee), color-stop(0.5, white));\n    background-image: -webkit-linear-gradient(center bottom, #eeeeee 0%, white 50%);\n    background-image: -moz-linear-gradient(center bottom, #eeeeee 0%, white 50%);\n    background-image: -o-linear-gradient(bottom, #eeeeee 0%, #ffffff 50%);\n    background-image: -ms-linear-gradient(top, #ffffff 0%, #eeeeee 50%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#ffffff', endColorstr = '#eeeeee', GradientType = 0);\n    background-image: linear-gradient(top, #ffffff 0%, #eeeeee 50%);\n}\n\n.select2-container.select2-drop-above .select2-choice {\n    border-bottom-color: #aaa;\n\n    -webkit-border-radius:0 0 4px 4px;\n       -moz-border-radius:0 0 4px 4px;\n            border-radius:0 0 4px 4px;\n\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #eeeeee), color-stop(0.9, white));\n    background-image: -webkit-linear-gradient(center bottom, #eeeeee 0%, white 90%);\n    background-image: -moz-linear-gradient(center bottom, #eeeeee 0%, white 90%);\n    background-image: -o-linear-gradient(bottom, #eeeeee 0%, white 90%);\n    background-image: -ms-linear-gradient(top, #eeeeee 0%,#ffffff 90%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#eeeeee',GradientType=0 );\n    background-image: linear-gradient(top, #eeeeee 0%,#ffffff 90%);\n}\n\n.select2-container .select2-choice span {\n    margin-right: 26px;\n    display: block;\n    overflow: hidden;\n\n    white-space: nowrap;\n\n    -ms-text-overflow: ellipsis;\n     -o-text-overflow: ellipsis;\n        text-overflow: ellipsis;\n}\n\n.select2-container .select2-choice abbr {\n    display: block;\n    width: 12px;\n    height: 12px;\n    position: absolute;\n    right: 26px;\n    top: 8px;\n\n    font-size: 1px;\n    text-decoration: none;\n\n    border: 0;\n    background: url('contrib/select2-3.3.1/select2.png') right top no-repeat;\n    cursor: pointer;\n    outline: 0;\n}\n.select2-container .select2-choice abbr:hover {\n    background-position: right -11px;\n    cursor: pointer;\n}\n\n.select2-drop-mask {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 9998;\n    opacity: 0;\n}\n\n.select2-drop {\n    width: 100%;\n    margin-top:-1px;\n    position: absolute;\n    z-index: 9999;\n    top: 100%;\n\n    background: #fff;\n    color: #000;\n    border: 1px solid #aaa;\n    border-top: 0;\n\n    -webkit-border-radius: 0 0 4px 4px;\n       -moz-border-radius: 0 0 4px 4px;\n            border-radius: 0 0 4px 4px;\n\n    -webkit-box-shadow: 0 4px 5px rgba(0, 0, 0, .15);\n       -moz-box-shadow: 0 4px 5px rgba(0, 0, 0, .15);\n            box-shadow: 0 4px 5px rgba(0, 0, 0, .15);\n}\n\n.select2-drop.select2-drop-above {\n    margin-top: 1px;\n    border-top: 1px solid #aaa;\n    border-bottom: 0;\n\n    -webkit-border-radius: 4px 4px 0 0;\n       -moz-border-radius: 4px 4px 0 0;\n            border-radius: 4px 4px 0 0;\n\n    -webkit-box-shadow: 0 -4px 5px rgba(0, 0, 0, .15);\n       -moz-box-shadow: 0 -4px 5px rgba(0, 0, 0, .15);\n            box-shadow: 0 -4px 5px rgba(0, 0, 0, .15);\n}\n\n.select2-container .select2-choice div {\n    display: block;\n    width: 18px;\n    height: 100%;\n    position: absolute;\n    right: 0;\n    top: 0;\n\n    border-left: 1px solid #aaa;\n    -webkit-border-radius: 0 4px 4px 0;\n       -moz-border-radius: 0 4px 4px 0;\n            border-radius: 0 4px 4px 0;\n\n    -webkit-background-clip: padding-box;\n       -moz-background-clip: padding;\n            background-clip: padding-box;\n\n    background: #ccc;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #ccc), color-stop(0.6, #eee));\n    background-image: -webkit-linear-gradient(center bottom, #ccc 0%, #eee 60%);\n    background-image: -moz-linear-gradient(center bottom, #ccc 0%, #eee 60%);\n    background-image: -o-linear-gradient(bottom, #ccc 0%, #eee 60%);\n    background-image: -ms-linear-gradient(top, #cccccc 0%, #eeeeee 60%);\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#eeeeee', endColorstr = '#cccccc', GradientType = 0);\n    background-image: linear-gradient(top, #cccccc 0%, #eeeeee 60%);\n}\n\n.select2-container .select2-choice div b {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 0 1px;\n}\n\n.select2-search {\n    display: inline-block;\n    width: 100%;\n    min-height: 26px;\n    margin: 0;\n    padding-left: 4px;\n    padding-right: 4px;\n\n    position: relative;\n    z-index: 10000;\n\n    white-space: nowrap;\n}\n\n.select2-search-hidden {\n    display: block;\n    position: absolute;\n    left: -10000px;\n}\n\n.select2-search input {\n    width: 100%;\n    height: auto !important;\n    min-height: 26px;\n    padding: 4px 20px 4px 5px;\n    margin: 0;\n\n    outline: 0;\n    font-family: sans-serif;\n    font-size: 1em;\n\n    border: 1px solid #aaa;\n    -webkit-border-radius: 0;\n       -moz-border-radius: 0;\n            border-radius: 0;\n\n    -webkit-box-shadow: none;\n       -moz-box-shadow: none;\n            box-shadow: none;\n\n    background: #fff url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px;\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, white), color-stop(0.99, #eeeeee));\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, -webkit-linear-gradient(center bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, -moz-linear-gradient(center bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, -o-linear-gradient(bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, -ms-linear-gradient(top, #ffffff 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2.png') no-repeat 100% -22px, linear-gradient(top, #ffffff 85%, #eeeeee 99%);\n}\n\n.select2-drop.select2-drop-above .select2-search input {\n    margin-top: 4px;\n}\n\n.select2-search input.select2-active {\n    background: #fff url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%;\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, white), color-stop(0.99, #eeeeee));\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, -webkit-linear-gradient(center bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, -moz-linear-gradient(center bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, -o-linear-gradient(bottom, white 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, -ms-linear-gradient(top, #ffffff 85%, #eeeeee 99%);\n    background: url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%, linear-gradient(top, #ffffff 85%, #eeeeee 99%);\n}\n\n.select2-container-active .select2-choice,\n.select2-container-active .select2-choices {\n    border: 1px solid #5897fb;\n    outline: none;\n\n    -webkit-box-shadow: 0 0 5px rgba(0,0,0,.3);\n       -moz-box-shadow: 0 0 5px rgba(0,0,0,.3);\n            box-shadow: 0 0 5px rgba(0,0,0,.3);\n}\n\n.select2-dropdown-open .select2-choice {\n    border-bottom-color: transparent;\n    -webkit-box-shadow: 0 1px 0 #fff inset;\n       -moz-box-shadow: 0 1px 0 #fff inset;\n            box-shadow: 0 1px 0 #fff inset;\n\n    -webkit-border-bottom-left-radius: 0;\n        -moz-border-radius-bottomleft: 0;\n            border-bottom-left-radius: 0;\n\n    -webkit-border-bottom-right-radius: 0;\n        -moz-border-radius-bottomright: 0;\n            border-bottom-right-radius: 0;\n\n    background-color: #eee;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, white), color-stop(0.5, #eeeeee));\n    background-image: -webkit-linear-gradient(center bottom, white 0%, #eeeeee 50%);\n    background-image: -moz-linear-gradient(center bottom, white 0%, #eeeeee 50%);\n    background-image: -o-linear-gradient(bottom, white 0%, #eeeeee 50%);\n    background-image: -ms-linear-gradient(top, #ffffff 0%,#eeeeee 50%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#ffffff',GradientType=0 );\n    background-image: linear-gradient(top, #ffffff 0%,#eeeeee 50%);\n}\n\n.select2-dropdown-open .select2-choice div {\n    background: transparent;\n    border-left: none;\n    filter: none;\n}\n.select2-dropdown-open .select2-choice div b {\n    background-position: -18px 1px;\n}\n\n/* results */\n.select2-results {\n    max-height: 200px;\n    padding: 0 0 0 4px;\n    margin: 4px 4px 4px 0;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto;\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n}\n\n.select2-results ul.select2-result-sub {\n    margin: 0;\n}\n\n.select2-results ul.select2-result-sub > li .select2-result-label { padding-left: 20px }\n.select2-results ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 40px }\n.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 60px }\n.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 80px }\n.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 100px }\n.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 110px }\n.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub > li .select2-result-label { padding-left: 120px }\n\n.select2-results li {\n    list-style: none;\n    display: list-item;\n    background-image: none;\n}\n\n.select2-results li.select2-result-with-children > .select2-result-label {\n    font-weight: bold;\n}\n\n.select2-results .select2-result-label {\n    padding: 3px 7px 4px;\n    margin: 0;\n    cursor: pointer;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n       -khtml-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n}\n\n.select2-results .select2-highlighted {\n    background: #3875d7;\n    color: #fff;\n}\n\n.select2-results li em {\n    background: #feffde;\n    font-style: normal;\n}\n\n.select2-results .select2-highlighted em {\n    background: transparent;\n}\n\n.select2-results .select2-highlighted ul {\n    background: white;\n    color: #000;\n}\n\n\n.select2-results .select2-no-results,\n.select2-results .select2-searching,\n.select2-results .select2-selection-limit {\n    background: #f4f4f4;\n    display: list-item;\n}\n\n/*\ndisabled look for disabled choices in the results dropdown\n*/\n.select2-results .select2-disabled.select2-highlighted {\n    color: #666;\n    background: #f4f4f4;\n    display: list-item;\n    cursor: default;\n}\n.select2-results .select2-disabled {\n  background: #f4f4f4;\n  display: list-item;\n  cursor: default;\n}\n\n.select2-results .select2-selected {\n    display: none;\n}\n\n.select2-more-results.select2-active {\n    background: #f4f4f4 url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100%;\n}\n\n.select2-more-results {\n    background: #f4f4f4;\n    display: list-item;\n}\n\n/* disabled styles */\n\n.select2-container.select2-container-disabled .select2-choice {\n    background-color: #f4f4f4;\n    background-image: none;\n    border: 1px solid #ddd;\n    cursor: default;\n}\n\n.select2-container.select2-container-disabled .select2-choice div {\n    background-color: #f4f4f4;\n    background-image: none;\n    border-left: 0;\n}\n\n.select2-container.select2-container-disabled .select2-choice abbr {\n    display: none\n}\n\n\n/* multiselect */\n\n.select2-container-multi .select2-choices {\n    height: auto !important;\n    height: 1%;\n    margin: 0;\n    padding: 0;\n    position: relative;\n\n    border: 1px solid #aaa;\n    cursor: text;\n    overflow: hidden;\n\n    background-color: #fff;\n    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(1%, #eeeeee), color-stop(15%, #ffffff));\n    background-image: -webkit-linear-gradient(top, #eeeeee 1%, #ffffff 15%);\n    background-image: -moz-linear-gradient(top, #eeeeee 1%, #ffffff 15%);\n    background-image: -o-linear-gradient(top, #eeeeee 1%, #ffffff 15%);\n    background-image: -ms-linear-gradient(top, #eeeeee 1%, #ffffff 15%);\n    background-image: linear-gradient(top, #eeeeee 1%, #ffffff 15%);\n}\n\n.select2-locked {\n  padding: 3px 5px 3px 5px !important;\n}\n\n.select2-container-multi .select2-choices {\n    min-height: 26px;\n}\n\n.select2-container-multi.select2-container-active .select2-choices {\n    border: 1px solid #5897fb;\n    outline: none;\n\n    -webkit-box-shadow: 0 0 5px rgba(0,0,0,.3);\n       -moz-box-shadow: 0 0 5px rgba(0,0,0,.3);\n            box-shadow: 0 0 5px rgba(0,0,0,.3);\n}\n.select2-container-multi .select2-choices li {\n    float: left;\n    list-style: none;\n}\n.select2-container-multi .select2-choices .select2-search-field {\n    margin: 0;\n    padding: 0;\n    white-space: nowrap;\n}\n\n.select2-container-multi .select2-choices .select2-search-field input {\n    padding: 5px;\n    margin: 1px 0;\n\n    font-family: sans-serif;\n    font-size: 100%;\n    color: #666;\n    outline: 0;\n    border: 0;\n    -webkit-box-shadow: none;\n       -moz-box-shadow: none;\n            box-shadow: none;\n    background: transparent !important;\n}\n\n.select2-container-multi .select2-choices .select2-search-field input.select2-active {\n    background: #fff url('contrib/select2-3.3.1/select2-spinner.gif') no-repeat 100% !important;\n}\n\n.select2-default {\n    color: #999 !important;\n}\n\n.select2-container-multi .select2-choices .select2-search-choice {\n    padding: 3px 5px 3px 18px;\n    margin: 3px 0 3px 5px;\n    position: relative;\n\n    line-height: 13px;\n    color: #333;\n    cursor: default;\n    border: 1px solid #aaaaaa;\n\n    -webkit-border-radius: 3px;\n       -moz-border-radius: 3px;\n            border-radius: 3px;\n\n    -webkit-box-shadow: 0 0 2px #ffffff inset, 0 1px 0 rgba(0,0,0,0.05);\n       -moz-box-shadow: 0 0 2px #ffffff inset, 0 1px 0 rgba(0,0,0,0.05);\n            box-shadow: 0 0 2px #ffffff inset, 0 1px 0 rgba(0,0,0,0.05);\n\n    -webkit-background-clip: padding-box;\n       -moz-background-clip: padding;\n            background-clip: padding-box;\n\n    -webkit-touch-callout: none;\n      -webkit-user-select: none;\n       -khtml-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n\n    background-color: #e4e4e4;\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#f4f4f4', GradientType=0 );\n    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(20%, #f4f4f4), color-stop(50%, #f0f0f0), color-stop(52%, #e8e8e8), color-stop(100%, #eeeeee));\n    background-image: -webkit-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eeeeee 100%);\n    background-image: -moz-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eeeeee 100%);\n    background-image: -o-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eeeeee 100%);\n    background-image: -ms-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eeeeee 100%);\n    background-image: linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eeeeee 100%);\n}\n.select2-container-multi .select2-choices .select2-search-choice span {\n    cursor: default;\n}\n.select2-container-multi .select2-choices .select2-search-choice-focus {\n    background: #d4d4d4;\n}\n\n.select2-search-choice-close {\n    display: block;\n    width: 12px;\n    height: 13px;\n    position: absolute;\n    right: 3px;\n    top: 4px;\n\n    font-size: 1px;\n    outline: none;\n    background: url('contrib/select2-3.3.1/select2.png') right top no-repeat;\n}\n\n.select2-container-multi .select2-search-choice-close {\n    left: 3px;\n}\n\n.select2-container-multi .select2-choices .select2-search-choice .select2-search-choice-close:hover {\n  background-position: right -11px;\n}\n.select2-container-multi .select2-choices .select2-search-choice-focus .select2-search-choice-close {\n    background-position: right -11px;\n}\n\n/* disabled styles */\n.select2-container-multi.select2-container-disabled .select2-choices{\n    background-color: #f4f4f4;\n    background-image: none;\n    border: 1px solid #ddd;\n    cursor: default;\n}\n\n.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice {\n    padding: 3px 5px 3px 5px;\n    border: 1px solid #ddd;\n    background-image: none;\n    background-color: #f4f4f4;\n}\n\n.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice .select2-search-choice-close {\n    display: none;\n}\n/* end multiselect */\n\n\n.select2-result-selectable .select2-match,\n.select2-result-unselectable .select2-match {\n    text-decoration: underline;\n}\n\n.select2-offscreen {\n    position: absolute;\n    left: -10000px;\n}\n\n/* Retina-ize icons */\n\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi)  {\n  .select2-search input, .select2-search-choice-close, .select2-container .select2-choice abbr, .select2-container .select2-choice div b {\n      background-image: url('contrib/select2-3.3.1/select2x2.png') !important;\n      background-repeat: no-repeat !important;\n      background-size: 60px 40px !important;\n  }\n  .select2-search input {\n      background-position: 100% -21px !important;\n  }\n}\n")}),requirejs.s.contexts._.nextTick=requirejs.nextTick;