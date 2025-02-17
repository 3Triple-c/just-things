"use strict";

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  const timeElement = document.querySelector(".time");
  timeElement.textContent = timeString;
}

// Update the time immediately when the page loads
updateTime();

// Set an interval to update the time every minute
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", event => {
  const dateElement = document.querySelector(".date");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();

  dateElement.textContent = `${day}, ${month} ${date}`;
});

document.addEventListener("DOMContentLoaded", event => {
  let startY = 0;
  let isSwiping = false;
  const notification = document.querySelector(".notification-1");
  const swipeElement = document.querySelector(".bottom-line");
  const phone = document.querySelector(".phone");
  const unlockScreen = document.getElementById("unlockScreen");
  const newScreen = document.getElementById("newScreen");
  const lockImg = document.querySelector(".lock");
  const maxImageMove = 100 - 24;
  const midHeight = phone.offsetHeight / 4 - swipeElement.offsetHeight / 4;

  swipeElement.addEventListener(
    "touchstart",
    function (event) {
      startY = event.touches[0].clientY;
      isSwiping = true;
    },
    false
  );
  swipeElement.addEventListener(
    "touchmove",
    function (event) {
      if (isSwiping) {
        const touchY = event.touches[0].clientY;
        console.log(touchY);
        const moveY = touchY - startY;
        if (moveY < 0 && Math.abs(moveY) < midHeight) {
          const progress = Math.abs(moveY) / midHeight;
          swipeElement.style.transform = `translateY(${moveY}px)`;
          lockImg.style.transform = `translateX(${progress * maxImageMove}px)`;
        }
      }
    },
    false
  );

  swipeElement.addEventListener(
    "touchend",
    function (event) {
      if (isSwiping) {
        const touchY = event.changedTouches[0].clientY;
        const moveY = touchY - startY;
        if (Math.abs(moveY) >= midHeight) {
          unlockScreen.classList.remove("hidden");
          swipeElement.classList.add("hidden");
          lockImg.classList.add("hidden");
          newScreen.classList.add("show");
          console.log(newScreen.textContent);
          notification.classList.add("hidden");
          swipeElement.style.transform = `translateY(${-midHeight}px)`;
        } else {
          swipeElement.style.transform = `translateY(0)`;
          lockImg.style.transform = `translateY(0)`;
        }
        isSwiping = false;
      }
    },
    false
  );

  // for testing on desktop

  swipeElement.addEventListener(
    "mousedown",
    function (event) {
      startY = event.clientY;
      isSwiping = true;
    },
    false
  );

  document.addEventListener(
    "mousemove",
    function (event) {
      if (isSwiping) {
        const moveY = event.clientY - startY;
        if (moveY < 0 && Math.abs(moveY) < midHeight) {
          const progress = Math.abs(moveY) / midHeight;
          swipeElement.style.transform = `translateY(${moveY}px)`;
          lockImg.style.transform = `translateX(${progress * maxImageMove}px)`;
        }
      }
    },
    false
  );

  document.addEventListener(
    "mouseup",
    function (event) {
      if (isSwiping) {
        const moveY = event.clientY - startY;
        if (Math.abs(moveY) >= midHeight) {
          unlockScreen.classList.remove("hidden");
          swipeElement.classList.add("hidden");
          newScreen.classList.add("show");
          notification.classList.add("hidden");
          lockImg.classList.add("hidden");
          console.log(newScreen.textContent);
          swipeElement.style.transform = `translateY(${-midHeight}px)`;
        } else {
          swipeElement.style.transform = `translateY(0)`;
          lockImg.style.transform = `translateY(0)`;
        }
        isSwiping = false;
      }
    },
    false
  );
});
