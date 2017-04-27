var app = angular.module('plandecoupe', []);

Raven.config('https://6932268a5e5049fe87a9f7479b5369a6@sentry.io/162361').install()

var offset=10;
var mult=10;

app.controller('Config', function($scope) {
  var PdC = $scope;
  PdC.plans = [];
  PdC.selectedPlan = "";
  
  PdC.pieces = [
    {uid:"d0", name:'D2', width:10, height:32, count:6},
    {uid:"d1", name:'Bande', width:32, height:32, count:1}];

  PdC.config = {
    width:62,
    height:260,
    direction:"h",
    zoom:"1",
    units:"i",
    snap:true,
    name:"plan de base"
  };
  PdC.descripion = "";

  PdC.selectConfig = function() {
    if(PdC.selectedPlan) {
      var rawplan = localStorage.getItem(PdC.selectedPlan);
      if(rawplan) {
        try{
          var plan = JSON.parse(rawplan);
          PdC.config = plan.config;
          PdC.pieces = plan.pieces;
          // Clear container contents
          container.innerHTML="";
          updateConfig(PdC.config, PdC.pieces);
          updatePieces(PdC.pieces);
        } catch(e) {
          console.error("Could not load plan", PdC.selectedPlan)
        }
      }
    }
  }

  PdC.save = function() {
    if(PdC.plans.indexOf(PdC.config.name)==-1)
      PdC.plans.push(PdC.config.name);
    localStorage.setItem("planList", JSON.stringify(PdC.plans));
    var items = {
      config:_.clone(PdC.config),
      pieces:PdC.pieces.map(_.clone)
    };
    delete items.config.view;
    items.pieces.forEach(function(p) { 
      if(p.view) {
        p.viewpos = p.view.map(function(v) { 
          v.updatePos(); 
          return {left:v.left, top:v.top};
        });
        delete p.view;
      }
    });
    localStorage.setItem(PdC.config.name, JSON.stringify( items ));
  }

  PdC.delete = function() {
    localStorage.removeItem(PdC.config.name);
    var idx = PdC.plans.indexOf(PdC.config.name);
    if(idx!=-1) {
      PdC.plans.splice(idx,1);
      localStorage.setItem("planList", JSON.stringify(PdC.plans));
    }
  }


  PdC.addPiece = function() {
    PdC.pieces.push({uid:_.uniqueId(), name:"Aucun nom", width:10, height:10, count:1});      
    updatePieces(PdC.pieces);
  };

  PdC.removePiece = function(idx) {
    var p = PdC.pieces.splice(idx,1)[0];
    p.view && p.view.forEach(function(n) { 
      n.parentNode.removeChild(n);
    });
    updatePieces(PdC.pieces);
  }; 

  PdC.changePiece = function() {
    console.log("change piece");
    updatePieces(PdC.pieces);
  }

  PdC.changeConfig = function() {
    console.log("change config");
    updateConfig(PdC.config, PdC.pieces);
  }

  PdC.placeAll = function() {
    fit(PdC);
  }

  PdC.updateDescription = function() {
    var d = "Plan De Coupe";
    d+=PdC.pieces.toString();
    PdC.description=d;  
  };

  // init plan list
  var rawplans = localStorage.getItem("planList");
  if(rawplans) {
    try{
      PdC.plans = JSON.parse(rawplans);
    } catch(e) {
      console.error("Could not load plans");
      PdC.plans = [];
    }
  }

  initDrawing(PdC);
  updateConfig(PdC.config, PdC.pieces);
  updatePieces(PdC.pieces);

});

function initDrawing(PdC) {
  var container = window.container = document.getElementById('container');
  container.addEventListener("mouseup", function(e) {
    if(e.target && e.target.isPiece && PdC.config.snap) {
      snap(PdC, e.target);
    }  
  });
  container.addEventListener("dblclick" ,function(e) {
    if(e.target && e.target.isPiece) {
      e.target.lock = !e.target.lock;
      updatePieces(PdC.pieces);
    }        
  });
} 

function createDiv(x,y,w,h,t) {
  var d = document.createElement("div");
  container.appendChild(d);
  d.style.position="absolute";
  d.setWidth = function(w) { d.style.width=""+w+"px";};
  d.setHeight = function(h) { d.style.height=""+h+"px"; d.style.lineHeight=""+h+"px";};
  d.setLeft = function(l) { d.style.left=""+l+"px";};
  d.setTop = function(t) { d.style.top=""+t+"px";};
  d.setText = function(t) { d.innerText=t;};
  d.setBackground = function(color) { 
    d.style.background =color;
  };
  d.updatePos = function() { 
    var jq= $(d), 
      p=jq.position(), 
      w= jq.width(),
      h=jq.height(),
      sx=jq.parent().scrollLeft(),
      sy=jq.parent().scrollTop();
    d.left=p.left+sx; 
    d.top=p.top+sy;
    d.width=w;
    d.height=h;
    d.bottom=d.top+d.height;
    d.right=d.left+d.width; 
    return d;
  }
  return d;
}

function createDraggableDiv(x,y,w,h,t) {
  var d = createDiv(x,y,w,h,t);
  $(d).draggable();
  return d;
}

function createPiece(x,y,w,h,t) {
  var d = createDraggableDiv(x,y,w,h,t);
  d.className+=" piece";
  return d;
}

function setInnerHtml(d,p) {
  d.innerHTML = ''+
//'<div style="left:0;right:0;top:10px;line-height:initial;">'+p.width+'</div>'+
  '<div class="bottom">'+p.width+'</div>'+
//'<div style="left:10px;top:0;bottom:0">'+p.height+'</div>'+
  '<div class="right">'+p.height+'</div>'+
  '<div class="content">'+d.text+'</div>';   
}


function updateConfig(config, pieces) {
  if(!config.view) {    
    config.view = createDiv();
    config.view.setBackground("rgba(250,200,200,0.8)")
  } 

  if(config.zoom != config.oldzoom) {
    var oldmult = mult;
    if(config.zoom == "Fit") {
      var hratio = $(container).width()/$(container)[0].scrollWidth;
      var vratio = $(container).height()/$(container)[0].scrollHeight;
      mult=10*Math.min(hratio,vratio);
    }
    else {    
      mult = 10*parseFloat(config.zoom);
    }

    // calculate oldzoom-newzoom ratio
    var growFactor =  oldmult?mult/oldmult:1;

    config.oldzoom= config.zoom;
    updatePieces(pieces, {growFactor:growFactor});
  }
  // flip width/height depending on direction
  config.view.setWidth(config.direction=="h"?config.width*mult:config.height*mult);
  config.view.setHeight(config.direction=="h"?config.height*mult:config.width*mult);

  var c=$(container);
  c.height(40+(config.direction=="h"?config.height*mult:config.width*mult));
  
}

function snap(PdC, node) {
  // implement snapping
  var s = node;
  if(!s) return;
  function distance(v1, v2, mode) {
    var snappoints=[];
    ["bottom", "top"].forEach(function(w) {
      ["right", "left"].forEach(function(h) {
        snappoints.push([w,h]);
      });
    });
    var best=1e30, ret;
    snappoints.forEach(function(s1) {
      snappoints.forEach(function(s2) {
        if(mode == "outer" && s1==s2) return; // not match with the same point
        if(mode == "inner" && s1!=s2) return; // not match with the same point
        var d = Math.pow(v1[s1[0]]-v2[s2[0]], 2) + Math.pow(v1[s1[1]]-v2[s2[1]], 2)
        if(d<best) {
          best=d;
          ret = [s1,s2,d];
        }
      })
    });
    return ret;
  }

  var pieces = PdC.pieces;
  var plans = PdC.config;
  var dbest=1e30, best;
  s.updatePos();

  pieces.forEach(function(piece) {
    piece.view.forEach(function(view) {
      if(view==s) return ; // don't match the same shape
      view.updatePos();
      var d = distance(view, s, "outer");
      if(d && d[2]<dbest) {
        best=d;
        dbest=d[2];
        best.push(view);
      }
    });
  });
  [plans.view].forEach(function(view) {
    view.updatePos();
    var d = distance(view, s, "inner");
    if(d && d[2]<dbest) {
      best=d;
      dbest=d[2];
      best.push(view);
    }
  });
  
  if(best) {
    // perform snapping
    var bestView = best[3], at = best[0], to=best[1];
    switch(at[1]+":"+to[1]) {
      case "left:left":  s.setLeft(bestView.left); break;
      case "left:right":  s.setLeft(bestView.left-s.width); break;
      case "right:left":  s.setLeft(bestView.right); break;
      case "right:right":  s.setLeft(bestView.right-s.width); break;          
    }
    switch(at[0]+":"+to[0]) {
      case "top:top":  s.setTop(bestView.top); break;
      case "top:bottom":  s.setTop(bestView.top-s.height); break;
      case "bottom:top":  s.setTop(bestView.bottom); break;
      case "bottom:bottom":  s.setTop(bestView.bottom-s.height); break;          
    }
    s.updatePos();
    console.log("Snapped item ",s.text,"to",s.left,"x", s.top);
  }  
}
function updatePieces(pieces, options) {
  // enumerate pieces
  pieces.forEach(function updatePiece(p) {
    p.view = p.view || [];
    // remove extra items
    var extranodes = p.view.splice(p.count);
    extranodes.forEach(function(n) { n.parentNode.removeChild(n);});
    // create missing items
    while(p.view.length<p.count) {
      var v = createPiece();
      if(p.viewpos) {
        var initialpos=p.viewpos[p.view.length];
        if(initialpos) {
          v.setLeft(initialpos.left);
          v.setTop(initialpos.top);
        }
      }
      p.view.push(v);
    }
    // update properties
    p.view.forEach(function(n, idx) {
      if(options && options.growFactor) {
        n.updatePos();
        n.setLeft(n.left*options.growFactor);
        n.setTop(n.top*options.growFactor);
      }

      n.setWidth(p.width*mult);
      n.setHeight(p.height*mult);
      n.text=p.name+(p.view.length>1?("("+(1+idx)+")"):"");      
      n.isPiece = true;
      setInnerHtml(n,p);
      if(n.lock) {
        n.setBackground("linear-gradient(135deg, rgba(200,29,40,0.5) 0%,rgba(219,21,31,0.2) 100%)");
      } else {
        n.setBackground("");
      }
    });
  });
}


  
