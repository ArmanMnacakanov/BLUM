document.querySelector('.Retry').style.display = 'none'
const start = document.getElementById('start');
start.addEventListener('click',()=>{
  document.querySelector('.wellcome_box').style.display = 'none'
  let leafCount = 0;
  const maxLeaves = 10000;
  const gameDuration = 30; // продолжительность игры в секундах
  
  function createLeaf() {
    if (leafCount >= maxLeaves) {
      return;
    }
  
    const leaf = document.createElement("div");
    leaf.classList.add('leaf');
    leaf.style.animation = "fall 3s linear infinite";
    leaf.style.left = `${Math.random() * 90}%`;
    document.querySelector(".Blum_Container").appendChild(leaf);
    leafCount++;
    var coin = document.querySelector(".coin>h1");
  
    leaf.addEventListener("click", () => {
      leaf.style.transition = '.5s';
      leaf.style.backgroundColor = 'gold';
      leaf.style.transform = 'scale(0)';
      coin.innerHTML = parseInt(coin.innerHTML) + 1;
    });
  
    leaf.addEventListener("animationiteration", () => {
      leaf.remove();
      leafCount--; // Уменьшаем счетчик, когда лист заканчивает анимацию и удаляется
    });
  }
  
  function createBomb() {
    const bomb = document.createElement("div");
    bomb.classList.add('bomb');
    bomb.style.animation = "fall 3s linear infinite";
    bomb.style.left = `${Math.random() * 90}%`;
    document.querySelector(".Blum_Container").appendChild(bomb);
    var coin = document.querySelector(".coin>h1");
  
    bomb.addEventListener("click", () => {
      document.querySelector(".Blum_Container").style.animation = 'boom 3s linear forwards'
      setTimeout(() => {
        document.querySelector(".Blum_Container").style.animation = ''
      }, 100);
      bomb.style.transition = '.5s';
      bomb.style.backgroundColor = 'red';
      bomb.style.transform = 'scale(0)';
      coin.innerHTML = Math.max(0, parseInt(coin.innerHTML) - 50); // Уменьшаем очки на 50, но не меньше 0
    });
  
    bomb.addEventListener("animationiteration", () => {
      bomb.remove();
    });
  }
  
  function startGame() {
    let time = document.querySelector(".score>h1");
    let coin = document.querySelector(".coin>h1");
    let remainingTime = gameDuration;
  
    time.innerHTML = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
    coin.innerHTML = "0"; // Инициализируем счетчик монет
  
    const gameIntervalId = setInterval(() => {
      remainingTime--;
  
      if (remainingTime <= 0) {
        clearInterval(gameIntervalId);
        clearInterval(leafCreationIntervalId);
        clearInterval(bombCreationIntervalId);
        time.innerHTML = '00:00';
        document.querySelector('.Retry').style.display = 'flex';
        document.getElementById('score').innerHTML = coin.innerHTML
        document.querySelector('.Retry>button').addEventListener('click',()=>{
          document.querySelector('.Retry').style.display = 'none';
          startGame()
        })
        // alert(`Time Out! Your score is ${coin.innerHTML}`);
        return;
      }
  
      time.innerHTML = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
    }, 1000);
  
    const leafCreationIntervalId = setInterval(() => {
      createLeaf();
    }, 300);
  
    const bombCreationIntervalId = setInterval(() => {
      createBomb();
    }, 2000); // Создаем бомбы каждые 2 секунды
  }
  
  startGame();
  
})

