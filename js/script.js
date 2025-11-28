/* js/script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if(navMenu.classList.contains('active')){
            hamburger.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.querySelector('.bar:nth-child(2)').style.opacity = '0';
            hamburger.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            hamburger.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
            hamburger.querySelector('.bar:nth-child(2)').style.opacity = '1';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
            hamburger.querySelector('.bar:nth-child(2)').style.opacity = '1';
        });
    });

    // 2. スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // 3. 実績セクションのタブ切り替え
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. 活動報告のカテゴリフィルタ
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            newsCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.removeAttribute('hidden');
                    card.style.display = 'block';
                } else {
                    card.setAttribute('hidden', '');
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. 活動報告モーダル
    const modal = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title-text');
    const modalDate = document.getElementById('modal-date-text');
    const modalBody = document.getElementById('modal-body-text');

    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.news-title').textContent;
            const date = card.querySelector('.news-date').textContent;
            const detailText = "（詳細記事サンプル）\n\nここに記事の全文が入ります。クリックされた記事タイトルは「" + title + "」です。\n\n橋本市での活動を通して、地域の皆様から頂いた声を形にするため、日々奔走しております。";

            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalBody.textContent = detailText;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    };
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 6. フォーム送信処理（ダミー）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msgContainer = form.querySelector('.form-message');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            setTimeout(() => {
                msgContainer.textContent = "送信ありがとうございます。メッセージを受け付けました。";
                form.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });
});