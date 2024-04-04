const $ = jQuery.noConflict();
var searchResultsGrid;

$(document).ready(function() {
  //  Back to page top
  $(window).scroll(function() {
    if ($(this).scrollTop() > $(window).height() / 2) {
      $('.page-back-top').addClass('shown');
    } else {
      $('.page-back-top').removeClass('shown');
    }
  });

  $('.page-back-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;;
  });

  //  Header
  const headerSubMenu = $('.header .header-navigation .has-sub')
  headerSubMenu.mouseenter(function () {
    $(this).find('.sub-menu').addClass('active').attr('aria-expanded', 'true');
    $(this).parent().find('a').attr('aria-expanded', 'true');
  });

  headerSubMenu.mouseleave(function () {
    $(this).find('.sub-menu').removeClass('active').attr('aria-expanded', 'false');
    $(this).parent().find('a').attr('aria-expanded', 'false');
  });
  
  headerSubMenu.click(function (e) {
    if (!$(e.target).parents('.sub-menu').length) {
      e.preventDefault();
      $(this).find('.sub-menu')
        .addClass('active')
        .attr('aria-expanded', function (i, attr) {
          return attr == 'true' ? 'false' : 'true'
        });

      $(this)
        .parent()
        .find('a')
        .attr('aria-expanded', function (i, attr) {
          return attr == 'true' ? 'false' : 'true'
        });
    }
  });

  //  Responsive header
  $('.header-toggle-hiddenarea').click(function (e) {
    e.preventDefault();
    $('.hidden-menu-overlay').fadeIn(500, function () {
      $('.responsive-hidden-menu').addClass('open');
    })
    return false;
  });

  $('.responsive-hidden-menu .close-btn, .hidden-menu-overlay').click(function () {
    $('.responsive-hidden-menu').removeClass('open');
    $('.hidden-menu-overlay').fadeOut();
    return false;
  });

  $('.responsive-hidden-menu .has-sub').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $(this).find('.sub-menu')
      .toggleClass('active')
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true'
      });

    $(this)
      .parent()
      .find('a')
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true'
      });

    return false;
  });

  // Overwrite the click function for the hidden menu toggler
  $('.responsive-hidden-menu .has-sub .sub-menu a').click(function (e) {
    document.location = e.target.href;    
  });

  //  Search modal
  $('.btn-search a').click(function (e) {
    e.preventDefault();
    $('.search-modal').fadeIn(500, 'swing', function () {
      $('.search-modal .modal-item, .search-modal .search-close-btn').fadeIn(250);
    })
  })

  $('.search-modal .search-close-btn, .search-modal').click(function (e) {
    if ($(e.target).hasClass('search-modal') || $(e.target).parents('.modal-item').length === 0) {
      $('.search-modal .modal-item, .search-modal .search-close-btn').fadeOut(500, 'swing', function () {
        $('.search-modal').fadeOut(250);
      })
    }
  })

  //  Features section
  if ($('.feature-section .swiper').length) {
    new Swiper('.feature-section .swiper', {
      autoplay: {
        delay: 7000,
      },
      allowTouchMove: false,
      effect: 'fade',
      speed: 1200,
      draggable: false,
      loop: true,
      pagination: {
        el: '.feature-section .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    })
  }

  //  Quote section
  if ($('.quote-section .swiper').length) {
    new Swiper('.quote-section .swiper', {
      autoplay: {
        delay: 7000,
      },
      speed: 1200,
      draggable: true,
      loop: true,
      pagination: {
        el: '.quote-section .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    })
  }

  // Initialize Isotope for search results
  if ($('.search-page .grid').length) {
    searchResultsGrid = new Isotope('.search-page .grid', {
      itemSelector: '.search-page .grid .post-item',
      layoutMode: 'masonry',
    })
  }

  //  Search results filters
  $('.search-results .search-filter [data-filter]').click(function () {
    if ($(this).hasClass('selected')) {
      return false
    }
    $('.search-results .search-filter [data-filter]').removeClass('selected')
    $(this).addClass('selected')

    const currentFilterType = $(this).data('filter')
    const items = $('.results-wrapper .post-item')

    if (!currentFilterType) {
      searchResultsGrid.arrange({ filter: items })
    } else {
      searchResultsGrid.hideItemElements(items.not('[data-type="' + currentFilterType + '"]'))
      searchResultsGrid.arrange({ filter: items.filter('[data-type="' + currentFilterType + '"]') });
    }

    return false
  })

  // Initialize Isotope for articles section
  if ($('.section-articles-list .isotope-container.three-in-row').length) {
    $('.section-articles-list .isotope-container.three-in-row').each(function (i, container) {
      $(container).isotope({
        itemSelector: '.section-articles-list .isotope-container.three-in-row .article-item',
        layoutMode: 'fitRows',
      })
    })
  }


})
