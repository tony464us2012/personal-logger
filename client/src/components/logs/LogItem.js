import React from 'react';
import {connect} from 'react-redux';
import { deleteLog, setCurrent } from '../../actions/logActions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';


const LogItem = ({ log, deleteLog, setCurrent }) => {

    const { _id, message, attention, date, tech } = log;

    return (
        <li className="collection-item">
            <div> 
                <a href="#edit-log-modal" onClick={()=> setCurrent(log)} className={ `modal-trigger ${attention ? 'red-text' : 'blue-text'}`}>{ message }</a><br />
                <span className="grey-text">
                    Last updated by {' '}
                    <span className="black-text"> {tech}</span> on <Moment format='MMMM Do YYYY, h:mm:ss a'>{ date }</Moment>
                </span>
                <a href="#!" onClick={() => deleteLog(_id)} className="secondary-content">
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    log: PropTypes.object,
    deleteLog: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
}

export default connect(null, {deleteLog, setCurrent})(LogItem)
