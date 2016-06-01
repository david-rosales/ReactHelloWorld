var HelloWorldComponent = React.createClass({
    getInitialState: function(){
        return ({
           clicks: 0 
        });
    },
    
    clickButton: function(){
        this.setState({
            clicks: this.state.clicks + 1
        });
    },
    
    resetButton: function(){
        this.setState({
            clicks: 0        
        });
    },
    
    render: function(){
        var elapsedtime = Math.round(this.props.elapsed/100);
        var seconds = elapsedtime/10;
        return (<div>
                <h1>Hello World!</h1>
                <h2>Filler React Processes Below</h2>
                <p>Elapsed Time: {elapsedtime % 10 == 0 ? seconds + ".0" : seconds}</p>
                <p>
                    <button onClick={this.clickButton}>Click Me : {this.state.clicks%10 == this.state.clicks ? "0" + this.state.clicks : this.state.clicks} clicks so far {this.state.clicks < 10 ? ":(" : this.state.clicks < 20 ? ":|" : this.state.clicks < 30 ? ":)" : ":D"}</button>
                </p>
                <p>
                    <button onClick={this.resetButton}>Reset Clicks</button>
                </p>
            </div>);
    }
});

var TextAreaComponent = React.createClass({
    getInitialState: function(){
        return({
           text: this.props.value 
        });
    },
    
    changeText: function(evt){
      this.setState({
          text: evt.target.value
      })  
    },
    
    render: function(){
        return (<div>
            <p><textarea value={this.state.text} onChange={this.changeText}></textarea></p>
            <p>{this.state.text}</p>
            </div>);
    }
});

var KeyTracker = React.createClass({
    getInitialState: function(){
        return({
            keys: []
        });
    },
    
    onPressedKey: function(event){
        var newkeys = this.state.keys;
        newkeys.push(String.fromCharCode(event.charCode));
        this.setState({
            keys: newkeys
        });
    },
    
    render: function(){
        var keysPressed = "";
        for(var x = 0; x < this.state.keys.length; x++){
            keysPressed += this.state.keys[x];
        }
        return (<div>
            <p><textarea value="Key Tracker: Click here and type" readOnly onKeyPress={this.onPressedKey}></textarea></p>
            <p>{keysPressed}</p>
            </div>);
    }
})

var startTime = new Date().getTime();
setInterval(function(){ReactDOM.render(<HelloWorldComponent elapsed={new Date().getTime() - startTime}/>, document.getElementById("container"))}, 50);
ReactDOM.render(<TextAreaComponent value="Type something here."/>, document.getElementById("text"));
ReactDOM.render(<KeyTracker />, document.getElementById("tracker"));