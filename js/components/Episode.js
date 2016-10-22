import React from "react"
import ReactDOM from "react-dom"

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"more": false,
			"playing": false
		}
	}
	handlePlayClick() {
		this.setState({playing: (!this.state.playing)})
	}
	handleDownloadClick() {
		console.log("dl")
	}
	handleMoreClick() {
		this.setState({more: (!this.state.more)})
	}
	//<!-- {ep.img} -->
	//<!-- {ep.mp3} -->
	//<!-- {ep.link} -->
	render() {
		var ep = this.props.episode
		var desc = ""
		var more_symbol = "+"
		var more_class = "episode-compressed"
		console.log(ep.img)
		if (this.state.more) {
			desc = "<p>" + ep.desc + "</p>"
			more_symbol = "-"
			more_class = "episode-expanded"
		}
		var playing_symbol = (
								<button class="episode-button" onClick={this.handlePlayClick.bind(this)}>&#9658;</button>
							)
		if (this.state.playing) {
			playing_symbol = (
								<button class="episode-button" onClick={this.handlePlayClick.bind(this)}>&#10073;&#10073;</button>
							)
		}
		return (
			<div class="episode {more-class}">
				<div class="episode-left">
					<p><span class="episode-title">{ep.title}</span></p>
					<p>
						<span class="episode-duration">{ep.duration}</span>
						-
						<span class="episode-pubDate">{ep.pubDate}</span>
					</p>
					{desc}
				</div>
				<div class="episode-right">
					<div class="episode-right-inner">
						<div class="episode-right-inner-inner">
							{playing_symbol}
							<button class="episode-button" onClick={this.handleDownloadClick.bind(this)}>&darr;</button>
							<button class="episode-button" onClick={this.handleMoreClick.bind(this)}>{more_symbol}</button>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
