$(document).ready(function() {

    $('#submit-button').on('click', postData);

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: render
          //  console.log(data);

    });
}
function render(data) {
  console.log(data);
  var $people = $('.people');
  $people.empty();
  $people.append('<ol></ol>');
  var $list = $people.children().last();
  data.forEach(function (element) {
    $list.append('<li>Name: ' + element.name +'\tAddress: ' + element.address + ', ' + element.city + ', ' + element.state + ' ' + element.zip + '</li>');
  });
  $('#sql-form').trigger('reset');
}
