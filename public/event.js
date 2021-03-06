const events = (function () {
  function getPosts(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let params = `skip=${skip}&top=${top}`;
      if (filterConfig != undefined) {
        if (filterConfig instanceof Object) {
          if ("author" in filterConfig) params += `&filterConfig[author]=${filterConfig.author}`;
          if ("createdAt" in filterConfig) {
            params += `&filterConfig[createdAt]=${filterConfig.createdAt}`;
          }
          if ("tag" in filterConfig) {
            if (filterConfig.tag instanceof Array) {
              for (let index = 0; index < filterConfig.tag.length; index++) {
                params += `${"&filterConfig[tag]" + "["}${index}]=${filterConfig.tag[index]}`;
              }
            }
          }
        }
      }
      workWithDOM.setLast(skip);
      xhr.open("GET", `/getPosts?${params}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };

      xhr.send();
    });
  }

  function removePost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `${"/deletePost?" + "id="}${id}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function addPhoto(file, post) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let params = `author=${post.author}&descriprion=${post.descriprion}&photoLink=${
        post.photoLink
      }`;
      let i = 0;
      while (post.tag[i] != undefined) {
        params += `${"&tag" + "["}${i}]=${post.tag[i]}`;
        i++;
      }
      xhr.open("POST", `/addPost?${params}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.send(file);
    });
  }

  function getPost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let post1;
      xhr.open("POST", `${"/getPost?" + "id="}${id}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function editPost(post) {
    return new Promise((resolve, reject) => {
      let params = `id=${post.id}`;
      if ("descriprion" in post) params += `&descriprion=${post.descriprion}`;
      if ("tag" in post) {
        if (post.tag instanceof Array) {
          for (let index = 0; index < post.tag.length; index++) {
            params += `${"&tag" + "["}${index}]=${post.tag[index]}`;
          }
        }
      }
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `/editPost?${params}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function addLike(id, user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${"/addlike?" + "id="}${id}&user=${user}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function removeLike(id, user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${"/removelike?" + "id="}${id}&user=${user}`, true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function logIn(username, password) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const body = JSON.stringify({
        username,
        password,
      });
      xhr.open("POST", "/login", true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(body);
    });
  }

  function logOut() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/logout", true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  function CheckUser() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/login", true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      xhr.send();
    });
  }

  return {
    logIn,
    logOut,
    addLike,
    removeLike,
    removeLike,
    editPost,
    addPhoto,
    removePost,
    getPosts,
    getPost,
    CheckUser,
  };
}());
