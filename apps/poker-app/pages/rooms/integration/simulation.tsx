import { PokerPlayer, GENERATED_KEYS, PlayerAgent, CommChannel, TableState, GameState } from 'zkpoker';
export class Sim{

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

    constructor(){

        this.ownerTableView = {
            holeCards: [],
            flopCards: [],
            turnCard: undefined,
            riverCard: undefined,
        } as TableState;

        this.status = 'SETUP_COMPLETE';
        this.nextLoadingDescription = "Adding players...";
    }

    async addPlayers(){

        this.player0 = new PokerPlayer({ name: "astrid", stake: 1_000 }, GENERATED_KEYS);
        this.player1 = new PokerPlayer({ name: "bette", stake: 1_000 }, GENERATED_KEYS);
        this.player2 = new PokerPlayer({ name: "carla", stake: 1_000 }, GENERATED_KEYS);

        await this.setupAgents();
        await this.setupCommChannel();

        this.status = "PLAYERS_ADDED";
        this.nextLoadingDescription = "Generating keys..."    
    }

    private async setupAgents(){

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

    private setupCommChannel(){
        let cc = new CommChannel();
        cc.setupAgentComms([this.pa0, this.pa1, this.pa2]);
    }

    async setupKeys(){

        await Promise.all([
            this.pa0.broadcastPublicShare(),
            this.pa1.broadcastPublicShare(),
            this.pa2.broadcastPublicShare()
        ])

        await Promise.all([
            this.pa0.setupGroupPublicKey(),
            this.pa1.setupGroupPublicKey(),
            this.pa2.setupGroupPublicKey()
        ])

        this.status = "KEYS_GENERATED"
        this.nextLoadingDescription = "Shuffling deck..."  
    }

    async setupCards(){

        await this.pa0.createDeck();
        await this.pa1.shuffleAndRerandomize();
        await this.pa2.shuffleAndRerandomize();

        await Promise.all([ 
            this.pa0.waitForDeckReady(),
            this.pa1.waitForDeckReady(),
            this.pa2.waitForDeckReady()
        ])

        await Promise.all([
            // blocked untill all three players have shuffled and rerandomized 
            this.pa0.holeCardDecryption(),
            this.pa1.holeCardDecryption(),
            this.pa2.holeCardDecryption()
        ])

        await Promise.all([
            this.pa0.reconstructHoleCards(),
            this.pa1.reconstructHoleCards(),
            this.pa2.reconstructHoleCards()
        ])

        this.ownerTableView = this.ownerAgent.tableView;

        this.status = "CARD_SETUP_COMPLETE"
    }


    async ownerBet(){
        await this.pa0.doBetOnMyTurn(20);
        this.ownerGameState = this.ownerAgent.state;
    }

    async playerBet(player: PlayerAgent){

        await player.doBetOnMyTurn(20);

        // Currently needed to allow for time to recieve bet message from other player to update the game controller. 
        await new Promise(res => setTimeout(res, 100));
        this.ownerGameState = this.ownerAgent.state;
    }

    async playerFold(player: PlayerAgent){

        await player.doFoldOnMyTurn();

        // Currently needed to allow for time to recieve bet message from other player to update the game controller. 
        await new Promise(res => setTimeout(res, 100));
        this.ownerGameState = this.ownerAgent.state;
    }


    async constructHoleCards(){

        await Promise.all([
            this.pa0.holeCardDecryption(),
            this.pa1.holeCardDecryption(),
            this.pa2.holeCardDecryption()
        ])
            
        await Promise.all([
            this.pa0.reconstructHoleCards(),
            this.pa1.reconstructHoleCards(),
            this.pa2.reconstructHoleCards()
        ])
        
    }

    async revealCards(){

        switch (this.ownerAgent.state.currRoundIndex) {
            case 1: 
                await this.constructFlopCards();
                break;

            case 2: 
                await this.constructTurnCard();
                break;
      
            case 3: 
                await this.constructRiverCard();
                break;

            default:
                break;
        }

        // this.updateTableState()

    }

    async simBetting(){

        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
            this.pa0.doBetOnMyTurn(20),
        ]);
    }

    async simOtherBetting(){

        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
        ]);

    }

    async constructFlopCards(){

        await Promise.all([
            this.pa0.flopCardDecryption(),
            this.pa1.flopCardDecryption(),
            this.pa2.flopCardDecryption()
        ])

        await Promise.all([
            this.pa0.displayFlopCards(),
            this.pa1.displayFlopCards(),
            this.pa2.displayFlopCards()
        ])

    }

    async constructTurnCard(){
        await Promise.all([
            this.pa0.turnCardDecryption(),
            this.pa1.turnCardDecryption(),
            this.pa2.turnCardDecryption()
        ])
    
        await Promise.all([
            this.pa0.displayTurnCard(),
            this.pa1.displayTurnCard(),
            this.pa2.displayTurnCard()
        ])

    }

    async constructRiverCard(){

        await Promise.all([
            this.pa0.riverCardDecryption(),
            this.pa1.riverCardDecryption(),
            this.pa2.riverCardDecryption()
        ])
        
        await Promise.all([
            this.pa0.displayRiverCard(),
            this.pa1.displayRiverCard(),
            this.pa2.displayRiverCard()
        ])
    }

    async ownerAgentBet(){

        this.status = 'ownerAgentTurnPending'
        
        await this.pa0.doBetOnMyTurn(20)


        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
            // this.pa0.doBetOnMyTurn(20),
        ]);

        await this.revealCards();

        // await Promise.all([ 
        //     this.pa0.waitForRoundComplete(0),
        //     this.pa1.waitForRoundComplete(0),
        //     this.pa2.waitForRoundComplete(0)
        // ])

        this.status = 'simulationAdvanced'

    }

    async ownerAgentFold(){

        this.status = 'ownerAgentTurnPending'
        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
            this.pa0.doFoldOnMyTurn(),
        ]);
        this.status = 'ownerAgentTurnComplete'

        await this.revealCards();

        this.status = 'simulationAdvanced'

    }

    async runPreflop(){

        await Promise.all([
            // blocked untill all three players have shuffled and rerandomized 
            this.pa0.holeCardDecryption(),
            this.pa1.holeCardDecryption(),
            this.pa2.holeCardDecryption()
        ])

        await Promise.all([
            this.pa0.reconstructHoleCards(),
            this.pa1.reconstructHoleCards(),
            this.pa2.reconstructHoleCards()
        ])

        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
            this.pa0.doBetOnMyTurn(20)
        ]);

        await Promise.all([ 
            this.pa0.waitForRoundComplete(0),
            this.pa1.waitForRoundComplete(0),
            this.pa2.waitForRoundComplete(0)
        ])

        return { ...this, ownerTableView: this.ownerAgent.tableView };

    }

    async runSimulation(){
    
        // await Promise.all([
        //     // blocked untill all three players have shuffled and rerandomized 
        //     this.pa0.holeCardDecryption(),
        //     this.pa1.holeCardDecryption(),
        //     this.pa2.holeCardDecryption()
        // ])

        // await Promise.all([
        //     this.pa0.reconstructHoleCards(),
        //     this.pa1.reconstructHoleCards(),
        //     this.pa2.reconstructHoleCards()
        // ])

        // await Promise.all([
        //     this.pa2.doBetOnMyTurn(20),
        //     this.pa1.doBetOnMyTurn(20),
        //     this.pa0.doBetOnMyTurn(20)
        // ]);

        // await Promise.all([ 
        //     this.pa0.waitForRoundComplete(0),
        //     this.pa1.waitForRoundComplete(0),
        //     this.pa2.waitForRoundComplete(0)
        // ])

        await Promise.all([
            this.pa0.flopCardDecryption(),
            this.pa1.flopCardDecryption(),
            this.pa2.flopCardDecryption()
        ])
        
        await Promise.all([
            this.pa0.displayFlopCards(),
            this.pa1.displayFlopCards(),
            this.pa2.displayFlopCards()
        ])
            
        await Promise.all([
            this.pa0.doBetOnMyTurn(10),
            this.pa1.doBetOnMyTurn(10),
            this.pa2.doBetOnMyTurn(20),
            this.pa0.doBetOnMyTurn(10),
            this.pa1.doBetOnMyTurn(10),
        ]);

        await Promise.all([ 
            this.pa0.waitForRoundComplete(1),
            this.pa1.waitForRoundComplete(1),
            this.pa2.waitForRoundComplete(1)
        ])

        await Promise.all([
            this.pa0.turnCardDecryption(),
            this.pa1.turnCardDecryption(),
            this.pa2.turnCardDecryption()
        ])

        await Promise.all([
            this.pa0.displayTurnCard(),
            this.pa1.displayTurnCard(),
            this.pa2.displayTurnCard()
        ])

        this.status = 'turnCardsReconstructed'

        return { ...this, status: 'updated' };
        
        await Promise.all([
            this.pa0.doBetOnMyTurn(10),
            this.pa1.doBetOnMyTurn(10),
            this.pa2.doBetOnMyTurn(10),
        ]);

        await Promise.all([ 
            this.pa0.waitForRoundComplete(2),
            this.pa1.waitForRoundComplete(2),
            this.pa2.waitForRoundComplete(2)
        ])

        await Promise.all([
            this.pa0.riverCardDecryption(),
            this.pa1.riverCardDecryption(),
            this.pa2.riverCardDecryption()
        ])
        
        await Promise.all([
            this.pa0.displayRiverCard(),
            this.pa1.displayRiverCard(),
            this.pa2.displayRiverCard()
        ])

        this.status = 'riverCardsReconstructed'
        
        await Promise.all([
            this.pa1.doBetOnMyTurn(10),
            this.pa0.doBetOnMyTurn(10),
            this.pa2.doBetOnMyTurn(10)
        ]);

        await Promise.all([ 
            this.pa0.waitForRoundComplete(3),
            this.pa1.waitForRoundComplete(3),
            this.pa2.waitForRoundComplete(3)
        ])
        console.log(this.pa0);
    }
    


}