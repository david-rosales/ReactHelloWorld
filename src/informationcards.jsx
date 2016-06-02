var CardManager = React.createClass({
    getInitialState: function(){
      return ({
          editableCard: (<EditableCard/>),
          setCards: [],
          idNum: 0
      });  
    },
    
    setEditableCard: function(card){
        this.setState({editableCard:card});
    },
    
    saveCard: function(){
        var cards = this.state.setCards.slice(0);
        cards.push(<SetCard key={this.state.idNum} delete={this.deleteCard} id={this.state.idNum} title={this.state.editableCard.state.title} desc={this.state.editableCard.state.desc} urgency={this.state.editableCard.state.urgency} details={this.state.editableCard.state.details}/>)
        this.setState({setCards:cards, idNum:this.state.idNum+1});
    },
    
    deleteCard: function(id){
        var removeInd = -1;
        for(var x = 0; x < this.state.setCards.length; x++){
            if(id == this.state.setCards[x].props.id){
                removeInd = x;
                break;
            }
        }
        if(removeInd >= 0){
            var cards = this.state.setCards.slice(0);
            cards.splice(removeInd, 1);
            this.setState({setCards: cards});
        }
    },
    
    render: function(){
        
        return (<div>
            <div className="col s3"><EditableCard ref={this.setEditableCard} save={this.saveCard}/></div>
            <div className="col s9">
                {this.state.setCards}
            </div>
            </div>);
    }
});

var SetCard = React.createClass({
    deleteButton: function(){
        this.props.delete(this.props.id);
    },
    
    render: function(){
        return (<div className="col s6">
                <div className="card-panel">
                    <h4>{this.props.title}</h4>
                    <h5>{this.props.desc}</h5>
                    <p>Urgency: {this.props.urgency == 1 ? "Do Right Now" : this.props.urgency == 2 ? "Do Sometime Later" : "Do Whenever"}</p>
                    <p>{this.props.details}</p>
                    <button onClick={this.deleteButton}>Delete</button>
                </div>
            </div>);
    }
});

var EditableCard = React.createClass({
    getInitialState: function(){
        return({
            title: "Default Title",
            desc: "Default Description",
            urgency: "",
            details: "Default Details",
            saved: false
        });
    },
    
    changeTitle: function(event){
        this.setState({title:event.target.value, saved:false});
    },
    
    changeDescription: function(event){
        this.setState({desc:event.target.value, saved:false})
    },
    
    changeUrgency: function(event){
        this.setState({urgency:event.target.value, saved:false})
    },
    
    changeDetails: function(event){
        this.setState({details:event.target.value, saved:false})
    },
    
    save: function(event){
        this.props.save();
        this.reset();
    },
    
    reset: function(){
        this.setState({
            title: "Default Title",
            desc: "Default Description",
            urgency: "",
            details: "Default Details",
            saved: false
        });
    },
    
    render: function(){
        return (<div className="card-panel">
                <p>Title:</p>
                <h4>{this.state.title}</h4>
                <textarea value={this.state.title} onChange={this.changeTitle}></textarea>
                <p>Description:</p>
                <h5>{this.state.desc}</h5>
                <textarea value={this.state.desc} onChange={this.changeDescription}></textarea>
                <p>Urgency:</p>
                <select value={this.state.urgency} onChange={this.changeUrgency} className="browser-default">
                    <option value="" disabled>Choose an Urgency</option>
                    <option value="1">Do Right Now</option>
                    <option value="2">Do Sometime Later</option>
                    <option value="3">Do Whenever</option>
                </select>
                <p>Details:</p>
                <p>{this.state.details}</p>
                <textarea value={this.state.details} onChange={this.changeDetails}></textarea>
                <button onClick={this.save}>{this.state.saved ? "Saved!" : "Save"}</button>
            </div>);
    }
});


ReactDOM.render(<CardManager />, document.getElementById("container"));
