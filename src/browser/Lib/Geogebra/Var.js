import EaseFunc from './ease.js'

class Var {
  constructor(paramObj) { 
    this.letter = paramObj.letter;
    this.value = paramObj.value;

    if(typeof paramObj.min != 'undefined') { 
      this.min = paramObj.min;
    }
    else { 
      this.min = Number.MIN_VALUE;
    }

    if(typeof paramObj.max != 'undefined') { 
      this.max = paramObj.max;
    }
    else { 
      this.max = Number.MAX_VALUE;
    }

    store.dispatch({ 
      type: 'AddVar', 
      letter: this.letter,
      value: this.value,
    })

    this.status = 'active';
  } 

  get() { 
    return this.value;
  }

  set(val) { 
    
    
    if(val >= this.min && val <= this.max) { 
      
     this.value = val;

      store.dispatch({ 
        type: 'SetVar', 
        letter: this.letter, 
        value: this.value,
      })

    }
  }

  setNoDispatch(val) { 
    if(val >= this.min && val <= this.max) { 
     this.value = val;
    }
  }

  add(val) { 
    this.set(this.value + val);
  }


  easeAdd(increment, duration, easingFunction) { 
    var objVar = this;
    // Starting value
    var start = this.value;
    // Update frequency
    var freq = 100;
    // Loop over time periods
    var T1 = 0
    for(var T2 = 0; T2<=duration; T2 += freq) {
      setTimeout(function() { 
        var t = T1/duration;
        objVar.set(start + increment*EaseFunc[easingFunction](t) )
        T1 += freq;
      }, T2)
    }
  }


  easeTo(value, duration, easingFunction) { 
    this.easeAdd(value - this.value, duration, easingFunction);

  }

}

export default Var;

