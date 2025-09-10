'use strict';



// 요소 토글 함수
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// 사이드 바 변수
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// 모바일용 사이드바 토글 기능
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// 사용자 후기 섹션 변수
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// 모달 변수
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// 모달 토글 기능
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// 모든 모달 항목에 클릭 이벤트를 적용
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// 모달 종료 버튼에 클릭 이벤트 적용
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// 맞춤형 선택 변수
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// 모든 선택 항목에 이벤트를 적용
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// 필터링 변수
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// 데스크톱 화면의 모든 필터 버튼에 이벤트 추가
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// 연락처 양식 변수
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const ContactForm = document.getElementById("contact-form")

// 폼 입력 항목 전체에 이벤트 적용
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // 폼 유효성 검사
    if (form.checkValidity()) {
      formBtn.removeAttribute("enabled");
    } else {
      formBtn.setAttribute("enabled", "");
    }

  });
}
//이메일js 적용


ContactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.init({
        publicKey: "T5i8NO7A8E568KasH",
      });

    emailjs.sendForm("service_kggqyuc", "template_d2iaw6c", this)
      .then(function(response) {
         alert("이메일이 성공적으로 발송되었습니다");
      }, function(error) {
         alert("이메일 발송에 실패하였습니다");
         console.error(error);
      });
  });

// 페이지 내비게이션 변수
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// 모든 내비게이션 링크에 이벤트 적용
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//보안

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    (e.ctrlKey && e.key === 'U') ||
    (e.ctrlKey && e.shiftKey && e.key === 'C')
  ) {
    e.preventDefault();
    alert('개발자 도구 사용이 제한되었습니다.');
  }
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert('마우스 오른쪽 클릭이 제한되었습니다.');
});

const threshold = 160;
let devtoolsOpen = false;

// 모바일 기기인지 판별하는 함수 추가
function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

function detectDevTools() {
  let devtoolsDetected = false;

  // 모바일이 아닐 때만 화면 크기 차이 감지
  if (!isMobile()) {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
      devtoolsDetected = true;
    }
  }

  // 디버거 중단점 시간 감지 로직은 그대로 유지
  const start = performance.now();
  debugger;
  const duration = performance.now() - start;
  if (duration > 100) {
    devtoolsDetected = true;
  }

  if (devtoolsDetected) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      console.clear();
      document.body.innerHTML = '<h1 style="color:red; text-align:center;">비정상 접근이 감지되었습니다.</h1>';
      throw new Error('DevTools Detected');
    }
  } else {
    devtoolsOpen = false;
  }
}

setInterval(detectDevTools, 1000);

  