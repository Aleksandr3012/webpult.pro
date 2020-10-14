const JSCCommon = {
	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			eforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					if (data) {}
					setValue(data.title, '.form-wrap__title--js');
					 
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '20.jpg';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//header accardion 
	$('.drop-accardion-js').click(function(){
		$(this).parent().toggleClass('active');
		$(this).parent().find('.drop-accardion-toggle-js').toggleClass('active');
	})

	$('.accardion-close-js').click(function(){
		$(this).parent().removeClass('active');
	})

	const galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 0,
		slidesPerView: 4, 
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true
		// clickable: true,

	});
	const galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs
		},
		lazy: {
			loadPrevNext: true,
		},

	});

	$('.slideThumb--js').click(function () {
		let index = $(this).index();
		galleryTop.slideTo(index);
		$(this).addClass('active').siblings().removeClass('active')
	})


	const galleryThumbs2 = new Swiper('.prioritizeS-thumbs-js', {
		spaceBetween: 8,
		slidesPerView: 'auto', 
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		loop: true,

		// clickable: true,
		lazy: {
			loadPrevNext: true,
		},
	});
	const galleryTop2 = new Swiper('.prioritizeS-top-js', {
		spaceBetween: 0,
		loop: true,

		navigation: {
			nextEl: '.sPrioritize .sPrioritize__nextBtn',
			prevEl: '.sPrioritize .sPrioritize__prevBtn',
		},
		thumbs: {
			swiper: galleryThumbs2
		},
		lazy: {
			loadPrevNext: true,
		},

	});
	

	const cardSlider = new Swiper('.cardSlider', {
		slidesPerView: 1,
		// freeMode: true,
		// loop: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		noSwipingClass: 'swiper-no-swiping',
		noSwiping: true,
		breakpoints: {
			992: {
				spaceBetween: 30,
				slidesPerView: 2,
				// noSwiping: false,
			}
		},
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: '.sCards .sCards__nextBtn',
			prevEl: '.sCards .sCards__prevBtn',
			hiddenClass: 'swiper-button-hidden'
		},
	});


	const blogSlider = new Swiper('.blogSlider', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		// loop: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			768: {
				slidesPerView: 2,

			},
			1200: {
				slidesPerView: 3,
			}
		},
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: '.sBlog .sBlog__nextBtn',
			prevEl: '.sBlog .sBlog__prevBtn',
			hiddenClass: 'swiper-button-hidden'
		},
	});

	const competenceSlider = new Swiper('.competenceSlider-js', {
		spaceBetween: 32,
		slidesPerView: 'auto',
		// freeMode: true,
		loop: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			992: {
				spaceBetween: 63,
				slidesPerView: 4
			}
		},
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: '.sCompetences .sCompetences__next',
			prevEl: '.sCompetences .sCompetences__prev',
		},
	});
	

	// клонирование значений таблицы в модалку
	let modalTable = "#modal-cloud";
	
	$('[href="#modal-cloud"]').click(function () {
		let table = $(modalTable + " table");
		let number = $(this).parents("th").index();
		table.html(
			$(this).parents('table').html()
			)
			$(modalTable).find('thead').remove()
			console.log(number);
			
			
			table.find('td').not(':nth-child(' + (number + 1) + ')').not(':nth-child(1)').remove() 
			
			// $(modalTable).find('td').not().remove()
		})
		// /клонирование значений таблицы в модалку
		
		// hide/show text
	let btnMore = document.querySelector(".sPreview__more--js");
	if (btnMore) {
		btnMore.addEventListener('click', (e) => {
			e.preventDefault();
			document.querySelector(".sPreview__toggle-block--js").classList.toggle('active');
		})
	}

	$('.sPreview__toggle-block--js').moreLines({
		linecount: 3,                   	// force moreLines after a certain  
		buttontxtmore: "Подробнее",     	// Add your inner text for button
		buttontxtless: "Cкрыть",     	// Add your inner text for button
		animationspeed: 250             	// Type your custom speed animation, by defaul is 'auto' auto = 1
	});
	// /hide/show text
	//custom input file
	// ;(function (document, window, index){
	// 	'use strict';
	// 	var inputs = document.querySelectorAll('.add-file__input');
	// 	Array.prototype.forEach.call(inputs, function (input) {
	// 		var label = input.nextElementSibling,
	// 				labelVal = label.innerHTML;

	// 		input.addEventListener('change', function (e) {
	// 			var fileName = '';
	// 			if (this.files && this.files.length > 1){
	// 				fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
	// 			}else{
	// 				fileName = e.target.value.split('\\').pop();
	// 			}

	// 			if (fileName){
	// 				label.querySelector('.add-file__text').innerHTML = fileName;
	// 			}else{
	// 				label.innerHTML = labelVal;
	// 			}
	// 		});

	// 		// Firefox bug fix
	// 		input.addEventListener('focus', function () {
	// 			input.classList.add('has-focus');
	// 		});
	// 		input.addEventListener('blur', function () {
	// 			input.classList.remove('has-focus');
	// 		});
	// 	});
	// }(document, window, 0));

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
