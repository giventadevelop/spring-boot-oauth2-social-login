$(document).ready(function() {
		$('#update').click(function(e) {

var dateLength = $("#calStartDate").val().length;

			if(dateLength==0){
				alert("Please enter Start Date");
		         event.preventDefault();
		         return false;
			}

			var dateLength = $("#calEndDate").val().length;

			if(dateLength==0){
				alert("Please enter End Date");
		         event.preventDefault();
		         return false;
			}

			var startChkDate = new Date($('#calStartDate').val());
			var endChkDate = new Date($('#calEndDate').val());

			if (endChkDate < startChkDate){
				alert(" End Date should be after the Start Date ");
		         event.preventDefault();
		         return false;
			}
			
			if (startChkDate.getHours() > endChkDate.getHours()) {
				alert('End Time should be after the Start Time');
				event.preventDefault();
				return false;
			}
			
			if (toSecondsAfterMidnight(endChkDate) <= toSecondsAfterMidnight(startChkDate)) {
				alert('The start and end times for this event are the same.  Please update or delete the event.');
				event.preventDefault();
				return false;
			}
			
			//send updated data...
			var duplicateIds;

			if ($('#isPlayList').val() > 0) {
				// check if background playlist
				if ($('#isPlaybackground').val() == 1) {
					duplicateIds = getConflictingEvents($('#eventid').text(), startChkDate, endChkDate, true);
				} else {
					duplicateIds = getConflictingEvents($('#eventid').text(), startChkDate, endChkDate, false);
				}
			} else {
				duplicateIds = getConflictingEvents($('#eventid').text(), startChkDate, endChkDate, false);
			}

			if (duplicateIds) {
				if (confirm("The selected times conflict with one or more events in that date range.\n\nClick Ok, if you wish to save this event and overwrite the others.\nOr, click Cancel to change the time range on this event.")) {
					$.ajax({
						url : 'overWriteAndAddEvents',
						data : {
							eventIdsToRemove: duplicateIds,
							id : $('#eventid').text(),
							yearlyrepet : $('#yearlyrepet:checked').val(),
							weekdayFile : $('#weekdayFile:checked').val(),
							weekendFile : $('#weekendFile:checked').val(),
							dailyRepeatFile : $('#dailyRepeatFile:checked').val(),
							monthlyRepeatFile : $('#monthlyRepeatFile:checked').val(),
							xlyRepeatFile : $('#xlyRepeatFile:checked').val(),
							repetdayes : $('#repetdayes').val(),
							playlistid:$('#playlistid').val(),
							calStartDate:$('#calStartDate').val(),
							calStartDateVal:$('#calStartDate').val(),
							calEndDate:$('#calEndDate').val(),
							calEndDateVal:$('#calEndDate').val(),
							calId:$('#calendarId').val(),
							repeatType:$('input:radio[name=repeattype]:checked').val(),
							isPlayList:$('#isPlayList').val(),
							isScreenLayout:$('#isScreenLayout').val(),
							screenlayoutmasterId:$('#screenlayoutmasterId').val(),
							isRssFeed:$('#isRssFeed').val(),
							isWeather:$('#isWeather').val(),
							isDisplayText:$('#isDisplayText').val(),
							displayTextId:$('#displayTextId').val()
						},
						success : function(doc) {
							if ($.trim(doc) == 'updated') {
								$('#preventClose').val(0);
								$('#preventCloseC').val(0);
								$('#lastEventTime').val($('#calEndDate').val());
								$("#msg").css({
									top: 250
								}).show();
								$('#msg').html("Event Updated..");
								$('#msg').removeClass("msgattention");
								$('#msg').addClass("msgok");
								
								closeDetailsWindow();
							} else {
								$('#msg1').css({
									top : 250
								}).show();
								$('#msg1').html("Error updating event.");
								$('#msg1').removeClass("msgok");
								$('#msg1').addClass("msgattention");
							}
						}
					});
				} else {
					$('#preventClose').val(1);
					$('#msg1').css({
						top : 250
					}).show();
					$('#msg1').html("Event Not Updated.  Update  time range and try again.");
					$('#msg1').removeClass("msgok");
					$('#msg1').addClass("msgattention");
				}
			} else {

			$.ajax({
				url : 'scheduleroccurancerepet',
				data : {
					// our hypothetical request data feef for reoccureance of data.
					id : $('#eventid').text(),
					yearlyrepet : $('#yearlyrepet:checked').val(),
					weekdayFile : $('#weekdayFile:checked').val(),
					weekendFile : $('#weekendFile:checked').val(),
					dailyRepeatFile : $('#dailyRepeatFile:checked').val(),
					monthlyRepeatFile : $('#monthlyRepeatFile:checked').val(),
					xlyRepeatFile : $('#xlyRepeatFile:checked').val(),
					repetdayes : $('#repetdayes').val(),
					playlistid:$('#playlistid').val(),
					calStartDate:$('#calStartDate').val(),
					calStartDateVal:$('#calStartDate').val(),
					calEndDate:$('#calEndDate').val(),
					calEndDateVal:$('#calEndDate').val(),
					calId:$('#calendarId').val(),
					repeatType:$('input:radio[name=repeattype]:checked').val(),
					isPlayList:$('#isPlayList').val(),
					isScreenLayout:$('#isScreenLayout').val(),
					screenlayoutmasterId:$('#screenlayoutmasterId').val(),
					isRssFeed:$('#isRssFeed').val(),
					isWeather:$('#isWeather').val(),
					isDisplayText:$('#isDisplayText').val(),
					displayTextId:$('#displayTextId').val()
				},
				success : function(doc) {
					if ($.trim(doc) == 'updated') {
						$('#preventClose').val(0);
						$('#preventCloseC').val(0);
						$('#lastEventTime').val($('#calEndDate').val());
						$("#msg").css({
							top: 250
						}).show();
						$('#msg').html("Event Updated..");
						$('#msg').removeClass("msgattention");
						$('#msg').addClass("msgok");
						
						closeDetailsWindow();
					} else {
						$('#msg1').css({
							top : 250
						}).show();
						$('#msg1').html("Error updating event.");
						$('#msg1').removeClass("msgok");
						$('#msg1').addClass("msgattention");
					}
				}
			}); 
			}
		});
	});

function getConflictingEvents(eId, start, end, isBg) {
	var events = $('#calendar').fullCalendar('clientEvents');
	var dupIds = new Array();
	var startSec = toSecondsAfterMidnight(start);
	var endSec = toSecondsAfterMidnight(end);
	var sDate, eDate, sSec, eSec;
	var checkDate = true;
	
	if (events && events.length > 0) {
		for (var i=0; i < events.length; i++) {
			// don't compare to self
			if (eId != events[i].id) {
				if (isBg) {
					if (events[i].isPlaybackground == 1) {
						checkDate = true;
					} else {
						checkDate = false;
					}
				} // else, if the event being checked against is a playlist, make sure it is not in the background
				else if (events[i].description == 'playlist') {
					if (events[i].isPlaybackground == 1) {
						checkDate = false;
					} else {
						checkDate = true;
					}
				} // don't check open time slots
				else if (events[i].id == 'OTS') {
					checkDate = false;
				} // else, check the date by default
				else {
					checkDate = true;
				}
				
				if (checkDate) {
					sDate = events[i].start;
					eDate = (events[i].end) ? events[i].end : sDate;
					// make sure the two events share some dates
					//console.log(events[i].id+': '+start+' - '+end+' : '+sDate+' - '+eDate + '('+(start <= eDate) +') && ('+ (end >= sDate)+')');
					if ((start <= eDate) && (end >= sDate)) {
						sSec = toSecondsAfterMidnight(sDate);
						eSec = toSecondsAfterMidnight(eDate);
						//console.log(events[i].id+': '+startSec+' - '+endSec+' : '+sSec+'('+events[i].start+') - '+eSec+'('+events[i].end+')');
						// compare times
						if ((startSec < eSec) && (endSec > sSec) || (startSec == sSec && endSec == eSec)) {
							dupIds.push(events[i].id);
						}
					}
				}
			}
		}
	}

	if (dupIds && dupIds.length > 0) {
		return dupIds;
	} else {
		return false;
	}
}

function toSecondsAfterMidnight(dt) {
	var seconds = dt.getSeconds();
	var minutes = dt.getMinutes();
	var hours = dt.getHours();
	var ret = 0;
	
	ret += seconds;
	ret += minutes*60;
	ret += hours*3600;
	
	return ret;
}
