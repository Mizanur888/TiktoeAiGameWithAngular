import { Component, OnInit } from '@angular/core';
import { TiktoegameserviceService } from './Service/tiktoegameservice.service';
import { gamseStatus } from './Model/gameStatus';

@Component({
  selector: 'app-tik-toe-ai',
  templateUrl: './tik-toe-ai.component.html',
  styleUrls: ['./tik-toe-ai.component.scss']
})
export class TikToeAiComponent implements OnInit {
  gameResule: string = "";
  checkWinner: [boolean, string];
  dimension: number = 3;
  isgameover:boolean = false;
  constructor(public game: TiktoegameserviceService) { }

  async ngOnInit() {


  }

  async playGame(): Promise<void> {
    this.isgameover = false;
    this.gameResule = "";
    await this.game.startThegame(this.dimension);

  }

  async makeMove(idx: number, colm: number): Promise<void> {


    this.checkWinner = await this.game.isThereWinner();
    this.isgameover = await this.game.isGameOver();
    console.log(this.checkWinner[0] + "  " + this.checkWinner[1]);

    if (this.checkWinner[0] === false && this.isgameover === false) {

      if (this.game.currentTurn === 1 && this.isgameover === false) {
        await this.game.addPlayerIntheBoard(idx, colm);
        this.game.currentTurn = this.game.setNextMove();
      }
      this.isgameover = await this.game.isGameOver();
      if (this.game.currentTurn === 2 && this.isgameover === false) {
        //Ai Turn
        await this.game.makeMoveforAi(this.game.board, this.dimension);
        this.game.currentTurn = this.game.setNextMove();
      }
    }
    this.checkWinner = await this.game.isThereWinner();
    this.isgameover = await this.game.isGameOver();
    if (this.checkWinner[0] === true) {

      this.gameResule = "The Winner is: " + this.checkWinner[1]
    }

    else if (this.isgameover === true) {
      this.gameResule = "The Game is: Tie"
    }
  }


}
