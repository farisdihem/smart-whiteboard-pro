/**
 * ══════════════════════════════════════════════════════════════
 * TOOLS MANAGER (Whiteboard Pro AI) — ES MODULE
 * ══════════════════════════════════════════════════════════════
 * Whiteboard tools management, tool definitions, tool state transitions,
 * dynamic cursor updates, eraser sizing, and color palette controls.
 */

export const WHITEBOARD_TOOLS = {
  pen: { id: 'pen', nameAr: 'قلم عادي', category: 'drawing', cursor: 'crosshair', defaultWidth: 3 },
  brush: { id: 'brush', nameAr: 'ريشة خط عربي', category: 'drawing', cursor: 'crosshair', defaultWidth: 6 },
  sharp_pen: { id: 'sharp_pen', nameAr: 'قلم هندسي حاد', category: 'drawing', cursor: 'crosshair', defaultWidth: 2 },
  highlighter: { id: 'highlighter', nameAr: 'قلم تظليل فسفوري', category: 'drawing', cursor: 'crosshair', defaultWidth: 24 },
  eraser: { id: 'eraser', nameAr: 'ممحاة دقيقة', category: 'eraser', cursor: 'none', defaultWidth: 28 },
  laser: { id: 'laser', nameAr: 'مؤشر ليزري', category: 'presentation', cursor: 'crosshair', defaultWidth: 4 },
  line: { id: 'line', nameAr: 'مستقيم', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  arrow: { id: 'arrow', nameAr: 'سهم متجه', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  rect: { id: 'rect', nameAr: 'مستطيل', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  circle: { id: 'circle', nameAr: 'دائرة', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  triangle: { id: 'triangle', nameAr: 'مثلث', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  ellipse: { id: 'ellipse', nameAr: 'قطع ناقص', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  star: { id: 'star', nameAr: 'نجمة خماسية', category: 'shape', cursor: 'crosshair', defaultWidth: 3 },
  select: { id: 'select', nameAr: 'تحديد ونقل', category: 'manipulation', cursor: 'default', defaultWidth: 1 },
  pan: { id: 'pan', nameAr: 'تحريك اللوحة', category: 'canvas', cursor: 'grab', defaultWidth: 1 },
  text: { id: 'text', nameAr: 'نص كتابي', category: 'annotation', cursor: 'text', defaultWidth: 1 },
  math: { id: 'math', nameAr: 'معادلة رياضية', category: 'annotation', cursor: 'text', defaultWidth: 1 },
  sticky: { id: 'sticky', nameAr: 'ملاحظة لاصقة', category: 'annotation', cursor: 'crosshair', defaultWidth: 1 }
};

export const PRESET_COLORS = [
  { id: 'dark', hex: '#1e1e1e', labelAr: 'أسود فحمي' },
  { id: 'white', hex: '#ffffff', labelAr: 'أبيض ناصع' },
  { id: 'red', hex: '#ef4444', labelAr: 'أحمر قاني' },
  { id: 'blue', hex: '#3b82f6', labelAr: 'أزرق سماوي' },
  { id: 'green', hex: '#10b981', labelAr: 'أخضر زمردي' },
  { id: 'amber', hex: '#f59e0b', labelAr: 'كهرماني برتقالي' },
  { id: 'purple', hex: '#8b5cf6', labelAr: 'بنفسجي ملكي' },
  { id: 'pink', hex: '#ec4899', labelAr: 'وردي زاهي' },
  { id: 'cyan', hex: '#06b6d4', labelAr: 'تركواز بحري' }
];

export const PRESET_STROKE_WIDTHS = [1, 2, 3, 5, 8, 12, 20, 32, 48, 64];

/**
 * Determines CSS cursor value according to active tool and dragging states.
 */
export function getCursorForTool(tool, options = {}) {
  if (options.isPanning) return 'grabbing';
  if (tool === 'pan') return 'grab';
  if (tool === 'text' || tool === 'math') return 'text';
  if (tool === 'select') return options.handleHover ? 'move' : 'default';
  if (tool === 'eraser') return 'none'; // custom circular eraser element used
  return 'crosshair';
}

/**
 * Updates the floating circular eraser cursor element position and size.
 */
export function updateEraserCursorElement(ecur, e, eraserWidth = 28, zoomScale = 1, canvasRect = null, WW = 1920) {
  if (!ecur || !e) return;
  const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
  const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

  const canvasWidth = canvasRect && canvasRect.width ? canvasRect.width : WW;
  const pixelRatioCorrection = canvasWidth / WW;
  const diameter = Math.max(8, eraserWidth * zoomScale * pixelRatioCorrection);

  ecur.style.width = `${diameter}px`;
  ecur.style.height = `${diameter}px`;
  ecur.style.left = `${clientX - diameter / 2}px`;
  ecur.style.top = `${clientY - diameter / 2}px`;
}

/**
 * Updates the toolbar DOM buttons state to highlight active tool.
 */
export function updateToolbarUI(toolName, container = document) {
  if (!container) return;

  const isPenFamily = ['pen', 'brush', 'sharp_pen', 'highlighter'].includes(toolName);

  const toolButtons = container.querySelectorAll('.tool-btn');
  toolButtons.forEach((b) => {
    if (b.closest && b.closest('#pen-dropdown')) return;
    b.classList.remove('active', 'bg-blue-100', 'text-blue-600', 'dark:bg-blue-900/50', 'dark:text-blue-400');
    b.classList.add('text-gray-700', 'dark:text-gray-300');
  });

  if (isPenFamily) {
    const mainPenBtn = container.querySelector('#main-pen-btn');
    if (mainPenBtn) {
      mainPenBtn.classList.add('active', 'bg-blue-100', 'text-blue-600', 'dark:bg-blue-900/50', 'dark:text-blue-400');
      mainPenBtn.classList.remove('text-gray-700', 'dark:text-gray-300');
    }
  } else {
    const activeBtn = container.querySelector(`.tool-btn[data-tool="${toolName}"]:not(#pen-dropdown .tool-btn)`);
    if (activeBtn) {
      activeBtn.classList.add('active', 'bg-blue-100', 'text-blue-600', 'dark:bg-blue-900/50', 'dark:text-blue-400');
      activeBtn.classList.remove('text-gray-700', 'dark:text-gray-300');
    }
  }

  // Update pen selection checkmarks and active rings inside pen-dropdown
  const penButtons = container.querySelectorAll('.pen-select-btn');
  penButtons.forEach((pb) => {
    const isSelected = pb.dataset.tool === toolName;
    pb.classList.toggle('border-blue-500', isSelected);
    pb.classList.toggle('dark:border-blue-400', isSelected);
    pb.classList.toggle('bg-blue-50/80', isSelected);
    pb.classList.toggle('dark:bg-blue-900/40', isSelected);
    const checkEl = pb.querySelector('.pen-check');
    if (checkEl) {
      checkEl.classList.toggle('hidden', !isSelected);
    }
  });

  const ctn = container.getElementById ? container.getElementById('app-container') : document.getElementById('app-container');
  const ecur = container.getElementById ? container.getElementById('eraser-cursor') : document.getElementById('eraser-cursor');

  if (ctn) {
    if (toolName === 'select') {
      ctn.classList.add('tool-select');
    } else {
      ctn.classList.remove('tool-select');
    }
  }

  if (ecur) {
    ecur.style.display = (toolName === 'eraser') ? 'block' : 'none';
  }
}

/**
 * Tools Manager factory class for managing whiteboard tool state cleanly.
 */
export class ToolsManager {
  constructor(initialState = {}) {
    this.currentTool = initialState.tool || 'pen';
    this.color = initialState.color || '#1e1e1e';
    this.strokeWidth = initialState.strokeWidth || 3;
    this.eraserWidth = initialState.eraserWidth || 28;
    this.brushRadiusMultiplier = initialState.brushRadiusMultiplier || 1.0;
    this.highlighterColor = initialState.highlighterColor || '#facc15';
    this.highlighterOpacity = initialState.highlighterOpacity || 0.35;
    this.snapEnabled = Boolean(initialState.snapEnabled);
    this.listeners = new Set();
  }

  setTool(tool) {
    if (!WHITEBOARD_TOOLS[tool] && tool !== 'highlighter') {
      console.warn(`[ToolsManager] Unknown tool: ${tool}`);
    }
    const prev = this.currentTool;
    this.currentTool = tool;
    this.notify({ type: 'tool', tool, prev });
  }

  getTool() {
    return this.currentTool;
  }

  setColor(color) {
    this.color = color;
    this.notify({ type: 'color', color });
  }

  getColor() {
    return this.color;
  }

  setStrokeWidth(w) {
    const num = Math.max(1, Math.min(200, parseInt(w, 10) || 3));
    if (this.currentTool === 'eraser') {
      this.eraserWidth = num;
    } else {
      this.strokeWidth = num;
    }
    this.notify({ type: 'width', strokeWidth: this.strokeWidth, eraserWidth: this.eraserWidth });
  }

  getCurrentWidth() {
    return this.currentTool === 'eraser' ? this.eraserWidth : this.strokeWidth;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event) {
    for (const listener of this.listeners) {
      try {
        listener(event, this);
      } catch (err) {
        console.error('[ToolsManager] Error in listener:', err);
      }
    }
  }
}
