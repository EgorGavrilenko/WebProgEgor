const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var posts = JSON.parse(fs.readFileSync('./server/data/posts.json','utf8'),function(key, value) {
  if (key == 'createdAt') return new Date(value);
  return value;
});

function getSelectTimePeriod(time) {
  if (time === "last 24 hour") {
      let d = new Date();
      d.setDate(d.getDate() - 1);
      return d;
  }
  if (time === "last week") {
      let d = new Date();
      d.setDate(d.getDate() - 7);
      return d;
  }
  if (time === "last month") {
      let d = new Date();
      d.setMonth(d.getMonth() - 1);
      return d;
  }
  if (time === "last year") {
      let d = new Date();
      d.setMonth(d.getMonth() - 12);
      return d;
  }
}

app.get('/allPosts',(req,res)=>{
  res.send(posts);
})

app.post('/getPost',(req,res)=>{
  let post = posts.find((post)=>req.query.id == post.id);
  post ? res.send(post):res.status(404).end();
})

app.post('/addPost',(req,res)=>{
  p={};
  if(req.query.photoLink!=undefined){
    p.photoLink='photo/'+req.query.photoLink;
  }else{
    res.status(404).end();
    return;
  }
  if(req.query.author!=undefined){
    p.author=req.query.author;
  }else{
    res.status(404).end();
    return;
  }
  if(req.query.descriprion!=undefined){
    p.descriprion=req.query.descriprion;
  }else{
    p.descriprion="";
  }
    p.tag=[];
  if(req.query.tag!=undefined){
    let i=0;
    while(req.query.tag[i]!=undefined)
    {
      p.tag.push(req.query.tag[i]);
      i++;
    }
  }
  p.id = String(posts.length + 1);
  p.createdAt = new Date();
  p.like = [];
  posts.push(p);
  
  console.log(p.author+' add new post');
  
  fs.writeFileSync('./server/data/posts.json',JSON.stringify(posts));
  var stream = fs.createWriteStream('./public/'+p.photoLink);
  req.pipe(stream);

  stream.on('end', () => res.end());
  stream.on('error', (err) => console.log(err.message));
  res.send();
})

app.delete('/deletePost',(req,res)=>{
  let post = posts.find((post)=>req.query.id == post.id);
  posts.splice(posts.indexOf(post),1);
  if(post!=undefined){
  fs.writeFileSync('./server/data/posts.json',JSON.stringify(posts));
  console.log(post.author+' delete post');
  
  res.send(post);
  }else{
    res.status(404).end();
  }
})

app.put('/editPost',(req,res)=>{
  let post = posts.find((post)=>req.query.id == post.id);
  if (post!=undefined) {
  p={};
  if(req.query.descriprion!=undefined){
    p.descriprion=req.query.descriprion;
  }
  if(req.query.tag!=undefined){
    p.tag=[];
    let i=0;
    while(req.query.tag[i]!=undefined)
    {
      p.tag.push(req.query.tag[i]);
      i++;
    }
  }
  p.createdAt = new Date();
  p.like = [];
  res.send(posts[posts.indexOf(post)]= Object.assign(post, p));
  fs.writeFileSync('./server/data/posts.json',JSON.stringify(posts));
  console.log(post.author+' edit post');
  
  } else {
    res.status(404).end();
  }
})

app.get('/getPosts',(req,res)=>{
  let skip, top;
  if(req.query.skip!=undefined){
    skip=req.query.skip;
  }else{
    skip=0;
  }
  if(req.query.top!=undefined){
    top=req.query.top;
  }else{
    top=posts.length;
  }
  if(skip>posts.length) {
    res.status(404).end();
    return;
  }
  
  let arr = [],
      array = [];
  if(req.query.filterConfig!=undefined){
    let filterConfig={};
    if(req.query.filterConfig['author']!=undefined)
      filterConfig.author=req.query.filterConfig['author'];
    if(req.query.filterConfig['createdAt']!=undefined)
      filterConfig.createdAt=req.query.filterConfig['createdAt'];
    if(req.query.filterConfig['tag']!=undefined){
      filterConfig.tag=[];
       let i=0;
    while(req.query.filterConfig['tag'][i]!=undefined)
    {
      filterConfig.tag.push(req.query.filterConfig['tag'][i]);
      i++;
    }
    }
    
  arr = posts.filter(function(val) {
      if (typeof filterConfig === "object") {
          if ('author' in filterConfig) {
              if (!(filterConfig['author'] === val['author']))
                  return false;
          }
          if ('createdAt' in filterConfig) {
              if (!(Date.parse(val['createdAt']) > Date.parse(getSelectTimePeriod(filterConfig['createdAt']))))
                  return false;
          }
          if ('tag' in filterConfig) {
              if (filterConfig['tag'] instanceof Array) {
                  let bool = false;
                  for (let i = 0; i < filterConfig['tag'].length; i++) {
                      for (let j = 0; j < val['tag'].length; j++) {
                          if (val['tag'][j] === filterConfig['tag'][i])
                              bool = true;
                      }
                  }
                  if (!bool)
                      return false;
              } else {
                  let bool = false;
                  for (let i = 0; i < val['tag'].length; i++) {
                      if (val['tag'][i] === filterConfig['tag'])
                          bool = true;
                  }
                  if (!bool)
                      return false;
              }
          }
      }
      return true;
  });

  for (let i = skip, j = 0; i < arr.length && j < top; i++, j++) {
      array[j] = arr[i];
  } 
  }else{
    for (let i = skip, j = 0; i < posts.length && j < top; i++, j++) 
      array[j] = posts[i];
  } 
  res.send(array)
})

app.put('/addlike',(req,res)=>{
  let post = posts.find((post)=>req.query.id == post.id);
  if(post!=undefined && req.query.user!=undefined){
  posts[posts.indexOf(post)]['like'].push(req.query.user);
  fs.writeFileSync('./server/data/posts.json',JSON.stringify(posts));
  res.send(post);
  }else{
    res.status(404).end();
  }
})


app.put('/removelike',(req,res)=>{
  let post = posts.find((post)=>req.query.id == post.id);
  if(post!=undefined && req.query.user!=undefined){
  posts[posts.indexOf(post)]['like'].splice(req.query.user);
  fs.writeFileSync('./server/data/posts.json',JSON.stringify(posts));
  res.send(post);
  }else{
    res.status(404).end();
  }
})



app.listen('3000', () => {
  console.log('Server is running');
});