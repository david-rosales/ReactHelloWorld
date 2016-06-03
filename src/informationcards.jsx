var CardManager = React.createClass({
    getInitialState: function(){
        return({
            title: "Default Title",
            desc: "Default Description",
            urgency: "",
            details: "Default Details",
            idNum: this.props.initialIdNum,
            savedCards: this.props.cards
        });
    },
    
    changeTitle: function(event){
        this.setState({title:event.target.value});
    },
    
    changeDesc: function(event){
        this.setState({desc:event.target.value})
    },
    
    changeUrgency: function(event){
        this.setState({urgency:event.target.value})
    },
    
    changeDetails: function(event){
        this.setState({details:event.target.value})
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
        var card = {id: this.updateId(), title: this.state.title, desc: this.state.desc, urgency: this.state.urgency, details: this.state.details};
        var newCards = _.concat(this.state.savedCards, card);
        this.setState({savedCards: newCards});
        this.saveCardsInLocalStorage(newCards);
        this.resetECard();
    },
    
    saveCardsInLocalStorage: function(cards){
        localStorage.clear();
        localStorage.setItem("savedCards", JSON.stringify(cards));
    },
    
    clickDelete: function(id){
        var newCards = _.filter(this.state.savedCards, function(card){
            return card.id !== id;
        });
        this.setState({savedCards:newCards});
        this.saveCardsInLocalStorage(newCards);
    },
    
    render: function(){
        var instance = this;
        var setCards = this.state.savedCards.map(function(card){
            return (<SetCard key={card.id} id={card.id} title={card.title} desc={card.desc} urgency={card.urgency} details={card.details} delete={instance.clickDelete}/>);
        });
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

var SetCard = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired,
        urgency: React.PropTypes.string.isRequired,
        details: React.PropTypes.string.isRequired,
        delete: React.PropTypes.func.isRequired,
    },
    
    delete: function(){
        this.props.delete(this.props.id);    
    },
    
    render: function(){
        return (
            <div className="col s6">
                <div className="card-panel">
                    <h4>{this.props.title}</h4>
                    <h5>{this.props.desc}</h5>
                    <p>Urgency: {this.props.urgency == 1 ? "Do Right Now" : this.props.urgency == 2 ? "Do Sometime Later": "Do Whenever"}</p>
                    <p>{this.props.details}</p>
                    <button onClick={this.delete}>Delete</button>
                </div>
            </div>
        );
    }
});

var EditableCard = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired,
        urgency: React.PropTypes.string.isRequired,
        details: React.PropTypes.string.isRequired,
        changeTitle: React.PropTypes.func.isRequired,
        changeDesc: React.PropTypes.func.isRequired,
        changeUrgency: React.PropTypes.func.isRequired,
        changeDetails: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
    },
    
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

$( document ).ready(function() {
    var cards = JSON.parse(localStorage.getItem("savedCards"));
    var largestId = 0;
    if(cards !== null){
        for(var x=0;x<cards.length;x++){
            var card = cards[x];
            if(card.id > largestId){
                largestId = card.id;
            }
        }
        largestId+=2;
    }else{
        cards=[];
    }
    var CM = (<CardManager cards={cards} initialIdNum={largestId}/>);
    ReactDOM.render(CM, document.getElementById("container"));
});
