var setCards = new Array();
var idNum = 0;

var CardManager = React.createClass({
    render: function(){
        
        return (<div>
            <div className="col s3"><EditableCard/></div>
            <div className="col s9">
                {setCards}
            </div>
            </div>);
    }
});

var SetCard = React.createClass({
    deleteButton: function(){
        var removeInd = -1;
        for(var x = 0; x < setCards.length; x++){
            if(this.props.id == setCards[x].props.id){
                removeInd = x;
                break;
            }
        }
        if(removeInd >= 0){
            setCards.splice(removeInd, 1);
        }
    },
    
    render: function(){
        return (<div className="col s3">
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
        this.setState({saved:true})
        setCards.push(<SetCard key={idNum} id={idNum} title={this.state.title} desc={this.state.desc} urgency={this.state.urgency} details={this.state.details}/>)
        idNum++;
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

setInterval(function(){
    ReactDOM.render(<CardManager />, document.getElementById("container"));
}, 50);