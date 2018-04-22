function start() {
    workWithDOM.createheader();
    events.getPosts(0, 10).then((result) => {
        workWithDOM.creatingPost(JSON.parse(result,function(key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;}));
        },
        (error) => {
       throw new Error('some description of :( ');
        }
       );
};