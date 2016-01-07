function fit(PdC) {
  var views = [];

  PdC.pieces.forEach(function(piece) {
    piece.view.forEach(function(view) {
      views.push(view);
    });
  });
  views.forEach(function(v) { v.placed = false;});
  var placed = views.filter(function(v) { return v.lock;});
  placed.forEach(function(v) { v.placed = true;});
  var remaining = views.length-placed.length;
  var d={
    "w":"h",
    "h":"w"
  }[PdC.config.direction];

  while(remaining!=0) {
    var t = treeline(placed, PdC.config), spot;
    for(var i = 0;i<t.length; i++) {
      // find best remaining piece fitting this spot
      spot = t[i];
      var candidate=undefined, remain=1e30;
      views.forEach(function(v) {
        if(!v.placed && v[d]<=spot.size) {
          var rem = spot.size - v[d];
          if(rem<remain) {
            candidate = v;
          }
        }
      });
      if(candidate) {
        console.log("Placing ",candidate.text,"to",spot.left,"x",spot.top);
        candidate.setLeft(spot.left);
        candidate.setTop(spot.top);
        candidate.placed=true;
        placed.push(candidate);
        remaining--;
        break;
      }
    }
  }
  f.refresh();
}

function treeline(views, config) {
  views.forEach(function(v) {
    v.left=v.x;
    v.top = v.y;
    v.right=v.x+v.w;
    v.bottom = v.y+v.h;
  });

  var spots=config.direction=="h" ?
    [{left:config.view.x, right:config.view.y+config.view.w, top:config.view.y, size:config.view.w}]:[];
  views.forEach(function(v) {
    if(config.direction=="h") {
      var newspots=[];
      for(var s=0;s<spots.length;s++) {
        var spot=spots[s];
        if(spot.top>v.bottom) {newspots.push(spot); continue;} // spot is below anyway
        if(spot.left>=v.right || spot.right <=v.left) {newspots.push(spot); continue;} // not affected
        if(spot.left<v.left) {
          newspots.push({left:spot.left, top:spot.top, right:v.left, size:v.left-spot.left});
        } 
        if(spot.right>v.right) {
          newspots.push({left:v.right, top:spot.top, right:spot.right, size:spot.right-v.right});
        }
        var ns = {left:Math.max(v.left, spot.left), top:v.bottom, right:Math.min(v.right, spot.right)};
        ns.size=ns.right-ns.left;
        newspots.push(ns);
      }
      spots=newspots;
    } else {
      // todo
    }
  });
  // merge similar sports (same top)
  spots.sort(function(a,b) { return a.left-b.left;});
  var merged = [], s=1, prev=spots[0];
  while(s<spots.length) {
    var n=spots[s];
    if(n.top==prev.top) {
      prev.right=n.right;
      prev.size+=n.size;
    } else {
      merged.push(prev);
      prev=n;
    }
    s++;
  }
  merged.push(prev);
  spots=merged;
  spots.sort(function(a,b) { return a.top-b.top});
  var mx= 0;spots.forEach(function(s){ mx+=s.size;});
  console.log("Spots width:", mx);
  return spots;
}

