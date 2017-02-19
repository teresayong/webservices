var alchemy_endpoint = "https://gateway-a.watsonplatform.net/calls/data/GetNews";
var alchemy_key = "3e629e327b62f6719852cd843f757a773c6e7baf";
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
