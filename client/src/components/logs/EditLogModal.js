import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearCurrent, editLog } from '../../actions/logActions'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'

const EditLogModal = ({current, loading, clearCurrent, editLog, techs}) => {

    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(() => {
        if (current && !loading) {
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech)
        }
        // eslint-disable-next-line
    }, [current])
   
    const onSubmit = () => {
        if(message === '' || tech === '' ){
            M.toast({ html: 'Please enter a message and tech'})
        } else { 
            const updatedLog = {
                id: current._id,
                message, 
                attention,
                tech,
                date: new Date()
            };
            editLog(updatedLog);
            clearCurrent();
        }
    }

    return (
        <div id='edit-log-modal' className='modal' style={modalStyle}>
            <div className="modal-content">
                <h4>Edit Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" autoFocus onFocus={e => e.currentTarget.select()} name='message' value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select name="tech" value={tech} className='browser-default' onChange={e => setTech(e.target.value)}>
                            <option value='' disabled>Select Logger</option>
                            { techs === null || techs.length === 0 ? (<option disabled>No Logger On File</option>) : (techs.map(tech => <option key={tech._id} value={tech.firstName + ' ' + tech.lastName}>{tech.firstName + ' ' + tech.lastName}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className='filled-in' checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className='modal-close waves-effect blue waves-light btn'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle = {
    width: '75%',
    height: '75%'
};

EditLogModal.propTypes = {
    current: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    clearCurrent: PropTypes.func.isRequired,
    editLog: PropTypes.func.isRequired,
    techs: PropTypes.array
}

const mapStateToProps = state => ({
    current: state.log.current,
    loading: state.log.loading,
    techs: state.tech.techs
})

export default connect(mapStateToProps, {clearCurrent, editLog})(EditLogModal)