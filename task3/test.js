//validatePhotoPost//
console.log("camRollFunction.validatePhotoPost(photoPostsModule.photoPosts[1])");
console.log(camRollFunction.validatePhotoPost(photoPostsModule.photoPosts[1]));

console.log("camRollFunction.validatePhotoPost(camRollFunction.validatePhotoPost(8)");
console.log(camRollFunction.validatePhotoPost(camRollFunction.validatePhotoPost(8)));

console.log("camRollFunction.validatePhotoPost({ref:32,re:34})");
console.log(camRollFunction.validatePhotoPost({ref:32,re:34}));

console.log("camRollFunction.validatePhotoPost({ref:32,re:34, id: '9'})");
console.log(camRollFunction.validatePhotoPost({ref:32,re:34, id: '9'}));

console.log("camRollFunction.validatePhotoPost({id: 5,  descriprion: 98,createdAt: new Date(2017, 4, 3),author: 'Гавриленко Егор',  photoLink: 'photo/dog-and-cat-1024x768.jpg',  tag:  ['goodtime','dog','good_boy','gm'],like:  []})");
console.log(camRollFunction.validatePhotoPost({id: 5,  descriprion: 98 ,createdAt: new Date(2017, 4, 3),author: 'Гавриленко Егор',  photoLink: 'photo/dog-and-cat-1024x768.jpg',  tag:  ['goodtime','dog','good_boy','gm'],like:  []}));

console.log("camRollFunction.validatePhotoPost({id: '5',  descriprion: '98',createdAt: new Date(2017, 4, 3),author: 'Гавриленко Егор',  photoLink: 'photo/dog-and-cat-1024x768.jpg',  tag:  'goodtime',like:  []})");
console.log(camRollFunction.validatePhotoPost({id: '5',  descriprion: '98' ,createdAt: new Date(2017, 4, 3),author: 'Гавриленко Егор',  photoLink: 'photo/dog-and-cat-1024x768.jpg',  tag:  'goodtime',like:  []}));

//validatePhotoPost//

//editPhotoPost//
console.log("camRollFunction.editPhotoPost(322, {descriprion: '98',  photoLink: 'photo/dog-and-cat-1024x768.jpg'})");
console.log(camRollFunction.editPhotoPost(322, {descriprion: '98',  photoLink: 'photo/dog-and-cat-1024x768.jpg'}));

console.log("camRollFunction.editPhotoPost(2, descriprion: '98',  photoLink: 'photo/dog-and-cat-1024x768.jpg'})");
console.log(camRollFunction.editPhotoPost(2, {descriprion: '98',  photoLink: 'photo/dog-and-cat-1024x768.jpg'}));
console.log("camRollFunction.getPhotoPost(2)");
console.log(camRollFunction.getPhotoPost(2));
//editPhotoPost//

//getPhotoPosts//

console.log("camRollFunction.getPhotoPosts(0,100)");
console.log(camRollFunction.getPhotoPosts(0,100));

console.log("camRollFunction.getPhotoPosts(0,10,{author: 'Гавриленко Егор'})");
console.log(camRollFunction.getPhotoPosts(0,10,{author: 'Гавриленко Егор'}));

console.log("camRollFunction.getPhotoPosts(0,100,{author: 'Гавриленко Егор', tag: 'gm'})");
console.log(camRollFunction.getPhotoPosts(0,100,{author: 'Гавриленко Егор', tag: 'gm'}));

console.log("camRollFunction.getPhotoPosts(0,100,{createdAt: 'last 24 hour'})");
console.log(camRollFunction.getPhotoPosts(0,100,{createdAt: 'last 24 hour'}));

console.log("camRollFunction.getPhotoPosts(0,10,{ tag: ['water','castl']})");
console.log(camRollFunction.getPhotoPosts(0,10,{ tag: ['water', 'castl']}));
//getPhotoPosts//


//addPhotoPost//
console.log("camRollFunction.addPhotoPost({descriprion: 'поле',author: 'Вася Пупкин', photoLink: 'photo/purple-lavender-field-provence-france.jpg',tag: ['goodtime','gm','purple','nature']})");
console.log(camRollFunction.addPhotoPost({descriprion: 'поле',author: 'Вася Пупкин', photoLink: 'photo/purple-lavender-field-provence-france.jpg',tag: ['goodtime','gm','purple','nature']}));

console.log("camRollFunction.addPhotoPost({descriprion: 'поле',author: 'Вася Пупкин',tag: ['goodtime','gm','purple','nature']})");
console.log(camRollFunction.addPhotoPost({descriprion: 'поле',author: 'Вася Пупкин',tag: ['goodtime','gm','purple','nature']}));

console.log("camRollFunction.addPhotoPost(9)");
console.log(camRollFunction.addPhotoPost(9));

//addPhotoPost//

//removePhotoPost//
console.log("camRollFunction.removePhotoPost(100)");
console.log(camRollFunction.removePhotoPost(100));

console.log("camRollFunction.removePhotoPost(3)");
console.log(camRollFunction.removePhotoPost(3));
//removePhotoPost//

//getPhotoPost//
console.log("camRollFunction.getPhotoPost(7)");
console.log(camRollFunction.getPhotoPost(7));
//getPhotoPost//
