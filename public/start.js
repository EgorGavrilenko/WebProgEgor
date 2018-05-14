function start() {
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/login', true);
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.send();
  });
  promise.then(
    result => {
      workWithDOM.setUser(result);
      workWithDOM.createheader();
      events.getPosts(0, 10).then(
        result => {
          workWithDOM.creatingPost(
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
    },
    error => {
      workWithDOM.createheader();
      events.getPosts(0, 10).then(
        result => {
          workWithDOM.creatingPost(
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
  );
}
