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
  constructor(public game: TiktoegameserviceService) { }

  async ngOnInit() {


  }

  async playGame(): Promise<void> {
    this.game.startThegame(3);
    if (this.game.currentTurn === 2) {
      //Ai Turn
      await this.game.makeMoveforAi(this.game.board, this.dimension);
      this.game.currentTurn = this.game.setNextMove();
    }
  }

  async makeMove(idx: number, colm: number): Promise<void> {


    this.checkWinner = await this.game.isThereWinner();
    let isgameover = await this.game.isGameOver();
    console.log(this.checkWinner[0] + "  " + this.checkWinner[1]);

    if (this.checkWinner[0] === false && isgameover === false) {

      if (this.game.currentTurn === 1 && isgameover === false) {
        await this.game.addPlayerIntheBoard(idx, colm);
        this.game.currentTurn = this.game.setNextMove();
      }
      isgameover = await this.game.isGameOver();
      if (this.game.currentTurn === 2 && isgameover === false) {
        //Ai Turn
        await this.game.makeMoveforAi(this.game.board, this.dimension);
        this.game.currentTurn = this.game.setNextMove();
      }
    }
    this.checkWinner = await this.game.isThereWinner();

    if (this.checkWinner[0] === true) {

      this.gameResule = "The Winner is: " + this.checkWinner[1]
    }

    else if (isgameover === true && this.checkWinner[1] === "") {
      this.gameResule = "The Game is: Tie"
    }
  }


}
