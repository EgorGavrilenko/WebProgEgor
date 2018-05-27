function start() {
  events.CheckUser().then(
    (result) => {
      workWithDOM.createheader();
      events.getPosts(0, 10).then(
        (result) => {
          workWithDOM.creatingPost(JSON.parse(result, (key, value) => {
            if (key == "createdAt") return new Date(value);
            return value;
          }));
        },
        (error) => {
          throw new Error("some description of :( ");
        },
      );
    },
    (error) => {
      workWithDOM.createheader();
      events.getPosts(0, 10).then(
        (result) => {
          workWithDOM.creatingPost(JSON.parse(result, (key, value) => {
            if (key == "createdAt") return new Date(value);
            return value;
          }));
        },
        (error) => {
          throw new Error("some description of :( ");
        },
      );
    },
  );
}
