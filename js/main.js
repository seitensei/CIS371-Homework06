$(document).ready(function() {
  var movielist = [];
  $.get("http://www.cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getTitles.php", function(data, status) {
    // Operate on data inside, because async
    movielist = eval(data);
    var titleSelect = $("#titlelist");
    var option = '';
    for (var i=0; i < movielist.length; i++) {
      option += '<option value="' + i + '">' + movielist[i] + '</option>';
    }
    titleSelect.append(option);
    $(".app-element").css("visibility", "visible");
    $("#datalist").css("visibility", "visible");

    // Since we start out with element 0, populate that into tabs
    $("#datablock").css("visibility", "visible");

    $.get("http://www.cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getMovie.php?id=1", function(data, success) {
      var carat = data.indexOf('<');
      var tag1 = data.substr(0, carat);
      var tag2 = data.substr(carat, data.length);
      $("#storyline").html(tag1);
      $("#cast").html(tag2);
    });
  });
});


// tabs
$('#storyline a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});
$('#cast a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#titlelist').change(function() {
  var val = $(this).find('option:selected').val();
  var url = "http://www.cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getMovie.php?id=" + (parseInt(val) + 1);
  $.get(url, function(data, success) {
    var carat = data.indexOf('<');
    var tag1 = data.substr(0, carat);
    var tag2 = data.substr(carat, data.length);
    $("#storyline").html(tag1);
    $("#cast").html(tag2);
  });
});
