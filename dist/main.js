const form = document.querySelector("#sendEmail");

  const params = new URLSearchParams(window.location.search);
  console.log(params.get('token'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formdata = new FormData(form);
    const data = {};
    const values = [
      'from',
      'to',
      'subject',
      'text',   
    ]
      .map(value => {
        data[value] = formdata.get(value)        
      });

    data.accessToken = params.get("token");
    fetch("http://localhost:3000/send-gmail", {
      method: 'POST',
      body: JSON.stringify({data}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(r => r.json())
      .then(data => console.log(data))
  });

const authorizeButton = document.querySelector("#authorizeButton");
authorizeButton.addEventListener('click',  (e) => {
  let url; 
  fetch("http://localhost:3000/authorize")
    .then(response => response.json())
    .then(data => {
      const { url } = data;
      window.location.href = url
    });
})