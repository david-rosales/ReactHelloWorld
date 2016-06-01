var HelloWorldComponent = React.createClass({
    render: function(){
        var elapsedtime = Math.round(this.props.elapsed/100);
        var seconds = elapsedtime/10;
        return (<div>
                <h1>Hello World!</h1>
                <p>Filler React Process Below</p>
                <p>Elapsed Time: {elapsedtime % 10 == 0 ? seconds + ".0" : seconds}</p>
            </div>);
    }
});

var startTime = new Date().getTime();

setInterval(function(){ReactDOM.render(<HelloWorldComponent elapsed={new Date().getTime() - startTime}/>, document.getElementById("container"))}, 50);