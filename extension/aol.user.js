// ==UserScript==
// @name		Aol Reader No-ads
// @include		http://reader.aol.com/*
// @author		carlcarl
// @description Hide the ads and expand the content area in Aol. Reader
// ==/UserScript==

/*jslint browser:true */

function decorate() {
	"use strict";
	var ad, nav, content, header, body,
		navWidth, contentWidth,
		cssNode,
		MutationObserver, observer;

	body = document.body;
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	observer = new MutationObserver(function (mutationRecord, observer) {
		mutationRecord.forEach(function (mutation) {
			if (body.classList.contains('ready')) {
				ad = document.getElementById('reader-ad-container');
				nav = document.getElementsByTagName('nav');
				content = document.getElementById('reader-container');
				header = document.getElementById('feed-details');
				nav = nav[0];
				navWidth = nav.offsetWidth;

				// Hide ads
				ad.style.width = 0;
				ad.style.display = 'none';

				contentWidth = window.innerWidth - navWidth;
				cssNode = document.createElement('style');
				cssNode.innerHTML = '#reader-container{width:' + contentWidth.toString() + 'px;}' +
					'#feed-details{width:' + contentWidth.toString() + 'px;}' +
					'.article-item-full .article-content{width:95%;}';
				document.body.appendChild(cssNode);
				observer.disconnect();
			}
		});
	});
	observer.observe(body, {attributes: true, attributeFilter: ['class']});
}

decorate();

