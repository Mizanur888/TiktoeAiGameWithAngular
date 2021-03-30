import { Injectable } from '@angular/core';
import { gamseStatus } from '../Model/gameStatus';
import { FindWinner } from './GenericFindWinnerFunction';

@Injectable({
  providedIn: 'root'
})
export class TiktoegameserviceService {
  board: string[][];
  gamseStatus: gamseStatus;
  currentTurn: number;
  dimension: number = 0;
  constructor() {
    this.gamseStatus = gamseStatus.Stop;
    this.board = [];
  }

  setNextMove(): number {
    return this.currentTurn === 2 ? 1 : 2;
  }
  async isGameOver(): Promise<boolean> {
    let isEmpltyExist = await this.isExistEmptyCell(this.board, "");
    let isFull = true;
    if (isEmpltyExist) {
      isFull = false;
      return isFull;
    } else {
      this.gamseStatus = gamseStatus.Stop;
      return isFull;
    }
  }
  async isExistEmptyCell(arr, search): Promise<boolean> {
    return arr.some(row => row.includes(search));
  }
  async isThereWinner(): Promise<[boolean, string]> {
    console.log("isThereWinner")
    return await FindWinner(this.board, this.dimension);
  }
  async addPlayerIntheBoard(i: number, j: number): Promise<void> {

    if (this.canAdd(i, j)) {
      this.board[i][j] = await this.currentPlayerSymbol();
    }
  }
  async canAdd(i: number, j: number): Promise<boolean> {
    return this.board[i][j] === "" ? true : false;
  }
  async currentPlayerSymbol(): Promise<string> {
    return this.currentTurn === 2 ? 'x' : 'o';
  }
  async startThegame(dimension: number): Promise<void> {
    this.gamseStatus = gamseStatus.Start;
    await this.createBoard(dimension);
    this.currentTurn = await this.getRandcurrentPlayerTurn();
    this.dimension = dimension;
    alert(this.currentTurn);
  }

  async createBoard(dimension: number): Promise<void> {
    for (var i = 0; i < dimension; i++) {
      this.board[i] = [];
      for (var j = 0; j < dimension; j++) {
        this.board[i][j] = "";
      }
    }
  }

  async getRandcurrentPlayerTurn(): Promise<number> {

    return Math.floor(Math.random() * 2) + 1;
  }

}
