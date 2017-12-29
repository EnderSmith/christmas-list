$(() => {
  $('#emailForm').submit(() => {
    const recipient = $('#email')[0].value;
    $.post('/api/email', { 'email': recipient });
  })
});