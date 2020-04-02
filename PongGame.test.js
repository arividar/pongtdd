'use strict';

import PongGame from "./PongGame";
import GameElement from "./GameElement";
import Paddle from "./Paddle"
import Ball from "./Ball";
import 'jest-canvas-mock';


describe("GameElement", () => {
  test("Element creation without parameters hould have x,y coordinates, width and height equal to zero", () => {
    const ball = new GameElement();
    expect(ball.X).toBe(0);
    expect(ball.Y).toBe(0);
    expect(ball.Width).toBe(0);
    expect(ball.Height).toBe(0);
  });

  test("Element creation with constructor parameters should set X,Y,Width and Height properties", () => {
    const ball = new GameElement(100, 200, 30, 10);
    expect([ball.X, ball.Y, ball.Width, ball.Height]).toStrictEqual([100, 200, 30, 10]);
  });

  test("Element creation with x,y parameters only should set Width and Height to zero", () => {
    const ball = new GameElement(100, 200);
    expect([ball.X, ball.Y, ball.Width, ball.Height]).toStrictEqual([100, 200, 0, 0]);
  })
});

describe("Ball", () => {
  test("Create new Ball without arguments should set coords and diameter to zero", () => {
    const pb = new Ball();
    expect(pb.X).toBe(0);
    expect(pb.Y).toBe(0);
    expect(pb.Diameter).toBe(0);
  });

  test("Construct Ball with parameters should set X,Y,Radius and Diameter properties", () => {
    const ball = new Ball(100, 200, 10);
    expect([ball.X, ball.Y, ball.Radius, ball.Diameter]).toStrictEqual([100, 200, 10, 20]);
  });

  test("Set ball coordinates", () => {
    const ball = new Ball();
    ball.X = 40;
    ball.Y = 20;
    expect(ball.X).toBe(40);
    expect(ball.Y).toBe(20);
  });

  test("Set ball diameter and radius to d and r should set Diameter d and Radius to d/2 and vice versa", () => {
    const ball = new Ball();
    ball.Diameter = 40;
    expect(ball.Diameter).toBe(40);
    expect(ball.Radius).toBe(20);
    ball.Radius = 5;
    expect(ball.Diameter).toBe(10);
    expect(ball.Radius).toBe(5);
  });
});

describe("Paddle", () => {
  test("Construct Paddle without parameters should set coordinates and size to zero", () => {
    const ball = new Paddle();
    expect([ball.X, ball.Y, ball.Width, ball.Height]).toStrictEqual([0, 0, 0, 0]);
  });

  test("Construct Paddle with parameters should set X,Y,Width and Height properties", () => {
    const ball = new Paddle(123, 234, 34, 12);
    expect([ball.X, ball.Y, ball.Width, ball.Height]).toStrictEqual([123, 234, 34, 12]);
  });
});

describe("Game", () => {
  test("Create pong game", () => {
    let pg = new PongGame(document.createElement("canvas"));
    expect(typeof pg != "undefined").toBeTruthy();
    console.log(typeof pg);
  });

  test("New Game has default sized canvas", () => {
    const pg = new PongGame(document.createElement("canvas"));
    expect(pg.CanvasWidth).toBeGreaterThan(0);
    expect(pg.CanvasHeight).toBeGreaterThan(0);
  });

  test("Width and height of passed in canvas is same in Game object", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 801;
    canvas.height = 601;
    const pg = new PongGame(canvas);
    expect(pg.CanvasWidth).toBe(801);
    expect(pg.CanvasHeight).toBe(601);
  });

  test("Game should have an initial score of zero", () => {
    const g = new PongGame(document.createElement("canvas"));
    expect(g.Score).toBe(0);
  });
});