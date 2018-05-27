const smile = (function () {
  let elem;
  function like() {
    elem = window.event.srcElement;
    const id = elem.parentNode.parentNode.id;
    events.getPost(String(id)).then(
      (result) => {
        likeFunction(JSON.parse(result, (key, value) => {
          if (key === "createdAt") return new Date(value);
          return value;
        }));
      },
      (error) => {
        throw new Error("some description of :( ");
      },
    );
  }
  function likeFunction(post) {
    events.CheckUser().then((result) => {
      const user = result;

      const a = post.like.indexOf(user);
      if (a == -1) {
        elem.className = "like_yes";
        events.addLike(post.id, user).catch(err => console.log(err.message));
      } else {
        elem.className = "like_no";
        events.removeLike(post.id, user).catch(err => console.log(err.message));
      }
    });
  }
  return {
    like,
    likeFunction,
  };
}());
