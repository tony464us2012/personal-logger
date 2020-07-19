import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { getTechs } from '../../actions/techActions';
import TechItem from './TechItem';
import PropTypes from 'prop-types';

const TechListModal = ({techs: { techs }, getTechs}) => {
    
    useEffect(() => {
        getTechs();
        //eslint-disable-next-line
    },[]);

    return (
        <div id="tech-list-modal" className="modal">
            <div className="modal-content">
                <h4>Logger List</h4>
                <ul className="collection">
                { techs === null || techs.length === 0 ? (<option disabled>No Technicians On File</option>) : (techs.map(tech => <TechItem key={tech._id} tech={tech} />))}
                </ul>
            </div>
        </div>
    )
}

TechListModal.propTypes = {
    techs: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
    techs: state.tech
})

export default connect(mapStatetoProps, { getTechs })(TechListModal)
