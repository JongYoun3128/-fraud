// 히어로 슬라이더
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const sliderDots = document.getElementById("sliderDots");

// 슬라이더 도트 생성
slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// 자동 슬라이드 (5초마다)
setInterval(nextSlide, 3000);

// 통계 숫자 애니메이션
function animateStats() {
    const stats = document.querySelectorAll(".stat-number");

    stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        const duration = 2000; // 2초
        const increment = target / (duration / 16); // 60fps 기준
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };

        updateNumber();
    });
}

// Intersection Observer로 통계 섹션이 보일 때 애니메이션 실행
const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 후기 슬라이더
let currentReviewIndex = 0;
const reviewsSlider = document.getElementById("reviewsSlider");
const reviewCards = document.querySelectorAll(".review-card");
const prevReviewBtn = document.getElementById("prevReview");
const nextReviewBtn = document.getElementById("nextReview");

// function updateReviewsDisplay() {
//     if (window.innerWidth <= 768) {
//         // 모바일에서는 한 번에 하나씩
//         reviewCards.forEach((card, index) => {
//             card.style.display =
//                 index === currentReviewIndex ? "block" : "none";
//         });
//     } else {
//         // 데스크톱에서는 모두 표시
//         reviewCards.forEach((card) => {
//             card.style.display = "block";
//         });
//     }
// }

// prevReviewBtn.addEventListener("click", () => {
//     currentReviewIndex =
//         (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;
//     updateReviewsDisplay();
// });

// nextReviewBtn.addEventListener("click", () => {
//     currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
//     updateReviewsDisplay();
// });

// 화면 크기 변경 시 후기 표시 업데이트
// window.addEventListener("resize", updateReviewsDisplay);
// updateReviewsDisplay();

// 맨 위로 버튼
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
    } else {
        scrollToTopBtn.classList.remove("visible");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// 부드러운 스크롤 (앵커 링크)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "") return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    });
});

// 카드 호버 효과 - 3D 틸트
const cards = document.querySelectorAll(
    ".program-card, .category-card, .step-card"
);

cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transition = "all 0.1s ease";
    });

    card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
        this.style.transition = "all 0.3s ease";
        this.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// 페이지 로드 애니메이션
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "1";
    }, 100);
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animateElements = document.querySelectorAll(
    ".program-card, .track-card, .step-card, .review-card, .award-card, .ba-card"
);

animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    observer.observe(element);
});

// 모바일 메뉴 토글
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.querySelector(".main-nav");

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.contains("mobile-open");

        if (isOpen) {
            mainNav.classList.remove("mobile-open");
            mainNav.style.display = "none";
        } else {
            mainNav.classList.add("mobile-open");
            mainNav.style.display = "block";
            mainNav.style.position = "absolute";
            mainNav.style.top = "100%";
            mainNav.style.left = "0";
            mainNav.style.right = "0";
            mainNav.style.background = "white";
            mainNav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            mainNav.style.padding = "1rem";
            mainNav.style.zIndex = "999";

            const ul = mainNav.querySelector("ul");
            if (ul) {
                ul.style.flexDirection = "column";
                ul.style.gap = "1rem";
            }
        }
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove("mobile-open");
                mainNav.style.display = "none";
            }
        });
    });
}

// 버튼 클릭 효과
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        // 리플 효과
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s ease-out";
        ripple.style.pointerEvents = "none";

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// 리플 애니메이션 CSS 추가
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 랜덤 캐시백 금액 표시 (카테고리 카드)
function updateCategoryStats() {
    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach((card) => {
        const countElement = card.querySelector(".category-count");
        if (countElement) {
            const currentCount = parseInt(countElement.textContent);
            // 랜덤하게 1-5 증가
            const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
            countElement.textContent = newCount.toLocaleString() + "개 브랜드";
        }
    });
}

// 30초마다 브랜드 수 업데이트
setInterval(updateCategoryStats, 30000);

// 실시간 사용자 알림 (130% 시스템)
// function showNotification() {
//     const notifications = [
//         "김**님의 ROUND 2 그룹이 완료되어 32.5만원 지급!",
//         "이**님이 ROUND 3 그룹에 매칭되었습니다",
//         "박**님의 ROUND 4 그룹이 완료되어 97.5만원 지급!",
//         "최**님의 그룹이 5명 완성되었습니다",
//         "정**님의 ROUND 1 그룹이 완료되어 19.5만원 지급!",
//         "강**님이 ROUND 5 그룹에 매칭되었습니다",
//     ];

//     const notification = document.createElement("div");
//     notification.style.position = "fixed";
//     notification.style.bottom = "100px";
//     notification.style.right = "30px";
//     notification.style.background = "white";
//     notification.style.padding = "1rem 1.5rem";
//     notification.style.borderRadius = "8px";
//     notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
//     notification.style.zIndex = "1000";
//     notification.style.opacity = "0";
//     notification.style.transform = "translateX(400px)";
//     notification.style.transition = "all 0.3s ease";
//     notification.style.maxWidth = "350px";
//     notification.textContent =
//         notifications[Math.floor(Math.random() * notifications.length)];

//     document.body.appendChild(notification);

//     setTimeout(() => {
//         notification.style.opacity = "1";
//         notification.style.transform = "translateX(0)";
//     }, 100);

//     setTimeout(() => {
//         notification.style.opacity = "0";
//         notification.style.transform = "translateX(400px)";
//         setTimeout(() => notification.remove(), 300);
//     }, 4000);
// }

// // 10초마다 알림 표시
// setInterval(showNotification, 10000);
// // 페이지 로드 5초 후 첫 알림
// setTimeout(showNotification, 5000);

// FAQ 아코디언
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // 모든 FAQ 아이템 닫기
        faqItems.forEach((faq) => faq.classList.remove("active"));

        // 클릭한 아이템만 토글
        if (!isActive) {
            item.classList.add("active");
        }
    });
});

// // 실시간 활동 피드 애니메이션 - 130% 시스템 버전
// function updateLiveFeed() {
//     const feedContainer = document.getElementById("liveFeed");
//     if (!feedContainer) return;

//     const names = [
//         "김**",
//         "이**",
//         "박**",
//         "최**",
//         "정**",
//         "강**",
//         "조**",
//         "윤**",
//         "장**",
//         "임**",
//     ];
//     const tracks = [
//         { name: "ROUND 1", min: 10, max: 20 },
//         { name: "ROUND 2", min: 20, max: 30 },
//         { name: "ROUND 3", min: 30, max: 50 },
//         { name: "ROUND 4", min: 50, max: 100 },
//         { name: "ROUND 5", min: 100, max: 300 },
//         { name: "ROUND 6", min: 300, max: 1000 },
//         { name: "ROUND 7", min: 1000, max: 3000 },
//         { name: "ROUND 8", min: 3000, max: 10000 },
//     ];

//     const actionTypes = [
//         {
//             type: "complete",
//             text: "의 그룹([TRACK])이 완료되어 <strong>[AMOUNT]</strong> 리워드 지급!",
//         },
//         { type: "match", text: "이 [TRACK] 그룹에 매칭되었습니다" },
//         { type: "group", text: "의 [TRACK] 그룹이 5명 완성되었습니다" },
//     ];

//     const randomName = names[Math.floor(Math.random() * names.length)];
//     const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
//     const randomAction =
//         actionTypes[Math.floor(Math.random() * actionTypes.length)];

//     let message = "";

//     if (randomAction.type === "complete") {
//         const amount =
//             Math.floor(
//                 Math.random() * (randomTrack.max - randomTrack.min + 1)
//             ) + randomTrack.min;
//         message = randomAction.text
//             .replace("[TRACK]", randomTrack.name)
//             .replace("[AMOUNT]", amount + "만원");
//     } else {
//         message = randomAction.text.replace("[TRACK]", randomTrack.name);
//     }

//     const feedItem = document.createElement("div");
//     feedItem.className = "feed-item";
//     feedItem.innerHTML = `
//         <span class="feed-avatar">👤</span>
//         <span class="feed-text"><strong>${randomName}</strong>님${message}</span>
//         <span class="feed-time">방금 전</span>
//     `;

//     // 첫 번째 아이템으로 추가
//     feedContainer.insertBefore(feedItem, feedContainer.firstChild);

//     // 5개 이상이면 마지막 아이템 삭제
//     if (feedContainer.children.length > 5) {
//         feedContainer.removeChild(feedContainer.lastChild);
//     }
// }

// // 15초마다 피드 업데이트
// setInterval(updateLiveFeed, 15000);

// // 페이지 로드 시 첫 업데이트
// setTimeout(updateLiveFeed, 3000);

// 숫자에 쉼표 추가하는 함수
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 멤버십 카드 클릭 효과
const membershipCards = document.querySelectorAll(".membership-card");

membershipCards.forEach((card) => {
    card.addEventListener("click", function () {
        membershipCards.forEach((c) => c.classList.remove("selected"));
        this.classList.add("selected");
    });
});

// 비교 표 강조 효과
const comparisonRows = document.querySelectorAll(".comparison-row");

comparisonRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
        this.style.background = "rgba(99, 102, 241, 0.05)";
    });

    row.addEventListener("mouseleave", function () {
        this.style.background = "transparent";
    });
});

// Before & After 카드 애니메이션
const baCards = document.querySelectorAll(".ba-card");

const baObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                baObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

baCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    baObserver.observe(card);
});
const cafeBtn = document.querySelector("#cafe-btn");
const popup = () => {
    alert("BLUE SEED 준비중입니다.");
};
// 페이지 상단으로 부드럽게 스크롤하는 기능 개선
document.querySelectorAll('a[href="#home"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});

console.log("🎉 쇼핑하면서 돈벌기 사이트가 로드되었습니다!");
