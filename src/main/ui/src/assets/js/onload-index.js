$(document).ready(function(){

  // setting up tabs
  $("#mainTabs").tabs();
  $("#insideTabs").tabs();

  // calendar
  $("#calendar").datepicker();

  // side menu code
  $('#side-menu ul').hide();
  $('#side-menu li a.submenu-link').addClass('bg-close');

  $('#side-menu li a.open').removeClass('bg-close').addClass('bg-open').next().slideDown('slow');

  $('#side-menu li a.submenu-link:not(.no-submenu)').click(function() {

    var submenu         = $(this).next();
    var submenu_link    = $(this);
    var submenu_visible = submenu.is(':visible');

    // close all submenus and set up classes to - close
    $('#side-menu ul').slideUp('normal');
    $('#side-menu > li a.submenu-link').removeClass('bg-open').addClass('bg-close');

    // close submenu - nothing is happening - all submenus are already closed by previous code  
    if((submenu.is('ul')) && submenu_visible) {
    }

    // open submenu and set up classes
    if((submenu.is('ul')) && (!submenu_visible)) {
        submenu.slideDown('slow');
        submenu_link.removeClass('bg-close').addClass('bg-open');
    }
    
    return false;
  });

	$('#side-menu li a.no-submenu').click(function () {
			window.location.href = $(this).attr('href'); 
			return false;
	}); 

  // Fancybox window
	$("a.zoom").fancybox({
    'padding' : 0,
		'overlayOpacity'	:	0.3,
		'zoomSpeedIn'		:	500,
		'zoomSpeedOut'		:	500,
		'frameWidth' : 420,
		'frameHeight' : 330,
		'hideOnOverlayClick' : true,
		'hideOnContentClick' : true
	});

  // Messages
  $('.message-wrapper .close').click(function(event) {
    var message = $(this).parent();
    message.slideUp('slow');
    event.preventDefault();
  });

  // Wysiwyg editor
  $('.wysiwyg').wysiwyg({
    css: 'css/editor.css'
  });

  // Data table styling differs if MSIE6
  if (!$.browser.msie || ($.browser.msie && $.browser.version != '6.0')) {
      $('.data-table tbody tr:even').addClass('even');
      $('.data-table tbody tr:odd').addClass('odd');
      $('.data-table tbody tr td:first-child').addClass('select');
      $('.data-table tbody tr').mouseover(function () {
        $(this).addClass('over');
      });
      $('.data-table tbody tr').mouseout(function () {
        $(this).removeClass('over');
      });
  } else {
      $('.data-table tbody tr').addClass('odd');
      $('.data-table tbody tr td:first-child').addClass('select');
  }

});