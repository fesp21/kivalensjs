import React from 'react'
import Reflux from 'reflux'
import {Modal,ProgressBar} from 'react-bootstrap'
import {loanActions} from '../actions'
import {loanStore} from '../stores/loanStore'

var LoadingLoansModal = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState:function(){
        return {progress_label: '', progress: 0, show: this.props.show}
    },
    componentDidMount: function() {
        this.listenTo(loanActions.load.progressed, progress => {var new_state = {show: true}
            if (progress.type == 'percent')
                new_state.progress = progress.percentage
            else if (progress.type == 'label')
                new_state.progress_label = progress.label
            else if (progress.type == 'done')
                new_state.show = false
            this.setState(new_state)
        })
    },
    render() {
        return (
        <div className="static-modal">
            <Modal show={this.state.show} onHide={()=>{}}>
                <Modal.Header>
                    <Modal.Title>Loading Fundraising Loans from Kiva.org</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ProgressBar active now={this.state.progress} />
                    <p>To greatly reduce load time, check out the "Options"
                        tab to always exclude certain types of loans from the initial load.</p>
                </Modal.Body>

                <Modal.Footer>
                    {this.state.progress_label}
                </Modal.Footer>
            </Modal>
        </div>

        );
    }
})


module.exports = LoadingLoansModal;