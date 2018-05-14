let smile = (function() {
  let elem;
  function like() {
    elem = window.event.srcElement;
    let id = elem.parentNode.parentNode.id;
    events.getPost(id).then(
      result => {
        likeFunction(
          JSON.parse(result, function(key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
          })
        );
      },
      error => {
        throw new Error('some description of :( ');
      }
    );
  }
  function likeFunction(post) {
    let user = workWithDOM.getUser();
    let a = post['like'].indexOf(user);

    if (a == -1) {
      elem.className = 'like_yes';
      events.addLike(post.id, user).catch(err => console.log(err.message));
    } else {
      elem.className = 'like_no';
      events.removeLike(post.id, user).catch(err => console.log(err.message));
    }
  }
  return {
    like: like,
    likeFunction: likeFunction,
  };
})();
