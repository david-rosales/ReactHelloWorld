var CardManager = React.createClass({
    getInitialState: function(){
        return({
            title: "Default Title",
            desc: "Default Description",
            urgency: "",
            details: "Default Details",
            idNum: 0,
            savedCards: []
        });
    },
    
    changeTitle: function(event){
        this.setState({title:event.target.value, saved:false});
    },
    
    changeDesc: function(event){
        this.setState({desc:event.target.value, saved:false})
    },
    
    changeUrgency: function(event){
        this.setState({urgency:event.target.value, saved:false})
    },
    
    changeDetails: function(event){
        this.setState({details:event.target.value, saved:false})
    },
    
    resetECard: function(){
        this.setState({
            title: "Default Title",
            desc: "Default Description",
            urgency: "",
            details: "Default Details",
        });
    },
    
    updateId: function(){
        this.setState({idNum: this.state.idNum + 1});
        return this.state.idNum - 1;
    },
    
    clickSave: function(){
        var card = new Card(this.updateId(), this.state.title, this.state.desc, this.state.urgency, this.state.details);
        var newCards = _.concat(this.state.savedCards, card);
        this.setState({savedCards: newCards});
        this.resetECard();
    },
    
    clickDelete: function(id){
        var newCards = _.filter(this.state.savedCards, function(card){
            return card.id != id;
        });
        this.setState({savedCards:newCards});
    },
    
    render: function(){
        var setCards = []
        for(var x=0;x<this.state.savedCards.length;x++){
            var card = this.state.savedCards[x];
            var setCard = (<SetCard key={card.id} id={card.id} title={card.title} desc={card.desc} urgency={card.urgency} details={card.details} delete={this.clickDelete}/>);
            setCards.push(setCard);
        }
        return(
            <div>
                <div className="col s3">
                    <EditableCard title={this.state.title} desc={this.state.desc} urgency={this.state.urgency} details={this.state.details} changeTitle={this.changeTitle} changeDesc={this.changeDesc} changeUrgency={this.changeUrgency} changeDetails={this.changeDetails} save={this.clickSave}/>
                </div>
                <div className="col s9">
                    {setCards}
                </div>
            </div>
        );
    }
});

var Card = function(id, title, desc, urgency, details){
  return ({
      id: id,
      title: title,
      desc: desc,
      urgency: urgency,
      details: details
  });  
};

var SetCard = React.createClass({
    delete: function(){
        this.props.delete(this.props.id);    
    },
    
    render: function(){
        return (
            <div className="col s6">
                <div className="card-panel">
                    <h4>{this.props.title}</h4>
                    <h5>{this.props.desc}</h5>
                    <p>Urgency: {this.props.urgency === 1 ? "Do Right Now" : this.props.urgency === 2 ? "Do Sometime Later": "Do Whenever"}</p>
                    <p>{this.props.details}</p>
                    <button onClick={this.delete}>Delete</button>
                </div>
            </div>
        );
    }
});

var EditableCard = React.createClass({
    render: function(){
        return(
            <div className="card-panel">
                <p>Title:</p>
                <h4>{this.props.title}</h4>
                <textarea value={this.props.title} onChange={this.props.changeTitle}></textarea>
                <p>Description:</p>
                <h5>{this.props.desc}</h5>
                <textarea value={this.props.desc} onChange={this.props.changeDesc}></textarea>
                <p>Urgency:</p>
                <select value={this.props.urgency} onChange={this.props.changeUrgency} className="browser-default">
                    <option value="" disabled>Choose an Urgency</option>
                    <option value="1">Do Right Now</option>
                    <option value="2">Do Sometime Later</option>
                    <option value="3">Do Whenever</option>
                </select>
                <p>Details:</p>
                <p>{this.props.details}</p>
                <textarea value={this.props.details} onChange={this.props.changeDetails}></textarea>
                <button onClick={this.props.save}>Save</button>
            </div>
        );
    }
});

ReactDOM.render(<CardManager />, document.getElementById("container"));
