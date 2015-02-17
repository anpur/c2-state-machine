# State Machine 
State Machine behavior plugin for Construct 2

## Features
With given functions you can decouple events which changes your object state and logic, how you object reacts on those changes.

You can have several state machines per object, e.g. *Mood* ('sleeping', 'patrolling', 'fighting') and *Weapon* ('ready', 'aiming', 'firing', 'reloading').
Events on specific state transitions can help you build animation more easily. 
*For example: On `Moster.Mood` transition from `sleep` to `attack` set animation 'attack from lair'.*

ACEs and properties:
- **In state** condition: checks that machine in particular state.
- **On state change** trigger: occurs when state changed.
- **On state entering** trigger: occurs when entering particular state.
- **On state leaving** trigger: occurs when leaving particular state.
- **On state transition** trigger: occurs on transition from one particular state to another.
- **Set state** action: set current state.
- **State** expression: returns current state.
- **Previous state** expression: return previous state.
- **Initial state** property: to set initial state of machine.
- **Ignore same** property: ignores attempts to set same state as current.

## Project state
- Code: **READY**
- Example: under development

## Installation
1. Download `anpur-state-machine.c2addon` file
2. Drag it onto your Contruct 2 window
3. Agree and restart C2
