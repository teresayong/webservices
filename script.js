/**
* Mr. Burcham - API demo calling IBM Watson's GetNews endpoint.
*/

//add your code here...


// ------ don't change any code below here, but check it out. :)
var api_url = alchemy_endpoint+"?apikey="+alchemy_key+"&outputMode=json&start=now-1d&end=now&count=10&return=enriched.url.url,enriched.url.title";

function search(){
  var call = api_url + "&q.enriched.url.title="+htmlEscape($("#search-field").val());
  console.log(call);

  $("#search-results").html("Running query... Please wait...");

  //make a call to the api service
  $.getJSON( call, function( data ) {
    var items = [];

    if(!data.hasOwnProperty("result"))
    {
      console.log("no match");
      $("#search-results").html("No matches (or error). Try again.<br><br>"+JSON.stringify(data));
      return;
    }

    var result = data.result.docs; // the resulting hits come as "document" objects

    //iterate over each object that represents a match to our search...
    $.each( result, function( key, obj ) {
      var title = obj.source.enriched.url.title;
      var url = obj.source.enriched.url.url;
      items.push( "<li><a href='"+url+"' target='_blank'>"+title+"</a></li>" );
    });

    $("#search-results").html(items.join(""));
  });
}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/ /g, '%20');

}
