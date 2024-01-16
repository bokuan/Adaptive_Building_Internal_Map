function getcurrentEvents(course, currentTime) {
  var currentEvents = course.filter(function (event) {
    // split json data: year month day
    var eventDateParts = event.date.split("-"); 
    var eventYear = parseInt(eventDateParts[0]); 
    var eventMonth = parseInt(eventDateParts[1]) - 1; 
    var eventDay = parseInt(eventDateParts[2]); 
    //split beginning time
    var eventStartTimeParts = event.bgtime.split(":"); 
    var eventStartHour = parseInt(eventStartTimeParts[0]);
    var eventStartMinute = parseInt(eventStartTimeParts[1]);
    //split ending time
    var eventEndTimeParts = event.edtime.split(":");
    var eventEndHour = parseInt(eventEndTimeParts[0]);
    var eventEndMinute = parseInt(eventEndTimeParts[1]);

    // create new date that can js can read
    var eventDateObj = new Date(
      eventYear,
      eventMonth,
      eventDay,
      eventStartHour,
      eventStartMinute
    );
    var eventEndDateObj = new Date(
      eventYear,
      eventMonth,
      eventDay,
      eventEndHour,
      eventEndMinute
    );

    // set condition to get current events
    return eventDateObj <= currentTime && currentTime <= eventEndDateObj;
  });
  return currentEvents;
}

function getfutureEvents(course, currentTime) {
  var futureEvents = course.filter(function (event) {
    // split json data: year month day
    var eventDateParts = event.date.split("-"); 
    var eventYear = parseInt(eventDateParts[0]); 
    var eventMonth = parseInt(eventDateParts[1]) - 1; 
    var eventDay = parseInt(eventDateParts[2]); 
    //split beginning time
    var eventStartTimeParts = event.bgtime.split(":"); 
    var eventStartHour = parseInt(eventStartTimeParts[0]);
    var eventStartMinute = parseInt(eventStartTimeParts[1]);
    //split ending time
    var eventEndTimeParts = event.edtime.split(":");
    var eventEndHour = parseInt(eventEndTimeParts[0]);
    var eventEndMinute = parseInt(eventEndTimeParts[1]);

    // create new date that can js can read
    var eventDateObj = new Date(
      eventYear,
      eventMonth,
      eventDay,
      eventStartHour,
      eventStartMinute
    );
    var eventEndDateObj = new Date(
      eventYear,
      eventMonth,
      eventDay,
      eventEndHour,
      eventEndMinute
    );

    // set condition to get current events
    return currentTime <= eventDateObj;
  });
  return futureEvents;
}
