(() => {
  function screenHeight(){
    return  document.querySelector('.first-screen').clientHeight
  }

  function createEl(options){
    const EL = document.createElement(options.name)
    if (options.classList != null)
      for (const e of options.classList) {
        EL.classList.add(e)
      }
    options.text != null ? EL.textContent = options.text : null
    options.data != null ? EL.dataset[options.data.dataset] = options.data.value : null
    options.id != null ? EL.id = options.id : null
    options.placeholder != null ? EL.placeholder = options.placeholder : null
    options.type != null ? EL.type = options.type : null
    options.checked != null ? EL.checked = options.checked : null
    options.target != null ? EL.target = options.target : null
    options.href != null ? EL.href = options.href : null
    options.src != null ? EL.src = options.src : null
    return EL
  }

  function createItem(symbol){
    const ITEM = createEl({
              name: 'li',
              classList: ['game-couples__item', 'animate__animated']
            }),
          BUTTON = createEl({
              name: 'button',
              text: symbol,
              data: {dataset: 'id', value: symbol},
              classList: ['game-couples__btn', 'animate__animated']
            })

    BUTTON.addEventListener('click', () => {
      BUTTON.disabled = true
      ITEM.classList.add('animate__flip')
      ITEM.classList.add('open')
    });
    ITEM.addEventListener('animationend', () => {
      ITEM.classList.remove('animate__flip')
    });
    ITEM.append(BUTTON)

    return {
      ITEM,
      BUTTON
    }
  }

  function shuffle(arr){
    let j = null
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
  }

  function deleteSecondEl(){
    document.querySelector('.game-couples__list').remove();
    document.querySelector('.box--game-over').remove();
  }

  function deleteStartMenu(){
    document.querySelector('.box--start').remove();
  }

  function createStartMenu(repet = false){
    const box = createEl({
              name: 'div',
              classList: ['box', 'box--start', 'animate__animated', 'animate__bounceInDown', 'animate__delay-1s']
            }),
          title = createEl({
              name: 'h2',
              classList: ['title'],
              text: "Игра в пары"
            }),
          desc = createEl({
              name: 'p',
              classList: ['desc'],
              text: repet ? "С правилами игры ты уже знаком, так что вводи четное число строк/колон!" : "Правила игры очень просты. Необходимо найти парные карты до того как закончиться время. В поле снизу необходимо ввести четное число строк/колон для построения игрового поля, удачи!"
            }),
          form = createEl({
              name: 'form',
              classList: ['form']
            }),
          input = createEl({
              name: 'input',
              classList: ['input'],
              placeholder: 'Введите число от 2 до 10'
            }),
          label = createEl({
              name: 'label',
              classList: ['label'],
              text: 'Игра на время'
            }),
          checkbox = createEl({
              name: 'input',
              classList: ['checkbox'],
              type: 'checkbox',
              checked: 'checked'
            }),
          button = createEl({
              name: 'button',
              text: 'Начать игру',
              classList: ['button', 'button--start']
            })

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      createGameCouples(Number(input.value), checkbox.checked)
      document.querySelectorAll('.game-couples__btn').forEach(function(items){
        items.style.fontSize = `${items.offsetWidth / 2}px`
        window.addEventListener('resize', () => items.style.fontSize = `${items.offsetWidth / 2}px`)
      })
      input.value = ''
      document.querySelector('.game-wraper').classList.add('game-wraper--start')
      setTimeout(deleteStartMenu, 1000)
    })

    label.append(checkbox)
    form.append(label, input, button)
    box.append(title, desc, form);
    return box
  }

  function createFinishMenu(victory = true){
    const box = createEl({
            name: 'div',
            classList: ['box', 'box--game-over', 'animate__animated', 'animate__backInUp']
          }),
          title = createEl({
            name: 'h2',
            classList: ['title'],
            text: 'Конец игры'
          }),
          desc = createEl({
            name: 'p',
            classList: ['desc'],
            text: victory ? "Поздравляю с победой! Вы будто видите их насквозь, может в следующей раз увеличим количество карточек?" : "Увы! Время вышло, может в следующий раз уменьшить количество карточек?"
          }),
          button = createEl({
            name: 'button',
            classList: ['button', 'button--game-over'],
            text: 'Сыграть ещё раз'
          })

    button.addEventListener('click', () => {
      window.scrollTo({
        top: -screenHeight(),
        behavior: "smooth"
      });
      setTimeout(deleteSecondEl, 1000)
      document.querySelector('.game-wraper').classList.remove('game-wraper--start')
      document.querySelector('.container--first').append(createStartMenu(true))
    })

    box.append(title, desc, button)
    return box
  }

  function createAdvertising(){
    const wraper = createEl({
              name: 'div',
              classList: ['wraper']
            }),
          screen = createEl({
              name: 'a',
              classList: ['screen-ad'],
              target: 'blank',
              href: 'https://tlgg.ru/@Gadaev_Sergey'
            }),
          content = createEl({
              name: 'img',
              classList: ['content'],
              src: 'img/first-ad.jpg'
            }),
          blurb = createEl({
              name: 'div',
              classList: ['blurb'],
            })

    screen.append(content)
    wraper.append(screen, blurb)

    return wraper
  }

  function createTwoScreen(){
    const firstScreen = createEl({
              name: 'div',
              classList: ['first-screen', 'screen']
            }),
          secondScreen = createEl({
              name: 'div',
              classList: ['second-screen', 'screen']
            }),
          firstContainer = createEl({
              name: 'div',
              classList: ['container', 'container--first', 'game-couples']
            }),
          secondContainer = createEl({
              name: 'div',
              classList: ['container', 'container--second', 'game-couples']
            })
          game = createEl({
              name: 'div',
              classList: ['game']
            })
          gameWraper = createEl({
              name: 'div',
              classList: ['game-wraper']
            })

    firstContainer.append(createAdvertising())
    firstContainer.append(createStartMenu())
    firstScreen.append(firstContainer)
    secondScreen.append(secondContainer)
    gameWraper.append(firstScreen, secondScreen)
    game.append(gameWraper)

    return game

  }

  function createGameCouples(rowsColumns = 4, checkTime = true){
    const container = document.querySelector('.container--second'),
          couplesList = createEl({
              name: 'ul',
              classList: ['game-couples__list', 'animate__animated', 'animate__zoomInDown']
            }),
          gameTimer = checkTime ? timer(60) : null,
          arrayCards = []
    let = couplesCards = []

    rowsColumns%2 === 0 && rowsColumns > 0 && rowsColumns <= 10 ? null : rowsColumns = 4

    for (let i = Math.pow(rowsColumns, 2) / 2 ; i > 0 ; i-- ) arrayCards.push(i, i)
    shuffle(arrayCards)
    couplesList.classList.add(`grid-${rowsColumns}`)
    container.append(couplesList)
    for (const i of arrayCards) couplesList.append(createItem(i).ITEM)

    function gameOver(victory){
      document.querySelector('.game-couples__list').style.pointerEvents = 'none'
      document.querySelector('.container--second').append(createFinishMenu(victory))
      clearInterval(gameTimer)
    }

    function timer(second){
      let time = second
      const timer = () => {
              if (time > 0) {
                time--
              } else {
                gameOver(false)
                clearInterval(startTimer)
              }
             },
            startTimer = window.setInterval(timer, 1000)

      return startTimer
    }

    couplesList.addEventListener('click', (e) => {
      if (couplesCards.length == 2 && couplesCards[0] !== couplesCards[1]) {
        let firstEl = couplesList.querySelector(`[data-target = "${couplesCards[0]}"]`)
        firstEl.disabled = false
        firstEl.parentNode.classList.remove('open')
        firstEl.parentNode.classList.add('animate__headShake')
        firstEl.parentNode.addEventListener('animationend', () => {
          firstEl.parentNode.classList.remove('animate__headShake')
        });
        let secondEl = couplesList.querySelector(`[data-target = "${couplesCards[1]}"]`)
        secondEl.disabled = false
        secondEl.parentNode.classList.remove('open')
        secondEl.parentNode.classList.add('animate__headShake')
        secondEl.parentNode.addEventListener('animationend', () => {
          secondEl.parentNode.classList.remove('animate__headShake')
        });
      }

      if (couplesCards.length == 2) {
        couplesList.querySelectorAll('[data-target]').forEach((e) => {
          delete e.dataset.target
        })
        couplesCards = []
      }

      e.target.dataset.id ? e.target.dataset.target = e.target.dataset.id : null
      e.target.dataset.id ? couplesCards.push(e.target.dataset.id) : null

      if (couplesCards[0] === couplesCards[1]) {
        couplesList.querySelectorAll('[data-target]').forEach((e) => {
          e.classList.add('done')
          if (document.querySelectorAll('.done').length === arrayCards.length) setTimeout(gameOver, 1500)
        })
      }
    })
  }

  window.document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').append(createTwoScreen())
  })

})()
