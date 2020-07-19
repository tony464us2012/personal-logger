import React from 'react';
import {connect} from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import PropTypes from 'prop-types'

const TechItem = ({ tech, deleteTech }) => {
    const { firstName, lastName, _id } = tech;

    return (
        <li className="collection-item">
            <div>
                {firstName} {lastName}
                <a href="#!" onClick={() => deleteTech(_id)} className="secondary-content">
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
}

TechItem.propTypes = {
    tech: PropTypes.object.isRequired,
    deleteTech: PropTypes.func.isRequired,
}

export default connect(null, { deleteTech })(TechItem)
