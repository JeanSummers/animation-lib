export type FillStyle = typeof CanvasRenderingContext2D.prototype.fillStyle;
export type StrokeStyle = typeof CanvasRenderingContext2D.prototype.strokeStyle;

// This definition tries to ensure
// that we did not miss anything
// of canvas coloring possibilities
export type Color = FillStyle & StrokeStyle;
