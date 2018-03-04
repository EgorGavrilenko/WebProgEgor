var photoPostsModule = function() {
    var photoPosts = [{
            id: '1',
            descriprion: 'бам бам тсс',
            createdAt: new Date(2018, 2, 3),
            author: 'Гавриленко Егор',
            photoLink: 'photo/1493458336187917536.jpg',
            tag: ['goodtime'],
            like: []
        },
        {
            id: '2',
            descriprion: 'лучший друг',
            createdAt: new Date(2017, 4, 3),
            author: 'Гавриленко Егор',
            photoLink: 'photo/dog-and-cat-1024x768.jpg',
            tag: ['goodtime', 'dog', 'good_boy', 'gm'],
            like: []
        },
        {
            id: '3',
            descriprion: 'бам бам тсс',
            createdAt: new Date(2018, 1, 27),
            author: 'Гавриленко Егор',
            photoLink: 'photo/i.jpg',
            tag: ['goodtime', 'gm'],
            like: []
        },
        {
            id: '4',
            descriprion: 'красивый замок',
            createdAt: new Date(2011, 1, 28),
            author: 'Гавриленко Егор',
            photoLink: 'photo/images2.jpg',
            tag: ['goodtime', 'gm', 'castl'],
            like: []
        },
        {
            id: '5',
            descriprion: 'красивый вид',
            createdAt: new Date(2018, 2, 15),
            author: 'Гавриленко Егор',
            photoLink: 'photo/images.jpg',
            tag: ['goodtime', 'gm'],
            like: []
        },
        {
            id: '6',
            descriprion: 'я сам не знаю что это))',
            createdAt: new Date(2018, 2, 15),
            author: 'Гавриленко Егор',
            photoLink: 'photo/1487198370150461553.jpg',
            tag: ['goodtime', 'gm', 'like'],
            like: []
        },
        {
            id: '7',
            descriprion: 'лучший друг',
            createdAt: new Date(2018, 1, 3),
            author: 'Гавриленко Егор',
            photoLink: 'photo/dog-and-cat-1024x768.jpg',
            tag: ['goodtime', 'dog', 'good_boy', 'gm'],
            like: []
        },
        {
            id: '8',
            descriprion: 'красивый замок',
            createdAt: new Date(2016, 1, 11),
            author: 'Гавриленко Егор',
            photoLink: 'photo/images2.jpg',
            tag: ['goodtime', 'gm', 'castl'],
            like: []
        },
        {
            id: '9',
            descriprion: 'я сам не знаю что это))',
            createdAt: new Date(2018, 2, 5),
            author: 'Гавриленко Егор',
            photoLink: 'photo/1487198370150461553.jpg',
            tag: ['goodtime', 'gm', 'like'],
            like: []
        },
        {
            id: '10',
            descriprion: 'красивый вид',
            createdAt: new Date(2018, 2, 15),
            author: 'Гавриленко Егор',
            photoLink: 'photo/images.jpg',
            tag: ['goodtime', 'gm'],
            like: []
        },
        {
            id: '11',
            descriprion: 'водопад',
            createdAt: new Date(2018, 2, 4),
            author: 'Вася Пупкин',
            photoLink: 'photo/Hopetoun_falls.jpg',
            tag: ['goodtime', 'gm', 'nature', 'waterfall'],
            like: []
        },
        {
            id: '12',
            descriprion: 'вода',
            createdAt: new Date(2018, 1, 4),
            author: 'Вася Пупкин',
            photoLink: 'photo/images23.jpg',
            tag: ['goodtime', 'gm', 'water', 'waterfall'],
            like: []
        },
        {
            id: '13',
            descriprion: 'поле',
            createdAt: new Date(2017, 1, 4),
            author: 'Вася Пупкин',
            photoLink: 'photo/purple-lavender-field-provence-france.jpg',
            tag: ['goodtime', 'gm', 'purple', 'nature'],
            like: []
        },
        {
            id: '14',
            descriprion: 'яблочки',
            createdAt: new Date(2017, 1, 14),
            author: 'Вася Пупкин',
            photoLink: 'photo/5359615-15088823151469610021-1508956902-650-48a5593f5d-1509449347.jpg',
            tag: ['apple', 'nature'],
            like: []
        },
        {
            id: '15',
            descriprion: 'щука',
            createdAt: new Date(2016, 1, 4),
            author: 'Вася Пупкин',
            photoLink: 'photo/shhuka-800x445.jpg',
            tag: ['nature', 'shhuka'],
            like: []
        },
        {
            id: '16',
            descriprion: ')))',
            createdAt: new Date(2017, 10, 24),
            author: 'Костя',
            photoLink: 'photo/krasivaya-priroda.jpg',
            tag: ['nature'],
            like: []
        },
        {
            id: '17',
            descriprion: 'человек и природа',
            createdAt: new Date(2018, 1, 1),
            author: 'Костя',
            photoLink: 'photo/chelovek-i-priroda.jpg',
            tag: ['nature', 'perso'],
            like: []
        },
        {
            id: '18',
            descriprion: 'вода',
            createdAt: new Date(2018, 1, 4),
            author: 'Костя',
            photoLink: 'photo/images23.jpg',
            tag: ['goodtime', 'gm', 'water', 'waterfall'],
            like: []
        },
        {
            id: '19',
            descriprion: 'поле',
            createdAt: new Date(2017, 1, 4),
            author: 'Костя',
            photoLink: 'photo/purple-lavender-field-provence-france.jpg',
            tag: ['goodtime', 'gm', 'purple', 'nature'],
            like: []
        },
        {
            id: '20',
            descriprion: 'яблочки',
            createdAt: new Date(2018, 2, 5),
            author: 'Костя',
            photoLink: 'photo/5359615-15088823151469610021-1508956902-650-48a5593f5d-1509449347.jpg',
            tag: ['apple', 'nature'],
            like: []
        }
    ];

    return {
        photoPosts: photoPosts
    }
}();
