function fit(PdC) {
  var views = [];

  PdC.pieces.forEach(function(piece) {
    piece.view.forEach(function(view) {
      views.push(view);
    });
  });
  views.forEach(function(v) { v.placed = false; v.updatePos();});
  var placed = views.filter(function(v) { return v.lock;});
  placed.forEach(function(v) { v.placed = true;});
  var remaining = views.length-placed.length;
  var d={
    "w":"height",
    "h":"width"
  }[PdC.config.direction];

  while(remaining!=0) {
    var t = treeline(placed, PdC.config), spot;
    var candidate;
    for(var i = 0;i<t.length; i++) {
      // find best remaining piece fitting this spot
      spot = t[i];
      candidate=undefined, remain=1e30;
      views.forEach(function(v) {
        if(!v.placed && v[d]<=spot.size) {
          var rem = spot.size - v[d];
          if(rem<remain) {
            candidate = v;
          }
        }
      });
      if(candidate) {
        if(PdC.config.direction=="h") {
          candidate.setLeft(spot.min);
          candidate.setTop(spot.level);
        } else {
          candidate.setLeft(spot.level);
          candidate.setTop(spot.min);          
        }
        console.log("Placing ",candidate.innerText,"to",spot);
        candidate.placed=true;
        placed.push(candidate);
        remaining--;
        break;
      } 
    }
    if(!candidate) {
      // no piece placed with the current treeline, that's bad
      console.warn("Could not place remaining pieces");
      break;
    }
  }
}

function treeline(views, config) {
  views.forEach(function(v) {
    v.updatePos();
  });

  config.view.updatePos();
  var spots=config.direction =="h" ?
    [{min:config.view.left, max:config.view.left+config.view.width, level:config.view.top, size:config.view.width}]:
    [{min:config.view.top, max:config.view.bottom, level:config.view.left, size:config.view.height}];
  views.forEach(function(v) {
    var min="left", max="right", level="bottom"; 
    if(config.direction=="h") { 
    } else {
       min="top"; max="bottom"; level="right"; 
    }
    var newspots=[];
    for(var s=0;s<spots.length;s++) {
      var spot=spots[s];
      if(spot.level>v[level]) {newspots.push(spot); continue;} // spot is below anyway
      if(spot.min>=v[max] || spot.max <=v[min]) {newspots.push(spot); continue;} // not affected
      if(spot.min<v[min]) {
        newspots.push({min:spot.min, level:spot.level, max:v[min], size:v[min]-spot.min});
      } 
      if(spot.max>v[max]) {
        newspots.push({min:v[max], level:spot.level, max:spot.max, size:spot.max-v[max]});
      }
      var ns = {min:Math.max(v[min], spot.min), level:v[level], max:Math.min(v[max], spot.max)};
      ns.size=ns.max-ns.min;
      newspots.push(ns);
    }
    spots=newspots;
  });
  // merge similar sports (same top)
  spots.sort(function(a,b) { return a.min-b.min;});
  var merged = [], s=1, prev=spots[0];
  while(s<spots.length) {
    var n=spots[s];
    if(n.level==prev.level) {
      prev.max=n.max;
      prev.size+=n.size;
    } else {
      merged.push(prev);
      prev=n;
    }
    s++;
  }
  merged.push(prev);
  spots=merged;
  spots.sort(function(a,b) { return a.level-b.level});  
  var mx= 0;spots.forEach(function(s){ mx+=s.size;});
  console.log("Spots width:", mx);

  // spots at the level x can be merged with all the contiguous previous level spots
  // Still a todo
  return spots;
}

