import ActionButton from '../ActionButton';
import styles from './styles.module.css'; // Assuming you have styles defined in your module.css file

export default function ActionPanel({
    onActionBet,
    onActionFold,
}) {
    return (
        <div className={styles.actionPanelContainer}>
            <div className={styles.actionButtonWrapper}>
                <ActionButton onClick={onActionBet} text='Bet' buttonType='betButton' />
            </div>
            <div className={styles.actionButtonWrapper}>
                <ActionButton onClick={onActionFold} text='Fold' buttonType='foldButton' />
            </div>
        </div>
    );
}