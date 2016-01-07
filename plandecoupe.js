var app = angular.module('plandecoupe', []);

var offset=10;
var mult=10;

app.controller('Config', function($scope) {
  var PdC = $scope;
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

  PdC.addPiece = function() {
    PdC.pieces.push({uid:_.uniqueId(), name:"Aucun nom", width:10, height:10, count:1});      
    updatePieces(PdC.pieces);
  };

  PdC.removePiece = function(idx) {
    PdC.pieces.splice(idx,1);
  }; 

  PdC.changePiece = function() {
    console.log("change piece");
    updatePieces(PdC.pieces);
  }

  PdC.changeConfig = function() {
    console.log("change config");
    updateConfig(PdC.config);
  }

  PdC.placeAll = function() {
    fit(PdC);
  }

  PdC.updateDescription = function() {
    var d = "Plan De Coupe";
    d+=PdC.pieces.toString();
    PdC.description=d;  
  };

  initDrawing(PdC);
  updateConfig(PdC.config);
  updatePieces(PdC.pieces);

});

function initDrawing(PdC) {
  var canvas = document.getElementById('canvas');
  var f = window.f = new Lassalle.Flow(canvas);
  // Create the PlanDeCoupe shape
  f.nodeModel.shapeFamily = "rectangle";
  f.gridDraw = true;
  f.gridSnap = false;
  f.gridSizeX = 10;
  f.gridSizeY = 10;
  f.canDrawLink = false;
  f.canSizeNode = false;
  f.canDrawNode = false;
  f.nodeModel.textLineHeight=12;
  f.handleSize=0;
  document.addEventListener("selectionChange", function(e) {
    if(e.item && f.isNode(e.item))
      if(e.item.isPiece) {
        //f.bringToFront();
        f.selectedNode=e.item;
      } else {
        //f.sendToBack();
        f.selectedNode=undefined;        
      }
  }, false);
  canvas.addEventListener("dblclick", function(e) {
    if(f.selectedNode) {
      f.selectedNode.lock = !f.selectedNode.lock;
      updatePieces(PdC.pieces);
    }
  });
  canvas.addEventListener("mouseup", function(e) {
    setTimeout(function() {
      if(PdC.config.snap)
        snap(PdC,f.selectedNode);

    },200);
  });
  canvas.addEventListener("touchend", function(e) {
    setTimeout(function() {
      if(PdC.config.snap)
        snap(PdC,f.selectedNode);

    },200);
  });
} 

function updateConfig(config) {
  /*if(!config.view) {
    config.view = f.addNode(offset, offset, config.width*mult,config.height*mult);
    config.view.isSelectable=false;
    config.view.isXMoveable=false;
    config.view.isYMoveable=false;

    config.view.fillStyle = "rgba(10,10,40,0.1)";
    config.view.gradientFillStyle = "rgba(40,10,10,0.1)";

  } else {
    config.view.setWidth(config.width*mult);
    config.view.setHeight(config.height*mult);
  }*/
  config.view={x:offset, y:offset, w:config.width*mult, h:config.height*mult};
  f.addNode(offset, offset, config.width*mult,0);
  f.addNode(offset, offset, 0,config.height*mult);
  f.addNode(offset+config.width*mult, offset, 0, config.height*mult);
  f.addNode(offset, offset+config.height*mult, config.width*mult,0);
  if(config.zoom == "Fit") {
    f.zoomRectangle(0, 0, f.getXExtent(), f.getYExtent());
  }
  else 
    f.zoom = parseFloat(config.zoom);
  f.refresh();
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
        var d = Math.pow(v1["x"+s1[0]]-v2["x"+s2[0]], 2) + Math.pow(v1["x"+s1[1]]-v2["x"+s2[1]], 2)
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
  s.xtop = s.y;
  s.xleft = s.x;
  s.xbottom = s.xtop+s.h;
  s.xright = s.xleft+s.w;

  pieces.forEach(function(piece) {
    piece.view.forEach(function(view) {
      if(view==s) return ; // don't match the same shape
      view.xtop = view.y;
      view.xleft = view.x;
      view.xbottom = view.xtop+view.h;
      view.xright = view.xleft+view.w;
      var d = distance(view, s, "outer");
      if(d && d[2]<dbest) {
        best=d;
        dbest=d[2];
        best.push(view);
      }
    });
  });
  [plans.view].forEach(function(view) {
    view.xtop = view.y;
    view.xleft = view.x;
    view.xbottom = view.xtop+view.h;
    view.xright = view.xleft+view.w;
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
      case "left:left":  s.setLeft(bestView.xleft); break;
      case "left:right":  s.setLeft(bestView.xleft-s.w); break;
      case "right:left":  s.setLeft(bestView.xright); break;
      case "right:right":  s.setLeft(bestView.xright-s.w); break;          
    }
    switch(at[0]+":"+to[0]) {
      case "top:top":  s.setTop(bestView.xtop); break;
      case "top:bottom":  s.setTop(bestView.xtop-s.h); break;
      case "bottom:top":  s.setTop(bestView.xbottom); break;
      case "bottom:bottom":  s.setTop(bestView.xbottom-s.h); break;          
    }
    console.log("Snapped item ",s.text,"to",s.x,"x", s.y);
  }  
}
function updatePieces(pieces) {
  // enumerate pieces
  pieces.forEach(updatePiece);
}

function updatePiece(p) {
    p.view = p.view || [];
    // remove extra items
    f.beginUpdate();
    var extranodes = p.view.splice(p.count);
    extranodes.forEach(function(n) { n.flow.removeNode(n);});
    // create missing items
    while(p.view.length<p.count) {
      p.view.push(f.addNode(offset, offset, p.width*mult, p.height*mult));
    }
    // update properties
    p.view.forEach(function(n, idx) {
      n.setWidth(p.width*mult);
      n.setHeight(p.height*mult);
      n.text=p.name+(p.view.length>1?("("+idx+")"):"");
      n.isPiece = true;
      if(n.lock) {
        n.fillStyle = "rgba(200,29,40,0.2)";
        n.gradientFillStyle = "rgba(219,429,40,0.2)";        
      } else {
        n.fillStyle = "rgba(19,29,40,0.2)";
        n.gradientFillStyle = "rgba(119,429,40,0.2)";
      }
    });
    f.endUpdate();    
    f.refresh();      
}


  
/*

function readConfig() {
  var cfg={pieces:[]};
  document.getElementById("cfg").value.split("\n").forEach(function(line){
    var asItem=line.split("=");
    if(asItem.length==2) {
      var dim=asItem[1].split("x");
      cfg.pieces.push({
        w:parseFloat(dim[0]),
        h:parseFloat(dim[1]),
        c:parseInt(dim[2]||1),
        n:asItem[0].replace(/\s/g,"")
      });
    }  else {
      var asCfg=line.split(":");
      if(asCfg.length==2) {
        cfg[asCfg[0].replace(/\s/g,"")]=asCfg[1].replace(/\s/g,"");
      }
    }
  });
  return cfg;
}
function run() {
  function d(l) { return l*10;};
  var cfg=readConfig();

  var canvas = document.getElementById('canvas');
  var f = new Lassalle.Flow(canvas);
  // Create the PlanDeCoupe shape
  var offset=10;
  f.nodeModel.shapeFamily = "rectangle";

  var realpieces_width = [];
  cfg.pieces.forEach(function(p) { 
    for(var i = 0; i<(p.c||1);i++) { realpieces_width.push(_.clone(p));}
  });
  realpieces_width.forEach(function(p,idx) { p.id=idx;});
  var realpieces_height = cloneArray(realpieces_width);

  var stats = cfg.direction=="h"?
    {d:"y", dw:"w"}:
    {d:"x", dw:"h"}
    ;
  var chunks = [{x:0, y:0, w:cfg.width,h:cfg.height}];
  realpieces_width.sort(function(a,b) {
    return b[stats.dw]-a[stats.dw];  
  });
  f.gridDraw = true;
  f.gridSnap = false;
  f.gridSizeX = 10;
  f.gridSizeY = 10;
  f.canDrawLink = false;
  f.canSizeNode = false;
  f.canDrawNode = false;
  f.nodeModel.textLineHeight=12;

  var fdraw = function draw(chunks, pieces) {
   f.clear();     
   f.beginUpdate(); 

   //f.addNode(d(offset), d(offset), d(w), d(200), "Plan de coupe");
   f.nodeModel.gradientFillStyle = f.nodeModel.fillStyle = 'yellow';
   f.nodeModel.lineWidth=0;
   chunks.forEach(function(p) {
     var n = f.addNode(d(offset+p.x), d(offset+p.y), d(p.w), d(p.h));            
   });
   f.nodeModel.gradientFillStyle = f.nodeModel.fillStyle = 'lightblue';
   f.nodeModel.lineWidth=0;
   pieces.forEach(function(p) {
     f.addNode(d(offset+p.x), d(offset+p.y), d(p.w), d(p.h), 
       p.n+"\r\n"+p.w+"x"+p.h+"\r\n"+p.x+","+p.y);  
   });       
   f.endUpdate();
   f.refresh();
  };

  var s = new Date().getTime();
  performPlacement(realpieces_width, chunks, stats, [],0, ">", fdraw);
  var e = new Date().getTime();
  log("Elapsed time: "+(e-s).toString()+"ms");

  function notempty(r) { return r.w && r.h;}

  function cloneArray(a) { return a.map(_.clone);}
  function addCnt(stats, current) {
    stats.count=(stats.count||0)+1;
    if((stats.count%10000) ==0) {
       console.log(stats.count,"placements tested",current);
    }       
    if(stats.count>10000000)
      stats.stop=true;
  }
  function shuffle(array) {
    var random = array.map(Math.random);
    array.sort(function(a, b) {
      return random[a] - random[b];
    });
  }

  function mergeChunks(chunks) {

  }

  function leastSize(piece, chunk, stats) {
     //return  - (chunk.w-piece.w) * (chunk.h-piece.h);
     return -chunk[stats.d];
  };

  function performPlacement(pieces, chunks, stats, placed, margin, current, cb) {
     // general algo is using the guillotine fit
     // http://clb.demon.fi/files/RectangleBinPack.pdf
     if(stats.stop) return;
     if(pieces.length==0) {
       addCnt(stats, current);
       if(!stats.bestmargin || stats.bestmargin>margin) {
         stats.bestmargin = margin;
         stats.placement = placed;
         stats.chunks=chunks;
         console.log("Found solution:",placed,stats.bestmargin);
         cb(chunks, placed);
       }
       return;
     }

     var previous={};
     for(var p=0;p<pieces.length;p++) {
       var piece=pieces[p];
       if(previous && piece.w == previous.w && piece.h == previous.h) {
        //console.log("duplicate case");
        continue; // already tested, duplicate piece.
       }
       previous=piece;
       var r=cloneArray(pieces);
       r.splice(p,1);
       var hasFitted=false;
       // find best chunk
       var best, bestidx;
       var alg=leastSize;
       for(var c=0;c<chunks.length;c++){
         var chunk=chunks[c], bestval=-1e30;
         if(chunk.w<piece.w || chunk.h<piece.h) {
           continue;
         } else if(chunk.w==piece.w || chunk.w==piece.h) {
           best=chunk;
           bestidx=c;
           break;
         } else if(chunk.w>=piece.w && chunk.h>=piece.h) {
           var ev = alg(piece,chunk,stats);
           if(ev>bestval) {
             bestval=ev;
             best=chunk;
             bestidx=c;
           }
         }
       }
       if(!best) {
         addCnt(stats, current);
         return;
       }                      
       hasFitted=true;
       piece.x=best.x;
       piece.y=best.y;
       var newmargin;
       if(stats.d=="y")
         newmargin=Math.max(margin, piece.y+piece.h);
       else
         newmargin=Math.max(margin, piece.x+piece.w);
       if(stats.bestmargin != undefined && newmargin>=stats.bestmargin) 
          continue; // no need to continue

       var placed2 = cloneArray(placed);
       placed2.push(_.clone(piece));
       // the piece fits
       var newchunks = cloneArray(chunks);
       newchunks.splice(bestidx,1);

       // remaining chunks
       var r1=[{x:best.x+piece.w,y:best.y,w:best.w-piece.w,h:best.h},
           {x:best.x,y:best.y+piece.h,w:piece.w,h:best.h-piece.h}];
       var r2=[{x:best.x+piece.w,y:best.y,w:best.w-piece.w,h:piece.h},
           {x:best.x,y:best.y+piece.h,w:best.w,h:best.h-piece.h}];
       r1=r1.filter(notempty);
       r2=r2.filter(notempty);
       var nc= newchunks.concat(r1);
       performPlacement(r,nc,stats, placed2, newmargin, current+"-"+piece.id+"("+nc.length+")",cb); 
       nc= newchunks.concat(r2);
       performPlacement(r,nc,stats, placed2, newmargin, current+"-"+piece.id+"("+nc.length+")",cb); 
     }                  
  }
}
function showAsImage() {
  var c=document.getElementById("canvas");
  var d=c.toDataURL("image/png");
  var w=window.open('about:blank','image from canvas');
  w.document.write("<img src='"+d+"' alt='from canvas'/>");      
}
function removeRow() {

}
function addPiece() {
  var t = document.getElementById("pieces");
  var row = t.insertRow(-1);
  row.uid = _.uniqueid();
  row.insertCell(0).innerHTML="<input style='width:100px' type='text'>";
  row.insertCell(1).innerHTML="<input style='width:50px' type='number'>";
  row.insertCell(2).innerHTML="<input style='width:50px' type='number'>";
  row.insertCell(3).innerHTML="<input style='width:50px' type='number'>";
  var r=document.createElement("button");
  r.addEventListener('click', function(e) {
    row.parentNode.removeChild(row);
  });
  r.innerText="-";     
  row.insertCell(4).appendChild(r);
  model.addPiece(row.uid);
}
function rowData(uid) {
  var rows = document.getElementById("pieces").rows
  for(var i = 0 ; i < rows.length ; i ++) {
    if(rows[i].uid==uid) {
      var row = rows[i], cells=row.cells, fields=["n","w","h","c"],
        res={};
      fields.forEach(function(n,idx) {
        res[n]=cells[idx].firstChild.value;
      });
      return res;
    }
  }
}      


function Model() {
  this.data = {};
}    
Model.addPiece = function(uid) {
  this.data[uid]=rowData(uid);

}
function init() {

}
*/