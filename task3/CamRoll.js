; var camRollFunction = (function(){
function getSelectTimePeriod()
{
  var e = document.getElementById("select_date");
  var strUser = e.options[e.selectedIndex].text;
  if(strUser == "last 24 hour")
  {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  }
  if(strUser == "last week")
  {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  }
  if(strUser == "last month")
  {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d;
  }
  if(strUser == "last year")
  {
    var d = new Date();
    d.setMonth(d.getMonth() - 12);
    return d;
  }
}

function getPhotoPosts(skip, top, filterConfig)
{

  var arr = [], array = [];
  if (document.getElementById('checkbox_name').checked)
  {
    if(document.getElementById('checkbox_date').checked)
    {
      if(document.getElementById('checkbox_tag').checked)
      {
        arr=photoPostsModule.photoPosts.filter(function(val){
        return Date.parse( val['createdAt']) > Date.parse(getSelectTimePeriod()) &&
        val['tag'].find(x => x == document.getElementById('input_tag').value ) &&
        document.getElementById('input_name').value == val['author'] ;});
        for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
            array[j]=arr[i];
          }
          return array;
      }
      else {
        arr=photoPostsModule.photoPosts.filter(function(val){
        return Date.parse( val['createdAt']) > Date.parse(getSelectTimePeriod()) &&
        document.getElementById('input_name').value == val['author'] ;});
        for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
            array[j]=arr[i];
          }
          return array;
      }
    }
    else {
      if(document.getElementById('checkbox_tag').checked)
      {
        arr=photoPostsModule.photoPosts.filter(function(val){return document.getElementById('input_name').value == val['author'] &&
        val['tag'].find(x => x == document.getElementById('input_tag').value )
         ;});
         console.log(arr);
        for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
            array[j]=arr[i];
          }
          return array;
      }
      else {
        arr=photoPostsModule.photoPosts.filter(function(val){return document.getElementById('input_name').value == val['author'];});
        for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
            array[j]=arr[i];
          }
          return array;
      }
    }
  }
  else {
    if(document.getElementById('checkbox_tag').checked)
    {
      if(document.getElementById('checkbox_date').checked)
      {
        arr=photoPostsModule.photoPosts.filter(function(val){
        return Date.parse( val['createdAt']) > Date.parse(getSelectTimePeriod()) &&
        val['tag'].find(x => x == document.getElementById('input_tag').value ) ;});
        for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
            array[j]=arr[i];
          }
          return array;
      }
      else {
      arr=photoPostsModule.photoPosts.filter(function(val){
      return val['tag'].find(x => x == document.getElementById('input_tag').value );});
      for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
          array[j]=arr[i];
        }
        return array;
      }
    }
    if(document.getElementById('checkbox_date').checked)
    {
      arr=photoPostsModule.photoPosts.filter(function(val){
      return Date.parse( val['createdAt']) > Date.parse(getSelectTimePeriod() ) ;});
      for (var i = skip, j=0; i < arr.length && j<top; i++, j++) {
          array[j]=arr[i];
        }
        return array;
    }
  }
   for (var i = skip, j=0; i < photoPostsModule.photoPosts.length && j<top; i++, j++) {
     arr[j]=photoPostsModule.photoPosts[i];
   }
   return arr;
};

function validatePhotoPost(photoPost)
{
  if(!('id' in photoPost)){
    return false;
  }
  if(!('descriprion' in photoPost)){
    return false;
  }
  if(!('createdAt' in photoPost)){
    return false;
  }
  if(!('author' in photoPost)){
    return false;
  }
  if(!('photoLink' in photoPost)){
    return false;
  }
  if(!('tag' in photoPost)){
    return false;
  }
  if(!('like' in photoPost)){
    return false;
  }
  return true;
};

function addPhotoPost(p)
{
  p.id=String(photoPostsModule.photoPosts.length+1);
  p.createdAt=String(new Date());
  if(validatePhotoPost(p))
  {
    photoPostsModule.photoPosts.push(p);
    return true;
  }
  else
    return false;
};

function getPhotoPost(index)
{
  //console.log(photoPostsModule.photoPosts.find(x => x.id == index));
  return photoPostsModule.photoPosts.find(x => x.id == index);
};

function removePhotoPost(index)
{
  var k=photoPostsModule.photoPosts.find(x => x.id == index);
  if(k === undefined)
  {
    return false;
  }
  else {
    photoPostsModule.photoPosts.splice(photoPostsModule.photoPosts.indexOf(k),1);
    return true;
  }
}

function editPhotoPost(index, change)
{
  var k=photoPostsModule.photoPosts.find(x => x.id == index);
  if(k === undefined)
  {
    return false;
  }
  else {
    if('descriprion' in change){
      photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['descriprion']=change['descriprion'];
    }
    if('photoLink' in change){
      photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['photoLink']=change['photoLink'];
    }
    if('tag' in change){
        photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['tag']=change['tag'];
    }
    if('like' in change){
        photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['like']=change['like'];
    }
    return true;
  }
}

return{
  getPhotoPosts: getPhotoPosts,
  validatePhotoPost: validatePhotoPost,
  addPhotoPost: addPhotoPost,
  getPhotoPost: getPhotoPost,
  removePhotoPost: removePhotoPost,
  editPhotoPost: editPhotoPost
}
}());
