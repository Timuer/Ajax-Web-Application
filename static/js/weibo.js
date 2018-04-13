var renderWeiboTemplate = function(weibo) {
	var id = weibo.id
	var title = weibo.title
	var article = weibo.article
	var votes = weibo.votes
	var ct = getTimeStamp(weibo.ct * 1000)
	var ut = getTimeStamp(weibo.ut * 1000)
	var weiboPane = `
	<li class="weibo-pane" id="weibo-${id}" data-id="${id}">
		<h3 class="weibo-title">${title}</h3>
		<p class="weibo-article">${article}</p>
		<div class="weibo-info">
			<span>点赞: ${votes}</span>
			<span>创建时间: ${ct}</span>
			<span>更新时间: ${ut}</span>
			<button class="edit-btn">编辑</button>
			<button class="del-btn">删除</button>
		</div>
	</li>
	`
	return weiboPane
}

var insertWeibos = function(fragment) {
	var weiboList = e(".weibo-list")
	weiboList.insertAdjacentHTML("beforeend", fragment)
}

var loadweibos = function() {
	var load = function(resp) {
		weibos = JSON.parse(resp)
		var fragment = ""
		for(var i = 0, len = weibos.length; i < len; i++) {
			var w = weibos[i]
			fragment += renderWeiboTemplate(w)
		}
		insertWeibos(fragment)
	}
	apiWeiboAll(load)
}

// 点击添加按钮

var addWeibo = function() {
	var title = e("#add-title").value
	var article = e("#add-article").value
	var weibo = {
		title: title,
		article: article,
	}
	var updatePage = function(resp) {
		var tmp = renderWeiboTemplate(JSON.parse(resp))
		insertWeibos(tmp)
	}
	apiWeiboAdd(weibo, updatePage)
}

// 点击编辑按钮

var renderEditTemplate = function(id) {
	var editTemplate = `
		<div class="update-pane" data-id="${id}">
			标题：<input type="text" class="update-title"><br/>
			正文：<textarea cols="50" rows="10" class="update-article"></textarea><br/>
			<button class="update-btn">更新</button>
		</div>
	`
	return editTemplate
}

var editWeibo = function(targetElem) {
	var pane = targetElem.closest(".weibo-pane")
	var tmp = renderEditTemplate(pane.dataset.id)
	pane.insertAdjacentHTML("beforeend", tmp)
	console.log(pane)
}

// 点击更新按钮

var updateWeibo = function(targetElem) {
	var pane = targetElem.closest(".update-pane")
	var id = pane.dataset.id
	var title = pane.querySelector(".update-title").value
	var article = pane.querySelector(".update-article").value
	var weibo = {
		id: id,
		title: title,
		article: article,
	}
	var updatePage = function(resp) {
		var w = JSON.parse(resp)
		var selector = "#weibo-" + w.id
		var weiboPane = e(selector)
		var fragment = renderWeiboTemplate(w)
		// 找到前一个兄弟节点，用于在它后面插入更新后的weibo
		var prevWeiboPane = weiboPane.previousElementSibling
		if (prevWeiboPane !== null) {
			weiboPane.remove()
			prevWeiboPane.insertAdjacentHTML("afterend", fragment)
		} else {
			var lst = weiboPane.closest(".weibo-list")
			weiboPane.remove()
			lst.insertAdjacentHTML("afterbegin", fragment)
		}
	}
	apiWeiboUpdate(weibo, updatePage)
}

// 点击删除按钮

var deleteWeibo = function(id) {
	e("#weibo-" + id).remove()
	apiWeiboDel(id, function() {
		console.log("删除成功")
	})
}

// 绑定各个事件

var bindEvents = function() {
	var weiboList = e(".weibo-list")
	weiboList.addEventListener("click", function(event) {
		var targetElem = event.target
		var cl = targetElem.classList
		if (cl.contains("edit-btn")) {
			editWeibo(targetElem)
		} else if (cl.contains("update-btn")) {
			updateWeibo(targetElem)
		} else if (cl.contains("del-btn")) {
			var id = targetElem.closest(".weibo-pane").dataset.id
			deleteWeibo(id)
		}
	})
	var addBtn = e(".add-btn")
	addBtn.addEventListener("click", function(event) {
		addWeibo()
	})
}

var _main = function() {
	loadweibos()
	bindEvents()
}

_main()

// 1. 发送获取weibo主页的请求
// 2. 发送获取所有weibo的AJAX请求，并且将weibo插入模板，更新到页面中。（loadweibos）
// 3. 为页面中的元素绑定所有事件
// 	3.1 点击添加按钮发送AJAX添加weibo请求，将返回的weibo更新到页面。（addweibo）
// 	3.2 点击编辑按钮在页面中插入一个输入框和按钮（editweibo）
// 	3.3 点击更新按钮将发送输入框中的内容（updateweibo）
// 	3.4 点击删除按钮发送删除weibo请求，更新页面
