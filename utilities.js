/*
function log(txt) {
  var r = document.createElement("p");
  r.innerText=txt;
  document.body.appendChild(r);
}
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