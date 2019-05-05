import { getCursorPosition } from './Common/Utils';
import FrameTime from './Types/FrameTime';
import Scenario from './Types/Scenario';

export default class SceneController {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public scenario: Scenario;

  public running = false;

  public time: FrameTime = {
    frame: 0,
    ms: 0,
    sec: 0,
    start: new Date().getTime(),
  };

  private id = 0;

  constructor(canvas: HTMLCanvasElement, scenario: Scenario) {
    const checkCTX = canvas.getContext('2d');
    if (!checkCTX) {
      throw new Error('Unable to get 2d context of canvas');
    }

    this.canvas = canvas;
    this.ctx = checkCTX;
    this.scenario = scenario;

    this.setupEvents();

    this.start();
  }

  public start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.next();
  }

  public stop() {
    if (!this.running) {
      return;
    }

    this.running = false;
    cancelAnimationFrame(this.id);
  }

  public next() {
    if (!this.running) {
      return;
    }

    this.update();
    this.id = requestAnimationFrame(() => this.next());
  }

  public update() {
    clearCanvas(this.ctx);
    updateTime(this.time);

    for (const actor of this.scenario.actionList) {
      actor.update(this.time);
    }

    for (const actor of this.scenario.drawList) {
      actor.draw(this.ctx);
    }
  }

  public setupEvents() {
    this.canvas.addEventListener('mousedown', event =>
      this.scenario.onMouseDown(getCursorPosition(this.canvas, event), event),
    );

    this.canvas.addEventListener('mouseup', event =>
      this.scenario.onMouseUp(getCursorPosition(this.canvas, event), event),
    );

    this.canvas.addEventListener('mousemove', event =>
      this.scenario.onMouseMove(getCursorPosition(this.canvas, event), event),
    );

    this.canvas.addEventListener('mouseleave', event =>
      this.scenario.onMouseLeave(getCursorPosition(this.canvas, event), event),
    );

    this.canvas.addEventListener('mouseenter', event =>
      this.scenario.onMouseEnter(getCursorPosition(this.canvas, event), event),
    );
  }
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function updateTime(time: FrameTime) {
  time.ms = new Date().getTime() - time.start;
  time.sec = time.ms / 1000;
  time.frame++;
}
