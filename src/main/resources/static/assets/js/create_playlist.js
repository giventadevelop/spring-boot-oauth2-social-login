/*jquery for layout builder
@author: kyle knox
 */

function initPlaylistBuilder() {
	// get media files
	loadMediaFiles('all');

	// get playlists
	loadPlaylists();
	
	// rss and weather feeds
	var b = [""];
	
	// rss
	
	b.push('<div style="float:left;margin:0px 10px;"><h4>RSS</h4><div class="external-event ui-draggable" style="z-index: auto; width:50px;">');
	b.push('<div id="imgid" class="e_id" style="display:none;">1</div>');
	b.push('<div id="isRssFeed" style="display:none;">1</div>');
	b.push('<div id="isWeatherFeed" style="display:none;">0</div>');
	b.push('<div id="title" style="display:none;"><a class="tip" href="#" title="">RSS</a></div>');
	b.push('<div><img src="images/rss_icon.jpg" alt="Loading" /></div>');
	b.push('</div></div>'); 

	// weather
	b.push('<div style="float:left;margin:0px 10px;" id="weatherBtn"><h4>Weather</h4><div class="external-event ui-draggable" style="z-index: auto;width:50px;">');
	b.push('<div id="imgid" class="e_id" style="display:none;">1</div>');
	b.push('<div id="isRssFeed" style="display:none;">0</div>');
	b.push('<div id="isWeatherFeed" style="display:none;">1</div>');
	b.push('<div id="title" style="display:none;"><a class="tip" href="#" title="">Weather</a></div>');
	b.push('<div><img src="images/weather_icon.png" alt="Loading" height="50px;"/></div>');
	b.push('</div></div>');

	$("#rss_and_weather").append(b.join(""));
	$("#rss_and_weather").css('width','100%');
	$("#rss_and_weather").css('overflow','auto');
	
	$("#rss_and_weather div.ui-draggable").each(function () {
		// add draggable handle
		$(this).draggable({
			zIndex: 999,
			revert: true,
			revertDuration: 0,
			helper: 'clone',
			appendTo: 'body'
		});
	});
	
	// set width of center col container relative to screen size
	var sw = $(window).width();
	$('#centerCol').width(sw-500);
	
	// close form
	$("#close, #btn-close").click(function (a) {
		// prevent default click action
        a.preventDefault();
        
        closeDetailsWindow();
	});
	
	// submit form
	$('#update').click(function(event) {
		var duration = $("#duration").val();
		var durationInSec = convertToSec(duration);

		if(duration.length < 1 || durationInSec < 1){
			alert("Please enter the Duration");
			event.preventDefault();
		}

		$.ajax({
			url : 'updatePlayListItem',
			data : {
				playlistitemid: $('#playlistItemId').val(),
				duration : $('#duration').val(),
				playorder : $('#order').val()
			},
			success : function(doc) {
				if ($.trim(doc) == '') {
					$("#msg").css({
						top: 250
					}).show();
					$('#msg').html("File Updated..");
					$('#msg').removeClass("msgattention");
					$('#msg').addClass("msgok");
					
					closeDetailsWindow();
				} else {
					$('#msg2').css({
						top : 250
					}).show();
					$('#msg2').html("Error updating file.");
					$('#msg2').removeClass("msgok");
					$('#msg2').addClass("msgattention");
				}
			}
		});
	});

	// delete from form
	$("#delete").click(function (a) {
		// prevent default click action
		a.preventDefault();

		$('#msg2').html('');
		$('#msg2').removeClass("msgok");
		$('#msg2').removeClass("msgattention");

		if (!confirm("Delete?")) return;
		
		var eIds = new Array();
		eIds.push($('#playlistItemId').val());
		
		$.ajax({
			url: "deleteCheckedPlayListItems",
			data: {
				eventIdsToRemove: eIds
			},
			success: function(a) {
				$("#msg").css({
					top: 250
				}).show();
				
				$("#msg").html("Event deleted");
				$("#msg").removeClass("msgattention");
				$("#msg").addClass("msgok");

				var j = 1, playingOrderArray = new Array(), playlistitemidArray = new Array();
				
				$('#playlistEditor .external-event').each(function(i) {
					if ($(this).data('id') != eIds[0]) {
						playlistitemidArray.push($(this).data('id'));
						playingOrderArray.push(j++);
					}
				});
				
				saveChanges(playlistitemidArray, playingOrderArray);
				
				// close pop-up
				$("#mask, .window").hide();
				
				// close pop-up
				$("#mask, .window").hide();
			}
		});
	});
	
	
	// multi-delete
	$('#multiDelete').click(function(event) {
		event.preventDefault();
		
		// get array of checked events
		var eIds = new Array();
		
		$('[name="chkEventDelete"]:checked').each(function(index) {
			eIds.push($(this).val());
		});

		// ask for confirmation
		if (eIds.length > 0 && confirm('Are you sure you wish to delete the selected files?')) {
			$.ajax({
				url: "deleteCheckedPlayListItems",
				data: {
					eventIdsToRemove: eIds
				},
				success: function(a) {
					$("#msg").css({
						top: 250
					}).show();
					
					$("#msg").html(eIds.length+" events deleted");
					$("#msg").removeClass("msgattention");
					$("#msg").addClass("msgok");

					var j = 1, playingOrderArray = new Array(), playlistitemidArray = new Array();
					
					$('#playlistEditor .external-event').each(function(i) {
						if (jQuery.inArray($(this).data('id').toString(10), eIds) < 0) {
							playlistitemidArray.push($(this).data('id'));
							playingOrderArray.push(j++);
						}
					});

					saveChanges(playlistitemidArray, playingOrderArray);
				}
			});
		}
	});
	
	// save order
	$('#saveChanges').click(function(event) {
		event.preventDefault();
		
		var playingOrderArray = new Array(), playlistitemidArray = new Array();
		
		$('#playlistEditor .external-event').each(function(i) {
			playlistitemidArray.push($(this).data('id'));
			playingOrderArray.push(i+1);
		});

		saveChanges(playlistitemidArray, playingOrderArray);
	});
	
	// shuffle
	$('#shuffle').click(function(event) {
		event.preventDefault();
		
		var playingOrderArray = new Array(), playlistitemidArray = new Array();
		
		// get playlist items
		$('#playlistEditor .external-event').each(function(i) {
			playlistitemidArray.push($(this).data('id'));
		});

		// shuffle items
		playlistitemidArray.sort(function() {return 0.5 - Math.random()});

		// build the order array
		for (var i = 0; i < playlistitemidArray.length; i++) {
			playingOrderArray.push(i+1);
		}

		$.ajax({
			url: "updatePlayListItems",
			data: {
				playlistidArray: playlistitemidArray,
				playingOrderArray: playingOrderArray
			},
			success: function(a) {
				$("#msg").css({
					top: 250
				}).show();
				
				$("#msg").html("Play order shuffled");
				$("#msg").removeClass("msgattention");
				$("#msg").addClass("msgok");

				refetchEvents($('#plId').val(), $('#plBg').val());
			}
		});
	});
};

function buildPlaylistEditor() {
	clearLayout();
	
	$('#playlistEditor').addClass('sortable');
	
	// add drop handlers
	$('#playlistEditor').droppable({
		accept: '.ui-draggable',
		drop: function (event, ui) {
			// get values of object
			var data, ext, pass, dlg, b = ui.draggable;
            var disTxt = '';
            var disTxtId = 0;
            if(b.find("#isDisplayText").html() != null) {
              disTxt = b.find("#isDisplayText").html();
            }
            
            if(b.find("#displayTextId").html() != null) {
              disTxtId = b.find("#displayTextId").html();
            }
            
			data = {
					'fileId' : b.find("#fileid").html(),
					'playlistid' : $("#plId").val(),
					'playorder' : getNextPlayOrderInSet(),
					'isDisplayText': disTxt,
					'displayTextId': disTxtId,
					'isWeather':'',
					'isRssFeed':''					
				};
				
				if (b.find("#imgid").html()) {
					data.isRssFeed = b.find("#isRssFeed").html();
					data.isWeather = b.find("#isWeatherFeed").html();
					data.fileId = 0;
					ext = '';
				} else {
					ext = getExtension(b.find(".tip").html());
				}

				if ($('#plBg').val() == 1) {
					pass = (ext == 'mp3') ? true : false;
					dlg = 'This is a background playlist. Only audio files may be added.';
				} else {
					pass = (ext != 'mp3') ? true : false;
					dlg = 'This is a foreground playlist. Audio files cannot be added.';
				}

			if (pass) {
				// save event
				$.get('saveNewPlayListItem', data, function(response) {
					// set form values
					$('#form #playlistId').val(data.playlistid);
					$('#form #playlistItemId').val($.trim(response));
					$('#form #fileId').val(data.fileId);
					$('#form #order').val(data.playorder);
					$('#form #displayTextId').val(data.displayTextId);
					$('#form #isDisplayText').val(data.isDisplayText);
					$('#form #f_name').html(b.find(".tip").html());
					$('#form #f_fid').html(data.fileId);
					
					if(data.isDisplayText == 1) {
						$('#form #f_fid').html('NA');
					}
					
					$('#form #f_po').html(data.playorder);
					$('#form #duration').val('00:00:00');
					
					displayForm();
				});
			} else {
				alert(dlg);
			}
		}
	});
}

function getNextPlayOrderInSet() {
	var po = 1;
	
	$('#playlistEditor .external-event').each(function(i, a) {
		po++;
	});
	
	return po;
}

function addFileToPlaylist(f) {
	var section = $('#playlistEditor');
	var id, title, classes = new Array(), styleCSS;
	var html = '';
		
	styleCSS = 'margin:2px 0px;';
	
	classes.push('external-event');
	classes.push('tip');
	
	// tooltip text
	title = f.mediaFileName+"<br />File Id: "+f.mediaFileId+"<br />Playing Order: "+f.mediaPlayingOrder+"<br/>Duration: "+f.mediaPlayDuration;
	
	id = f.mediaPlayListItemId+'-'+f.mediaFileId;
	
	html += '<div id="'+id+'" title="'+htmlEscape(title)+'" class="'+classes.join(' ')+'" style="'+styleCSS+'">';
	
	// display sort handle
	html += '<div style="float:left;width:4%;position:relative;top:-3px;"><h3 style="color:#ddd;">'+f.mediaPlayingOrder+'.</h3></div>';
	
	// display checkbox
	html += '<div style="float:left;width:4%;position:relative;top:-3px"><input type="checkbox" value="'+f.mediaPlayListItemId+'" name="chkEventDelete" /></div>';
	
	// display filename
	html += '<div class="fc-event-title" style="float:left;width:50%;">'+f.mediaFileName+((f.mediaFileId) ? ' (File Id: '+f.mediaFileId+')' : '')+'</div>';
	
	// display duration
	html += '<div class="fc-event-time">Duration: ' + htmlEscape(f.mediaPlayDuration) + ' </div>';
	
	html += '</div>';
	
	section.append(html);

	// bind data to event object
	$('#'+id).data('playlistId', $("#screenLayoutId").val());
	$('#'+id).data('id', f['mediaPlayListItemId']);
	$('#'+id).data('fileId', f['mediaFileId']);
	$('#'+id).data('fileName', f['mediaFileName']);
	$('#'+id).data('duration', f['mediaPlayDuration']);
	$('#'+id).data('order', f['mediaPlayingOrder']);
	$('#'+id).data('isRssFeed', f['isRssFeed']);
	$('#'+id).data('isWeather', f['isWeather']);
	
	$('#'+id).click(function (event) {
		var $target = $(event.target);
		
		if (!($target.is('input') || $target.is('h3'))) {
			event.preventDefault();

			// set form values
			$('#form #playlistId').val($(this).data('playlistid'));
			$('#form #playlistItemId').val($(this).data('id'));
			$('#form #fileId').val($(this).data('fileId'));
			$('#form #order').val($(this).data('order'));
				
			$('#form #f_name').html($(this).data('fileName'));
			$('#form #f_fid').html($(this).data('fileId'));
			$('#form #f_po').html($(this).data('order'));
				
			$('#form #duration').val($(this).data('duration'));
			
			displayForm();
		}
    });
}

function openPlaylistForm(type) {
	resetPlaylistForm();
	
	// set dialog heading
	$('#addplaylist h3').html('New Playlist');
	
}

function resetPlaylistForm() {
	// clear fields
	$('#addplaylist #playListTitle').val('');
	$('#addplaylist #playListDesc').val('');

	// clear messages
	$('#addplaylist #msg1').html('');
	$('#msg1').removeClass("msgok");
	$('#msg1').removeClass("msgattention");
	$('#msg1').hide();
}

function savePlaylist() {
	$.ajax({url: "createNewPlayList",
		data : {
			playListTitle: $('#addplaylist #playListTitle').val(),
			playListDesc: $('#addplaylist #playListDesc').val(),
			playListBackground: $('#addplaylist #playListBackground').is(':checked')
		},
		success: function (a) {
			$("#msg1").html("Playlist created");
			$("#msg1").removeClass("msgattention");
			$("#msg1").addClass("msgok");
			$("#msg1").show();
			
			loadPlaylists();
			var bg = ($('#addplaylist #playListBackground').is(':checked')) ? 1 : 0;
			refetchEvents(parseInt(a, 10), bg);
		}
	});
}

function closeDialog() {
	$('#addplaylist').dialog('close');
}

function deletePlaylist(pl) {
	if (!confirm('Are you sure you wish to delete this playlist?')) {
		return false;
	}

	$.ajax({url: "deleteplaylist",
		data : {
			'mediaPlayListBean.mediaPlayListId' : pl
		},
		success: function (a) {
			$("#msg").html("Playlist removed");
			$("#msg").removeClass("msgattention");
			$("#msg").addClass("msgok");
			$("#msg").show();
			
			loadPlaylists();
			clearLayout();
		}
	});
}

function loadTips() {
	 $(".tip").tipTip({
		maxWidth: "250px", 
		edgeOffset: 10, 
		delay:100, 
		fadeIn: 300, 
		defaultPosition: "right"
	});
}

function closeDetailsWindow() {
	var durationInSec = convertToSec($("#duration").val()), ext = getExtension($('#form').find('#f_name').html()), pass = false, errMsg;
	errMsg = (ext == 'mp4') ? 'Please select a duration of at least 1 minute.' : 'Please select a duration of at least 20 seconds.';
	

	
	
	if (ext == 'mp4' && durationInSec >= 60) {
		pass = true;
	} else if (ext != 'mp4' && durationInSec >= 20) {
		
		if (ext == 'RSS' && durationInSec > 240) {
			pass = false;
			errMsg =  'Please select a duration less than 4 minutes for RSS.';
		} else if(ext == 'Weather' && durationInSec > 240) {
			pass = false;
			errMsg =  'Please select a duration less than 4 minutes for Weather.';
		}else{
			pass = true;
		}
		
		
	}

	if (pass) {
		$('#msg2').html('');
		$('#msg2').removeClass("msgok");
		$('#msg2').removeClass("msgattention");
		
		$('#form #duration').val('');
		
		$("#mask, #detailsWindow .window").hide();
		
		refetchEvents($('#plId').val(), $('#plBg').val());
	} else {
		alert(errMsg);
	}
}


function loadSort() {
	$(".sortable").sortable({
		handle: 'h3'
	});
}

function loadPlaylists() {
	$("#pl-media").html('');
	$("#pl-audio").html('');
	
	$.getJSON("getMediaOnlyPlayList", {
		tags : "tags"
	}, function (a) {
		var b = [""];
		var pTitle;
		filesdata = a;

		$.each(a.playlist, function (a, items) {
			pTitle = items.title +"<br/><p>Duration: "+items.duration+"<br/>Filetype: "+items.filetype+"<br/>Background Playlist: "+(items.playbackground > 0 ? 'Yes' : 'No')+"<br/>Description:<br/>"+items.description+"</p>";
			b.push('<div class="external-event" style="position: relative; z-index: auto; left: 0px; top: 0px;">');
			b.push('<div id="playlistid" class="e_id" style="display:none;">'+items.id+'</div>');
			b.push('<div id="playbackground" style="display:none;">'+items.playbackground+'</div>');
			b.push('<div class="title"><a href="javascript:void(0);" class="tip" title="Delete this playlist:<br />'+items.title+'" onclick="deletePlaylist('+items.id+');"><img class="img_add" style="right:0px;top:-8px;" src="images/delete3.png" /></a> <a href="javascript:void(0);" class="tip" title="'+pTitle+'">'+items.title+'</a></div>');
			b.push('</div>');
			b.push('</div>');
		});

		$("#pl-media").append(b.join(""));
		$("#pl-media").css('height','220px');
		$("#pl-media").css('overflow','auto');
		
		loadTips();
		
		$("#pl-media div.external-event").each(function () {
			// add click handle
			$(this).click(function(e) {
				var $target = $(e.target);
				
				if (!$target.is('img')) {
					refetchEvents($(this).find('#playlistid').html(), $(this).find('#playbackground').html());
				}
			});
		});
	});
	
	$.getJSON("getAudioOnlyPlayList", {
		tags : "tags"
	}, function (a) {
		var b = [""];
		var pTitle;
		filesdata = a;

		$.each(a.playlist, function (a, items) {
			pTitle = items.title +"<br/><p>Duration: "+items.duration+"<br/>Filetype: "+items.filetype+"<br/>Background Playlist: "+(items.playbackground > 0 ? 'Yes' : 'No')+"<br/>Description:<br/>"+items.description+"</p>";
			b.push('<div class="external-event" style="position: relative; z-index: auto; left: 0px; top: 0px;">');
			b.push('<div id="playlistid" class="e_id" style="display:none;">'+items.id+'</div>');
			b.push('<div id="playbackground" style="display:none;">'+items.playbackground+'</div>');
			b.push('<div class="title"><a href="javascript:void(0);" class="tip" title="Delete this playlist:<br />'+items.title+'" onclick="deletePlaylist('+items.id+');"><img class="img_add" style="right:0px;top:-8px;" src="images/delete3.png" /></a> <a href="javascript:void(0);" class="tip" title="'+pTitle+'">'+items.title+'</a></div>');
			b.push('</div>');
			b.push('</div>');
		});

		$("#pl-audio").append(b.join(""));
		$("#pl-audio").css('height','220px');
		$("#pl-audio").css('overflow','auto');
		
		loadTips();
		
		$("#pl-audio div.external-event").each(function () {
			// add click handle
			$(this).click(function(e) {
				refetchEvents($(this).find('#playlistid').html(), $(this).find('#playbackground').html());
			});
		});
	});
}

function loadMediaFiles(f) {
	$('#external-events').html('');
	
	var func;
	
	if (f == 'no-audio') {
		func = 'getnoaudiofiles';
	} else if (f = 'audio') {
		func = 'getaudiofiles';
	} else {
		func = 'getfiles';
	}
	
	$.getJSON(func, {
		tags: "cat"
	}, function (a) {
		// description, duration, fileid, filename, filetype, thumburl, url
		var b = [""];
		var mTitle, ext, fileClass;
		filesdata = a;
		$.each(a.files, function (a, c) {
			ext = getExtension(c.filename);
			
			if (ext == 'mp3' || ext == 'mp4' || ext == 'flv' || ext == '3gp') {
				fileClass = 'audio'
			} else {
				fileClass = 'non-audio';
			}
			
			mTitle = c.filename +"<br/><p>Duration: "+c.duration+"<br/>Filetype: "+c.filetype+"<br/>Description:<br/>"+c.description+"</p>";
			
			b.push('<div class="external-event ui-draggable '+fileClass+'" style="float:left;position:relative; z-index:auto; left:0px; top:0px;">');
			b.push('<div id="url" style="display:none;" class="e_url">'+c.thumburl+'</div>');
			b.push('<div id="fileid" style="display:none;" class="e_id">'+c.fileid+'</div>');
			b.push('<img style="float:left;" class="m_img" src="'+c.thumburl+'" />');
			b.push('<div style="float:left; width:90px;" id="title"><a class="tip" href="#" title="'+mTitle+'">'+c.filename+'</a></div>');
			b.push('</div>');
			
			nffile = a;
		});

		$("#nooffiles").html("Files present:" + nffile);
		$("#external-events").append(b.join(""));
		$("#external-events").css('width','170px');
		$("#external-events").css('height','500px');
		$("#external-events").css('overflow','auto');
		
		loadTips();
		
		$("#external-events div.ui-draggable").each(function () {
			// add draggable handle
			$(this).draggable({
				zIndex: 999,
				revert: true,
				revertDuration: 0,
				helper: 'clone',
				appendTo: 'body'
			});
		});
	});
}

function refetchEvents(id, bg) {
	clearLayout();

	$.getJSON('getPlayListItemsForPlayList', {
		playlistid : id
	}, function(a) {
		// build playlist editor
		buildPlaylistEditor();
		
		$('#plId').val(id);
		$('#plBg').val(bg);
		
		if (bg == 0) {
			loadMediaFiles('no-audio');
			$('#weatherBtn').show();
		} else {
			loadMediaFiles('audio');
			$('#weatherBtn').hide();
		}

		// add items to respective area
		$.each(a.files, function (a, file) {
			addFileToPlaylist(file);
		});
		
		if (a.files.length == 0) {
			$('#playlistEditor').html('<div align="center">-No Playlist Items Added-</div>');
		}
		
		loadTips();
		loadSort();
	});
}

function clearLayout() {
	$('#playlistEditor').html('');
	$('#playlistEditor').removeClass('sortable');
}

function saveChanges(ids, order) {
	$.ajax({
		url: "updatePlayListItems",
		data: {
			playlistidArray: ids,
			playingOrderArray: order
		},
		success: function(a) {
			$("#msg").css({
				top: 250
			}).show();
			
			$("#msg").html("Play order updated");
			$("#msg").removeClass("msgattention");
			$("#msg").addClass("msgok");

			refetchEvents($('#plId').val(), $('#plBg').val());
		}
	});
}

function displayForm() {
	$("#delete, #btn-close").css('display','block');
	$("#detailsWindow #dialog").css('width','425px');
	var d = $("#dialog");
	var e = 100;
	var f = screen.availWidth / 2 - d.width() / 2;

	$("#detailsWindow .window").css({left: f,top: e }).show().fadeIn();

	window.scrollTo(0,0);
	var g = $(document).height();
	var h = $(window).width();

	$("#mask").css({
	width: h,
	height: g
	});

	$("#mask").fadeIn(1e3);
	$("#mask").fadeTo("slow", .8);
}

function htmlEscape(s) {
	if(s){
		return s.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
	} else {
		return "";	
	}
}

function convertToSec(duration) {
	if (duration.length < 8) {
		return 0;
	}
	
	var arr = duration.split(':');
	var sec = 0;
	
	sec += parseInt(arr[0], 10)*3600;
	sec += parseInt(arr[1], 10)*60;
	sec += parseInt(arr[2], 10);
	
	return sec;
}

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}

function getExtension(f) {
	return f.split('.').pop();
}

function loadTextDisplays() {
    $('#td_content').html('');
		
    $.getJSON("getdisplaytextlist", {
        tags : "tags"
    }, function (a) {
        var b = [""];
        var tdTitle;
        filesdata = a;

        $.each(a.files, function (a, items) {
            tdTitle = items.title+'<br />Description: '+items.description;
            b.push('<div class="external-event ui-draggable" style="float:left;position: relative; z-index: auto; left: 0px; top: 0px; width:120px;margin-right:6px">');
            b.push('<div id="displayTextId" class="e_f_id" style="display:none;">' + items.id + '</div>');
            b.push('<div id="desc" class="e_f_id" style="display:none;">' + items.description + '</div>');
            b.push('<div id="content" class="e_f_id" style="display:none;">' + items.content + '</div>');
            b.push('<div id="effect" class="e_f_id" style="display:none;">' + items.text_effect_id + '</div>');
            b.push('<div id="isDisplayText" style="display:none;">1</div>');
            b.push('<div id="title" class="tip" title="'+tdTitle+'">'+items.title+'</div>');
            b.push('<a href="javascript:void(0);" class="tip" title="Delete this text display:<br />'+items.title+'" onclick="deleteTextDisplay('+items.id+')"><img width="20" style="position:absolute;right:-6px;bottom:0px;" src="images/delete3.png" /></a>');
            b.push('</div>');
        });
			
        $("#td_content").append(b.join(""));
        $("#td_content").css('height','62px');
        $("#td_content").css('overflow','auto');
	    	
        $("#td_content div.external-event").each(function () {
            var a = {
                title: $.trim($(this).find("#title").text()),
                displayTextId: $.trim($(this).find("#displayTextId").text()),
                isDisplayText: $.trim($(this).find("#isDisplayText").text()),
                desc: $.trim($(this).find("#desc").text()),
                content: $.trim($(this).find("#content").text()),
                effect: $.trim($(this).find("#effect").text())
            };
	        	
            $(this).data("eventObject", a);
            $(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0,
                helper: 'clone',
                appendTo: 'body'
            });
				
            $(this).click(function(e) {
                var $target = $(e.target);

                if (!($target.is('a') || $target.is('img'))) {
                    // set values
                    $('#updatedisplaytext #displayTextId').val(a.displayTextId);
                    $('#updatedisplaytext #displayTextTitle').val(a.title);
                    $('#updatedisplaytext #displayTextDesc').val(a.desc);
                    $('#updatedisplaytext #displayTextContent').val(a.content);
                    $('#updatedisplaytext #transitionEffectId').val(a.effect);
						
                    // open dialog
                    $('#updatedisplaytext').dialog('open');
                }
            });
        });
			
        loadTips();
    });
}

function saveTextDisplay() {
    var valid = validData('#newdisplaytext'); 
    if(!valid) {
       return;
    }
    
    if ($('#newdisplaytext #transitionEffectId').val() > 0) {
        $.ajax({
            url: "saveNewDisplayText",
            data : {
                displayTextTitle: $('#newdisplaytext #displayTextTitle').val(),
                displayTextDesc: $('#newdisplaytext #displayTextDesc').val(),
                displayTextContent: $('#newdisplaytext #displayTextContent').val(),
                transitionEffectId: $('#newdisplaytext #transitionEffectId').val(),
                displayTextBackGround: $('#newdisplaytext #displayTextBackGround').val(),
                displayTextForeGround: $('#newdisplaytext #displayTextForeGround').val(),
                displayTextBold: $('#newdisplaytext #displayTextBold').val(),
                displayTextItalic: $('#newdisplaytext #displayTextItalic').val(),
                displayTextUnderLine: $('#newdisplaytext #displayTextUnderLine').val()
                
                
            },
            success: function (a) {
                $("#msg2").html("Text display saved");
                $("#msg2").removeClass("msgattention");
                $("#msg2").addClass("msgok");
                $("#msg2").show();
				
                loadTextDisplays();
            }
        });
    } 
    
    closeDialogDisplayText(1);
}

function closeDialogDisplayText(type) {
    if (type == 1) {
        $('#newdisplaytext').dialog('close');
    } else if (type == 2) {
        $('#updatedisplaytext').dialog('close');
    }
}

function validData(formName) {
  var isvalid = true;
  $(formName + ' #displayTextTitleValid').html('');
  if($(formName + ' #displayTextTitle').val() == '') {
     $(formName + ' #displayTextTitleValid').html('Required');
     isvalid = false;
  }
  
  $(formName + ' #displayTextDescValid').html('');
  if($(formName + ' #displayTextDesc').val() == '') {
     $(formName + ' #displayTextDescValid').html('Required');
     isvalid = false;
  }
  
  $(formName + ' #displayTextContentValid').html('');
  if($(formName + ' #displayTextContent').val() == '') {
     $(formName + ' #displayTextContentValid').html('Required');
     isvalid = false;
  }
  
  $(formName + ' #displayTextBackGroundValid').html('');
  if($(formName + ' #displayTextBackGround').val() == '') {
     $(formName + ' #displayTextBackGroundValid').html('Required');
     isvalid = false;
  }
   
  $(formName + ' #displayTextForeGroundValid').html('');
  if($(formName + ' #displayTextForeGround').val() == '') {
     $(formName + ' #displayTextForeGroundValid').html('Required');
     isvalid = false;
  }
  
  return isvalid;
}

function deleteTextDisplay(id) {
    $.ajax({
        url: "deleteDisplayTextById",
        data : {
            'displayTextId' : id
        },
        success: function (a) {
            $("#msg").html("Text display removed");
            $("#msg").removeClass("msgattention");
            $("#msg").addClass("msgok");
            $("#msg").show();
			
            loadTextDisplays();
        }
    });
}

function updateTextDisplay() {
    var valid = validData('#updatedisplaytext'); 
    if(!valid) {
       return;
    }
    
    if ($('#updatedisplaytext #transitionEffectId').val() > 0) {
        $.ajax({
            url: "updateDisplayText",
            data : {
                displayTextId: $('#updatedisplaytext #displayTextId').val(),
                displayTextTitle: $('#updatedisplaytext #displayTextTitle').val(),
                displayTextDesc: $('#updatedisplaytext #displayTextDesc').val(),
                displayTextContent: $('#updatedisplaytext #displayTextContent').val(),
                transitionEffectId: $('#updatedisplaytext #transitionEffectId').val()
            },
            success: function (a) {
                $("#msg3").html("Text display updated");
                $("#msg3").removeClass("msgattention");
                $("#msg3").addClass("msgok");
                $("#msg3").show();
				
                loadTextDisplays();
            }
        });
    } else {
        alert('Please select a text transition.');
    }
    
    closeDialogDisplayText(2);
}
