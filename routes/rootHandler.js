import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../views/components/App/App.jsx';

const appComponent = ReactDOM.renderToString(<App />);
const staticPath = process.env.PRODUCTION ? 
                    '/public' :
                    'http://localhost:8080' ;

module.exports = function rootHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': 'localhost'
  });
  res.write(renderHtml(appComponent, staticPath));
  res.end();
}

function renderHtml(component, staticPath) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Template</title>
      <link href="https://fonts.googleapis.com/css?family=Comfortaa|Kurale|Open+Sans" rel="stylesheet">
      <link href="${staticPath}/main.css" rel="stylesheet">
      <script src="https://use.fontawesome.com/8d4a8c389f.js"></script>
    </head>
    <body>
      
      <main id="root">${component}</main>
    
    </body>
    <script type="text/javascript" src="${staticPath}/bundle.js"></script>
    </html>
  `;
}