import Ball from '../js/Ball.js';
import Paddle from '../js/Paddle.js';
import Input from '../js/Input.js';
import PongSounds from '../js/PongSounds.js';

jest.mock('../js/PongSounds.js');

describe('Ball collision sound tests', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    PongSounds.mockClear();
  });

  describe('Ball collision sounds', () => {
    function _newBall() {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.canvas.width = 800;
      ctx.canvas.height = 600;
      const ball = new Ball(ctx, 5);
      ball.Speed = 1;
      ball.YDirection = 1;
      return ball;
    }

    function _newPaddle(ball) {
      const paddle = new Paddle(ball._ctx, new Input(), 121, 15);
      paddle.resetGame();
      paddle.Y = 100;
      paddle.X = 50;
      return paddle;
    }

    it('collision with the paddle should play sound', () => {
      const ball = _newBall();
      const paddle = _newPaddle(ball);
      ball.X = paddle.X;
      ball.YBottom = paddle.YTop - 1;
      ball.update(paddle);
      expect(PongSounds.mock.instances[0].ballCollidesWithPaddle).toHaveBeenCalledTimes(1);
    });

    it('not colliding with paddle should not play sound', () => {
      const ball = _newBall();
      const paddle = _newPaddle(ball);
      ball.X = paddle.X;
      ball.YBottom = paddle.YTop - 10;
      ball.update(paddle);
      ball.XLeft = paddle.XRight + 10;
      ball.YBottom = paddle.YTop - 1;
      ball.update(paddle);
      expect(PongSounds.mock.instances[0].ballCollidesWithPaddle).toHaveBeenCalledTimes(0);
    });

    it('should play sound when ball collides with top border', () => {
      const ball = _newBall();
      ball.X = 400;
      ball.Speed = 1;
      ball.YDirection = -1;
      ball.Y = ball.Radius;
      ball.update(_newPaddle(ball));
      expect(ball.YDirection).toBe(1);
      expect(PongSounds.mock.instances[0].ballCollidesWithBorder).toHaveBeenCalledTimes(1);
    });

    it('should play sound when ball collides with side borders', () => {
      const ball = _newBall();
      ball.update(_newPaddle(ball));
      ball.Y = 300;
      ball.Speed = 1;
      ball.XDirection = -1;
      ball.X = ball.Radius;
      ball.update(_newPaddle(ball));
      expect(PongSounds.mock.instances[0].ballCollidesWithBorder).toHaveBeenCalledTimes(1);
      ball.X = ball._ctx.canvas.width - ball.Radius;
      ball.update(_newPaddle(ball));
      expect(PongSounds.mock.instances[0].ballCollidesWithBorder).toHaveBeenCalledTimes(1);
    });
  });
});
