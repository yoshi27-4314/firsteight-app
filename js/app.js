/**
 * ファーストエイト業務アプリ - メインJS
 */

// ====== 状態管理 ======
let currentUser = null;
let currentTab = 'home';
let cameraStep = 1;
let currentItem = {};
let photosTaken = 0;

// ====== ログイン ======
function doLogin() {
  const sel = document.getElementById('loginStaff');
  const name = sel.value;
  if (!name) { showToast('スタッフを選択してください'); return; }
  currentUser = { name: name, isAdmin: name === '浅野儀頼' };
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('mainScreen').classList.add('active');
  document.getElementById('staffName').textContent = name.split(/[　 ]/)[0];
  document.getElementById('mypageName').textContent = name;
  updateDate();
  if (currentUser.isAdmin) {
    document.getElementById('notifBadge').style.display = 'flex';
  }
}

function doLogout() {
  currentUser = null;
  document.getElementById('mainScreen').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
}

// ====== タブ切り替え ======
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  // カメラタブに切り替えた時はステップ1から
  if (tab === 'camera' && cameraStep === 1) {
    resetCameraFlow();
  }
}

// ====== 日付表示 ======
function updateDate() {
  const now = new Date();
  const days = ['日','月','火','水','木','金','土'];
  const d = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日（${days[now.getDay()]}）`;
  document.getElementById('todayDate').textContent = d;
}

// ====== 撮影フロー ======
function resetCameraFlow() {
  cameraStep = 1;
  currentItem = {};
  photosTaken = 0;
  showCameraStep(1);
  document.getElementById('preview1').style.display = 'none';
  document.getElementById('afterPhoto1').style.display = 'none';
  document.querySelector('.camera-placeholder').style.display = 'flex';
}

function showCameraStep(step) {
  document.querySelectorAll('.camera-step').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('cameraStep' + step);
  if (el) el.classList.add('active');
  cameraStep = step;
}

function takePhoto() {
  document.getElementById('photoInput').click();
}

function handlePhoto(event, num) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('preview1');
    preview.src = e.target.result;
    preview.style.display = 'block';
    document.querySelector('.camera-placeholder').style.display = 'none';
    document.getElementById('afterPhoto1').style.display = 'block';
    currentItem.photo1 = e.target.result;
  };
  reader.readAsDataURL(file);
}

function retakePhoto(num) {
  document.getElementById('preview1').style.display = 'none';
  document.getElementById('afterPhoto1').style.display = 'none';
  document.querySelector('.camera-placeholder').style.display = 'flex';
  document.getElementById('photoInput').value = '';
}

function analyzePhoto() {
  // デモ用：AI判定をシミュレート
  showToast('🤖 AIが判定中...');
  setTimeout(() => {
    // デモデータ
    currentItem.productName = 'ビンテージ テーブルランプ（真鍮製）';
    currentItem.category = '照明・ランプ';
    currentItem.condition = 'B（使用感あり・動作OK）';
    currentItem.channel = 'ヤフオクビンテージ';
    currentItem.price = '¥12,000〜18,000';
    currentItem.size = 'ほぼ 25×25×40cm';

    document.getElementById('aiProductName').textContent = currentItem.productName;
    document.getElementById('aiCategory').textContent = currentItem.category;
    document.getElementById('aiCondition').textContent = currentItem.condition;
    document.getElementById('aiChannel').textContent = currentItem.channel;
    document.getElementById('aiPrice').textContent = currentItem.price;
    document.getElementById('aiSize').textContent = currentItem.size;

    showCameraStep(2);
  }, 1500);
}

function acceptJudgment() {
  // 撮影ガイドを表示
  buildPhotoGuide();
  showCameraStep(3);
}

function consultAsano() {
  showToast('🙋 浅野さんに相談を送信しました');
  // 実装時はここでSupabaseに保存 + 通知
}

// ====== 撮影ガイド ======
function buildPhotoGuide() {
  // カテゴリに応じたガイドを生成（デモ：照明・ランプ）
  const guides = [
    { title: '型番・メーカーラベル', desc: '底面や背面のラベルを撮影' },
    { title: '点灯状態', desc: '電源を入れた状態で撮影' },
  ];

  const list = document.getElementById('photoGuideList');
  list.innerHTML = '';
  guides.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = 'photo-guide-item';
    div.innerHTML = `
      <div class="photo-guide-num" id="guideNum${i+2}">${i+2}</div>
      <div class="photo-guide-text">
        <div class="photo-guide-title">${g.title}</div>
        <div class="photo-guide-desc">${g.desc}</div>
      </div>
      <button class="photo-guide-btn" id="guideBtn${i+2}" onclick="takeGuidePhoto(${i+2})">📷 撮影</button>
    `;
    list.appendChild(div);
  });

  // 「次へ」ボタンの表示管理
  photosTaken = 0;
  document.getElementById('afterAllPhotos').style.display = 'none';
}

function takeGuidePhoto(num) {
  // デモ用：撮影完了をシミュレート
  const numEl = document.getElementById('guideNum' + num);
  const btnEl = document.getElementById('guideBtn' + num);
  numEl.classList.add('done');
  numEl.textContent = '✓';
  btnEl.classList.add('done');
  btnEl.textContent = '✓ 完了';
  btnEl.onclick = null;

  photosTaken++;
  const totalGuides = document.querySelectorAll('.photo-guide-item').length;
  if (photosTaken >= totalGuides) {
    document.getElementById('afterAllPhotos').style.display = 'block';
  }
}

function goToStep4() {
  showCameraStep(4);
}

function selectLocation(loc) {
  // 選択状態の切り替え
  document.querySelectorAll('.location-btn').forEach(b => b.classList.remove('selected'));
  event.target.classList.add('selected');
  currentItem.location = loc;

  // 少し待ってから完了画面へ
  setTimeout(() => {
    // 管理番号を生成（デモ用）
    const now = new Date();
    const yymm = String(now.getFullYear()).slice(2) + String(now.getMonth()+1).padStart(2,'0');
    const seq = String(Math.floor(Math.random() * 100) + 30).padStart(4, '0');
    currentItem.mgmtNum = yymm + '-' + seq;

    document.getElementById('completeMgmtNum').textContent = currentItem.mgmtNum;
    document.getElementById('completeProduct').textContent = currentItem.productName;
    document.getElementById('completeChannel').textContent = currentItem.channel;
    document.getElementById('completeLocation').textContent = loc;

    showCameraStep(5);
  }, 500);
}

function startNewItem() {
  resetCameraFlow();
  switchTab('camera');
}

// ====== チャット ======
function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addChatMessage(msg, 'user');
  input.value = '';

  // デモ用：Bot返答
  setTimeout(() => {
    addChatMessage('ご質問ありがとうございます。社内ルールを確認しています...', 'bot');
  }, 800);
  setTimeout(() => {
    addChatMessage('分荷判定のルールについて：予想販売価格¥30,000以上の商品は浅野さんの承認が必要です。該当する場合は「相談する」ボタンをご利用ください。', 'bot');
  }, 2000);
}

function addChatMessage(text, type) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  const avatar = type === 'bot' ? '🤖' : '👤';
  div.innerHTML = `
    <div class="chat-avatar">${avatar}</div>
    <div class="chat-bubble">${escapeHtml(text)}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function startConsultation() {
  addChatMessage('浅野さんへの相談モードです。相談内容を入力してください。写真がある場合は撮影タブから送れます。', 'bot');
}

// ====== 在庫検索 ======
function searchStock() {
  const q = document.getElementById('stockSearch').value.trim();
  if (!q) return;
  showToast('🔍 「' + q + '」を検索中...');
  // 実装時はSupabase or スプレッドシートを検索
}

// ====== 通知 ======
function showNotifications() {
  showToast('🔔 通知一覧（実装予定）');
}

// ====== ユーティリティ ======
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ====== 初期化 ======
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
});
