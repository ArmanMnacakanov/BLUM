let leafCount = 0;
const maxLeaves = 10000;
const gameDuration = 30; // продолжительность игры в секундах

function createLeaf() {
  if (leafCount >= maxLeaves) {
    return;
  }

  const leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.style.animation = "fall 3s linear infinite";
  leaf.style.left = `${Math.random() * 90}%`;
  document.querySelector(".Blum_Container").appendChild(leaf);
  leafCount++;
  var coin = document.querySelector(".coin>h1");

  leaf.addEventListener("click", () => {
    leaf.style.display = "none";
    coin.innerHTML = parseInt(coin.innerHTML) + 1;
  });

  leaf.addEventListener("animationiteration", () => {
    leaf.remove();
    leafCount--; // Уменьшаем счетчик, когда лист заканчивает анимацию и удаляется
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
      time.innerHTML = '00:00';
      alert(`Time Out! Your score is ${coin.innerHTML}`);
      return;
    }

    time.innerHTML = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
  }, 1000);

  const leafCreationIntervalId = setInterval(() => {
    createLeaf();
  }, 500); // Увеличиваем интервал до 3 секунд
}

startGame();
