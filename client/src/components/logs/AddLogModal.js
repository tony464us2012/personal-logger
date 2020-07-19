import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addLogs } from '../../actions/logActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js'

const AddLogModal = ({ addLogs, techs }) => {

    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    const onSubmit = () => {
        if(message === '' || tech === '' ){
            M.toast({ html: 'Please enter a message and tech'})
        } else { 
            const newLog ={
                message,
                attention,
                tech,
                date: new Date()
            };
            addLogs(newLog)
            M.toast({html: `Log added by ${tech}`})
            //Clear Fields
            setMessage('');
            setTech('');
            setAttention(false)
        }
    }

    return (
        <div id='add-log-modal' className='modal' style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)}/>
                        <label htmlFor='message' className='active'>Log Message</label>
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

AddLogModal.propTypes = {
    addLog: PropTypes.func,
    techs: PropTypes.array,

     
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

const mapStatetoProps = state => ({
    techs: state.tech.techs
})


export default connect(mapStatetoProps, {addLogs})(AddLogModal)
