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
					if (data) {

						setValue(data.title, '.form-wrap__title--js');
					}
					 
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
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	JSCCommon.CustomInputFile();


	// modal window

	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '12_WP_B24_интергация.png';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect

	$(document).on('click', '.btn-top', function () {
		let th = $(this);
		th.addClass('active');
		$('html, body').animate({ scrollTop: 0 }, 1500, function () {
			th.removeClass('show').removeClass('active')
			
		});
	})
	function whenResize() {
		const topH = document.documentElement.clientHeight / 2;
		if ($(window).scrollTop() > topH) {
			$('.btn-top  ').addClass('show');
		} else {
			$('.btn-top  ').removeClass('show').removeClass('active');
		}

	}

	window.addEventListener('resize ', () => {
		whenResize();

	}, { passive: true });
	$(window).scroll(function () {
		whenResize();

	});

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

	//  accardion 
 
	$('.navMenu .drop-accardion-js').click(function(){
		$(this).parent().toggleClass('active')
		.find('.drop-accardion-toggle-js').toggleClass('active');
	})
	
	//  accardion base
	$(".drop-accardion-block").each(function () {
		const toggle = $(this).find('.drop-accardion-js')
		toggle.click(function(){
			const th = $(this);
		 th.parent().toggleClass('active')
			.find('.drop-accardion-toggle-js').slideToggle(function () {
				$(this).toggleClass('active');
			});
			th.parent().removeClass('active').siblings().find('.drop-accardion-js').removeClass('active');
			th.parent().siblings().find('.drop-accardion-toggle-js').slideUp(function () {
				$(this).removeClass('active');
			});
		})
	})

	$('.accardion-close-js').click(function(){
		$(this).parent().removeClass('active');
	})

	// const galleryThumbs = new Swiper('.gallery-thumbs', {
	// 	spaceBetween: 0,
	// 	slidesPerView: 4, 
	// 	watchSlidesVisibility: true,
	// 	watchSlidesProgress: true,
	// 	watchOverflow: true
	// 	// clickable: true,

	// });
	const galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 0,
		disableOnInteraction: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			delay: 5000,
		},
		// thumbs: {
		// 	swiper: galleryThumbs
		// },
		lazy: {
			loadPrevNext: true,
		},
	});

	galleryTop.on('slideChange', function () {
		// console.log(galleryTop.realIndex);
		$('.slideThumb--js').eq(galleryTop.realIndex).addClass('active').siblings().removeClass('active')
	});

	$('.headerBlock .slideThumb--js').click(function () {
		let index = $(this).index();
		galleryTop.slideTo(index);
		$(this).addClass('active').siblings().removeClass('active')
	})

	
	$(".headerBlock .slideThumb--js").mouseenter(function() {
		galleryTop.autoplay.stop();
	});

	$(".slideThumb--js").mouseleave(function() {
		galleryTop.autoplay.start();
	});


	const galleryThumbs2 = new Swiper('.prioritizeS-thumbs-js', {
		spaceBetween: 8,
		slidesPerView: 'auto', 
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		// loop: true,

		// clickable: true,
		lazy: {
			loadPrevNext: true,
		},
	});
	const galleryTop2 = new Swiper('.prioritizeS-top-js', {
		spaceBetween: 0,
		// loop: true,

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
		autoplay: {
			delay: 5000,
		},
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
		slidesPerView: 'auto',
		// freeMode: true,
		spaceBetween: 10,
		loop: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			440: {
				spaceBetween: 32,
				slidesPerView: 'auto'
			},
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



	const ourWorksSlider = new Swiper('.sOurWorks__slider--js', {
		slidesPerView: 1,
		// freeMode: true,
		// loop: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true, 
		breakpoints: {
			992: {
				spaceBetween: 30,
				slidesPerView: 4,
				// noSwiping: false,
			}
		},
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: '.sOurWorks .swiper-button-next',
			prevEl: '.sOurWorks .swiper-button-prev',
			hiddenClass: 'swiper-button-hidden'
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


	if ('.stickyItem') {
		$('.stickyItem').hcSticky({
			stickTo: '.stickyContainer'
		});
	}
 
			let aside = $('.sCatalogHorizontal__aside'); 
			aside.hcSticky({
				// stickTo: $(this)
			});  
	
	// // Cache selectors
	var lastId,
		solutionsMenu = $(".solutionsMenu--js"),
		solutionsMenuHeight = 20,
		topMenuHeight = solutionsMenu.height(),
		// solutionsMenuHeight = solutionsMenu.outerHeight()+15,
		// All list items
		menuItems = solutionsMenu.find(".solutionsMenu__item"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
		menuItems.click(function (e) {
			var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight - 50;
			$('html, body').stop().animate({
				scrollTop: offsetTop
			}, 1100);
			e.preventDefault();
		});
	
		// Bind to scroll
		$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop() + topMenuHeight;
	
			// Get id of current scroll item
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : "";
	
			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
					.removeClass("active").parent()
					.end().filter("[href='#" + id + "']").addClass("active");
			}
		});
		
	
	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated',
	});
	wow.init();
	let progress = document.querySelector('.pieProgress');
	if (progress) {
	const bar = $('.pieProgress');

	var target = bar;
	var targetPos = target.offset().top;
	var winHeight = $(window).height();
	var scrollToElem = targetPos - winHeight;
	$(window).scroll(function () {
		var winScrollTop = $(this).scrollTop();
		if (winScrollTop > scrollToElem) {
			//сработает когда пользователь доскроллит к элементу с классом .elem
			startPrigess()
		}
	}); 
	const arr = {
		namespace: 'pie_progress',
		easing: 'linear',
		min: 0,
		first: 0,
		size: 68,
		barcolor: '#ec1c24',
		barsize: '4',
		speed: 30,
		trackcolor: '#f5f7f9', 
		goal: 0,
	}
	const bar1 = $('.col-circle:nth-child(1) .pieProgress');
	const bar2 = $('.col-circle:nth-child(2) .pieProgress');
	const bar3 = $('.col-circle:nth-child(3) .pieProgress');
	const bar4 = $('.col-circle:nth-child(4) .pieProgress');
	bar1.asPieProgress(arr);  
	bar3.asPieProgress(arr);  
	bar4.asPieProgress(arr);  
	bar2.asPieProgress(arr);  
	function startPrigess() {  
		bar1.asPieProgress('start'); 
		bar1.on('asPieProgress::finish', () => {
			setTimeout(() => {
				
				bar2.asPieProgress('start'); 
			}, 10);
		});
		bar2.on('asPieProgress::finish', () => {
			setTimeout(() => {
	
				bar3.asPieProgress('start');
			}, 10);
		});
		bar3.on('asPieProgress::finish', () => {
			setTimeout(() => {
	
				bar4.asPieProgress('start');
			}, 10);
		});
	}
	}
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
