import { PokerPlayer, GENERATED_KEYS, PlayerAgent, CommChannel, TableState } from 'zkpoker';
export class Sim{

    status: string;
    cardReveal?: string;

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

    constructor(){

        this.status = 'setup';
        this.init();
        
    }

    private async init(){

        this.player0 = new PokerPlayer({ name: "astrid", stake: 1_000_000_000 }, GENERATED_KEYS);
        this.player1 = new PokerPlayer({ name: "bette", stake: 1_000_000_000 }, GENERATED_KEYS);
        this.player2 = new PokerPlayer({ name: "carla", stake: 1_000_000_000 }, GENERATED_KEYS);

        await this.setupAgents();
        await this.setupCommChannel();
        await this.setupKeys();

        this.status = 'setupComplete'
         

        this.ownerTableView = {
            holeCards: [],
            flopCards: [],
            turnCard: undefined,
            riverCard: undefined,
        } as TableState;

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

    }

    private setupCommChannel(){
        let cc = new CommChannel();
        cc.setupAgentComms([this.pa0, this.pa1, this.pa2]);
    }

    private async setupKeys(){

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

    }

    async setupCards(){

        this.status = "setupCards"

        await this.pa0.createDeck();
        await this.pa1.shuffleAndRerandomize();
        await this.pa2.shuffleAndRerandomize();

        this.status = "setupCardsComplete"

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

        this.updateTableState();
        this.cardReveal = 'holdCards'
        
    }

    async runSimulation(){

        // await this.simBetting();
        // await this.constructFlopCards();

        // this.status = "flopComplete"

        // await this.simBetting();
        // await this.constructTurnCard();

        // this.status = "turnComplete"

        // await this.simBetting();
        // await this.constructRiverCard();

        // this.status = "riverComplete"

        // await this.simBetting();
    }

    async advanceSimulation(){

        switch (this.ownerAgent.state.currRoundIndex) {
            case 1: 

                this.status = 'flopCardsDecrypt'
                await this.constructFlopCards();
                this.status = 'flopCardsReveal'

                break;

            case 2: 
                await this.constructTurnCard();
                this.cardReveal = 'turnCard'
            break;
      
            case 3: 
                await this.constructRiverCard();
                this.cardReveal = 'riverCard'
            break;

            default:
                break;
        }

        this.updateTableState()

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
        console.log('betting')

        await Promise.all([
            this.pa2.doBetOnMyTurn(20),
            this.pa1.doBetOnMyTurn(20),
            this.pa0.doBetOnMyTurn(20),
        ]);

        console.log('bettingComplete')

        await this.advanceSimulation();

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

        await this.advanceSimulation();

        this.status = 'simulationAdvanced'

    }

    private updateTableState(){
        
        this.ownerTableView = this.ownerAgent.tableView;
        this.currRound = this.ownerAgent.state.currRoundIndex;

    }

    get tableView():TableState{
        return this.ownerTableView
    }

}