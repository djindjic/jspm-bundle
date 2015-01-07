/* */ 
"format cjs";
!function(WRAPPER, ENTRIES, FN, I){
  function fixIteratorPrototype(Constructor){
    if(Constructor && SYMBOL_ITERATOR in Constructor[PROTOTYPE]){
      getPrototypeOf(new Constructor()[SYMBOL_ITERATOR]()).__proto__ = IteratorPrototype;
    }
  }
  if(SYMBOL_ITERATOR in ArrayProto){
    var proto = getPrototypeOf(getPrototypeOf([][SYMBOL_ITERATOR]()));
    if(proto == ObjectProto){
      fixIteratorPrototype(Array);
      fixIteratorPrototype(Set);
      fixIteratorPrototype(Map);
      fixIteratorPrototype(String);
    } else IteratorPrototype = proto;
  }
  
  function setFrom(Constructor){
    if(Constructor)hidden(Constructor, 'from', function(iterable){
      return new Constructor(iterable);
    });
  }
  setFrom(Map);
  setFrom(Set);
  setFrom(WeakMap);
  setFrom(WeakSet);
  setFrom(Dict);
  hidden(String, 'from', function(iterable){
    return Array.from(iterable).join('');
  });
  
  function Iterator(iterable){
    if(!isIterable(iterable) && 'next' in iterable)return new WrapperIterator(iterable);
    var iterator = getIterator(iterable);
    return iterator instanceof Iterator ? iterator : new WrapperIterator(iterator);
  }
  Iterator[PROTOTYPE] = IteratorPrototype;
  
  function WrapperIterator(iterator){
    this[ITER] = iterator;
  }
  createIterator(WrapperIterator, WRAPPER, function(){
    return this[ITER].next();
  })
  setIterator(WrapperIterator[PROTOTYPE], function(){
    return this[ITER]; // unwrap
  });
  
  function MapIterator(iterator, fn, that, entries){
    this[ITER]    = getIterator(iterator);
    this[ENTRIES] = entries;
    this[FN]      = ctx(fn, that, entries ? 2 : 1);
  };
  createIterator(MapIterator, WRAPPER, function(){
    var step = this[ITER].next();
    return step.done ? step : iterResult(0, stepCall(this[FN], step.value, this[ENTRIES]));
  });
  
  function FilterIterator(iterator, fn, that, entries){
    this[ITER]    = getIterator(iterator);
    this[ENTRIES] = entries;
    this[FN]      = ctx(fn, that, entries ? 2 : 1);
  };
  createIterator(FilterIterator, WRAPPER, function(){
    for(;;){
      var step = this[ITER].next();
      if(step.done || stepCall(this[FN], step.value, this[ENTRIES]))return step;
    }
  });
  
  function SkipIterator(iterator, i){
    this[ITER] = getIterator(iterator);
    this[I] = toLength(i);
  };
  createIterator(SkipIterator, WRAPPER, function(){
    for(;;){
      var step = this[ITER].next();
      if(step.done || !this[I] || !this[I]--)return step;
    }
  });
  
  function LimitIterator(iterator, i){
    this[ITER] = getIterator(iterator);
    this[I] = toLength(i);
  };
  createIterator(LimitIterator, WRAPPER, function(){
    return --this[I] < 0 ? iterResult(1) : this[ITER].next();
  });
  
  assignHidden(IteratorPrototype, {
    to: function(to){
      return to.from(this);
    },
    limit: function(i){
      return new LimitIterator(this, i);
    },
    skip: function(i){
      return new SkipIterator(this, i);
    },
    filter: function(fn, that){
      return new FilterIterator(this, fn, that, false);
    },
    filterPairs: function(fn, that){
      return new FilterIterator(this, fn, that, true);
    },
    map: function(fn, that){
      return new MapIterator(this, fn, that, false);
    },
    mapPairs: function(fn, that){
      return new MapIterator(this, fn, that, true);
    },
    forEach: function(fn, that){
      forOf(this, false, fn, that);
    },
    forEachPairs: function(fn, that){
      forOf(this, true, fn, that);
    }
  });
  
  $define(GLOBAL + FORCED, {Iterator: Iterator});
}('Wrapper', safeSymbol('entries'), safeSymbol('fn'), safeSymbol('i'));