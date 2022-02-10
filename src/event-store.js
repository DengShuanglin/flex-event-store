const EventBus = require("./event-bus");
const { isObject } = require("./utils");

class FlexEventStore {
  constructor(options) {
    if (!isObject(options.state)) {
      throw new TypeError("the state must be object type");
    }
    if (options.actions && isObject(options.actions)) {
      const values = Object.values(options.actions);
      for (const value of values) {
        if (typeof value !== "function") {
          throw new TypeError("the value of actions must be a function");
        }
      }
      this.actions = options.actions;
    }
    this.state = options.state;
    this._observe(options.state);
    this.event = new EventBus();
  }

  _observe(state) {
    const _this = this;
    Object.keys(state).forEach((key) => {
      let _value = state[key];
      Object.defineProperty(state, key, {
        get: function () {
          return _value;
        },
        set: function (newValue) {
          if (_value === newValue) return;
          _value = newValue;
          _this.event.emit(key, _value);
        },
      });
    });
  }

  onState(stateKey, stateCallback) {
    const keys = Object.keys(this.state);
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("then state does not contain your key");
    }

    this.event.on(stateKey, stateCallback);

    if (typeof stateCallback !== "function") {
      throw new TypeError("the event callback must be function type");
    }
    const value = this.state[stateKey];
    stateCallback.apply(this.state, [value]);
  }

  onStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state);
    const value = {};
    for (const theKey of stateKeys) {
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key");
      }
      this.eventV2.on(theKey, stateCallback);
      value[theKey] = this.state[theKey];
    }

    stateCallback.apply(this.state, [value]);
  }

  offState(stateKey, stateCallback) {
    this.event.off(stateKey, stateCallback);
  }

  offStates(stateKeys, stateCallback) {
    stateKeys.forEach((theKey) => {
      if (keys.indexOf(stateKey) === -1) {
        throw new Error("the state does not contain your key");
      }
      this.eventV2.off(theKey, stateCallback);
    });
  }

  setState(stateKey, stateValue) {
    this.state[stateKey] = stateValue;
  }

  dispatch(actionName, ...args) {
    if (typeof actionName !== "string") {
      throw new TypeError("the action name must be string type");
    }
    if (Object.keys(this.actions).indexOf(actionName) === -1) {
      throw new Error("this action name does not exist, please check it");
    }
    const actionFn = this.actions[actionName];
    actionFn.apply(this, [this.state, ...args]);
  }
}

module.exports = FlexEventStore;
