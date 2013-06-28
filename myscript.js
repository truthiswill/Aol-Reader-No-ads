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
					'#feed-details{width:' + contentWidth.toString() + 'px;}';
				document.body.appendChild(cssNode);
				observer.disconnect();
			}
		});
	});
	observer.observe(body, {attributes: true});
}

window.onload = decorate;
