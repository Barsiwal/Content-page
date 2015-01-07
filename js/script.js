var $items = $('#ct-grid div > li'),
	$window = $(window),
	$body = $('BODY'),
	currentIndex = -1,
	winsize = getWindowSize();

function initEvents() {
	$items.each(function () {
		var $item = $(this),
			$close = $item.find('span.close'),
			$overlay = $item.children('div.expand');
		$item.on('click', function () {
			if ($item.data('isExpanded')) {
				return false;
			}
			$item.data('isExpanded', true);
			$overlay.css({
				display: 'block',
			});
			currentIndex = $item.index();
			var layoutProp = getItemPosition($item),
				clipPropFirst = 'rect(' + layoutProp.top + 'px ' + (layoutProp.left + layoutProp.width) + 'px ' + (layoutProp.top + layoutProp.height) + 'px ' + layoutProp.left + 'px)',
				clipPropLast = 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)';
			$overlay.css({
				clip: clipPropFirst,
				opacity: 1,
				zIndex: 9999,
				pointerEvents: 'auto'
			});
			$overlay.on('transitionend', function () {
				$overlay.off('transitionend');
				setTimeout(function () {
					$overlay.css('clip', clipPropLast).on('transitionend', function () {
						$overlay.off('transitionend');
						$body.css('overflow-y', 'hidden');
					});
				}, 25);
			});
		});
		$close.on('click', function () {

			$body.css('overflow-y', 'auto');
			var layoutProp = getItemPosition($item),
				clipPropFirst = 'rect(' + layoutProp.top + 'px ' + (layoutProp.left + layoutProp.width) + 'px ' + (layoutProp.top + layoutProp.height) + 'px ' + layoutProp.left + 'px)',
				clipPropLast = 'auto';
			currentIndex = -1;
			$overlay.css({
				clip: clipPropFirst,
				opacity: 1,
				pointerEvents: 'none'
			});
			$overlay.on('transitionend', function () {
				$overlay.off('transitionend');
				setTimeout(function () {
					$overlay.css('opacity', 0).on('transitionend', function () {
						$overlay.off('transitionend').css({
							clip: clipPropLast,
							zIndex: -1
						});
						$overlay.css({
							display: 'none',
						});
						$item.data('isExpanded', false);
					});
				}, 25);
			});

		});
	});
}

function getItemPosition($item) {

	var scrollT = $window.scrollTop(),
		scrollL = $window.scrollLeft(),
		itemOffset = $item.offset();
	return {
		left: itemOffset.left - scrollL,
		top: itemOffset.top - scrollT,
		width: $item.outerWidth(),
		height: $item.outerHeight()
	};
}

function getWindowSize() {
	$body.css('overflow-y', 'hidden');
	var w = $window.width(),
		h = $window.height();
	if (currentIndex === -1) {
		$body.css('overflow-y', 'auto');
	}
	return {
		width: w,
		height: h
	};
}
initEvents();
(function () {

	function init() {
		var speed = 250,
			easing = mina.easeinout;

        [].slice.call(document.querySelectorAll('#grid > .hover')).forEach(function (el) {
			var s = Snap(el.querySelector('svg')),
				path = s.select('path'),
				pathConfig = {
					from: path.attr('d'),
					to: el.getAttribute('data-path-hover')
				};

			el.addEventListener('mouseenter', function () {
				path.animate({
					'path': pathConfig.to
				}, speed, easing);
			});

			el.addEventListener('mouseleave', function () {
				path.animate({
					'path': pathConfig.from
				}, speed, easing);
			});
		});
	}

	init();

})();
(function() {
	var button = $("button.menu__handle");
	var close = true;
	var menu = $("#menu");
	button.click(function () {
		if (close === false) {
			close = true;
			menu.removeClass('menu--anim');
			setTimeout(function () {
				menu.removeClass('menu--open');
			}, 250);
		}
		else {
			close = false;
			menu.addClass('menu--anim');
			setTimeout(function () {
				menu.addClass('menu--open');
			}, 250);
		}
	});
})();

