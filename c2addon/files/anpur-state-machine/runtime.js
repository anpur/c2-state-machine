// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.AnpurStateMachine = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var behaviorProto = cr.behaviors.AnpurStateMachine.prototype;
		
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};
	
	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;
		this.runtime = type.runtime;
	};
	
	var behinstProto = behaviorProto.Instance.prototype;

	behinstProto.onCreate = function()
	{
		this.prevState = '';
		this.state = this.properties[0];
	};
	
	behinstProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	behinstProto.saveToJSON = function ()
	{
		return {			
			"state": this.state,
			"prevState": this.prevState,
			"ignoreSame": this.properties[1],
		};
	};
	
	// called when loading the full state of the game
	behinstProto.loadFromJSON = function (o)
	{
		this.state = o.state;
		this.prevState = o.prevState;
		this.ignoreSame = o.ignoreSame;
	};

	behinstProto.tick = function ()
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	behinstProto.getDebuggerValues = function (propsections)
	{
		propsections.push({
			"title": this.type.name,
			"properties": [
				{"name": "state", "value": this.state},
				{"name": "prevState", "value": this.prevState},
				{"name": "ignoreSame", "value": this.properties[1]},
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		if (name === "state")
			this.state = value;
		else if (name === "prevState")
			this.prevState = value;
		else if (name === "ignoreSame")
			this.properties[1] = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.InMachineState = function (state)
	{		
		return this.state == state;
	};
	
	Cnds.prototype.OnStateChange = function ()
	{
		return true;
	};
	
	Cnds.prototype.OnStateEntering = function (state)
	{		
		return this.state == state;
	};
	
	Cnds.prototype.OnStateLeaving = function (state)
	{
		return this.prevState == state;
	};
	
	Cnds.prototype.OnStateTransition = function (prevState, state)
	{
		return this.prevState == prevState && this.state == state;
	};
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.SetState = function (state)
	{
		if (state == this.state && this.properties[1] == 'Yes') return;
		
		this.prevState = this.state;
		this.state = state;
		this.runtime.trigger(cr.behaviors.AnpurStateMachine.prototype.cnds.OnStateLeaving, this.inst);	
		this.runtime.trigger(cr.behaviors.AnpurStateMachine.prototype.cnds.OnStateTransition, this.inst);			
		this.runtime.trigger(cr.behaviors.AnpurStateMachine.prototype.cnds.OnStateEntering, this.inst);
		this.runtime.trigger(cr.behaviors.AnpurStateMachine.prototype.cnds.OnStateChange, this.inst);
	};
		
	behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.State = function (ret)
	{
		ret.set_string(this.state);
	};
	
	Exps.prototype.PrevState = function (ret)
	{
		ret.set_string(this.prevState);
	};

	behaviorProto.exps = new Exps();	
}());