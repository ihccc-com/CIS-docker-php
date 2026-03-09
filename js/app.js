/* =========================================
   CloudDrive - OneDrive-like Static Demo
   Main Application Script
   ========================================= */

'use strict';

/* ---- Demo Data ---- */
const DEMO_FILES = [
  { id: 1,  name: 'Documents',          type: 'folder', size: null,         modified: '2026-03-05', owner: 'Li Wei',   shared: false, starred: false },
  { id: 2,  name: 'Photos',             type: 'folder', size: null,         modified: '2026-03-07', owner: 'Li Wei',   shared: true,  starred: false },
  { id: 3,  name: 'Projects',           type: 'folder', size: null,         modified: '2026-02-28', owner: 'Li Wei',   shared: true,  starred: true  },
  { id: 4,  name: 'Music',              type: 'folder', size: null,         modified: '2026-01-15', owner: 'Li Wei',   shared: false, starred: false },
  { id: 5,  name: 'Annual Report.docx', type: 'docx',   size: 2457600,      modified: '2026-03-08', owner: 'Li Wei',   shared: true,  starred: true  },
  { id: 6,  name: 'Budget Q1.xlsx',     type: 'xlsx',   size: 1048576,      modified: '2026-03-06', owner: 'Li Wei',   shared: false, starred: false },
  { id: 7,  name: 'Presentation.pptx',  type: 'pptx',   size: 8388608,      modified: '2026-03-04', owner: 'Li Wei',   shared: true,  starred: false },
  { id: 8,  name: 'Profile Photo.jpg',  type: 'jpg',    size: 3145728,      modified: '2026-02-20', owner: 'Li Wei',   shared: false, starred: false },
  { id: 9,  name: 'README.md',          type: 'md',     size: 4096,         modified: '2026-03-01', owner: 'Li Wei',   shared: false, starred: false },
  { id: 10, name: 'Archive.zip',        type: 'zip',    size: 52428800,     modified: '2026-02-14', owner: 'Li Wei',   shared: false, starred: false },
  { id: 11, name: 'Video Demo.mp4',     type: 'mp4',    size: 209715200,    modified: '2026-02-10', owner: 'Li Wei',   shared: false, starred: false },
  { id: 12, name: 'Notes.txt',          type: 'txt',    size: 8192,         modified: '2026-03-07', owner: 'Li Wei',   shared: false, starred: true  },
  { id: 13, name: 'Design.pdf',         type: 'pdf',    size: 5242880,      modified: '2026-03-02', owner: 'Li Wei',   shared: true,  starred: false },
  { id: 14, name: 'script.js',          type: 'js',     size: 16384,        modified: '2026-02-25', owner: 'Li Wei',   shared: false, starred: false },
  { id: 15, name: 'config.json',        type: 'json',   size: 2048,         modified: '2026-02-22', owner: 'Li Wei',   shared: false, starred: false },
];

const SHARED_FILES = [
  { id: 20, name: 'Team Q2 Plan.docx',      type: 'docx', size: 1572864,   modified: '2026-03-07', owner: 'Zhang San',  sharedDate: '2026-03-07', access: '编辑' },
  { id: 21, name: 'Design Assets',          type: 'folder', size: null,    modified: '2026-03-06', owner: 'Wang Fang',  sharedDate: '2026-03-06', access: '查看' },
  { id: 22, name: 'Release Notes.pdf',      type: 'pdf',  size: 524288,    modified: '2026-03-01', owner: 'Li Gang',    sharedDate: '2026-03-05', access: '查看' },
  { id: 23, name: 'Roadmap 2026.pptx',      type: 'pptx', size: 6291456,   modified: '2026-02-28', owner: 'Chen Mei',   sharedDate: '2026-03-04', access: '编辑' },
  { id: 24, name: 'Budget Final.xlsx',      type: 'xlsx', size: 2097152,   modified: '2026-02-25', owner: 'Zhang San',  sharedDate: '2026-03-01', access: '查看' },
  { id: 25, name: 'Meeting Recording.mp4',  type: 'mp4',  size: 157286400, modified: '2026-02-20', owner: 'Wang Fang',  sharedDate: '2026-02-28', access: '查看' },
];

const RECENT_FILES = [
  { id: 5,  name: 'Annual Report.docx',  type: 'docx', size: 2457600,  modified: '2026-03-08 09:42', activity: '您编辑了此文件' },
  { id: 13, name: 'Design.pdf',          type: 'pdf',  size: 5242880,  modified: '2026-03-08 08:15', activity: '您打开了此文件' },
  { id: 7,  name: 'Presentation.pptx',   type: 'pptx', size: 8388608,  modified: '2026-03-07 17:30', activity: '您编辑了此文件' },
  { id: 6,  name: 'Budget Q1.xlsx',      type: 'xlsx', size: 1048576,  modified: '2026-03-06 14:00', activity: '您查看了此文件' },
  { id: 12, name: 'Notes.txt',           type: 'txt',  size: 8192,     modified: '2026-03-07 11:20', activity: '您编辑了此文件' },
  { id: 20, name: 'Team Q2 Plan.docx',   type: 'docx', size: 1572864,  modified: '2026-03-07 10:05', activity: 'Zhang San 共享' },
  { id: 8,  name: 'Profile Photo.jpg',   type: 'jpg',  size: 3145728,  modified: '2026-03-05 16:30', activity: '您上传了此文件' },
];

const TRASH_FILES = [
  { id: 30, name: 'Old Report.docx',    type: 'docx', size: 1048576,  deletedDate: '2026-03-04', originalPath: '文档 > 旧文件' },
  { id: 31, name: 'temp_backup.zip',    type: 'zip',  size: 20971520, deletedDate: '2026-03-01', originalPath: '文档' },
  { id: 32, name: 'Draft Post.txt',     type: 'txt',  size: 2048,     deletedDate: '2026-02-20', originalPath: '文档 > 草稿' },
  { id: 33, name: 'Test Image.png',     type: 'png',  size: 1572864,  deletedDate: '2026-02-15', originalPath: '照片' },
];

const PHOTO_FILES = [
  { id: 40, name: 'Vacation 2025.jpg',   type: 'jpg',  size: 3670016,  modified: '2026-01-10', color: '#4CAF50' },
  { id: 41, name: 'Birthday Party.jpg',  type: 'jpg',  size: 2883584,  modified: '2025-12-25', color: '#E91E63' },
  { id: 42, name: 'Landscape.png',       type: 'png',  size: 5242880,  modified: '2025-11-15', color: '#2196F3' },
  { id: 43, name: 'City Night.jpg',      type: 'jpg',  size: 4194304,  modified: '2025-10-30', color: '#FF5722' },
  { id: 44, name: 'Mountain.jpg',        type: 'jpg',  size: 6291456,  modified: '2025-10-15', color: '#9C27B0' },
  { id: 45, name: 'Office Team.jpg',     type: 'jpg',  size: 2097152,  modified: '2025-09-20', color: '#FF9800' },
  { id: 46, name: 'Product Shot.png',    type: 'png',  size: 3145728,  modified: '2025-09-05', color: '#00BCD4' },
  { id: 47, name: 'Selfie.jpg',          type: 'jpg',  size: 1572864,  modified: '2025-08-12', color: '#8BC34A' },
  { id: 48, name: 'Sunset.jpg',          type: 'jpg',  size: 4718592,  modified: '2025-07-22', color: '#FFC107' },
  { id: 49, name: 'Forest Walk.jpg',     type: 'jpg',  size: 3932160,  modified: '2025-07-01', color: '#607D8B' },
  { id: 50, name: 'Beach Day.jpg',       type: 'jpg',  size: 5505024,  modified: '2025-06-15', color: '#03A9F4' },
  { id: 51, name: 'Conference.jpg',      type: 'jpg',  size: 2621440,  modified: '2025-06-01', color: '#795548' },
];

/* ---- File type icons (inline SVG via data attributes) ---- */
const FILE_ICONS = {
  folder:  { color: '#FFB900', label: 'Folder' },
  docx:    { color: '#2B7CD3', label: 'Word'   },
  xlsx:    { color: '#217346', label: 'Excel'  },
  pptx:    { color: '#D04425', label: 'PPT'    },
  pdf:     { color: '#F40F02', label: 'PDF'    },
  jpg:     { color: '#E91E63', label: 'Image'  },
  jpeg:    { color: '#E91E63', label: 'Image'  },
  png:     { color: '#9C27B0', label: 'Image'  },
  gif:     { color: '#9C27B0', label: 'Image'  },
  mp4:     { color: '#1565C0', label: 'Video'  },
  mp3:     { color: '#6A1B9A', label: 'Audio'  },
  zip:     { color: '#795548', label: 'ZIP'    },
  txt:     { color: '#607D8B', label: 'Text'   },
  md:      { color: '#546E7A', label: 'MD'     },
  js:      { color: '#F5A623', label: 'JS'     },
  json:    { color: '#F5A623', label: 'JSON'   },
  default: { color: '#8E8E93', label: 'File'   },
};

function getFileIcon(type, size = 24, forCard = false) {
  const info = FILE_ICONS[type] || FILE_ICONS.default;
  const s = size;
  const isFolder = type === 'folder';

  if (isFolder) {
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C2 4.9 2.9 4 4 4H9.17C9.7 4 10.21 4.21 10.59 4.59L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" fill="${info.color}"/>
    </svg>`;
  }

  const ext = type.toUpperCase().slice(0, 4);
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H14L20 8V22H6V2Z" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="1"/>
    <path d="M14 2L20 8H14V2Z" fill="#d0d0d0"/>
    <rect x="4" y="12" width="16" height="8" rx="1" fill="${info.color}"/>
    <text x="12" y="18.5" font-size="5" font-weight="bold" fill="white" text-anchor="middle" font-family="sans-serif">${ext}</text>
  </svg>`;
}

function formatSize(bytes) {
  if (bytes === null || bytes === undefined) return '--';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  return (bytes / 1073741824).toFixed(2) + ' GB';
}

function formatDate(dateStr) {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getAvatarColor(name) {
  const colors = ['#4CAF50','#2196F3','#E91E63','#FF9800','#9C27B0','#00BCD4','#F44336','#3F51B5'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

/* ---- Toast notifications ---- */
function showToast(msg, type = 'info', duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg width="16" height="16" fill="#107c10" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    error:   `<svg width="16" height="16" fill="#d13438" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
    info:    `<svg width="16" height="16" fill="#0078d4" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-msg">${msg}</span>
    <span class="toast-close" onclick="this.closest('.toast').remove()">✕</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ---- Modal helpers ---- */
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('hidden');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(el => el.classList.add('hidden'));
}

/* ---- Context menu ---- */
let activeContextMenu = null;

function showContextMenu(x, y, items) {
  removeContextMenu();
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.id = 'ctxMenu';

  items.forEach(item => {
    if (item === 'sep') {
      const sep = document.createElement('div');
      sep.className = 'ctx-sep';
      menu.appendChild(sep);
    } else {
      const el = document.createElement('div');
      el.className = 'ctx-item' + (item.danger ? ' danger' : '');
      el.innerHTML = `${item.icon || ''} ${item.label}`;
      el.addEventListener('click', () => { item.action && item.action(); removeContextMenu(); });
      menu.appendChild(el);
    }
  });

  document.body.appendChild(menu);

  const rect = menu.getBoundingClientRect();
  const vw = window.innerWidth, vh = window.innerHeight;
  if (x + 200 > vw) x = vw - 200;
  if (y + rect.height > vh) y = vh - rect.height - 8;
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  activeContextMenu = menu;
}

function removeContextMenu() {
  if (activeContextMenu) { activeContextMenu.remove(); activeContextMenu = null; }
  const existing = document.getElementById('ctxMenu');
  if (existing) existing.remove();
}

document.addEventListener('click', removeContextMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { removeContextMenu(); closeAllModals(); } });

/* ---- View state ---- */
let currentView = localStorage.getItem('clouddriveView') || 'list';

function setView(v) {
  currentView = v;
  localStorage.setItem('clouddriveView', v);
  renderFileView();
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === v);
  });
}

/* ---- Selection state ---- */
let selectedIds = new Set();

function toggleSelect(id, event) {
  if (event && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    selectedIds.clear();
  }
  if (selectedIds.has(id)) {
    selectedIds.delete(id);
  } else {
    selectedIds.add(id);
  }
  updateSelectionBar();
  renderFileView();
  if (selectedIds.size === 1) showDetailPanel(id);
  else hideDetailPanel();
}

function updateSelectionBar() {
  const bar = document.getElementById('selectionBar');
  if (!bar) return;
  if (selectedIds.size > 0) {
    bar.classList.remove('hidden');
    const countEl = bar.querySelector('.selection-count');
    if (countEl) countEl.textContent = `已选 ${selectedIds.size} 项`;
  } else {
    bar.classList.add('hidden');
  }
}

/* ---- Detail panel ---- */
function showDetailPanel(fileId) {
  const panel = document.getElementById('detailPanel');
  if (!panel) return;
  panel.classList.remove('hidden');

  const all = [...DEMO_FILES, ...SHARED_FILES, ...RECENT_FILES, ...TRASH_FILES, ...PHOTO_FILES];
  const file = all.find(f => f.id === fileId);
  if (!file) return;

  const nameEl = panel.querySelector('.detail-filename');
  const previewEl = panel.querySelector('.detail-preview');
  if (nameEl) nameEl.textContent = file.name;
  if (previewEl) previewEl.innerHTML = `<div class="file-icon-xl">${getFileIcon(file.type, 80)}</div>`;

  const props = panel.querySelectorAll('.detail-prop');
  const propData = [
    { label: '类型', value: (FILE_ICONS[file.type] || FILE_ICONS.default).label },
    { label: '大小', value: formatSize(file.size) },
    { label: '修改时间', value: formatDate(file.modified || file.deletedDate) },
    { label: '所有者', value: file.owner || '李威' },
  ];
  props.forEach((p, i) => {
    const d = propData[i];
    if (!d) return;
    const lbl = p.querySelector('.detail-prop-label');
    const val = p.querySelector('.detail-prop-value');
    if (lbl) lbl.textContent = d.label;
    if (val) val.textContent = d.value;
  });
}

function hideDetailPanel() {
  const panel = document.getElementById('detailPanel');
  if (panel) panel.classList.add('hidden');
}

/* ---- Render file list (list view) ---- */
function renderFileView() {
  const container = document.getElementById('fileViewContainer');
  if (!container) return;

  container.innerHTML = '';

  if (currentView === 'list') {
    renderListView(container, DEMO_FILES);
  } else {
    renderGridView(container, DEMO_FILES);
  }
}

function renderListView(container, files) {
  const header = document.createElement('div');
  header.className = 'list-header';
  header.innerHTML = `
    <span>名称 <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 7L1 3h8z"/></svg></span>
    <span class="col-modified">修改时间</span>
    <span class="col-size">大小</span>
    <span></span>
  `;
  container.appendChild(header);

  const list = document.createElement('div');
  list.className = 'file-list';

  files.forEach(file => {
    const row = document.createElement('div');
    row.className = 'file-row' + (selectedIds.has(file.id) ? ' selected' : '');
    row.innerHTML = `
      <div class="file-row-name">
        <div class="file-icon">${getFileIcon(file.type, 24)}</div>
        <span>${escHtml(file.name)}</span>
        ${file.shared ? '<span class="chip chip-blue" style="margin-left:6px">共享</span>' : ''}
        ${file.starred ? '<svg width="12" height="12" fill="#FFB900" viewBox="0 0 24 24" style="margin-left:4px;flex-shrink:0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''}
      </div>
      <div class="file-row-modified">${formatDate(file.modified)}</div>
      <div class="file-row-size">${formatSize(file.size)}</div>
      <div class="file-row-actions">
        <button class="row-action-btn" title="分享" onclick="event.stopPropagation();openShareModal('${escAttr(file.name)}')">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
        </button>
        <button class="row-action-btn" title="更多选项" onclick="event.stopPropagation();showFileContextMenu(event,${file.id})">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>
    `;
    row.addEventListener('click', (e) => toggleSelect(file.id, e));
    row.addEventListener('contextmenu', (e) => { e.preventDefault(); showFileContextMenu(e, file.id); });
    row.addEventListener('dblclick', () => {
      if (file.type === 'folder') {
        showToast(`正在打开文件夹：${file.name}`, 'info');
      } else {
        showToast(`正在打开文件：${file.name}`, 'info');
      }
    });
    list.appendChild(row);
  });

  container.appendChild(list);
}

function renderGridView(container, files) {
  const grid = document.createElement('div');
  grid.className = 'file-grid';

  files.forEach(file => {
    const card = document.createElement('div');
    card.className = 'file-card' + (selectedIds.has(file.id) ? ' selected' : '');
    card.innerHTML = `
      <div class="file-icon-lg">${getFileIcon(file.type, 48)}</div>
      <div class="file-card-name">${escHtml(file.name)}</div>
      <div class="file-card-meta">${formatSize(file.size)}</div>
      <div class="card-actions">
        <button class="row-action-btn" onclick="event.stopPropagation();showFileContextMenu(event,${file.id})">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>
    `;
    card.addEventListener('click', (e) => toggleSelect(file.id, e));
    card.addEventListener('contextmenu', (e) => { e.preventDefault(); showFileContextMenu(e, file.id); });
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ---- Context menu for files ---- */
function showFileContextMenu(event, fileId) {
  event.stopPropagation();
  const all = [...DEMO_FILES, ...SHARED_FILES, ...TRASH_FILES];
  const file = all.find(f => f.id === fileId);
  const name = file ? file.name : '文件';

  showContextMenu(event.clientX, event.clientY, [
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>', label: '下载', action: () => showToast(`正在下载：${name}`, 'info') },
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>', label: '共享', action: () => openShareModal(name) },
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', label: '重命名', action: () => openRenameModal(fileId, name) },
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>', label: '复制', action: () => showToast(`已复制：${name}`, 'success') },
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/></svg>', label: '移动', action: () => showToast(`移动功能演示`, 'info') },
    'sep',
    { icon: '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>', label: '属性', action: () => { showDetailPanel(fileId); } },
    'sep',
    { icon: '<svg width="14" height="14" fill="#d13438" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', label: '删除', danger: true, action: () => confirmDelete(name) },
  ]);
}

/* ---- Modals ---- */
function openShareModal(name) {
  openModal('shareModal');
  const nameEl = document.getElementById('shareModalFileName');
  if (nameEl) nameEl.textContent = name || '文件';
}

function openRenameModal(fileId, name) {
  openModal('renameModal');
  const input = document.getElementById('renameInput');
  if (input) { input.value = name; setTimeout(() => { input.focus(); input.select(); }, 50); }
}

function confirmDelete(name) {
  openModal('deleteConfirmModal');
  const nameEl = document.getElementById('deleteFileName');
  if (nameEl) nameEl.textContent = name;
}

function doRename() {
  const input = document.getElementById('renameInput');
  const name = input ? input.value.trim() : '';
  if (!name) { showToast('请输入新名称', 'error'); return; }
  closeModal('renameModal');
  showToast(`已重命名为"${name}"`, 'success');
}

function doDelete() {
  const nameEl = document.getElementById('deleteFileName');
  const name = nameEl ? nameEl.textContent : '文件';
  closeModal('deleteConfirmModal');
  showToast(`"${name}"已移至回收站`, 'success');
}

function copyShareLink() {
  showToast('链接已复制到剪贴板', 'success');
}

/* ---- Search ---- */
function handleSearch(event) {
  if (event.key === 'Enter') {
    const q = event.target.value.trim();
    if (q) showToast(`搜索"${q}"...`, 'info');
  }
}

/* ---- Escape helpers ---- */
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ---- Page init functions ---- */

/* Index page */
function initIndexPage() {
  renderFileView();
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentView);
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });
}

/* Recent page */
function initRecentPage() {
  const container = document.getElementById('recentList');
  if (!container) return;

  RECENT_FILES.forEach(file => {
    const row = document.createElement('div');
    row.className = 'file-row';
    row.style.gridTemplateColumns = '2fr 1fr 100px 80px';
    row.innerHTML = `
      <div class="file-row-name">
        <div class="file-icon">${getFileIcon(file.type, 24)}</div>
        <div>
          <div style="font-size:13.5px">${escHtml(file.name)}</div>
          <div style="font-size:11px;color:var(--text-muted)">${escHtml(file.activity)}</div>
        </div>
      </div>
      <div class="file-row-modified">${formatDate(file.modified)}</div>
      <div class="file-row-size">${formatSize(file.size)}</div>
      <div class="file-row-actions">
        <button class="row-action-btn" onclick="showToast('下载中...','info')">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </button>
        <button class="row-action-btn" onclick="showFileContextMenu(event,${file.id})">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>
    `;
    row.addEventListener('contextmenu', (e) => { e.preventDefault(); showFileContextMenu(e, file.id); });
    container.appendChild(row);
  });
}

/* Shared page */
function initSharedPage() {
  const container = document.getElementById('sharedList');
  if (!container) return;

  SHARED_FILES.forEach(file => {
    const row = document.createElement('div');
    row.className = 'shared-row';
    const avatarColor = getAvatarColor(file.owner);
    row.innerHTML = `
      <div class="shared-item-name">
        <div class="file-icon">${getFileIcon(file.type, 24)}</div>
        <span>${escHtml(file.name)}</span>
      </div>
      <div class="shared-owner">
        <div class="mini-avatar" style="background:${avatarColor}">${escHtml(file.owner[0])}</div>
        <span style="font-size:12px;color:var(--text-secondary)">${escHtml(file.owner)}</span>
      </div>
      <div style="font-size:12px;color:var(--text-secondary)">${formatDate(file.sharedDate)}</div>
      <div>
        <span class="chip ${file.access === '编辑' ? 'chip-blue' : 'chip-green'}">${escHtml(file.access)}</span>
      </div>
    `;
    row.addEventListener('contextmenu', (e) => { e.preventDefault(); showFileContextMenu(e, file.id); });
    row.addEventListener('click', () => showToast(`打开：${file.name}`, 'info'));
    container.appendChild(row);
  });
}

/* Photos page */
function initPhotosPage() {
  const container = document.getElementById('photoGrid');
  if (!container) return;

  PHOTO_FILES.forEach(file => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `
      <div class="photo-thumb" style="background:linear-gradient(135deg,${file.color}cc,${file.color}66);display:flex;align-items:center;justify-content:center;width:100%;height:100%">
        <div style="text-align:center">
          <svg width="40" height="40" fill="rgba(255,255,255,.8)" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
          <div style="color:rgba(255,255,255,.9);font-size:10px;margin-top:4px">${escHtml(file.name)}</div>
        </div>
      </div>
      <div class="photo-overlay">
        <span class="photo-overlay-name">${escHtml(file.name)}</span>
      </div>
    `;
    item.addEventListener('click', () => showToast(`查看：${file.name}`, 'info'));
    container.appendChild(item);
  });
}

/* Trash page */
function initTrashPage() {
  const container = document.getElementById('trashList');
  if (!container) return;

  TRASH_FILES.forEach(file => {
    const row = document.createElement('div');
    row.className = 'file-row';
    row.style.gridTemplateColumns = '2fr 1fr 1fr 100px';
    row.innerHTML = `
      <div class="file-row-name">
        <div class="file-icon">${getFileIcon(file.type, 24)}</div>
        <div>
          <div style="font-size:13.5px">${escHtml(file.name)}</div>
          <div style="font-size:11px;color:var(--text-muted)">原位置：${escHtml(file.originalPath)}</div>
        </div>
      </div>
      <div class="file-row-modified">${formatDate(file.deletedDate)}</div>
      <div class="file-row-size">${formatSize(file.size)}</div>
      <div class="file-row-actions" style="opacity:1">
        <button class="row-action-btn" title="还原" onclick="event.stopPropagation();showToast('已还原：${escAttr(file.name)}','success')">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
        </button>
        <button class="row-action-btn danger" title="永久删除" onclick="event.stopPropagation();showToast('已永久删除','success')">
          <svg width="14" height="14" fill="#d13438" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'index')   initIndexPage();
  if (page === 'recent')  initRecentPage();
  if (page === 'shared')  initSharedPage();
  if (page === 'photos')  initPhotosPage();
  if (page === 'trash')   initTrashPage();
});

/* ---- Waffle / Profile dropdown toggles (shared across all pages) ---- */
function toggleWaffle() {
  const p = document.getElementById('wafflePanel');
  const pd = document.getElementById('profileDropdown');
  if (pd) pd.classList.add('hidden');
  if (p) p.classList.toggle('hidden');
}

function toggleProfile() {
  const pd = document.getElementById('profileDropdown');
  const wp = document.getElementById('wafflePanel');
  if (wp) wp.classList.add('hidden');
  if (pd) pd.classList.toggle('hidden');
}

document.addEventListener('click', function(e) {
  const wp = document.getElementById('wafflePanel');
  const pd = document.getElementById('profileDropdown');
  if (wp && !wp.contains(e.target) && !e.target.closest('.topbar-waffle')) {
    wp.classList.add('hidden');
  }
  if (pd && !pd.contains(e.target) && !e.target.closest('.topbar-avatar')) {
    pd.classList.add('hidden');
  }
});
