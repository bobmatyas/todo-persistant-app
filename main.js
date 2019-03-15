$(() => {
  const BASE_ID = ''; // TODO Put your Base ID here 
  const Airtable = {
    API_KEY: '',  // TODO Put your API_KEY here
    API: `https://api.airtable.com/v0/${BASE_ID}`,
  };

  // Start your $.get here
    // on fail, console.error out the error you recieve
    // on done, log out each individual response

  $.get({
      headers: {
        authorization: `Bearer ${Airtable.API_KEY}` // jQuery uses lowercase, other frameworks uppercase
      },
      url: `${Airtable.API}/To%20Do`,
  }).done((responseBody) => {
    
    for (let i = 0; i < responseBody.records.length; i++) {
      $('#toDoList').append(`<div class="list-item"><p><strong>Name:</strong> ${responseBody.records[i].fields.Name}</p>  <p><strong>Notes:</strong> ${responseBody.records[i].fields.Notes}</p> <p><strong>Done:</strong> ${responseBody.records[i].fields.Done}</p></div>`);
    }
  }).fail(() => {
    console.error('Error');
  });
  
  function submit() {
    console.log($('#toDoNameInput').val());
    console.log($('#toDoNotesInput').val());
    console.log($('#toDoDoneSelect').val());

    // Start your $.post here
      // on fail, console.error out the error you recieve
      // on done, log out the response

    $.post({
      headers: {
        authorization: `Bearer ${Airtable.API_KEY}`, // jQuery uses lowercase, other frameworks uppercase
        contentType: "application/json"
      },
      url: `${Airtable.API}/To%20Do`,
      data: { //query parameters 
        "fields": {
          "Name": $('#toDoNameInput').val(),
          "Notes": $('#toDoNotesInput').val(),
          "Done": $('#toDoDoneSelect').val(),
        }  
      }
    }).fail((error) => {
      console.error("There was an error: ". error.responseText);
    });

    $('#toDoList').append(`<div class="list-item"><p><strong>Name:</strong> ${$('#toDoNameInput').val()}</p>  <p><strong>Notes:</strong> ${$('#toDoNotesInput').val()}</p> <p><strong>Done:</strong> ${$('#toDoDoneSelect').val()}</p></div>`);
  }
  
  $('#btnSubmit').on('click', submit);
});