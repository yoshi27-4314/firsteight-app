/**
 * ファーストエイト業務アプリ - 設定
 * APIキーは含まない。Supabase Edge Function経由で安全に呼び出す。
 */

const CONFIG = {
  // Supabase（AWAI共用・DBは使わない。Edge Functionのみ）
  SUPABASE_URL: 'https://njdnfvlucwasrafoepmu.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZG5mdmx1Y3dhc3JhZm9lcG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTEzNjgsImV4cCI6MjA5MDg4NzM2OH0.jDjqf3nWqaQ0sMfDf-85dDQNbEhX90qLsOOhWJdDlM8',

  // GAS（スプレッドシート書き込み）
  GAS_URL: 'https://script.google.com/macros/s/AKfycbx9JpYWvi3p0HgA9Bb0RLgEjkgzbF6iJRuAX7Ks2VL3hwIEnpuTR0J1ydtxegGKRXjh/exec',

  // 販売チャンネル
  CHANNELS: [
    { id: 1, name: 'eBayシングル', type: 'tsuhan' },
    { id: 2, name: 'eBayまとめ', type: 'tsuhan' },
    { id: 3, name: 'ヤフオクビンテージ', type: 'tsuhan' },
    { id: 4, name: 'ヤフオク現行', type: 'tsuhan' },
    { id: 5, name: 'ヤフオクまとめ', type: 'tsuhan' },
    { id: 6, name: 'ロット販売', type: 'non-tsuhan' },
    { id: 7, name: '社内利用', type: 'non-tsuhan' },
    { id: 8, name: 'スクラップ', type: 'non-tsuhan' },
    { id: 9, name: '廃棄', type: 'non-tsuhan' },
  ],

  // スタッフ一覧
  STAFF: [
    { name: '浅野儀頼', role: 'admin' },
    { name: '林和人', role: 'staff' },
    { name: '横山優', role: 'staff' },
    { name: '平野光雄', role: 'staff' },
    { name: '三島圭織', role: 'staff' },
    { name: '桃井侑菜', role: 'staff' },
    { name: '伊藤佐和子', role: 'staff' },
    { name: '奥村亜優李', role: 'staff' },
  ],

  // 管理番号フォーマット
  MGMT_PREFIX: () => {
    const now = new Date();
    return String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0');
  },
};
