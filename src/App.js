import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import './App.css';
import Sortable from 'sortablejs';
import sortable from 'html5sortable/dist/html5sortable.es.js';

const SortableItem = SortableElement(({value, className}) =>
	<div className={`item ${className}`} style={{ height: randHeight() }}>{value}</div>
);

const randHeight = () => Math.floor(Math.random() * 100 + 50);

const SortableList = SortableContainer(({items}) => {
	return (
		<div className="list">
		<SortableItem index={-1} className="massive-item" value={'MASSIVE'} />
		{items.map((value, index) => (
			<SortableItem key={`item-${index}`} index={index} value={value} />
		))}
		</div>
	);
});

const RubaxaList = ({ items }) => {
	return (
		<div id="rubaxa" className="list">
			<div className="item massive-item">MASSIVE</div>
			{items.map((value, index) => (
				<div className="item" style={{ height: randHeight() }} key={`item-${index}`} index={index}>{ value }</div>
			))}
		</div>
	);
}

const Html5SortableList = ({ items }) => {
	return (
		<div id="html5sortable" className="list">
			<div className="item massive-item">MASSIVE</div>
			{items.map((value, index) => (
				<div className="item" style={{ height: randHeight() }} key={`item-${index}`} index={index}>{ value }</div>
			))}
		</div>
	);
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			items1: ["Tauka", "is", "awesome", "many", "use", "cases", "can", "be", "found", "blackbird", "singing", "in", "the", "dead", "of", "night", "take", "those", "broken", "wings", "and", "learn", "to", "fly"],
			items2: ["Tauka", "is", "awesome", "many", "use", "cases", "can", "be", "found", "blackbird", "singing", "in", "the", "dead", "of", "night", "take", "those", "broken", "wings", "and", "learn", "to", "fly"],
			items3: ["Tauka", "is", "awesome", "many", "use", "cases", "can", "be", "found", "blackbird", "singing", "in", "the", "dead", "of", "night", "take", "those", "broken", "wings", "and", "learn", "to", "fly"],
		}
	}

	componentDidMount() {
		const el = document.getElementById('rubaxa');
		Sortable.create(el, {
			animation: 150,
			scroll: false,
			scrollSensitivity: 1
		});

		sortable('#html5sortable');
	}
	

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items3: arrayMove(this.state.items3, oldIndex, newIndex),
		});
	};

	render() {
		return (
			<div className="wrapper">
				<div className="lib">
						<h2> Rubaxa </h2>
						<div className="outerscroll">
							<div className="scroll">
								<div className="sortable-hoc">
									<RubaxaList items={this.state.items1} />
								</div>
							</div>
						</div>
				</div>
				<div className="lib">
						<h2> HTML5Sortable </h2>
						<div className="outerscroll">
							<div className="scroll">
								<div className="sortable-hoc">
									<Html5SortableList items={this.state.items2}/>
								</div>
							</div>
						</div>
				</div>
				<div className="lib">
					<h2> Sortable HOC </h2>
					<div className="outerscroll">
						<div className="scroll">
							<div className="sortable-hoc">
								<SortableList lockOffset="50%" items={this.state.items3} onSortEnd={this.onSortEnd} axis="xy" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
