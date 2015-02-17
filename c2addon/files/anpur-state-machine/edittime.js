function GetBehaviorSettings()
{
	return {
		"name":			"State Machine",
		"id":			"AnpurStateMachine",	
		"version":		"1.0",
		"description":	"Keeps track of object states and emits events",
		"author":		"Anton Purin",
		"help url":		"https://github.com/anpur",
		"category":		"Attributes",			
		"flags":		0
	};
};

////////////////////////////////////////
// Conditions

AddStringParam('State', 'Name of current state.');
AddCondition(0,					
			cf_none,
			'In state',			
			'',			
			'In <b>{0}</b> state',	
			'Checks if object is in given state.',	
			'InMachineState');	

AddCondition(1,					
			cf_trigger,
			'On state change',			
			'',		
			'On {my} state change',	
			'Occurs when state changes.',	
			'OnStateChange');

AddStringParam('State', 'Name of new state.');
AddCondition(2,					
			cf_trigger,
			'On entering state',			
			'',		
			'Entering <b>{0}</b> state',	
			'Occurs when entering particular state. Use StateMachine.PrevState expression to check state which was left.',	
			'OnStateEntering');

AddStringParam('State', 'Name of left state.');
AddCondition(3,					
			cf_trigger,
			'On leaving machine state',			
			'',		
			'Leaving <b>{0}</b> state',	
			'Occurs when leaving particular state. Use StateMachine.State expression to check state which replaced old one.',	
			'OnStateLeaving');

AddStringParam('Prev state', 'Name of initial state.');
AddStringParam('State', 'Name of target state.');
AddCondition(4,					
			cf_trigger,
			'On state transition',			
			'',		
			'Transition from <b>{0}</b> to <b>{1}</b>',	
			'Occures when moving from one particular state to other.',	
			'OnStateTransition');

////////////////////////////////////////
// Actions

AddStringParam('State', 'Name of new state.');
AddAction(0,				
		 af_none,
		 'Set state',		
		 '',	
		 'Set state to <b>{0}</b>',
		 'Changes machine state',	
		 'SetState');

//////////////////////////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, 'State', 		 'Machine state', 'State',     'State of {my}');
AddExpression(0, ef_return_string, 'Previous state', 'Machine state', 'PrevState', 'Previous state of {my}');

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin

var property_list = [
		new cr.Property(ept_text, 'Initial state', 'new', 'Initial state of machine.'),
		new cr.Property(ept_combo, 'Ignore same', 'Yes', 'Ignores transition to same state as current.', 'No|Yes'), 
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of the behavior in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
