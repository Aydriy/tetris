// створення нового блоку тетріс
let tetris = document.createElement('div');
tetris.classList.add('tetris');

// ячейкі на все поле
for (let i = 1; i < 181; i++) {
    let excel = document.createElement('div');
    // підключено стилі
    excel.classList.add('excel');
    tetris.appendChild(excel);
}

// [0] - індекс елементу
let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

// координати для кожної секції по х і у
for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

// початкове розташування фігурок і координати першого квадрата
let x = 5, y = 15;

// фігурки
let mainArr = [
    [
        // палка
        [0, 1],
        [0, 2],
        [0, 3],
        [
            // поворот на 90*
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        [
            // поворот на 180*
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        [
            // поворот на 270*
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        [
            // поворот на 360*
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
    ],

    [
        //квадрат
        [1, 0],
        [0, 1],
        [1, 1],
        [
            // поворот на 90*
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        [
            // поворот на 180*
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        [
            // поворот на 270*
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        [
            // поворот на 360*
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    // буква л
    [
        [1, 0],
        [0, 1],
        [0, 2],
        [
            // поворот на 90*
            [0, 1],
            [-1, 0],
            [1, 0],
            [2, -1],
        ],
        [
            // поворот на 180*
            [1, 1],
            [0, 2],
            [0, 0],
            [-1, -1],
        ],
        [
            // поворот на 270*
            [1, -2],
            [2, -1],
            [0, -1],
            [-1, 0],
        ],
        [
            // поворот на 360*
            [-2, 0],
            [-1, -1],
            [-1, 1],
            [0, 2],
        ],
    ],
    // буква л повернута
    [
        [1, 0],
        [1, 1],
        [1, 2],
        [
            // поворот на 90*
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, -2],
        ],
        [
            // поворот на 180*
            [1, 1],
            [0, 2],
            [-1, 1],
            [-2, 0],
        ],
        [
            // поворот на 270*
            [1, -2],
            [2, -1],
            [1, 0],
            [0, 1],
        ],
        [
            // поворот на 360*
            [-2, 0],
            [-1, -1],
            [0, 0],
            [1, 1],
        ],
    ],
    // буква т
    [
        [1, 0],
        [2, 0],
        [1, 1],
        [
            // поворот на 90*
            [0, 2],
            [-1, 1],
            [-2, 0],
            [0, 0],
        ],
        [
            // поворот на 180*
            [2, -1],
            [1, 0],
            [0, 1],
            [0, -1],
        ],
        [
            // поворот на 270*
            [0, -1],
            [1, 0],
            [2, 1],
            [0, 1],
        ],
        [
            // поворот на 360*
            [-2, 0],
            [-1, -1],
            [0, -2],
            [0, 0],
        ],
    ],
    // блискавка
    [
        [1, 0],
        [1, 1],
        [2, 1],
        [
            // поворот на 90*
            [0, 2],
            [-1, 1],
            [0, 0],
            [-1, -1],
        ],
        [
            // поворот на 180*
            [2, -1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ],
        [
            // поворот на 270*
            [-1, -1],
            [0, 0],
            [-1, 1],
            [0, 2],
        ],
        [
            // поворот на 360*
            [-1, 0],
            [0, -1],
            [1, 0],
            [2, -1],
        ],
    ],
    // блискавка повернута
    [
        [1, 0],
        [0, 1],
        [-1, 1],
        [
            // поворот на 90*
            [0, 1],
            [-1, 0],
            [1, 0],
            [2, 1],
        ],
        [
            // поворот на 180*
            [0, -1],
            [1, 0],
            [-1, 0],
            [-2, -1],
        ],
        [
            // поворот на 270*
            [0, 1],
            [-1, 0],
            [1, 0],
            [2, 1],
        ],
        [
            // поворот на 360*
            [0, -1],
            [1, 0],
            [-1, 0],
            [-2, -1],
        ],
    ],

]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;
//функція створення фігур
function create() {
    //функція яка повертає рандомну фігуру
    function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1))
    }

    rotate = 1;

    currentFigure = getRandom();
    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        // [0][0] - перше число строка, друге елемент
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}
create();

// функція руху
function move() {
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ];

    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${(coordinates[i][0])}"][posY = "${(coordinates[i][1]) - 1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }

    if (moveFlag) {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${(coordinates[0][0])}"][posY = "${(coordinates[0][1]) - 1}"]`),
            document.querySelector(`[posX = "${(coordinates[1][0])}"][posY = "${(coordinates[1][1]) - 1}"]`),
            document.querySelector(`[posX = "${(coordinates[2][0])}"][posY = "${(coordinates[2][1]) - 1}"]`),
            document.querySelector(`[posX = "${(coordinates[3][0])}"][posY = "${(coordinates[3][1]) - 1}"]`),
        ]
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }

        // перевірка чи є на полі заповняні ряди. і по У а к по Х
        for (let i = 1; i < 15; i++) {
            let count = 0;
            for (let k = 1; k < 11; k++) {

                // перевірка чи є в ряді клас set тоді count ++
                if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                    count++;
                    // якщо count = 10 то ряд повністю заповнений і клас set remove
                    if (count == 10) {
                        for (let m = 1; m < 11; m++) {
                            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                        }

                        let set = document.querySelectorAll('.set');
                        // в newSet записуються координати нових рядів
                        let newSet = [];
                        for (let s = 0; s < set.length; s++) {
                            // отримуємо позиції кожного елементу з класом set
                            let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                            
                            if (setCoordinates[1] > i) {
                                set[s].classList.remove('set');
                                // добавляється клас set в видалене поле
                                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                            }
                        }
                        for (let a = 0; a < newSet.length; a++) {
                            newSet[a].classList.add('set');
                        }
                        // пониження ряду
                        i--;
                    }
                }
            }
        }

        for (let n = 1; n < 11; n++) {
            if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                clearInterval(interval);
                alert("Кінець гри")
                window.location.reload();
                break;
            }
        }

        create();
    }
}

let interval = setInterval(() => {
    move();
}, 300);


let flag = true;

// відстеження нажимання на кнопкі
window.addEventListener('keydown', function (event) {

    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

    // функція відстеження нового положення фігури в просторі
    function getNewState(a) {

        flag = true;

        // масив який буде в себе приймати координати по Х, У остається не змінним, рух тільки по Х
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)

        ];

        for (let i = 0; i < figureNew.length; i++) {
            // якщо !figureNew(i) - не існує або є figureNew(i).classList.contains('set'), тоді робимо false, тобто руху не буде
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag == true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

        }

    }

    if (event.keyCode == 37) {
        getNewState(-1);
    } else if (event.keyCode == 39) {
        getNewState(1);
    } else if (event.keyCode == 40) {
        move();
    } else if (event.keyCode == 38) {
        flag = true;

        // масив який буде в себе приймати координати по Х, У остається не змінним, рух тільки по Х
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`)

        ];

        for (let i = 0; i < figureNew.length; i++) {
            // якщо !figureNew(i) - не існує або є figureNew(i).classList.contains('set'), тоді робимо false, тобто руху не буде
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag == true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

            if (rotate < 4) {
                rotate++;
            } else {
                rotate = 1;
            }

        }
    }
});