let coursesDiv = document.querySelector(".courses");
let card = document.querySelector(".card2");
let myCourses = [];

fetch("https://mocki.io/v1/55d891dd-42e7-4394-9cb7-510f67c4f89f")
  .then((response) => {
    return response.json();
  })
  .then((arr) => {
    myCourses = arr;

    for (let j = 0; j < arr[0]["courses"].length; j++) {
      makeCourses(arr[0]["courses"][j]);
    }
    activate(0);
    update(0);
  });

function makeCourses(course) {
  let oneCourseDiv = document.createElement("div");
  oneCourseDiv.classList.add("myCourse", "swiper-slide");

  let coursePhoto = document.createElement("img");
  coursePhoto.classList.add("photo");
  coursePhoto.setAttribute("src", course["image"]);

  let courseHead = document.createElement("h4");
  courseHead.classList.add("hd");
  courseHead.innerText = course["title"];

  let courseParag = document.createElement("p");
  courseParag.classList.add("author");
  courseParag.innerText = course["author"][0]["name"];

  let courseRate = document.createElement("div");
  courseRate.classList.add("rate");
  courseRate.innerText = Math.round(course["rating"] * 10) / 10;

  let starsArr = [];
  for (let i = 1; i <= Math.round(course["rating"]); i++) {
    starsArr[i] = document.createElement("i");
    starsArr[i].classList.add("fa-solid", "fa-star");
  }

  let coursePrice = document.createElement("h4");
  coursePrice.classList.add("price");
  coursePrice.innerText = course["price"] + " E£";
  //===========================================
  oneCourseDiv.appendChild(coursePhoto);
  oneCourseDiv.appendChild(courseHead);
  oneCourseDiv.appendChild(courseParag);
  for (let i = 1; i <= Math.round(course["rating"]); i++) {
    courseRate.appendChild(starsArr[i]);
  }
  oneCourseDiv.appendChild(courseRate);
  oneCourseDiv.appendChild(coursePrice);

  coursesDiv.appendChild(oneCourseDiv);
  coursesDiv.classList.add("swiper-wrapper");
}

let expand = document.querySelector(".expand");
let take = document.querySelector(".take");
let list = document.querySelectorAll(".click");

let all = document.querySelectorAll(".click");
for (let c = 0; c < list.length; c++) {
  list[c].addEventListener("click", () => {
    activate(c);
    update(c);
  });
}
function activate(c) {
  for (let i = 0; i < list.length; i++) {
    all[i].style.color = "gray";
  }
  list[c].style.color = "black";
}
function update(c) {
  expand.innerHTML = myCourses[c].sectionTitle;
  take.innerHTML = myCourses[c].courseDesc;
  coursesDiv.innerHTML = "";
  for (let j = 0; j < myCourses[c]["courses"].length; j++) {
    makeCourses(myCourses[c]["courses"][j]);
  }
  card.innerHTML = "";

  let swipe = buildSwiper();
  swipe.appendChild(expand);
  swipe.appendChild(take);

  swipe.appendChild(coursesDiv);

  let swiper = new Swiper(swipe, {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 4,
    loop: false,
    loopFillGroupWithBlank: false,
    allowTouchMove: false,
    navigation: {
      nextEl: swipe.querySelector(".swiper-button-next"),
      prevEl: swipe.querySelector(".swiper-button-prev"),
    },
    breakpoints: {
      1280: {
        slidesPerView: 5,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      890: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
    },
  });
  card.appendChild(swipe);
}
let searchText = document.querySelector("#srch");

searchText.addEventListener("keyup", function () {
  let cs = [];
  cs = filter(searchText.value);
  coursesDiv.innerHTML = "";
  for (let i = 0; i < cs.length; i++) {
    makeCourses(cs[i]);
  }
});

function filter(searchText) {
  let filtered = [];
  if (searchText.length == 0) {
    for (let j = 0; j < myCourses[0]["courses"].length; j++) {
      filtered.push(myCourses[0]["courses"][j]);
    }
  } else {
    for (let i = 0; i < myCourses.length; i++) {
      for (let j = 0; j < myCourses[i]["courses"].length; j++) {
        if (
          myCourses[i]["courses"][j]["title"]
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1
        ) {
          filtered.push(myCourses[i]["courses"][j]);
        }
      }
    }
  }
  return filtered;
}

function buildSwiper() {
  let swipper = document.createElement("div");
  swipper.classList.add("swiper");
  let nextButton = document.createElement("div");
  nextButton.classList.add("swiper-button-next");
  let prevButton = document.createElement("div");
  prevButton.classList.add("swiper-button-prev");
  swipper.appendChild(prevButton);
  swipper.appendChild(nextButton);
  return swipper;
}
