var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log(req.url);

switch (req.url) {
    case '/css/styles.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./public/css/styles.css'));
    break;
    case '/':
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.end(fs.readFileSync('./public/index.html'));
    break;
    case '/css/checkbox.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./public/css/checkbox.css'));
    break;
    case '/css/signIn.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./public/css/signIn.css'));
    break;
    case '/css/photo.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./public/css/photo.css'));
    break;
    case '/css/inputfile.css':
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./public/css/inputfile.css'));
    break;
    case '/textjson.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/textjson.js'));
    break;
    case '/photo_post_arrays.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/photo_post_arrays.js'));
    break;
    case '/removephoto.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/removephoto.js'));
    break;
    case '/passwords.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/passwords.js'));
    break;
    case '/editPhotoPost.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/editPhotoPost.js'));
    break;
    case '/CamRoll.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/CamRoll.js'));
    break;
    case '/like.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/like.js'));
    break;
    case '/construction_of_DOM.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/construction_of_DOM.js'));
    break;
    case '/addphoto.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/addphoto.js'));
    break;
    case '/mistake.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/mistake.js'));
    break;
    case '/start.js':
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(fs.readFileSync('./public/start.js'));
    break;
    default:
    if(String(req.url).substring(0, 6)==="/photo")
    res.end(fs.readFileSync('./public'+req.url));
    else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("404 not found");
    }
}
  
}).listen(8080, () => {
    console.log('Server is running');})