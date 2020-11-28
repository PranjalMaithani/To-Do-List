import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function Task(props) {
    const { task, markTask, deleteTask, inProgressTask, icon } = props;
    return (
        <div className="taskGrid">
            <button type="button" className="fontAwesome"><FontAwesomeIcon icon={icon} onClick={() => markTask(task.id)} /></button>
            <p>{task.name}</p>
            <button type="button" className="inProgressButton" onClick={() => inProgressTask(task.id)}><FontAwesomeIcon icon={faExclamationCircle} /></button>
            <button type="button" className="deleteButton" onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTimesCircle} /></button>
        </div >
    );
}