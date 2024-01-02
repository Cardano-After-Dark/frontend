import {
  PokerPlayer,
  GENERATED_KEYS,
  PlayerAgent,
  CommChannel,
  TableState,
  GameState,
} from 'zkpoker';

class Sim {
  status: string;

  nextLoadingDescription: string;

  player0: PokerPlayer;
  player1: PokerPlayer;
  player2: PokerPlayer;

  pa0: PlayerAgent;
  pa1: PlayerAgent;
  pa2: PlayerAgent;

  allPlayerAgents: PlayerAgent[];

  ownerAgent: PlayerAgent;
  ownerTableView: TableState;

  currRound: number;

  ownerGameState: GameState;

  constructor() {
    this.ownerTableView = {
      holeCards: [],
      flopCards: [],
      turnCard: undefined,
      riverCard: undefined,
    } as TableState;

    this.status = 'SETUP_COMPLETE';
    this.nextLoadingDescription = 'Adding players...';
  }

  async addPlayers() {
    this.player0 = new PokerPlayer(
      { name: 'astrid', stake: 1_000 },
      GENERATED_KEYS
    );
    this.player1 = new PokerPlayer(
      { name: 'bette', stake: 1_000 },
      GENERATED_KEYS
    );
    this.player2 = new PokerPlayer(
      { name: 'carla', stake: 1_000 },
      GENERATED_KEYS
    );

    await this.setupAgents();
    await this.setupCommChannel();

    this.status = 'PLAYERS_ADDED';
    this.nextLoadingDescription = 'Generating keys...';
  }

  private async setupAgents() {
    const publicInfo0 = await this.player0.getPublicInfo();
    const publicInfo1 = await this.player1.getPublicInfo();
    const publicInfo2 = await this.player2.getPublicInfo();
    const allPublicInfo = [publicInfo0, publicInfo1, publicInfo2];

    this.pa0 = new PlayerAgent(this.player0, allPublicInfo);
    this.pa1 = new PlayerAgent(this.player1, allPublicInfo);
    this.pa2 = new PlayerAgent(this.player2, allPublicInfo);

    this.allPlayerAgents = [this.pa0, this.pa1, this.pa2];

    this.ownerAgent = this.pa0;
    this.ownerGameState = this.ownerAgent.state;
  }

  private setupCommChannel() {
    const cc = new CommChannel();
    cc.setupAgentComms([this.pa0, this.pa1, this.pa2]);
  }

  async setupKeys() {
    await Promise.all([
      this.pa0.broadcastPublicShare(),
      this.pa1.broadcastPublicShare(),
      this.pa2.broadcastPublicShare(),
    ]);

    await Promise.all([
      this.pa0.setupGroupPublicKey(),
      this.pa1.setupGroupPublicKey(),
      this.pa2.setupGroupPublicKey(),
    ]);

    this.status = 'KEYS_GENERATED';
    this.nextLoadingDescription = 'Shuffling deck...';
  }

  async setupCards() {
    await this.pa0.createDeck();
    await this.pa1.shuffleAndRerandomize();
    await this.pa2.shuffleAndRerandomize();

    await Promise.all([
      this.pa0.waitForDeckReady(),
      this.pa1.waitForDeckReady(),
      this.pa2.waitForDeckReady(),
    ]);

    await Promise.all([
      // blocked untill all three players have shuffled and rerandomized
      this.pa0.holeCardDecryption(),
      this.pa1.holeCardDecryption(),
      this.pa2.holeCardDecryption(),
    ]);

    await Promise.all([
      this.pa0.reconstructHoleCards(),
      this.pa1.reconstructHoleCards(),
      this.pa2.reconstructHoleCards(),
    ]);

    this.ownerTableView = this.ownerAgent.tableView;

    this.status = 'CARD_SETUP_COMPLETE';
  }

  async playerBet(player: PlayerAgent, betAmount: number) {
    await player.doBetOnMyTurn(betAmount);

    // Currently needed to allow for time to recieve bet message from other player to update the game controller.
    await new Promise((res) => setTimeout(res, 100));

    this.ownerGameState = this.ownerAgent.state;
  }

  async playerFold(player: PlayerAgent) {
    await player.doFoldOnMyTurn();

    // Currently needed to allow for time to recieve bet message from other player to update the game controller.
    await new Promise((res) => setTimeout(res, 100));

    this.ownerGameState = this.ownerAgent.state;
  }

  async completeRound(round: number) {
    await Promise.all([
      this.pa0.waitForRoundComplete(round),
      this.pa1.waitForRoundComplete(round),
      this.pa2.waitForRoundComplete(round),
    ]);

    this.ownerGameState = this.ownerAgent.state;
  }

  async constructHoleCards() {
    await Promise.all([
      this.pa0.holeCardDecryption(),
      this.pa1.holeCardDecryption(),
      this.pa2.holeCardDecryption(),
    ]);

    await Promise.all([
      this.pa0.reconstructHoleCards(),
      this.pa1.reconstructHoleCards(),
      this.pa2.reconstructHoleCards(),
    ]);
  }

  async constructFlopCards() {
    await Promise.all([
      this.pa0.flopCardDecryption(),
      this.pa1.flopCardDecryption(),
      this.pa2.flopCardDecryption(),
    ]);

    await Promise.all([
      this.pa0.displayFlopCards(),
      this.pa1.displayFlopCards(),
      this.pa2.displayFlopCards(),
    ]);

    this.ownerTableView = this.ownerAgent.tableView;
  }

  async constructTurnCard() {
    await Promise.all([
      this.pa0.turnCardDecryption(),
      this.pa1.turnCardDecryption(),
      this.pa2.turnCardDecryption(),
    ]);

    await Promise.all([
      this.pa0.displayTurnCard(),
      this.pa1.displayTurnCard(),
      this.pa2.displayTurnCard(),
    ]);

    this.ownerTableView = this.ownerAgent.tableView;
  }

  async constructRiverCard() {
    await Promise.all([
      this.pa0.riverCardDecryption(),
      this.pa1.riverCardDecryption(),
      this.pa2.riverCardDecryption(),
    ]);

    await Promise.all([
      this.pa0.displayRiverCard(),
      this.pa1.displayRiverCard(),
      this.pa2.displayRiverCard(),
    ]);

    this.ownerTableView = this.ownerAgent.tableView;
  }
}

export default Sim;
