import { Component, OnInit } from '@angular/core';
import { TiktoegameserviceService } from './Service/tiktoegameservice.service';
import { gamseStatus } from './Model/gameStatus';

@Component({
  selector: 'app-tik-toe-ai',
  templateUrl: './tik-toe-ai.component.html',
  styleUrls: ['./tik-toe-ai.component.scss']
})
export class TikToeAiComponent implements OnInit {
  checkWinner: [boolean, string];
  dimension: number = 3;
  constructor(public game: TiktoegameserviceService) { }

  ngOnInit() {


  }

  async playGame(): Promise<void> {
    this.game.startThegame(3);
  }

  async makeMove(idx: number, colm: number): Promise<void> {

    
    this.checkWinner = await this.game.isThereWinner();
    let isgameover = await this.game.isGameOver();
    console.log(this.checkWinner[0] + "  " + this.checkWinner[1]);

    if (this.checkWinner[0] === false && isgameover === false) {
      await this.game.addPlayerIntheBoard(idx, colm);
      this.game.currentTurn = this.game.setNextMove();
    }
    this.checkWinner = await this.game.isThereWinner();
    console.log("this.checkWinner[0]   " + this.checkWinner[0])
    console.log(this.game.board)
  }


}
