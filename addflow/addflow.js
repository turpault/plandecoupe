/* AddFlow for HTML5
   v1.2.1.2 - September 12, 2015
   Copyright (c) 2012-2015 Lassalle Technologies. All rights reserved.
   http://www.lassalle.com
   Author: Patrick Lassalle mailto:plassalle@lassalle.com 
   If you do not own a commercial license, this file shall be governed by the license 
   agreement that can be found at: http://www.lassalle.com/html5/license_evaluation.pdf
   If you own a commercial license, this file shall be governed by the license 
   agreement that can be found at: http://www.lassalle.com/html5/license_commercial.pdf
   */

var Lassalle = {
    Flow: function(canvas) {
        var na, bM, aJ, dp, nc, lG, gm, bw, bP, bQ, fB, gv, hw, gz, gX, ed, bO, bs, eU, lA, az, cu, aI, au, ds, dY, ac, aj, bX, bB, cQ, aR, origin, eH, fg, mK, ax, bn, ey, ii, jo, by, dK, eN, fv, en, dZ, fN, ef, fj, fs, ek, er, eP, fp, dB, cj, an, dh, di, cT, df, dg, cg, dJ, cY, dc, fK, cp, cz, iF, bq, bF, Node, Link, aY, ec, hj, gC, it, hl, cq, hL, iK, eI, hO;
        bq = function(x, y, w, h) {
            this.left = x;
            this.top = y;
            this.width = w;
            this.height = h;
        };
        bq.prototype.gw = function() {
            return new bq(this.left, this.top, this.width, this.height);
        };
        bq.prototype.jp = function(rect) {
            return this.left === rect.left && this.top === rect.top && this.width === rect.width && this.height === rect.height;
        };
        bq.prototype.fb = function(rect) {
            return (this.left < rect.left + rect.width && this.left + this.width > rect.left && this.top < rect.top + rect.height && this.top + this.height > rect.top);
        };
        bq.prototype.bH = function(dx, dy) {
            return new bq(this.left - dx, this.top - dy, this.width + 2 * dx, this.height + 2 * dy);
        };
        bq.prototype.offset = function(dx, dy) {
            return new bq(this.left + dx, this.top + dy, this.width, this.height);
        };
        bq.prototype.jJ = function(rect) {
            var mA = this.gw();
            mA.bI(rect);
            return mA;
        };
        bq.prototype.bI = function(rect) {
            var right, bottom;
            right = Math.max(this.left + this.width, rect.left + rect.width);
            bottom = Math.max(this.top + this.height, rect.top + rect.height);
            this.left = Math.min(this.left, rect.left);
            this.top = Math.min(this.top, rect.top);
            this.width = right - this.left;
            this.height = bottom - this.top;
        };
        bq.prototype.af = function() {
            return {
                x: this.left + this.width / 2,
                y: this.top + this.height / 2
            };
        };
        bq.prototype.bf = function(pt) {
            return pt.x >= this.left && pt.x <= this.left + this.width && pt.y >= this.top && pt.y <= this.top + this.height;
        };
        bq.prototype.lK = function(mA) {
            return mA.left >= this.left && mA.left + mA.width <= this.left + this.width && mA.top >= this.top && mA.top + mA.height <= this.top + this.height;
        };
        bF = {
            lz: function(K, bu, ad, O, ah) {
                K.beginPath();
                K.moveTo(bu.x, bu.y);
                K.bezierCurveTo(ad.x, ad.y, O.x, O.y, ah.x, ah.y);
            },
            io: function(K, V) {
                var i;
                K.beginPath();
                K.moveTo(V[0].x, V[0].y);
                for (i = 1; i < V.length; i++) {
                    K.lineTo(V[i].x, V[i].y);
                }
            },
            kw: function(K, V, r) {
                var aM, A, B, n;
                n = V.length;
                K.beginPath();
                K.moveTo(V[0].x, V[0].y);
                for (aM = 0; aM < n - 2; aM++) {
                    A = bF.jK(V, aM, r);
                    B = bF.kS(V, aM, r);
                    if ((A.x === 0 && A.y === 0) || (B.x === 0 && B.y === 0)) {
                        K.lineTo(V[aM + 1].x, V[aM + 1].y);
                    } else {
                        K.lineTo(A.x, A.y);
                        K.bezierCurveTo(V[aM + 1].x, V[aM + 1].y, V[aM + 1].x, V[aM + 1].y, B.x, B.y);
                    }
                }
                K.lineTo(V[n - 1].x, V[n - 1].y);
            },
            eg: function(K, x, y, w, h) {
                var gN, fa, eQ, ej, fM, cI, dP;
                gN = 0.5522848;
                fa = (w / 2) * gN;
                eQ = (h / 2) * gN;
                ej = x + w;
                fM = y + h;
                cI = x + w / 2;
                dP = y + h / 2;
                K.beginPath();
                K.moveTo(x, dP);
                K.bezierCurveTo(x, dP - eQ, cI - fa, y, cI, y);
                K.bezierCurveTo(cI + fa, y, ej, dP - eQ, ej, dP);
                K.bezierCurveTo(ej, dP + eQ, cI + fa, fM, cI, fM);
                K.bezierCurveTo(cI - fa, fM, x, dP + eQ, x, dP);
                K.closePath();
            },
            cK: function(K, x, y, w, h) {
                K.beginPath();
                K.moveTo(x, y);
                K.lineTo(x + w, y);
                K.lineTo(x + w, y + h);
                K.lineTo(x, y + h);
                K.closePath();
            },
            hM: function(K, points) {
                var i;
                K.beginPath();
                K.moveTo(points[0].x, points[0].y);
                for (i = 1; i < points.length; i++) {
                    K.lineTo(points[i].x, points[i].y);
                }
                K.closePath();
            },
            fV: function(K, gG, x, y, gx, kO, iI) {
                var fu, i, dz, eG, aw, ga, ib, index, ea, maxHeight, maxWidth;
                ea = 0;
                maxHeight = 0;
                maxWidth = 0;
                gG = gG.replace(/(\r\n|\n\r|\r|\n)/g, '\n');
                fu = gG.split('\n');
                ga = function(dz) {
                    if (iI) {
                        K.fillText(dz, x, y + (gx * ea));
                    }
                    ea++;
                    eG = K.measureText(dz).width;
                    if (eG > maxWidth) {
                        maxWidth = eG;
                    }
                };
                for (i = 0; i < fu.length; i++) {
                    aw = fu[i].split(' ');
                    index = 1;
                    while (aw.length > 0 && index <= aw.length) {
                        dz = aw.slice(0, index).join(' ');
                        eG = K.measureText(dz).width;
                        if (eG > kO) {
                            if (index === 1) {
                                dz = aw.slice(0, 1).join(' ');
                                aw = aw.splice(1);
                            } else {
                                dz = aw.slice(0, index - 1).join(' ');
                                aw = aw.splice(index - 1);
                            }
                            ga(dz);
                            index = 1;
                        } else {
                            index++;
                        }
                    }
                    if (index > 0) {
                        ga(aw.join(' '));
                    }
                }
                ib = 1 / 4 * gx;
                maxHeight = gx * ea + (ea - 1) * ib;
                if (!iI) {
                    return {
                        height: maxHeight,
                        width: maxWidth
                    };
                }
            },
            jE: function(bu, ad, O, ah) {
                var be, x, y;
                be = 18 / (20 - 1);
                x = (1 - be) * (1 - be) * (1 - be) * bu.x + 3 * be * (1 - be) * (1 - be) * ad.x + 3 * be * be * (1 - be) * O.x + be * be * be * ah.x;
                y = (1 - be) * (1 - be) * (1 - be) * bu.y + 3 * be * (1 - be) * (1 - be) * ad.y + 3 * be * be * (1 - be) * O.y + be * be * be * ah.y;
                return {
                    x: x,
                    y: y
                };
            },
            hY: function(K, as) {
                var p;
                K.beginPath();
                K.moveTo(as[0][0], as[0][1]);
                for (p in as) {
                    if (p > 0) {
                        K.lineTo(as[p][0], as[p][1]);
                    }
                }
                K.lineTo(as[0][0], as[0][1]);
                K.fill();
                K.stroke();
            },
            ir: function(as, eL, fL) {
                var p, dj;
                dj = [];
                for (p in as) {
                    dj.push([as[p][0] + eL, as[p][1] + fL]);
                }
                return dj;
            },
            gM: function(as, dn) {
                var p, dj;
                dj = [];
                for (p in as) {
                    dj.push(bF.iZ(dn, as[p][0], as[p][1]));
                }
                return dj;
            },
            iZ: function(dn, x, y) {
                return [(x * Math.cos(dn)) - (y * Math.sin(dn)), (x * Math.sin(dn)) + (y * Math.cos(dn))];
            },
            kZ: function(points, bz) {
                var i, da;
                da = points.length;
                if (da === 2) {
                    bz.push(points[0]);
                    bz.push(points[1]);
                } else if (da === 3) {
                    bF.fr(bz, points[0], points[0], points[1], points[2]);
                    bF.fr(bz, points[0], points[1], points[2], points[2]);
                } else {
                    bF.fr(bz, points[0], points[0], points[1], points[2]);
                    for (i = 0; i < da - 3; i++) {
                        bF.fr(bz, points[i], points[i + 1], points[i + 2], points[i + 3]);
                    }
                    bF.fr(bz, points[da - 3], points[da - 2], points[da - 1], points[da - 1]);
                }
            },
            fr: function(bz, bu, ad, O, ah) {
                var i, be, pt, fC = 0.5, N = 10, gU = fC * (O.x - bu.x), hI = fC * (O.y - bu.y), gD = fC * (ah.x - ad.x), gb = fC * (ah.y - ad.y), mu = gU + gD + 2 * ad.x - 2 * O.x, kE = hI + gb + 2 * ad.y - 2 * O.y, kv = - 2 * gU - gD - 3 * ad.x + 3 * O.x, lO = - 2 * hI - gb - 3 * ad.y + 3 * O.y, kK = gU, kf = hI, jS = ad.x, le = ad.y;
                for (i = 0; i < N; i++) {
                    be = i / (N - 1);
                    pt = {
                        x: mu * be * be * be + kv * be * be + kK * be + jS,
                        y: kE * be * be * be + lO * be * be + kf * be + le
                    };
                    bz.push(pt);
                }
            },
            du: function(pt, bJ, aN) {
                var x, y, fo, eC;
                fo = Math.round(pt.x);
                eC = Math.round(pt.y);
                bJ = Math.round(bJ);
                aN = Math.round(aN);
                if (bJ > 0) {
                    x = fo%bJ;
                    if (x < bJ / 2) {
                        fo -= x;
                    } else {
                        fo += bJ - x;
                    }
                }
                if (aN > 0) {
                    y = eC%aN;
                    if (y < aN / 2) {
                        eC -= y;
                    } else {
                        eC += aN - y;
                    }
                }
                return {
                    x: fo,
                    y: eC
                };
            },
            gY: function(ad, O) {
                return {
                    x: (ad.x + O.x) / 2,
                    y: (ad.y + O.y) / 2
                };
            },
            aV: function(ad, O) {
                return new bq(Math.min(ad.x, O.x), Math.min(ad.y, O.y), Math.abs(O.x - ad.x), Math.abs(O.y - ad.y));
            },
            ia: function(mA, pt, center, angle) {
                var x, y, aQ, alpha, dx, dy, a, b, r, dC;
                a = mA.width / 2;
                b = mA.height / 2;
                if (a === 0 || b === 0) {
                    return center;
                }
                aQ = angle * (Math.PI / 180);
                pt.x -= center.x;
                pt.y -= center.y;
                if (aQ !== 0) {
                    x = pt.x;
                    y = pt.y;
                    pt.x = x * Math.cos(aQ) + y * Math.sin(aQ);
                    pt.y = x * Math.sin(aQ) - y * Math.cos(aQ);
                }
                alpha = Math.atan2(pt.y, - pt.x);
                dx = a * Math.sin(alpha);
                dy = b * Math.cos(alpha);
                r = (a * b) / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                dC = {
                    x: - r * Math.cos(alpha),
                    y: r * Math.sin(alpha)
                };
                if (aQ !== 0) {
                    x = dC.x;
                    y = dC.y;
                    dC.x = x * Math.cos(aQ) + y * Math.sin(aQ);
                    dC.y = x * Math.sin(aQ) - y * Math.cos(aQ);
                }
                pt.x += center.x;
                pt.y += center.y;
                dC.x += center.x;
                dC.y += center.y;
                return dC;
            },
            fm: function(V, pt, aW) {
                var i, cr, ez, aG, ad, O, mA, dx, dy, bV, gZ, eK, bU;
                gZ = {
                    x: 0,
                    y: 0
                };
                eK = 0;
                bU = V.length;
                for (i = 0; i < bU; i++) {
                    aG = {
                        x: 0,
                        y: 0
                    };
                    ad = V[i];
                    O = (i < bU - 1) ? V[i + 1] : V[0];
                    if (Math.abs(ad.x - O.x) < 0.0001) {
                        if (Math.abs(aW.x - pt.x) < 0.0001) {
                            continue;
                        } else {
                            cr = (pt.y - aW.y) / (pt.x - aW.x);
                            aG.x = ad.x;
                            aG.y = cr * (ad.x - aW.x) + aW.y;
                        }
                    } else {
                        ez = (O.y - ad.y) / (O.x - ad.x);
                        if (Math.abs(aW.x - pt.x) < 0.0001) {
                            aG.x = pt.x;
                            aG.y = ez * (pt.x - O.x) + O.y;
                        } else {
                            cr = (pt.y - aW.y) / (pt.x - aW.x);
                            if (Math.abs(cr - ez) < 0.0001) {
                                continue;
                            } else {
                                aG.x = - (O.y - ez * O.x - aW.y + cr * aW.x) / (ez - cr);
                                aG.y = cr * (aG.x - aW.x) + aW.y;
                            }
                        }
                    }
                    mA = bF.aV(ad, O);
                    mA.left -= 1;
                    mA.top -= 1;
                    mA.width += 2;
                    mA.height += 2;
                    if (mA.bf(aG)) {
                        dx = aG.x - pt.x;
                        dy = aG.y - pt.y;
                        bV = Math.pow(dx, 2) + Math.pow(dy, 2);
                        if (eK === 0 || bV < eK) {
                            eK = bV;
                            gZ = aG;
                        }
                    }
                }
                return gZ;
            },
            hU: function(mA, V) {
                V.push({
                    x: mA.left,
                    y: mA.top
                });
                V.push({
                    x: mA.left + mA.width,
                    y: mA.top
                });
                V.push({
                    x: mA.left + mA.width,
                    y: mA.top + mA.height
                });
                V.push({
                    x: mA.left,
                    y: mA.top + mA.height
                });
                return 4;
            },
            kV: function(V, bU, pt, jO) {
                var mA, distance, bL, i;
                distance = 100000000;
                bL = jO / 2;
                for (i = 0; i < bU - 1; i++) {
                    if (i === 0 || i === bU - 2) {
                        if (V[i].x === V[i + 1].x) {
                            if (pt.y < Math.min(V[i].y, V[i + 1].y) || pt.y > Math.max(V[i].y, V[i + 1].y)) {
                                continue;
                            }
                        } else if (V[i].y === V[i + 1].y) {
                            if (pt.x < Math.min(V[i].x, V[i + 1].x) || pt.x > Math.max(V[i].x, V[i + 1].x)) {
                                continue;
                            }
                        } else {
                            mA = bF.aV(V[i], V[i + 1]);
                            mA = mA.bH(bL, bL);
                            if (!mA.bf(pt)) {
                                continue;
                            }
                        }
                    }
                    distance = Math.min(distance, bF.hk(V[i], V[i + 1], pt));
                }
                return distance;
            },
            hk: function(A, B, M) {
                var bV, hu, gS, iz, hV, a, b, gB, gV, hA, eZ, P, dX, hD;
                hu = A.x - M.x;
                gS = A.y - M.y;
                iz = B.x - M.x;
                hV = B.y - M.y;
                a = B.x - A.x;
                b = B.y - A.y;
                gB = Math.pow(a, 2) + Math.pow(b, 2);
                gV = Math.pow(hu, 2) + Math.pow(gS, 2);
                hA = Math.pow(iz, 2) + Math.pow(hV, 2);
                eZ = Math.sqrt(gB);
                if (eZ < 1) {
                    bV = Math.sqrt(gV);
                    return bV;
                }
                bV = Math.abs(b * hu - a * gS) / eZ;
                P = {
                    x: M.x - (bV * b / eZ),
                    y: M.y + (bV * a / eZ)
                };
                dX = {
                    x: (B.x + A.x) / 2,
                    y: (B.y + A.y) / 2
                };
                hD = (P.x - dX.x) * (P.x - dX.x) + (P.y - dX.y) * (P.y - dX.y);
                if (hD > gB / 4) {
                    bV = Math.sqrt(Math.min(gV, hA));
                }
                return bV;
            },
            jK: function(V, aM, fH) {
                var dx, dy, bV, cos, sin, pt;
                pt = {
                    x: 0,
                    y: 0
                };
                dx = V[aM + 1].x - V[aM].x;
                dy = V[aM].y - V[aM + 1].y;
                bV = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (bV > 0) {
                    cos = dx / bV;
                    sin = dy / bV;
                    pt = {
                        x: V[aM + 1].x - fH * cos,
                        y: V[aM + 1].y + fH * sin
                    };
                }
                return pt;
            },
            kS: function(V, aM, fH) {
                var dx, dy, bV, cos, sin, pt;
                pt = {
                    x: 0,
                    y: 0
                };
                dx = V[aM + 2].x - V[aM + 1].x;
                dy = V[aM + 1].y - V[aM + 2].y;
                bV = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (bV > 0) {
                    cos = dx / bV;
                    sin = dy / bV;
                    return {
                        x: V[aM + 1].x + fH * cos,
                        y: V[aM + 1].y - fH * sin
                    };
                }
                return pt;
            },
            hb: function(bu, ad, O, ah, ao) {
                var be, x, y;
                for (be = 0.0; be < 1.0; be = be + 0.1) {
                    x = ((1 - be) * (1 - be) * (1 - be) * bu.x + 3 * be * (1 - be) * (1 - be) * ad.x + 3 * be * be * (1 - be) * O.x + be * be * be * ah.x);
                    y = ((1 - be) * (1 - be) * (1 - be) * bu.y + 3 * be * (1 - be) * (1 - be) * ad.y + 3 * be * be * (1 - be) * O.y + be * be * be * ah.y);
                    ao.push({
                        x: x,
                        y: y
                    });
                }
                ao.push(ah);
            },
            dH: function(cZ, de) {
                return Math.sqrt(Math.pow(de.x - cZ.x, 2) + Math.pow(de.y - cZ.y, 2));
            },
            kj: function(cl) {
                var dO, el, cb, ep, i;
                if (cl.length === 0) {
                    return null;
                }
                dO = cl[0][0];
                el = dO;
                cb = cl[0][1];
                ep = cb;
                for (i = 0; i < cl.length; i++) {
                    dO = Math.min(dO, cl[i][0]);
                    cb = Math.min(cb, cl[i][1]);
                    el = Math.max(el, cl[i][0]);
                    ep = Math.max(ep, cl[i][1]);
                }
                return new bq(dO, cb, el - dO, ep - cb);
            }
        };
        function jW() {
            var dE, dR, bo, bx, bh, al, ge;
            ge = this;
            function ic(ad, O, ah) {
                return ((ad.x === O.x && O.x === ah.x) || (ad.y === O.y && O.y === ah.y));
            };
            function lx(ao, V) {
                var L, A, B, dX, ad, O, ah, bm, i;
                if (V.length <= 2) {
                    return;
                }
                L = true;
                while (L) {
                    L = false;
                    for (i = 1; i < V.length - 1; i++) {
                        A = V[i - 1];
                        B = V[i];
                        dX = V[i + 1];
                        if ((A.y === B.y && B.y === dX.y) || (A.x === B.x && B.x === dX.x)) {
                            V.splice(i, 1);
                            L = true;
                            break;
                        }
                    }
                }
                for (i = 0; i < V.length; i++) {
                    ao.push(V[i]);
                }
                if (V.length === 2) {
                    ad = ao[0];
                    bm = ao[1];
                    if (ad.y === bm.y) {
                        O = {
                            x: ad.x + (bm.x - ad.x) / 2,
                            y: ad.y
                        };
                        ah = {
                            x: bm.x - (bm.x - ad.x) / 2,
                            y: bm.y
                        };
                    } else {
                        O = {
                            x: ad.x,
                            y: ad.y + (bm.y - ad.y) / 2
                        };
                        ah = {
                            x: bm.x,
                            y: bm.y - (bm.y - ad.y) / 2
                        };
                    }
                    ao.splice(1, 0, O);
                    ao.splice(2, 0, ah);
                }
            };
            function jt(mA, aO, bc) {
                mA = mA.bH( - 1, - 1);
                return mA.fb(bF.aV(aO, bc));
            };
            function ab(kp, jd, cW) {
                var i, result;
                result = true;
                for (i = 0; i < cW.length; i++) {
                    if (jt(cW[i], kp, jd)) {
                        result = false;
                        break;
                    }
                }
                return result;
            };
            function hc(pt, rect, orientation) {
                var fi;
                switch (orientation) {
                case 'left':
                    fi = {
                        x: rect.left,
                        y: pt.y
                    };
                    break;
                case 'top':
                    fi = {
                        x: pt.x,
                        y: rect.top
                    };
                    break;
                case 'right':
                    fi = {
                        x: rect.left + rect.width,
                        y: pt.y
                    };
                    break;
                case 'bottom':
                    fi = {
                        x: pt.x,
                        y: rect.top + rect.height
                    };
                    break;
                default:
                    break;
                }
                return fi;
            };
            function iP(cZ, de) {
                var result = 'none';
                if (cZ.x === de.x) {
                    if (cZ.y >= de.y) {
                        result = 'bottom';
                    } else {
                        result = 'top';
                    }
                } else if (cZ.y === de.y) {
                    if (cZ.x >= de.x) {
                        result = 'right';
                    } else {
                        result = 'left';
                    }
                }
                return result;
            };
            function iC(aq, pt) {
                var result, mA, dr, cX, gj, gk, min;
                mA = bN(aq);
                dr = Math.abs(pt.x - mA.left);
                cX = Math.abs(pt.x - (mA.left + mA.width));
                gj = Math.abs(pt.y - mA.top);
                gk = Math.abs(pt.y - (mA.top + mA.height));
                min = Math.min(Math.min(Math.min(dr, cX), gj), gk);
                if (min === dr) {
                    result = 'left';
                } else if (min === cX) {
                    result = 'right';
                } else if (min === gj) {
                    result = 'top';
                } else {
                    result = 'bottom';
                }
                return result;
            };
            function jD(orientation, mA) {
                switch (orientation) {
                case 'left':
                    bo = {
                        x: mA.left + mA.width,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top + mA.height
                    };
                    break;
                case 'top':
                    bo = {
                        x: mA.left,
                        y: mA.top + mA.height
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top + mA.height
                    };
                    break;
                case 'right':
                    bo = {
                        x: mA.left,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left,
                        y: mA.top + mA.height
                    };
                    break;
                case 'bottom':
                    bo = {
                        x: mA.left,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top
                    };
                    break;
                default:
                    break;
                }
            };
            function ho(orientation, mA) {
                switch (orientation) {
                case 'left':
                    bo = {
                        x: mA.left,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left,
                        y: mA.top + mA.height
                    };
                    break;
                case 'top':
                    bo = {
                        x: mA.left,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top
                    };
                    break;
                case 'right':
                    bo = {
                        x: mA.left + mA.width,
                        y: mA.top
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top + mA.height
                    };
                    break;
                case 'bottom':
                    bo = {
                        x: mA.left,
                        y: mA.top + mA.height
                    };
                    bx = {
                        x: mA.left + mA.width,
                        y: mA.top + mA.height
                    };
                    break;
                default:
                    break;
                }
            };
            function iU(bc, ak, aK, aP) {
                ho(dE, ak);
                if (aK.bf(bo)) {
                    aP = false;
                    return bx;
                }
                if (aK.bf(bx)) {
                    aP = true;
                    return bo;
                }
                if ((bF.dH(bo, bc) <= bF.dH(bx, bc))) {
                    aP = true;
                    return bo;
                } else {
                    aP = false;
                    return bx;
                }
            };
            function il(pt, bc, ak, aK) {
                var hW, gs;
                ho(dR, aK);
                bh = bo;
                al = bx;
                hW = ab(pt, bh, [ak, aK]);
                gs = ab(pt, al, [ak, aK]);
                if (hW) {
                    if (gs) {
                        if (aK.bf(bh)) {
                            return al;
                        }
                        if (aK.bf(al)) {
                            return bh;
                        }
                        if ((bF.dH(bh, bc) <= bF.dH(al, bc))) {
                            return bh;
                        } else {
                            return al;
                        }
                    } else {
                        return bh;
                    }
                } else {
                    if (gs) {
                        return al;
                    } else {
                        return {
                            x: undefined,
                            y: undefined
                        };
                    }
                }
            };
            function jl(pt, mA, cW) {
                if (ab(pt, {
                    x: mA.left,
                    y: mA.top
                }, cW)) {
                    return true;
                }
                if (ab(pt, {
                    x: mA.left + mA.width,
                    y: mA.top
                }, cW)) {
                    return true;
                }
                if (ab(pt, {
                    x: mA.left,
                    y: mA.top + mA.height
                }, cW)) {
                    return true;
                }
                if (ab(pt, {
                    x: mA.left + mA.width,
                    y: mA.top + mA.height
                }, cW)) {
                    return true;
                }
                return false;
            };
            function hm(aq, margin) {
                var mA = bN(aq);
                mA = mA.bH(margin, margin);
                return mA;
            };
            function lu(aO, bc, V, dm) {
                var ad = {
                    x: 0,
                    y: 0
                }, O = {
                    x: 0,
                    y: 0
                };
                switch (dE) {
                case 'left':
                    ad = {
                        x: aO.x + dm,
                        y: aO.y
                    };
                    break;
                case 'top':
                    ad = {
                        x: aO.x,
                        y: aO.y + dm
                    };
                    break;
                case 'right':
                    ad = {
                        x: aO.x - dm,
                        y: aO.y
                    };
                    break;
                case 'bottom':
                    ad = {
                        x: aO.x,
                        y: aO.y - dm
                    };
                    break;
                default:
                    break;
                }
                switch (dR) {
                case 'left':
                    O = {
                        x: bc.x + dm,
                        y: bc.y
                    };
                    break;
                case 'top':
                    O = {
                        x: bc.x,
                        y: bc.y + dm
                    };
                    break;
                case 'right':
                    O = {
                        x: bc.x - dm,
                        y: bc.y
                    };
                    break;
                case 'bottom':
                    O = {
                        x: bc.x,
                        y: bc.y - dm
                    };
                    break;
                default:
                    break;
                }
                V.splice(0, 0, ad);
                V.push(O);
            };
            function km(ao, cW) {
                var i, R, aM, ay, aS, hv, hF, bk, cut;
                bk = [];
                cut = 0;
                for (i = 0; i < ao.length; i++) {
                    if (i >= cut) {
                        for (aM = ao.length - 1; aM > i; aM--) {
                            if (ab(ao[i], ao[aM], cW)) {
                                cut = aM;
                                break;
                            }
                        }
                        bk.push(ao[i]);
                    }
                }
                for (R = 0; R < bk.length - 1; R++) {
                    if (bk[R].x !== bk[R + 1].x && bk[R].y !== bk[R + 1].y) {
                        if (R === 0) {
                            ay = dE;
                        } else {
                            ay = iP(bk[R], bk[R - 1]);
                        }
                        if (R === bk.length - 2) {
                            aS = dR;
                        } else {
                            aS = iP(bk[R + 1], bk[R + 2]);
                        }
                        if ((ay === 'left' || ay === 'right') && (aS === 'left' || aS === 'right')) {
                            hv = Math.min(bk[R].x, bk[R + 1].x) + Math.abs(bk[R].x - bk[R + 1].x) / 2;
                            bk.splice(R + 1, 0, {
                                x: hv,
                                y: bk[R].y
                            });
                            bk.splice(R + 2, 0, {
                                x: hv,
                                y: bk[R + 2].y
                            });
                            if (bk.length - 1 > R + 3) {
                                bk.splice(R + 3, 1);
                            }
                            return bk;
                        }
                        if ((ay === 'top' || ay === 'bottom') && (aS === 'top' || aS === 'bottom')) {
                            hF = Math.min(bk[R].y, bk[R + 1].y) + Math.abs(bk[R].y - bk[R + 1].y) / 2;
                            bk.splice(R + 1, 0, {
                                x: bk[R].x,
                                y: hF
                            });
                            bk.splice(R + 2, 0, {
                                x: bk[R + 2].x,
                                y: hF
                            });
                            if (bk.length - 1 > R + 3) {
                                bk.splice(R + 3, 1);
                            }
                            return bk;
                        }
                        if ((ay === 'left' || ay === 'right') && (aS === 'top' || aS === 'bottom')) {
                            bk.splice(R + 1, 0, {
                                x: bk[R + 1].x,
                                y: bk[R].y
                            });
                            return bk;
                        }
                        if ((ay === 'top' || ay === 'bottom') && (aS === 'left' || aS === 'right')) {
                            bk.splice(R + 1, 0, {
                                x: bk[R].x,
                                y: bk[R + 1].y
                            });
                            return bk;
                        }
                    }
                }
                return bk;
            };
            ge.lh = function(org, dst, pinOrg, pinDst, orthoMargin) {
                var aO, bc, ar, aP, n, fZ, ao, gn, gL, V = [], iS = false, ix = false, hT = null, ik = null, ak = hm(org, orthoMargin), aK = hm(dst, orthoMargin), bs = ak.af(), cU = aK.af();
                if (pinOrg === undefined || pinOrg === null || org.pins === null) {
                    iS = true;
                    hT = org.pins;
                    org.pins = [[0, 50], [50, 0], [100, 50], [50, 100]];
                    if (Math.abs(bs.x - cU.x) < Math.abs(bs.y - cU.y)) {
                        if (cU.y > bs.y) {
                            pinOrg = 3;
                        } else {
                            pinOrg = 1;
                        }
                    } else {
                        if (cU.x > bs.x) {
                            pinOrg = 2;
                        } else {
                            pinOrg = 0;
                        }
                    }
                }
                if (pinDst === undefined || pinDst === null || dst.pins === null) {
                    ix = true;
                    ik = dst.pins;
                    dst.pins = [[0, 50], [50, 0], [100, 50], [50, 100]];
                    if (Math.abs(bs.x - cU.x) < Math.abs(bs.y - cU.y)) {
                        if (bs.y < cU.y) {
                            pinDst = 1;
                        } else {
                            pinDst = 3;
                        }
                    } else {
                        if (bs.x < cU.x) {
                            pinDst = 0;
                        } else {
                            pinDst = 2;
                        }
                    }
                }
                aO = cB(org, pinOrg);
                dE = iC(org, aO);
                aO = hc(aO, ak, dE);
                bc = cB(dst, pinDst);
                dR = iC(dst, bc);
                bc = hc(bc, aK, dR);
                V.push(aO);
                ar = aO;
                if (!aK.bf(ar) && !ak.bf(bc)) {
                    while (true) {
                        if (ab(ar, bc, [ak, aK])) {
                            V.push(bc);
                            ar = bc;
                            break;
                        }
                        fZ = il(ar, bc, ak, aK);
                        if (fZ.x !== undefined) {
                            V.push(fZ);
                            V.push(bc);
                            ar = bc;
                            break;
                        }
                        if (ar === aO) {
                            n = iU(bc, ak, aK, aP);
                            V.push(n);
                            ar = n;
                            if (!jl(ar, aK, [ak])) {
                                jD(dE, ak);
                                if (aP) {
                                    V.push(bo);
                                    ar = bo;
                                } else {
                                    V.push(bx);
                                    ar = bx;
                                }
                                if (!jl(ar, aK, [ak])) {
                                    if (aP) {
                                        V.push(bx);
                                        ar = bx;
                                    } else {
                                        V.push(bo);
                                        ar = bo;
                                    }
                                }
                            }
                        } else {
                            ho(dR, aK);
                            bh = bo;
                            al = bx;
                            jD(dR, aK);
                            gn = ab(ar, bo, [ak, aK]);
                            gL = ab(ar, bx, [ak, aK]);
                            if (gn && gL) {
                                if (ak.bf(bo)) {
                                    V.push(bx);
                                    if (ak.bf(al)) {
                                        V.push(bo);
                                        V.push(bh);
                                    } else {
                                        V.push(al);
                                    }
                                    V.push(bc);
                                    ar = bc;
                                    break;
                                }
                                if (ak.bf(bx)) {
                                    V.push(bo);
                                    if (ak.bf(bh)) {
                                        V.push(bx);
                                        V.push(al);
                                    } else {
                                        V.push(bh);
                                    }
                                    V.push(bc);
                                    ar = bc;
                                    break;
                                }
                                if (bF.dH(bo, bc) <= bF.dH(bx, bc)) {
                                    V.push(bo);
                                    if (ak.bf(bh)) {
                                        V.push(bx);
                                        V.push(al);
                                    } else {
                                        V.push(bh);
                                    }
                                    V.push(bc);
                                    ar = bc;
                                    break;
                                } else {
                                    V.push(bx);
                                    if (ak.bf(al)) {
                                        V.push(bo);
                                        V.push(bh);
                                    } else {
                                        V.push(al);
                                    }
                                    V.push(bc);
                                    ar = bc;
                                    break;
                                }
                            } else if (gn) {
                                V.push(bo);
                                if (ak.bf(bh)) {
                                    V.push(bx);
                                    V.push(al);
                                } else {
                                    V.push(bh);
                                }
                                V.push(bc);
                                ar = bc;
                                break;
                            } else {
                                V.push(bx);
                                if (ak.bf(al)) {
                                    V.push(bo);
                                    V.push(bh);
                                } else {
                                    V.push(al);
                                }
                                V.push(bc);
                                ar = bc;
                                break;
                            }
                        }
                    }
                } else {
                    V.push(bc);
                }
                V = km(V, [ak, aK]);
                lu(aO, bc, V, orthoMargin);
                if (ix) {
                    dst.pins = ik;
                }
                if (iS) {
                    org.pins = hT;
                }
                ao = [];
                lx(ao, V);
                return ao;
            };
        };
        function ip(V) {
            var hB, i, pt, hE, length, fD, list, gg, hG, fO;
            hB = this;
            fD = null;
            list = [];
            gg = function(offset, ba) {
                var fR = this;
                fR.offset = offset;
                fR.ba = ba;
            };
            hG = function(ad, O) {
                return Math.sqrt(Math.pow(O.x - ad.x, 2) + Math.pow(O.y - ad.y, 2));
            };
            fO = function() {
                if (list.length < 2) {
                    return 0;
                }
                var iM = list[list.length - 1];
                return iM.offset;
            };
            for (i = 0; i < V.length; i++) {
                pt = V[i];
                if (list.length === 0) {
                    list.push(new gg(0, pt));
                } else {
                    hE = list[list.length - 1];
                    length = hG(pt, hE.ba);
                    list.push(new gg(hE.offset + length, pt));
                }
            }
            hB.jA = function(progress) {
                var ba, offset, ew, eO, eb, eY, hH, ad, O, eD, fJ, dx, dy, d;
                if (progress < 0 || progress > 1 || fO() === 0) {
                    return null;
                }
                offset = progress * fO();
                ew = 0;
                eO = list.length - 1;
                while (eO - ew > 1) {
                    eb = Math.floor((eO + ew) / 2);
                    if (offset < list[eb].offset) {
                        eO = eb;
                    } else {
                        ew = eb;
                    }
                }
                eY = list[ew];
                hH = list[eO];
                ad = eY.ba;
                O = hH.ba;
                eD = eY.offset;
                fJ = hH.offset;
                ba = {
                    x: ((fJ - offset) * ad.x + (offset - eD) * O.x) / (fJ - eD),
                    y: ((fJ - offset) * ad.y + (offset - eD) * O.y) / (fJ - eD)
                };
                dx = O.x - ad.x;
                dy = O.y - ad.y;
                d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                fD = {
                    x: dx / d,
                    y: dy / d
                };
                return ba;
            };
            hB.jZ = function() {
                return fD;
            };
        };
        var iE = {};
        iE.dU = function(x, y, w, h) {
            var fF;
            fF = function(x, y, w, h) {
                var aJ, cw, cd, dI, ck;
                aJ = [];
                cw = null;
                cd = null;
                dI = null;
                ck = null;
                return {
                    x: x,
                    y: y,
                    w: w,
                    h: h,
                    eB: function(dV, fA) {
                        var db, cn, ci, dw, i;
                        if (fA === undefined || fA === null || fA.width === 0 || fA.height === 0)
                            return;
                        db = new bq(x, y, w / 2, h / 2);
                        cn = new bq(x + w / 2, y, w / 2, h / 2);
                        ci = new bq(x, y + h / 2, w / 2, h / 2);
                        dw = new bq(x + w / 2, y + h / 2, w / 2, h / 2);
                        if (db.fb(fA) && cw !== null) {
                            cw.eB(dV, fA);
                        }
                        if (cn.fb(fA) && cd !== null) {
                            cd.eB(dV, fA);
                        }
                        if (ci.fb(fA) && dI !== null) {
                            dI.eB(dV, fA);
                        }
                        if (dw.fb(fA) && ck !== null) {
                            ck.eB(dV, fA);
                        }
                        for (i = 0; i < aJ.length; i++) {
                            if (aJ[i].fd.fb(fA)) {
                                dV.push(aJ[i]);
                            }
                        }
                    },
                    cs: function(aq, fA) {
                        var db, cn, ci, dw, eS, i;
                        db = new bq(x, y, w / 2, h / 2);
                        cn = new bq(x + w / 2, y, w / 2, h / 2);
                        ci = new bq(x, y + h / 2, w / 2, h / 2);
                        dw = new bq(x + w / 2, y + h / 2, w / 2, h / 2);
                        eS = null;
                        if (db.lK(fA)) {
                            if (cw === null) {
                                cw = new fF(db.left, db.top, db.width, db.height);
                            }
                            eS = cw;
                        } else if (cn.lK(fA)) {
                            if (cd === null) {
                                cd = new fF(cn.left, cn.top, cn.width, cn.height);
                            }
                            eS = cd;
                        } else if (ci.lK(fA)) {
                            if (dI === null) {
                                dI = new fF(ci.left, ci.top, ci.width, ci.height);
                            }
                            eS = dI;
                        } else if (dw.lK(fA)) {
                            if (ck === null) {
                                ck = new fF(dw.left, dw.top, dw.width, dw.height);
                            }
                            eS = ck;
                        }
                        if (eS !== null) {
                            return eS.cs(aq, fA);
                        } else {
                            aJ.push(aq);
                            aq.fF = this;
                        }
                    },
                    dS: function(aq) {
                        var aU, i;
                        aU = - 1;
                        if (aJ !== null) {
                            for (i = 0; i < aJ.length; i++) {
                                if (aJ[i] === aq) {
                                    aU = i;
                                    break;
                                }
                            }
                            aJ.splice(aU, 1);
                        }
                    },
                    ft: function() {
                        if (cw !== null) {
                            cw.ft();
                        }
                        if (cd !== null) {
                            cd.ft();
                        }
                        if (dI !== null) {
                            dI.ft();
                        }
                        if (ck !== null) {
                            ck.ft();
                        }
                        aJ.length = 0;
                    },
                };
            };
            return {
                fn: (function() {
                    return fF(x, y, w, h);
                }()),
                cs: function(aq, fd) {
                    this.fn.cs(aq, fd);
                },
                dS: function(aq) {
                    if (aq.fF !== null) {
                        aq.fF.dS(aq);
                    }
                },
                ev: function(fd) {
                    var result = [];
                    this.fn.eB(result, fd);
                    return result;
                },
                ft: function() {
                    this.fn.ft();
                }
            };
        };
        Node = function(x, y, w, h, text) {
            var cE = false, H = null, bA = [];
            this.kindOfItem = 'Node';
            this.index = - 1;
            this.flow = null;
            this.fd = null;
            this.fF = null;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.text = (text !== undefined) ? text : null;
            this.strokeStyle = '#000';
            this.fillStyle = '#fff';
            this.gradientFillStyle = '#fff';
            this.textFillStyle = '#000';
            this.lineWidth = 1.0;
            this.shapeFamily = 'ellipse';
            this.polygon = null;
            this.drawShape = null;
            this.fillShape = null;
            this.pins = null;
            this.isSelectable = true;
            this.isXSizeable = true;
            this.isYSizeable = true;
            this.isXMoveable = true;
            this.isYMoveable = true;
            this.isOutLinkable = true;
            this.isInLinkable = true;
            this.isContextHandle = false;
            this.isShadowed = false;
            this.image = null;
            this.textMargin = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            this.imageMargin = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            this.textPosition = 'centerMiddle';
            this.imagePosition = 'centerMiddle';
            this.font = '12px Arial';
            this.textLineHeight = null;
            this.getIsSelected = function() {
                return cE;
            };
            this.setIsSelected = function(es) {
                if (es !== cE) {
                    cE = es;
                    gP(this, eN);
                }
            };
            this.getLinks = function() {
                return bA;
            };
            this.getLeft = function() {
                return this.x;
            };
            this.setLeft = function(x) {
                var mA = bN(this);
                mA.left = x;
                cF(this, mA);
            };
            this.getTop = function() {
                return this.y;
            };
            this.setTop = function(y) {
                var mA = bN(this);
                mA.top = y;
                cF(this, mA);
            };
            this.getWidth = function() {
                return this.w;
            };
            this.setWidth = function(w) {
                var mA = bN(this);
                mA.width = w;
                cF(this, mA);
            };
            this.getHeight = function() {
                return this.h;
            };
            this.setHeight = function(h) {
                var mA = bN(this);
                mA.height = h;
                cF(this, mA);
            };
            this.refresh = function() {
                aF(this);
                ap();
            };
            this.clone = function() {
                var F = new Node(this.x, this.y, this.w, this.h, this.text);
                iJ(F, this);
                return F;
            };
        };
        Link = function(org, dst, text, pinOrg, pinDst) {
            var cE = false, H = null;
            this.kindOfItem = 'Link';
            this.index = - 1;
            this.flow = null;
            this.fd = null;
            this.fF = null;
            this.org = org;
            this.dst = dst;
            this.pinOrg = (pinOrg === undefined) ? null : pinOrg;
            this.pinDst = (pinDst === undefined) ? null : pinDst;
            this.font = '12px Arial';
            this.text = (text !== undefined) ? text : null;
            this.strokeStyle = '#000';
            this.fillStyle = '#fff';
            this.textFillStyle = '#000';
            this.lineWidth = 1.0;
            this.isStretchable = true;
            this.isSelectable = true;
            this.isContextHandle = false;
            this.isShadowed = false;
            this.isOrgPointAdjustable = false;
            this.isDstPointAdjustable = false;
            this.roundedCornerSize = 0;
            this.isOrientedText = false;
            this.isOpaque = false;
            this.font = '12px Arial';
            this.arrowDst = gm;
            this.arrowOrg = null;
            this.lineStyle = 'polyline';
            this.orthoMargin = 30;
            this.ij = false;
            this.points = [];
            this.getIsSelected = function() {
                return cE;
            };
            this.setIsSelected = function(es) {
                if (es !== cE) {
                    cE = es;
                    gP(this, eN);
                }
            };
            this.getOrg = function() {
                return this.org;
            };
            this.setOrg = function(org) {
                je(this, org);
            };
            this.getDst = function() {
                return this.dst;
            };
            this.setDst = function(dst) {
                jU(this, dst);
            };
            this.getPinOrg = function() {
                return this.pinOrg;
            };
            this.setPinOrg = function(pinOrg) {
                v(this, pinOrg);
            };
            this.getPinDst = function() {
                return this.pinDst;
            };
            this.setPinDst = function(pinDst) {
                aB(this, pinDst);
            };
            this.refresh = function() {
                bj(this);
                ap();
            };
            this.clone = function() {
                var J = new Link(this.org, this.dst, this.text, this.pinOrg, this.pinDst);
                iy(J, this);
                return J;
            };
            this.getLineStyle = function() {
                return this.lineStyle;
            };
            this.setLineStyle = function(lineStyle) {
                jg(this, lineStyle);
            };
            this.getIsOrgPointAdjustable = function() {
                return this.isOrgPointAdjustable;
            };
            this.setIsOrgPointAdjustable = function(adjustable) {
                mJ(this, adjustable);
            };
            this.getIsDstPointAdjustable = function() {
                return this.isDstPointAdjustable;
            };
            this.setIsDstPointAdjustable = function(adjustable) {
                mz(this, adjustable);
            };
            this.addPoint = function(x, y) {
                jM(this, x, y);
            };
            this.removePoint = function(index) {
                kn(this, index);
            };
            this.clearPoints = function() {
                jI(this);
            };
            this.countPoints = function() {
                return this.points.length;
            };
            this.getPoint = function(index) {
                return ll(this, index);
            };
            this.setPoint = function(x, y, index) {
                ie(this, x, y, index);
            };
        };
        aY = function() {
            this.aZ = null;
            this.group = - 1;
            this.cN = 'AF_none';
            this.code = 'AF_none';
        };
        ec = function(flow, aq, fS) {
            aY.call();
            var div, fe, fk, H;
            div = flow.canvas.parentNode;
            fe = 0;
            fk = 0;
            H = this;
            H.code = 'AF_nodeMoveAndSize';
            H.aZ = aq;
            if (div !== null && div !== undefined) {
                fe = div.scrollLeft;
                fk = div.scrollTop;
            }
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                var mA, fE, gK;
                fE = 0;
                gK = 0;
                if (div !== null && div !== undefined) {
                    fE = div.scrollLeft;
                    gK = div.scrollTop;
                }
                mA = bN(H.aZ);
                cF(H.aZ, fS);
                aF(H.aZ);
                fG(H.aZ);
                flow.refresh();
                fS = mA;
                if (div !== null && div !== undefined) {
                    div.scrollLeft = fe;
                    div.scrollTop = fk;
                    fe = fE;
                    fk = gK;
                }
            };
        };
        hj = function(flow, F) {
            var H, index;
            aY.call();
            H = this;
            H.aZ = F;
            H.code = 'AF_nodeAdd';
            H.redo = function() {
                aJ.push(F);
                F.index = aJ.length - 1;
                flow.refresh();
            };
            H.undo = function() {
                if (F.getIsSelected()) {
                    F.setIsSelected(false);
                }
                aF(F);
                index = F.index;
                dQ(index);
                bW();
                flow.refresh();
            };
        };
        gC = function(flow, F) {
            var H, index;
            aY.call();
            H = this;
            H.aZ = F;
            H.code = 'AF_nodeRemove';
            H.redo = function() {
                aF(F);
                index = F.index;
                dQ(index);
                bW();
                flow.refresh();
            };
            H.undo = function() {
                aJ.push(F);
                F.index = aJ.length - 1;
                aF(F);
                flow.refresh();
            };
        };
        it = function(flow, J) {
            var H, index;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_linkAdd';
            H.redo = function() {
                var org, dst;
                aJ.push(J);
                J.index = aJ.length - 1;
                bj(J);
                ee(bb(J));
                org = J.org;
                dst = J.dst;
                bY(org).push(J);
                bY(dst).push(J);
                flow.refresh();
            };
            H.undo = function() {
                if (J.getIsSelected()) {
                    J.setIsSelected(false);
                }
                index = J.index;
                dQ(index);
                J.setOrg(null);
                J.setDst(null);
                flow.refresh();
            };
        };
        hl = function(flow, J) {
            var H, index;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_linkRemove';
            H.redo = function() {
                if (J.getIsSelected()) {
                    J.setIsSelected(false);
                }
                index = J.index;
                dQ(index);
                J.setOrg(null);
                J.setDst(null);
                flow.refresh();
            };
            H.undo = function() {
                var org, dst;
                aJ.push(J);
                J.index = aJ.length - 1;
                bj(J);
                ee(bb(J));
                org = J.org;
                dst = J.dst;
                org.getLinks().push(J);
                dst.getLinks().push(J);
                flow.refresh();
            };
        };
        cq = function(flow, J) {
            aY.call();
            var H, ca, oldIsOrgPointAdjustable, oldIsDstPointAdjustable;
            H = this;
            ca = J.points.slice();
            oldIsOrgPointAdjustable = J.isOrgPointAdjustable;
            oldIsDstPointAdjustable = J.isDstPointAdjustable;
            H.aZ = J;
            H.code = 'AF_linkStretch';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                var bL, mA, V, isOrgPointAdjustable, isDstPointAdjustable;
                bL = J.lineWidth + flow.handleSize;
                mA = bb(J);
                mA = mA.bH(bL, bL);
                V = J.points.slice();
                J.points.splice(0, J.points.length);
                J.points = J.points.concat(ca);
                ca = V;
                isOrgPointAdjustable = J.isOrgPointAdjustable;
                isDstPointAdjustable = J.isDstPointAdjustable;
                J.setIsOrgPointAdjustable(oldIsOrgPointAdjustable);
                J.setIsDstPointAdjustable(oldIsDstPointAdjustable);
                oldIsOrgPointAdjustable = isOrgPointAdjustable;
                oldIsDstPointAdjustable = isDstPointAdjustable;
                bv(mA);
                bj(J);
                flow.refresh();
            };
        };
        hL = function(flow, J, dA) {
            var H, org;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_org';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                org = J.org;
                J.setOrg(dA);
                dA = org;
                flow.refresh();
            };
        };
        iK = function(flow, J, cJ) {
            var H, dst;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_dst';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                dst = J.dst;
                J.setDst(cJ);
                cJ = dst;
                flow.refresh();
            };
        };
        mW = function(flow, J, oldPinOrg) {
            var H, pinOrg;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_pinOrg';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                pinOrg = J.pinOrg;
                J.setPinOrg(oldPinOrg);
                oldPinOrg = pinOrg;
                flow.refresh();
            };
        };
        mL = function(flow, J, oldPinDst) {
            var H, pinDst;
            aY.call();
            H = this;
            H.aZ = J;
            H.code = 'AF_pinDst';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                pinDst = J.pinDst;
                J.setPinDst(oldPinDst);
                oldPinDst = pinDst;
                flow.refresh();
            };
        };
        eI = function(flow) {
            var H, gA;
            aY.call();
            H = this;
            gA = aJ.slice();
            H.code = 'AF_zOrder';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                var i, ha;
                ha = aJ.slice();
                aJ = gA.slice();
                gA = ha;
                flow.refresh();
                for (i = 0; i < aJ.length; i++) {
                    aJ[i].index = i;
                }
            };
        };
        hO = function(flow, J, gJ) {
            var H, ca;
            aY.call();
            H = this;
            ca = J.points.slice();
            H.aZ = J;
            H.code = 'AF_lineStyle';
            H.redo = function() {
                H.undo();
            };
            H.undo = function() {
                var bL, mA, V, lineStyle;
                bL = H.aZ.lineWidth + flow.handleSize;
                mA = bb(H.aZ);
                mA = mA.bH(bL, bL);
                lineStyle = H.aZ.lineStyle;
                V = H.aZ.points.slice();
                H.aZ.lineStyle = gJ;
                H.aZ.points.splice(0, H.aZ.points.length);
                H.aZ.points = J.points.concat(ca);
                gJ = lineStyle;
                ca = V;
                bv(mA);
                H.aZ.refresh();
            };
        };
        TaskManager = function() {
            var bE = [], index = - 1, bi = - 1, cN = 'AF_none', cL = false, eE = false, eT = false, aA = this;
            this.canUndoRedo = true;
            this.undoLimit = 0;
            this.skipUndo = false;
            this.undoCode = function() {
                return aA.eW() ? nv(bE[index]) : 'AF_none';
            };
            this.redoCode = function() {
                return aA.eV() ? nv(bE[index + 1]) : 'AF_none';
            };
            this.undoItem = function() {
                return aA.eW() ? bE[index].aZ : null;
            };
            this.redoItem = function() {
                return aA.mU() ? bE[index + 1].aZ : null;
            };
            this.canUndo = function() {
                return aA.eW();
            };
            this.canRedo = function() {
                return aA.eV();
            };
            this.undo = function() {
                iT();
            };
            this.redo = function() {
                kY();
            };
            this.beginAction = function(code) {
                kd(code);
            };
            this.endAction = function() {
                ki();
            };
            this.clear = function() {
                ft();
            };
            this.addToLastAction = function() {
                iv();
            };
            this.submitTask = function(aT) {
                aA.bG(aT);
            };
            this.removeLastTask = function() {
                kU();
            };
            this.mI = function() {
                return index + 1;
            };
            this.aL = function() {
                return aA.canUndoRedo && !aA.skipUndo && !eT;
            };
            this.eW = function() {
                return aA.canUndoRedo ? (index >= 0) : false;
            };
            this.eV = function() {
                return aA.canUndoRedo ? (index < bE.length - 1) : false;
            };
            this.dN = function(code) {
                if (!cL) {
                    eE = true;
                    bi++;
                    cN = code;
                }
            };
            this.cV = function() {
                if (!cL) {
                    eE = false;
                    cN = 'AF_none';
                }
            };
            this.fq = function() {
                return eE || cL;
            };
            this.bG = function(aT) {
                var g;
                if (aT === null) {
                    return;
                }
                index++;
                bE.splice(index, bE.length - 1 - index, aT);
                if (!aA.fq()) {
                    bi++;
                }
                aT.group = bi;
                aT.cN = cN;
                if (aA.undoLimit > 0) {
                    if (index >= aA.undoLimit) {
                        g = bE[0].group;
                        if (g !== bi) {
                            bE.iV(0, 1);
                            index--;
                            while (index > 0) {
                                if (bE[0].group === g) {
                                    bE.iV(0, 1);
                                    index--;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            };
            function kU() {
                iT();
                while (index + 1 < bE.length) {
                    bE.splice(bE.length - 1, 1);
                }
            };
            function iT() {
                var aT, ct;
                if (!aA.canUndoRedo) {
                    return;
                }
                if (aA.eW()) {
                    eT = true;
                    cv();
                    aT = bE[index];
                    index--;
                    aT.undo();
                    for (; ;) {
                        if (aA.eW()) {
                            ct = bE[index];
                            if (ct.group === aT.group) {
                                index--;
                                ct.undo();
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    dF();
                    eT = false;
                }
            };
            function kY() {
                var aT, ct;
                if (!aA.canUndoRedo) {
                    return;
                }
                if (aA.eV()) {
                    eT = true;
                    cv();
                    index++;
                    aT = bE[index];
                    aT.redo();
                    for (; ;) {
                        if (aA.eV()) {
                            index++;
                            ct = bE[index];
                            if (ct.group === aT.group) {
                                ct.redo();
                            } else {
                                index--;
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    dF();
                    eT = false;
                }
            };
            function kd(code) {
                if (code.length >= 3) {
                    if (code.substr(0, 3) === 'AF_') {
                        return;
                    }
                }
                jm(code);
            };
            function ki() {
                kQ();
            };
            function iv() {
                cL = true;
            };
            function jm(code) {
                var result = false;
                if (!cL) {
                    cL = true;
                    bi++;
                    cN = code;
                    result = true;
                }
                return result;
            };
            function kQ() {
                if (cL) {
                    cL = false;
                    cN = 'AF_none';
                }
            };
            function nv(aq) {
                return aq.cN !== 'AF_none' ? aq.cN : aq.code;
            };
            function ft() {
                bE = [];
                index = - 1;
                bi = - 1;
                cL = false;
                eE = false;
            }
        };
        na = this;
        bM = new TaskManager();
        aJ = [];
        nc = [];
        lG = null;
        gm = [[0, 0], [ - 10, - 4], [ - 10, 4]];
        bw = {
            none: 0,
            add: 1,
            del: 2,
            first: 3,
            last: 4,
            change: 5
        };
        bP = {
            ih: 0,
            up: 1,
            fI: 2,
            left: 3,
            right: 4,
            gQ: 5,
            down: 6,
            fX: 7
        };
        bQ = {
            items: 0,
            nodes: 1,
            links: 2,
            hX: 3,
            jQ: 4,
            hZ: 5
        };
        fB = 8;
        gv = 8;
        hw = 100;
        gz = 20;
        gX = 20;
        ed = [0, 0];
        az = null;
        cu = null;
        aI = null;
        au = new bq(0, 0, 0, 0);
        ds = false;
        dY = false;
        ac = 0;
        aj = 0;
        bX = false;
        bB = [];
        cQ = null;
        aR = null;
        origin = null;
        eH = null;
        fg = null;
        bn = null;
        ii = canvas.width;
        jo = canvas.height;
        dK = 35;
        eN = false;
        fv = 0;
        en = 0;
        dZ = false;
        fN = false;
        ef = false;
        fj = false;
        fs = false;
        ek = false;
        er = false;
        eP = false;
        fp = false;
        dB = 0;
        cA = true;
        cj = false;
        an = false;
        dh = false;
        di = false;
        cT = false;
        df = false;
        dg = false;
        cg = false;
        dJ = 'none';
        cY = 'none';
        fK = false;
        cp = null;
        iF = new jW();
        this.canvas = canvas;
        this.nodeModel = new Node(0, 0, 0, 0, '');
        this.linkModel = new Link(null, null, '');
        this.isFixedSize = false;
        this.canDrawNode = true;
        this.canDrawLink = true;
        this.canMoveNode = true;
        this.canSizeNode = true;
        this.canStretchLink = true;
        this.canMultiLink = true;
        this.canReflexLink = true;
        this.canChangeOrg = true;
        this.canChangeDst = true;
        this.canMultiSelect = true;
        this.canDragScroll = true;
        this.canSelectOnMouseMove = true;
        this.canSendSelectionChangedEvent = true;
        this.canShowContextHandle = true;
        this.mouseSelection = 'none';
        this.hitArea = 'outSide';
        this.taskManager = bM;
        this.shadowOffsetX = 5;
        this.shadowOffsetY = 5;
        this.shadowBlur = 2;
        this.shadowColor = 'rgba(128, 128, 192, 0.5)';
        this.linkSelectionAreaWidth = 6;
        this.removePointDistance = 6;
        this.zoom = 1;
        this.gridSizeX = 16;
        this.gridSizeY = 16;
        this.gridSnap = false;
        this.gridDraw = false;
        this.gridStrokeStyle = 'rgb(192, 192, 192)';
        this.fillStyle = '#fff';
        this.ownerDraw = null;
        this.selRectFillStyle = 'rgba(224, 224, 224, 0.3)';
        this.selRectStrokeStyle = 'gray';
        this.selRectLineWidth = 1;
        this.bezierSelectionLinesStrokeStyle = 'navy';
        this.handleSize = 6;
        this.handleGradientColor1 = 'white';
        this.handleGradientColor2 = 'lightgray';
        this.handleStrokeStyle = 'black';
        this.contextHandleSize = 20;
        this.contextHandleStrokeStyle = 'navy';
        this.contextHandleGradientColor1 = 'white';
        this.contextHandleGradientColor2 = 'lightblue';
        this.pinSize = 8;
        this.pinGradientColor1 = 'white';
        this.pinGradientColor2 = 'navy';
        this.pinStrokeStyle = 'white';
        this.centralPinGradientColor1 = 'white';
        this.centralPinGradientColor2 = 'white';
        this.centralPinStrokeColor = 'black';
        this.xCustomOffset = 0;
        this.yCustomOffset = 0;
        this.refresh = function() {
            bv(null);
            gH();
            ap();
        };
        this.useQuadtree = function(isQuadtree) {
            if (cA !== isQuadtree) {
                cA = isQuadtree;
                if (cA) {
                    fU();
                }
            }
        };
        this.getItems = function() {
            return aJ;
        };
        this.getSelectedItems = function() {
            return nc;
        };
        this.getHitItem = function() {
            return lG;
        };
        this.addNode = function(x, y, w, h, text) {
            return jz(x, y, w, h, text);
        };
        this.addLink = function(org, dst, text, pinOrg, pinDst) {
            return jy(org, dst, text, pinOrg, pinDst);
        };
        this.removeNode = function(G) {
            gT(G);
        };
        this.removeLink = function(J) {
            fP(J);
        };
        this.deleteSel = function() {
            kA();
        };
        this.clear = function() {
            ft();
        };
        this.selectAll = function() {
            kI();
        };
        this.unselectAll = function() {
            dk();
        };
        this.beginUpdate = function() {
            cv();
        };
        this.endUpdate = function() {
            dF();
        };
        this.invalidateRect = function(x, y, w, h) {
            bv(new bq(x, y, w, h));
        };
        this.isMovingNode = function() {
            return cT;
        };
        this.isCreatingNode = function() {
            return cj;
        };
        this.isCreatingLink = function() {
            return an;
        };
        this.isStretchingLink = function() {
            return dh;
        };
        this.isResizingNode = function() {
            return di;
        };
        this.isSelecting = function() {
            return df;
        };
        this.isZooming = function() {
            return dg;
        };
        this.isPanning = function() {
            return cg;
        };
        this.setSelChangedFlag = function(aP) {
            dZ = aP;
        };
        this.isSelChanged = function() {
            return dZ;
        };
        this.isNode = function(item) {
            return ai(item);
        };
        this.isLink = function(item) {
            return aX(item);
        };
        this.sendToBack = function() {
            lm();
        };
        this.bringToFront = function() {
            kJ();
        };
        this.zoomRectangle = function(x, y, w, h) {
            iq(new bq(x, y, w, h));
        };
        this.getXExtent = function() {
            return au.width;
        };
        this.getYExtent = function() {
            return au.height;
        };
        initialize(this.canvas);
        function initialize(canvas) {
            canvas.addEventListener("ready", jf, false);
            canvas.addEventListener("mousedown", hN, false);
            canvas.addEventListener("mousemove", lv, false);
            canvas.addEventListener("mouseup", jL, false);
            canvas.addEventListener('touchstart', mH, false);
            canvas.addEventListener('touchmove', mk, false);
            canvas.addEventListener('touchend', nm, false);
            if (cA) {
                fU();
            }
        };
        function jV(aq) {
            var event;
            event = document.createEvent("Event");
            event.initEvent("context", true, true);
            event.item = aq, document.dispatchEvent(event);
        };
        function ni(aq) {
            var event;
            event = document.createEvent("Event");
            event.initEvent("selectionChange", true, true);
            event.item = aq, document.dispatchEvent(event);
        };
        function fU() {
            var i, aq;
            dp = iE.dU(0, 0, au.width, au.height);
            dp.ft();
            for (i = 0; i < aJ.length; i++) {
                aq = aJ[i];
                if (na.isNode(aq)) {
                    aq.fd = bN(aq);
                } else {
                    aq.fd = bb(aq);
                }
                dp.cs(aq, aq.fd);
            }
        };
        function ai(aq) {
            return (aq instanceof Node);
        };
        function aX(aq) {
            return (aq instanceof Link);
        };
        function jz(x, y, w, h, text) {
            var mA;
            var F = new Node(x, y, w, h, text);
            aJ.push(F);
            F.index = na.getItems().length - 1;
            F.flow = na;
            if (na.nodeModel !== undefined && na.nodeModel !== null) {
                iJ(F, na.nodeModel);
            }
            if (dB === 0) {
                mA = bN(F);
                ee(mA);
                F.fd = mA;
                if (cA) {
                    dp.cs(F, F.fd);
                }
                F.refresh();
            }
            if (bM.aL()) {
                bM.bG(new hj(na, F));
            }
            return F;
        };
        function gT(F) {
            var bi, bA, R;
            if (F === undefined || F === null) {
                return;
            }
            bi = false;
            if (bM.aL()) {
                bi = bM.fq();
                if (!bi) {
                    bM.dN('AF_nodeRemove');
                }
            }
            if (F.getIsSelected()) {
                F.setIsSelected(false);
            }
            bA = F.getLinks();
            for (R = bA.length - 1; R >= 0; R--) {
                fP(bA[R]);
            }
            if (bM.aL()) {
                bM.bG(new gC(na, F));
            }
            if (cA) {
                dp.dS(F);
            }
            dQ(F.index);
            na.refresh();
            if (bM.aL()) {
                if (!bi) {
                    bM.cV();
                }
            }
        };
        function jy(org, dst, text, pinOrg, pinDst) {
            var J;
            if (org === undefined || dst === undefined) {
                return null;
            }
            if (org === null || dst === null) {
                return null;
            }
            J = new Link(org, dst, text, pinOrg, pinDst);
            aJ.push(J);
            org.getLinks().push(J);
            dst.getLinks().push(J);
            J.flow = na;
            if (na.linkModel !== undefined && na.linkModel !== null) {
                iy(J, na.linkModel);
            }
            jv(J);
            J.index = na.getItems().length - 1;
            if (dB === 0) {
                mA = bb(J);
                ee(mA);
                J.fd = mA;
                if (cA) {
                    dp.cs(J, J.fd);
                }
                J.refresh();
            }
            if (bM.aL()) {
                bM.bG(new it(na, J));
            }
            return J;
        };
        function fP(J) {
            var bi;
            if (J === undefined || J === null) {
                return;
            }
            if (J.getIsSelected()) {
                J.setIsSelected(false);
            }
            bi = false;
            if (bM.aL()) {
                bi = bM.fq();
                if (!bi) {
                    bM.dN('AF_linkRemove');
                }
            }
            J.setOrg(null);
            J.setDst(null);
            if (bM.aL()) {
                bM.bG(new hl(na, J));
            }
            if (cA) {
                dp.dS(J);
            }
            dQ(J.index);
            na.refresh();
            if (bM.aL()) {
                if (!bi) {
                    bM.cV();
                }
            }
        };
        function ft() {
            var i, n, nodes;
            if (aJ.length === 0) {
                return;
            }
            cv();
            nodes = [];
            for (i = 0; i < aJ.length; i++) {
                if (ai(aJ[i])) {
                    nodes.push(aJ[i]);
                }
            }
            for (n = nodes.length - 1; n >= 0; n--) {
                gT(nodes[n]);
            }
            dF();
        };
        function kA() {
            var i, aq, bi;
            if (nc.length === 0) {
                return;
            }
            bi = false;
            if (bM.aL()) {
                bi = bM.fq();
                if (!bi) {
                    bM.dN('AF_del');
                }
            }
            cv();
            for (i = nc.length - 1; i >= 0; i--) {
                aq = nc[i];
                if (aX(aq)) {
                    fP(aq);
                }
            }
            for (i = nc.length - 1; i >= 0; i--) {
                aq = nc[i];
                if (ai(aq)) {
                    gT(aq);
                }
            }
            dF();
            if (bM.aL()) {
                if (!bi) {
                    bM.cV();
                }
                bM.cV();
            }
        };
        function kI() {
            var i, aq;
            cv();
            for (i = 0; i < aJ.length; i++) {
                aq = aJ[i];
                if (!aq.getIsSelected()) {
                    aq.setIsSelected(true);
                }
            }
            dF();
        };
        function dk() {
            var i, aq;
            eN = true;
            for (i = nc.length - 1; i >= 0; i--) {
                aq = nc[i];
                if (aq.getIsSelected()) {
                    aq.setIsSelected(false);
                }
            }
            nc = [];
            eN = false;
            na.refresh();
        };
        function dQ(aU) {
            var i;
            if (aU >= 0 && aU < aJ.length) {
                if (na.isNode(aJ[aU])) {
                    aF(aJ[aU]);
                } else if (na.isLink(aJ[aU])) {
                    bj(aJ[aU]);
                }
                aJ.splice(aU, 1);
                for (i = aU; i < aJ.length; i++) {
                    aJ[i].index = i;
                }
            }
        };
        function lm() {
            var i, aM, aU, aq;
            if (bM.aL()) {
                bM.bG(new eI(na));
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                aU = aq.index;
                aJ.splice(aU, 1);
                aJ.splice(0, 0, aq);
                for (aM = 0; aM < nc.length; aM++) {
                    if (aM !== i && nc[aM].index < aU + 1) {
                        nc[aM].index++;
                    }
                }
            }
            for (i = 0; i < aJ.length; i++) {
                aJ[i].index = i;
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                aq.refresh();
            }
        };
        function kJ() {
            var i, aM, aU, aq;
            if (bM.aL()) {
                bM.bG(new eI(na));
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                aU = aq.index;
                aJ.splice(aU, 1);
                aJ.push(aq);
                for (aM = 0; aM < nc.length; aM++) {
                    if (aM !== i && nc[aM].index > aU - 1) {
                        nc[aM].index--;
                    }
                }
            }
            for (i = 0; i < aJ.length; i++) {
                aJ[i].index = i;
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                aq.refresh();
            }
        };
        function ld(F) {
            var mA, x, y, dx, dy;
            mA = bN(F);
            dx = na.contextHandleSize;
            dy = na.contextHandleSize * 2 / 5;
            x = mA.left + mA.width - dx;
            y = mA.top + 1 - dx;
            return new bq(x, y, dx, dy);
        };
        function lc(J) {
            var x, y, dx, dy, ao;
            ao = [];
            if (J.lineStyle === 'bezier') {
                bF.hb(J.points[0], J.points[1], J.points[2], J.points[3], ao);
            } else {
                ao = J.points;
            }
            dM = new ip(ao);
            pt = dM.jA(0.5);
            if (pt !== null) {
                dx = na.contextHandleSize;
                dy = na.contextHandleSize * 2 / 5;
                x = pt.x - dx / 2 - 20;
                y = pt.y - dy / 2 - 20;
                return new bq(x, y, dx, dy);
            } else {
                return null;
            }
        };
        function he(F, bg) {
            var pt, bL, size, mA;
            bL = 1 * na.handleSize;
            size = na.handleSize;
            mA = bN(F);
            mA = mA.bH(bL, bL);
            pt = {
                x: mA.left,
                y: mA.top
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left + mA.width / 2,
                y: mA.top
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left + mA.width,
                y: mA.top
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left,
                y: mA.top + mA.height / 2
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left + mA.width,
                y: mA.top + mA.height / 2
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left,
                y: mA.top + mA.height
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left + mA.width / 2,
                y: mA.top + mA.height
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
            pt = {
                x: mA.left + mA.width,
                y: mA.top + mA.height
            };
            bg.push(new bq(pt.x - size / 2, pt.y - size / 2, size, size));
        };
        function bN(G) {
            return new bq(G.x, G.y, G.w, G.h);
        };
        function aF(F) {
            bv(iW(F));
        };
        function cF(F, rect) {
            var bi, mA;
            bi = false;
            if (bM.aL()) {
                bi = bM.fq();
                if (!bi) {
                    bM.dN('AF_nodeMoveAndSize');
                }
            }
            if (bM.aL()) {
                mA = bN(F);
                bM.bG(new ec(na, F, mA));
            }
            aF(F);
            F.x = rect.left;
            F.y = rect.top;
            F.w = rect.width;
            F.h = rect.height;
            fG(F);
            F.refresh();
            if (bM.aL()) {
                if (!bi) {
                    bM.cV();
                }
            }
        };
        function eF(G) {
            return (G.shapeFamily === 'ellipse');
        };
        function gR(G) {
            return (G.shapeFamily === 'rectangle');
        };
        function eo(G) {
            return (G.shapeFamily === 'polygon');
        };
        function eu(G, bS) {
            var bI, x, y, cx, cy, mA, x2, y2, i;
            if (G.polygon !== undefined && G.polygon !== null) {
                bI = bF.kj(G.polygon);
                if (bI === null) {
                    return;
                }
                x = bI.left;
                y = bI.top;
                cx = bI.width;
                cy = bI.height;
                if (cx === 0 || cy === 0) {
                    return;
                }
                for (i = 0; i < G.polygon.length; i++) {
                    mA = bN(G);
                    x2 = mA.left + (mA.width / cx) * (G.polygon[i][0] - x);
                    y2 = mA.top + (mA.height / cy) * (G.polygon[i][1] - y);
                    bS.push({
                        x: x2,
                        y: y2
                    });
                }
            }
        };
        function bY(G) {
            return G.getLinks();
        };
        function fG(G) {
            var R, bA, J;
            bA = bY(G);
            for (R = 0; R < bA.length; R++) {
                J = bA[R];
                if (cA) {
                    dp.dS(J);
                }
                ka(J);
                J.fd = bb(J);
                if (cA) {
                    dp.cs(J, J.fd);
                }
            }
        };
        function jr(fw, gc) {
            var i, J, bA, result;
            result = false;
            bA = bY(fw);
            for (i = 0; i < bA.length; i++) {
                J = bA[i];
                if (J.dst === gc && J.org === fw) {
                    result = true;
                    break;
                }
            }
            return result;
        };
        function lj(fw, gc) {
            var i, J, result, bA;
            result = false;
            bA = bY(fw);
            for (i = 0; i < bA.length; i++) {
                J = bA[i];
                if (J.org === gc && J.dst === fw) {
                    result = true;
                    break;
                }
            }
            return result;
        };
        function bj(J) {
            bv(hg(J));
        };
        function lk(J, bg) {
            var create, co, hS, ju, iO, enabled, R, aM, pt, mA;
            create = hh(J);
            co = create ? 2 * J.points.length - 1 : J.points.length;
            hS = (na.canChangeOrg || J.org.pins !== null);
            ju = (na.canChangeDst || J.dst.pins !== null);
            iO = na.canStretchLink && J.isStretchable;
            for (R = 0; R < co; R++) {
                enabled = false;
                if (R === 0) {
                    enabled = hS;
                } else if (R === co - 1) {
                    enabled = ju;
                } else {
                    enabled = iO;
                }
                if (create) {
                    if (R%2 === 0) {
                        pt = J.points[R / 2];
                    } else {
                        aM = Math.round(R / 2) - 1;
                        pt = bF.gY(J.points[aM], J.points[aM + 1]);
                    }
                } else {
                    pt = J.points[R];
                }
                mA = new bq(pt.x - na.handleSize / 2, pt.y - na.handleSize / 2, na.handleSize, na.handleSize);
                bg.push(mA);
            }
        };
        function ht(J) {
            return (J.org === J.dst);
        };
        function hh(J) {
            return (J.getLineStyle() === 'polyline' || J.getLineStyle() === 'spline');
        };
        function ka(J) {
            bj(J);
            if (J.getLineStyle() === 'database') {
                ei(J);
            } else if (J.getLineStyle() === 'orthogonal') {
                fl(J);
            }
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            bj(J);
        };
        function jg(J, lineStyle) {
            if (J.lineStyle === lineStyle) {
                return;
            }
            if (J === na.linkModel) {
                J.lineStyle = lineStyle;
                return;
            }
            if (bM.aL()) {
                bM.bG(new hO(na, J, J.lineStyle));
            }
            J.lineStyle = lineStyle;
            if ((J.lineStyle === 'bezier' && J.points.length !== 4) || J.lineStyle === 'database' || J.lineStyle === 'orthogonal') {
                jv(J);
            }
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function je(J, org) {
            var bA, dA, R;
            if (J === na.linkModel) {
                J.org = org;
                return;
            }
            if (bM.aL()) {
                bM.bG(new hL(na, J, J.org));
            }
            bj(J);
            dA = J.org;
            if (dA !== null) {
                bA = dA.getLinks();
                for (R = 0; R < bA.length; R++) {
                    if (bA[R] === J) {
                        break;
                    }
                }
                bA.splice(R, 1);
            }
            if (org !== null) {
                bA = org.getLinks();
                bA.push(J);
                J.org = org;
                if (J.org.pins !== null) {
                    if (J.pinOrg < 0 || J.pinOrg >= J.org.pins.length) {
                        J.pinOrg = 0;
                    }
                } else {
                    J.pinOrg = - 1;
                }
                if (J.getLineStyle() === 'database') {
                    ei(J);
                } else if (J.getLineStyle() === 'orthogonal') {
                    fl(J);
                }
                if (J.org.pins === null && !J.isOrgPointAdjustable) {
                    bK(J);
                }
                if (J.dst.pins === null && !J.isDstPointAdjustable) {
                    aC(J);
                }
                J.refresh();
            }
        };
        function jU(J, dst) {
            var bA, cJ, R;
            if (J === na.linkModel) {
                J.dst = dst;
                return;
            }
            if (bM.aL()) {
                bM.bG(new iK(na, J, J.dst));
            }
            bj(J);
            cJ = J.dst;
            if (cJ !== null) {
                bA = cJ.getLinks();
                for (R = 0; R < bA.length; R++) {
                    if (bA[R] === J) {
                        break;
                    }
                }
                bA.splice(R, 1);
            }
            if (dst !== null) {
                bA = dst.getLinks();
                bA.push(J);
                J.dst = dst;
                if (J.dst.pins !== null) {
                    if (J.pinDst < 0 || J.pinDst >= J.dst.pins.length) {
                        J.pinDst = 0;
                    }
                } else {
                    J.pinDst = - 1;
                }
                if (J.getLineStyle() === 'database') {
                    ei(J);
                } else if (J.getLineStyle() === 'orthogonal') {
                    fl(J);
                }
                if (J.org.pins === null && !J.isOrgPointAdjustable) {
                    bK(J);
                }
                if (J.dst.pins === null && !J.isDstPointAdjustable) {
                    aC(J);
                }
                J.refresh();
            }
        };
        function v(J, value) {
            var oldValue;
            oldValue = J.pinOrg;
            J.pinOrg = value;
            bj(J);
            if (J.org.pins !== null && (J.pinOrg >= 0 && J.pinOrg < J.org.pins.length)) {
                if (bM.aL()) {
                    bM.submitTask(new mW(na, J, oldValue));
                }
                if (J.points !== null && J.points.length > 0) {
                    J.points[0] = cB(J.org, J.pinOrg);
                    if (J.getLineStyle() === 'database') {
                        ei(J);
                    } else if (J.getLineStyle() === 'orthogonal') {
                        fl(J);
                    }
                    J.refresh();
                }
            }
        };
        function aB(J, value) {
            var oldValue;
            oldValue = J.pinDst;
            J.pinDst = value;
            bj(J);
            if (J.dst.pins !== null && (J.pinDst >= 0 && J.pinDst < J.dst.pins.length)) {
                if (bM.aL()) {
                    bM.submitTask(new mL(na, J, oldValue));
                }
                if (J.points !== null && J.points.length > 0) {
                    J.points[J.points.length - 1] = cB(J.dst, J.pinDst);
                    if (J.getLineStyle() === 'database') {
                        ei(J);
                    } else if (J.getLineStyle() === 'orthogonal') {
                        fl(J);
                    }
                    J.refresh();
                }
            }
        };
        function mJ(J, adjustable) {
            if (J.isOrgPointAdjustable === adjustable) {
                return;
            }
            if (J === na.linkModel) {
                J.isOrgPointAdjustable = adjustable;
                return;
            }
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            J.isOrgPointAdjustable = adjustable;
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function mz(J, adjustable) {
            if (J.isDstPointAdjustable === adjustable) {
                return;
            }
            if (J === na.linkModel) {
                J.isDstPointAdjustable = adjustable;
                return;
            }
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            J.isDstPointAdjustable = adjustable;
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function jM(J, x, y) {
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            bj(J);
            J.points.splice(J.points.length - 1, 0, {
                x: x,
                y: y
            });
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function kn(J, index) {
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            bj(J);
            J.points.splice(index, 1);
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function jI(J) {
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            bj(J);
            jv(J);
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function ll(J, bd) {
            if (J.points === null || bd < 0 || bd > J.points.length - 1) {
                return null;
            }
            return {
                x: J.points[bd].x,
                y: J.points[bd].y
            };
        };
        function ie(J, x, y, bd) {
            if ((J.points === null || bd < 0 || bd > J.points.length - 1) || (bd === 0 && J.org.pins === null && !J.isOrgPointAdjustable) || (bd === J.points.length - 1 && J.dst.pins === null && !J.isDstPointAdjustable)) {
                return;
            }
            if (bM.aL()) {
                bM.bG(new cq(na, J));
            }
            bj(J);
            la(J, bd, {
                x: x,
                y: y
            });
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            J.refresh();
        };
        function la(J, aU, pt) {
            if (J.points === null) {
                return;
            }
            J.points[aU] = pt;
        };
        function bb(J) {
            var mA, aE, i, dM, pt, K, aA, w, h, ao;
            ao = [];
            if (J.getLineStyle() === 'bezier') {
                bF.hb(J.points[0], J.points[1], J.points[2], J.points[3], ao);
                mA = new bq(ao[0].x, ao[0].y, 0, 0);
                for (i = 0; i < ao.length - 1; i++) {
                    mA.bI(bF.aV(ao[i], ao[i + 1]));
                }
                if (J.getIsSelected()) {
                    for (i = 0; i < J.points.length - 1; i++) {
                        mA.bI(bF.aV(J.points[i], J.points[i + 1]));
                    }
                }
            } else {
                ao = J.points;
                mA = new bq(ao[0].x, ao[0].y, 0, 0);
                for (i = 0; i < ao.length - 1; i++) {
                    mA.bI(bF.aV(ao[i], ao[i + 1]));
                }
            }
            if (J.text !== null && J.text.length > 0) {
                dM = new ip(ao);
                pt = dM.jA(0.5);
                if (pt !== null) {
                    K = J.flow.canvas.getContext('2d');
                    K.font = J.font;
                    aA = K.measureText(J.text);
                    w = aA.width;
                    h = parseInt(J.font, 10) * 1.2;
                    if (h === undefined) {
                        h = 16;
                    }
                    aE = new bq(pt.x - w / 2, pt.y - h / 2, w, h);
                    aE.bH(h / 2, h / 2);
                    mA.bI(aE);
                }
            }
            mA = mA.bH(J.flow.linkSelectionAreaWidth, J.flow.linkSelectionAreaWidth);
            return mA;
        };
        function jv(J) {
            J.points.splice(0, J.points.length);
            if (J.getLineStyle() === 'orthogonal') {
                mB(J);
            } else if (J.getLineStyle() === 'database') {
                kk(J);
            } else if (J.getLineStyle() === 'bezier') {
                kL(J);
            } else {
                kC(J);
            }
        };
        function mB(J) {
            J.points = iF.lh(J.org, J.dst, J.pinOrg, J.pinDst, J.orthoMargin);
            J.ij = J.points[0].y === J.points[1].y;
        };
        function kk(J) {
            var aM, aa, bD;
            for (aM = 0; aM < 4; aM++) {
                J.points.push({
                    x: 0,
                    y: 0
                });
            }
            aa = bN(J.org);
            bD = bN(J.dst);
            if (aa.left + aa.width / 2 < bD.left + bD.width / 2) {
                if (!cO(J)) {
                    J.points[0] = {
                        x: aa.left + aa.width,
                        y: aa.top + aa.height / 2
                    };
                } else {
                    J.points[0] = bZ(J);
                }
                if (!cc(J)) {
                    J.points[3] = {
                        x: bD.left,
                        y: bD.top + bD.height / 2
                    };
                } else {
                    J.points[3] = dv(J);
                }
                J.points[1] = {
                    x: Math.max(J.points[0].x + dK, 0),
                    y: J.points[0].y
                };
                J.points[2] = {
                    x: Math.max(J.points[3].x - dK, 0),
                    y: J.points[3].y
                };
            } else {
                if (!cO(J)) {
                    J.points[0] = {
                        x: aa.left,
                        y: aa.top + aa.height / 2
                    };
                } else {
                    J.points[0] = bZ(J);
                }
                if (!cc(J)) {
                    J.points[3] = {
                        x: bD.left + bD.width,
                        y: bD.top + bD.height / 2
                    };
                } else {
                    J.points[3] = dv(J);
                }
                J.points[1] = {
                    x: Math.max(J.points[0].x - dK, 0),
                    y: J.points[0].y
                };
                J.points[2] = {
                    x: Math.max(J.points[3].x + dK, 0),
                    y: J.points[3].y
                };
            }
        };
        function kL(J) {
            var bu, ah, dx, dy, d, ad, O, mA;
            J.points.push({
                x: 0,
                y: 0
            });
            J.points.push({
                x: 0,
                y: 0
            });
            if (!ht(J)) {
                if (!cO(J)) {
                    bK(J);
                } else {
                    J.points[0] = bZ(J);
                }
                if (!cc(J)) {
                    aC(J);
                } else {
                    J.points[J.points.length - 1] = dv(J);
                }
                bu = J.points[0];
                ah = J.points[1];
                dx = ah.x - bu.x;
                dy = ah.y - bu.y;
                d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                ad = {
                    x: bu.x + dx / 2 - d / 5,
                    y: bu.y + dy / 2 - d / 5
                };
                O = {
                    x: bu.x + dx / 2 + d / 5,
                    y: bu.y + dy / 2 + d / 5
                };
                J.points.splice(0, J.points.length);
                J.points.push(bu);
                J.points.push(ad);
                J.points.push(O);
                J.points.push(ah);
                if (!cO(J)) {
                    bK(J);
                }
                if (!cc(J)) {
                    aC(J);
                }
            } else {
                J.points.push({
                    x: 0,
                    y: 0
                });
                J.points.push({
                    x: 0,
                    y: 0
                });
                mA = bN(J.org);
                J.points[0] = mA.af();
                J.points[1] = {
                    x: mA.left + mA.width + mA.width / 2,
                    y: J.points[1].y
                };
                J.points[2] = {
                    x: mA.left + mA.width / 2,
                    y: J.points[2].y
                };
                if (mA.top - mA.height >= 0) {
                    J.points[1] = {
                        x: J.points[1].x,
                        y: mA.top - mA.height / 2
                    };
                    J.points[2] = {
                        x: J.points[2].x,
                        y: mA.top - mA.height
                    };
                } else {
                    J.points[1] = {
                        x: J.points[1].x,
                        y: mA.top + mA.height + mA.height / 2
                    };
                    J.points[2] = {
                        x: J.points[2].x,
                        y: mA.top + mA.height + mA.height
                    };
                }
                J.points[3] = J.points[0];
                if (!cO(J)) {
                    bK(J);
                } else {
                    J.points[0] = bZ(J);
                }
                if (!cc(J)) {
                    aC(J);
                } else {
                    J.points[J.points.length - 1] = dv(J);
                }
            }
        };
        function kC(J) {
            var mA;
            J.points.push({
                x: 0,
                y: 0
            });
            J.points.push({
                x: 0,
                y: 0
            });
            if (!ht(J)) {
                if (!cO(J)) {
                    bK(J);
                } else {
                    J.points[0] = bZ(J);
                }
                if (!cc(J)) {
                    aC(J);
                } else {
                    J.points[J.points.length - 1] = dv(J);
                }
            } else {
                J.points.push({
                    x: 0,
                    y: 0
                });
                J.points.push({
                    x: 0,
                    y: 0
                });
                mA = bN(J.org);
                J.points[0] = mA.af();
                J.points[1] = {
                    x: mA.left + mA.width + mA.width / 2,
                    y: J.points[1].y
                };
                J.points[2] = {
                    x: mA.left + mA.width / 2,
                    y: J.points[2].y
                };
                if (mA.top - mA.height >= 0) {
                    J.points[1] = {
                        x: J.points[1].x,
                        y: mA.top - mA.height / 2
                    };
                    J.points[2] = {
                        x: J.points[2].x,
                        y: mA.top - mA.height
                    };
                } else {
                    J.points[1] = {
                        x: J.points[1].x,
                        y: mA.top + mA.height + mA.height / 2
                    };
                    J.points[2] = {
                        x: J.points[2].x,
                        y: mA.top + mA.height + mA.height
                    };
                }
                J.points[3] = J.points[0];
                bK(J);
                aC(J);
            }
        };
        function ei(J) {
            var ad, O;
            ad = (J.org.pins === null && !J.isOrgPointAdjustable) ? bN(J.org).af() : J.points[0];
            O = (J.dst.pins === null && !J.isDstPointAdjustable) ? bN(J.dst).af() : J.points[3];
            J.points[1] = {
                x: J.points[0].x + dK,
                y: ad.y
            };
            J.points[2] = {
                x: J.points[3].x - dK,
                y: O.y
            };
        };
        function fl(J) {
            var n, ad, O;
            n = J.points.length;
            if (J.org.pins !== null && J.pinOrg !== undefined) {
                J.points[0] = cB(J.org, J.pinOrg);
            }
            if (J.dst.pins !== null && J.pinDst !== undefined) {
                J.points[n - 1] = cB(J.dst, J.pinDst);
            }
            ad = (J.org.pins === null && !J.isOrgPointAdjustable) ? bN(J.org).af() : J.points[0];
            O = (J.dst.pins === null && !J.isDstPointAdjustable) ? bN(J.dst).af() : J.points[n - 1];
            if (J.ij) {
                J.points[1] = {
                    x: J.points[1].x,
                    y: ad.y
                };
                if (n%2 === 0) {
                    J.points[n - 2] = {
                        x: J.points[n - 2].x,
                        y: O.y
                    };
                } else {
                    J.points[n - 2] = {
                        x: O.x,
                        y: J.points[n - 2].y
                    };
                }
            } else {
                J.points[1] = {
                    x: ad.x,
                    y: J.points[1].y
                };
                if (n%2 === 0) {
                    J.points[n - 2] = {
                        x: O.x,
                        y: J.points[n - 2].y
                    };
                } else {
                    J.points[n - 2] = {
                        x: J.points[n - 2].x,
                        y: O.y
                    };
                }
            }
        };
        function aC(J) {
            var ak, aK, ad, O, pt, n, bS;
            ak = bN(J.org);
            aK = bN(J.dst);
            ad = ak.af();
            O = aK.af();
            n = J.points.length;
            if (aK.width === 0 || aK.height === 0) {
                J.points[n - 1] = O;
                return;
            }
            if (n === 2) {
                if (cO(J)) {
                    pt = bZ(J);
                } else {
                    pt = ad;
                }
            } else {
                pt = J.points[n - 2];
            }
            if (eF(J.dst)) {
                J.points[n - 1] = bF.ia(aK, pt, O, 0);
            } else if (eo(J.dst) && J.dst.polygon !== null) {
                bS = [];
                eu(J.dst, bS);
                J.points[n - 1] = bF.fm(bS, pt, O);
            } else {
                bS = [];
                bF.hU(aK, bS);
                J.points[n - 1] = bF.fm(bS, pt, O);
            }
        };
        function bK(J) {
            var ak, aK, ad, O, pt, n, bS;
            ak = bN(J.org);
            aK = bN(J.dst);
            ad = ak.af();
            O = aK.af();
            if (ak.width === 0 || ak.height === 0) {
                J.points[0] = ad;
                return;
            }
            if (J.points.length === 2) {
                if (cc(J)) {
                    pt = dv(J);
                } else {
                    pt = O;
                }
            } else {
                pt = J.points[1];
            }
            if (eF(J.org)) {
                J.points[0] = bF.ia(ak, pt, ad, 0);
            } else if (eo(J.org) && J.org.polygon !== null) {
                bS = [];
                eu(J.org, bS);
                J.points[0] = bF.fm(bS, pt, ad);
            } else {
                bS = [];
                bF.hU(ak, bS);
                J.points[0] = bF.fm(bS, pt, ad);
            }
        };
        function js(J, pt, ac) {
            var n = J.points.length;
            if (J.ij) {
                if (n > 3) {
                    if (ac === 0) {
                        J.points[0] = pt;
                        J.points[1] = {
                            x: J.points[1].x,
                            y: pt.y
                        };
                    } else if (ac === 1) {
                        J.points[1] = {
                            x: pt.x,
                            y: J.points[1].y
                        };
                        J.points[2] = {
                            x: pt.x,
                            y: J.points[2].y
                        };
                    } else if (ac === n - 1) {
                        if (n%2 === 0) {
                            J.points[n - 1] = pt;
                            J.points[n - 2] = {
                                x: J.points[n - 2].x,
                                y: pt.y
                            };
                        } else {
                            J.points[n - 2] = {
                                x: pt.x,
                                y: J.points[n - 2].y
                            };
                        }
                    } else if (ac === n - 2) {
                        if (n%2 === 0) {
                            J.points[n - 3] = {
                                x: pt.x,
                                y: J.points[n - 3].y
                            };
                            J.points[n - 2] = {
                                x: pt.x,
                                y: J.points[n - 2].y
                            };
                        } else {
                            J.points[n - 3] = {
                                x: J.points[n - 3].x,
                                y: pt.y
                            };
                            J.points[n - 2] = {
                                x: J.points[n - 2].x,
                                y: pt.y
                            };
                        }
                    } else {
                        J.points[ac] = pt;
                        if (ac%2 === 0) {
                            J.points[ac - 1] = {
                                x: pt.x,
                                y: J.points[ac - 1].y
                            };
                            J.points[ac + 1] = {
                                x: J.points[ac + 1].x,
                                y: pt.y
                            };
                        } else {
                            J.points[ac - 1] = {
                                x: J.points[ac - 1].x,
                                y: pt.y
                            };
                            J.points[ac + 1] = {
                                x: pt.x,
                                y: J.points[ac + 1].y
                            };
                        }
                    }
                }
            } else {
                if (n > 3) {
                    if (ac === 0) {
                        J.points[0] = pt;
                        J.points[1] = {
                            x: pt.x,
                            y: J.points[1].y
                        };
                    } else if (ac === 1) {
                        J.points[1] = {
                            x: J.points[1].x,
                            y: pt.y
                        };
                        J.points[2] = {
                            x: J.points[2].x,
                            y: pt.y
                        };
                    } else if (ac === n - 1) {
                        if (n%2 === 0) {
                            J.points[n - 2] = {
                                x: pt.x,
                                y: J.points[n - 2].y
                            };
                        } else {
                            J.points[n - 2] = {
                                x: J.points[n - 2].x,
                                y: pt.y
                            };
                        }
                        J.points[n - 1] = pt;
                    } else if (ac === n - 2) {
                        if (n%2 === 0) {
                            J.points[n - 3] = {
                                x: J.points[n - 3].x,
                                y: pt.y
                            };
                            J.points[n - 2] = {
                                x: J.points[n - 2].x,
                                y: pt.y
                            };
                        } else {
                            J.points[n - 3] = {
                                x: pt.x,
                                y: J.points[n - 3].y
                            };
                            J.points[n - 2] = {
                                x: J.points[n - 2].x,
                                y: pt.y
                            };
                        }
                    } else {
                        J.points[ac] = pt;
                        if (ac%2 === 0) {
                            J.points[ac - 1] = {
                                x: J.points[ac - 1].x,
                                y: pt.y
                            };
                            J.points[ac + 1] = {
                                x: pt.x,
                                y: J.points[ac + 1].y
                            };
                        } else {
                            J.points[ac - 1] = {
                                x: pt.x,
                                y: J.points[ac - 1].y
                            };
                            J.points[ac + 1] = {
                                x: J.points[ac + 1].x,
                                y: pt.y
                            };
                        }
                    }
                }
            }
        };
        function kP(J, pt, pos) {
            J.points.splice(pos + 1, 0, pt);
        };
        function fW(J) {
            var i;
            J.kD = [J.points.length];
            for (i = 0; i < J.points.length; i++) {
                J.kD[i] = J.points[i];
            }
        };
        function bZ(J) {
            var mA, x, y;
            mA = bN(J.org);
            x = mA.left + (mA.width / 100) * J.org.pins[J.pinOrg][0];
            y = mA.top + (mA.height / 100) * J.org.pins[J.pinOrg][1];
            return {
                x: x,
                y: y
            };
        };
        function dv(J) {
            var mA, x, y;
            mA = bN(J.dst);
            x = mA.left + (mA.width / 100) * J.dst.pins[J.pinDst][0];
            y = mA.top + (mA.height / 100) * J.dst.pins[J.pinDst][1];
            return {
                x: x,
                y: y
            };
        };
        function cc(J) {
            return J.pinDst !== null && J.dst.pins !== null && (J.pinDst >= 0 && J.pinDst < J.dst.pins.length);
        };
        function cO(J) {
            return J.pinOrg !== null && J.org.pins !== null && (J.pinOrg >= 0 && J.pinOrg < J.org.pins.length);
        };
        function iJ(F, aH) {
            if (aH.strokeStyle !== undefined) {
                F.strokeStyle = aH.strokeStyle;
            }
            if (aH.fillStyle !== undefined) {
                F.fillStyle = aH.fillStyle;
            }
            if (aH.gradientFillStyle !== undefined) {
                F.gradientFillStyle = aH.gradientFillStyle;
            }
            if (aH.textFillStyle !== undefined) {
                F.textFillStyle = aH.textFillStyle;
            }
            if (aH.lineWidth !== undefined) {
                F.lineWidth = aH.lineWidth;
            }
            if (aH.shapeFamily !== undefined) {
                F.shapeFamily = aH.shapeFamily;
            }
            if (aH.polygon !== undefined) {
                F.polygon = aH.polygon;
            }
            if (aH.drawShape !== undefined) {
                F.drawShape = aH.drawShape;
            }
            if (aH.fillShape !== undefined) {
                F.fillShape = aH.fillShape;
            }
            if (aH.pins !== undefined) {
                F.pins = aH.pins;
            }
            if (aH.isContextHandle !== undefined) {
                F.isContextHandle = aH.isContextHandle;
            }
            if (aH.isXSizeable !== undefined) {
                F.isXSizeable = aH.isXSizeable;
            }
            if (aH.isYSizeable !== undefined) {
                F.isYSizeable = aH.isYSizeable;
            }
            if (aH.isXMoveable !== undefined) {
                F.isXMoveable = aH.isXMoveable;
            }
            if (aH.isYMoveable !== undefined) {
                F.isYMoveable = aH.isYMoveable;
            }
            if (aH.isOutLinkable !== undefined) {
                F.isOutLinkable = aH.isOutLinkable;
            }
            if (aH.isInLinkable !== undefined) {
                F.isInLinkable = aH.isInLinkable;
            }
            if (aH.isSelectable !== undefined) {
                F.isSelectable = aH.isSelectable;
            }
            if (aH.isShadowed !== undefined) {
                F.isShadowed = aH.isShadowed;
            }
            if (aH.image !== undefined) {
                F.image = aH.image;
            }
            if (aH.textMargin !== undefined) {
                F.textMargin = aH.textMargin;
            }
            if (aH.imageMargin !== undefined) {
                F.imageMargin = aH.imageMargin;
            }
            if (aH.textPosition !== undefined) {
                F.textPosition = aH.textPosition;
            }
            if (aH.imagePosition !== undefined) {
                F.imagePosition = aH.imagePosition;
            }
            if (aH.font !== undefined) {
                F.font = aH.font;
            }
            if (aH.textLineHeight !== undefined) {
                F.textLineHeight = aH.textLineHeight;
            }
        };
        function iy(J, aH) {
            if (aH.strokeStyle !== undefined) {
                J.strokeStyle = aH.strokeStyle;
            }
            if (aH.fillStyle !== undefined) {
                J.fillStyle = aH.fillStyle;
            }
            if (aH.textFillStyle !== undefined) {
                J.textFillStyle = aH.textFillStyle;
            }
            if (aH.lineWidth !== undefined) {
                J.lineWidth = aH.lineWidth;
            }
            if (aH.isStretchable !== undefined) {
                J.isStretchable = aH.isStretchable;
            }
            if (aH.isSelectable !== undefined) {
                J.isSelectable = aH.isSelectable;
            }
            if (aH.isContextHandle !== undefined) {
                J.isContextHandle = aH.isContextHandle;
            }
            if (aH.isShadowed !== undefined) {
                J.isShadowed = aH.isShadowed;
            }
            if (aH.font !== undefined) {
                J.font = aH.font;
            }
            if (aH.roundedCornerSize !== undefined) {
                J.roundedCornerSize = aH.roundedCornerSize;
            }
            if (aH.isOrientedText !== undefined) {
                J.isOrientedText = aH.isOrientedText;
            }
            if (aH.isOpaque !== undefined) {
                J.isOpaque = aH.isOpaque;
            }
            if (aH.arrowDst !== undefined) {
                J.arrowDst = aH.arrowDst;
            }
            if (aH.arrowOrg !== undefined) {
                J.arrowOrg = aH.arrowOrg;
            }
            if (aH.lineStyle !== undefined) {
                J.lineStyle = aH.lineStyle;
            }
            if (aH.orthoMargin !== undefined) {
                J.orthoMargin = aH.orthoMargin;
            }
            if (aH.points !== undefined) {
                J.points = aH.points.slice();
            }
        };
        function gP(aq, ku) {
            var i;
            dZ = true;
            if (ku) {
                if (na.isNode(aq)) {
                    aF(aq);
                } else if (na.isLink(aq)) {
                    bj(aq);
                }
                return;
            }
            if (aq.getIsSelected()) {
                nc.push(aq);
            } else {
                for (i = nc.length - 1; i >= 0; i--) {
                    if (aq === nc[i]) {
                        break;
                    }
                }
                nc.splice(i, 1);
            }
            if (na.canSendSelectionChangedEvent) {
                ni(aq);
            }
            aq.refresh();
        };
        function ap() {
            if (dB === 0) {
                var K = na.canvas.getContext('2d');
                jq(K);
                jC();
            }
        };
        function bv(rect) {
            if (rect === null) {
                rect = new bq(0, 0, na.canvas.width / na.zoom, na.canvas.height / na.zoom);
            }
            if (az === null) {
                az = rect;
            } else {
                az.bI(rect);
            }
        };
        function jC() {
            az = null;
        };
        function jq(K) {
            K.save();
            K.scale(na.zoom, na.zoom);
            gi(K, az);
            hK(K, az);
            if (na.ownerDraw !== null && az !== null) {
                na.ownerDraw(K);
            }
            kT(K, az);
            lg(K, az);
            jP(K, aR);
            kq(K);
            K.restore();
        };
        function gi(K, rect) {
            if (rect === null) {
                return;
            }
            K.beginPath();
            K.moveTo(rect.left, rect.top);
            K.lineTo(rect.left + rect.width, rect.top);
            K.lineTo(rect.left + rect.width, rect.top + rect.height);
            K.lineTo(rect.left, rect.top + rect.height);
            K.closePath();
            K.clip();
        };
        function hK(K, rect) {
            if (rect === null) {
                return;
            }
            K.fillStyle = na.fillStyle;
            K.fillRect(rect.left, rect.top, rect.width, rect.height);
            if (na.gridDraw) {
                kz(K, na.gridSizeX, na.gridSizeY, na.gridStrokeStyle, rect);
            }
        };
        function kz(K, bJ, aN, strokeStyle, rect) {
            var jw, hz, jh, jk, x, y;
            jw = Math.floor((rect.left / bJ)) * bJ;
            hz = Math.floor((rect.top / aN)) * aN;
            jh = rect.left + rect.width;
            jk = rect.top + rect.height;
            K.strokeStyle = strokeStyle;
            K.lineWidth = 0.5;
            for (x = jw; x <= jh; x += bJ) {
                K.beginPath();
                K.moveTo(x, rect.top);
                K.lineTo(x, rect.top + rect.height);
                K.stroke();
            }
            for (y = hz; y <= jk; y += aN) {
                K.beginPath();
                K.moveTo(rect.left, y);
                K.lineTo(rect.left + rect.width, y);
                K.stroke();
            }
        };
        function jP(K, aq) {
            var aM;
            if (aq === null) {
                return;
            }
            if (!cj && !cT && !di && !dg && !df) {
                if (aq.pins !== null) {
                    for (aM = 0; aM < bB.length; aM++) {
                        lf(K, bB[aM]);
                    }
                } else {
                    if (cQ !== null) {
                        kG(K, cQ);
                    }
                }
            }
        };
        function kT(K, rect) {
            var i, aq, bL, mA, gq;
            if (rect === null) {
                return;
            }
            if (cA) {
                gq = dp.ev(rect);
            } else {
                gq = aJ;
            }
            for (i = 0; i < gq.length; i++) {
                aq = gq[i];
                bL = aq.lineWidth + na.handleSize;
                if (na.isNode(aq)) {
                    mA = bN(aq);
                } else {
                    mA = bb(aq);
                }
                mA = mA.bH(bL, bL);
                if (mA.fb(rect)) {
                    if (na.isNode(aq)) {
                        ko(K, aq);
                    } else {
                        lo(K, aq);
                    }
                }
            }
        };
        function lg(K, rect) {
            var i;
            if (rect === null) {
                return;
            }
            for (i = 0; i < nc.length; i++) {
                kX(K, rect, nc[i]);
            }
        };
        function kX(K, rect, aq) {
            var R, bg, bL, mA;
            bg = [];
            bL = aq.lineWidth + na.handleSize;
            if (na.isNode(aq)) {
                mA = bN(aq);
            } else {
                mA = bb(aq);
            }
            mA = mA.bH(bL, bL);
            if (mA.fb(rect)) {
                if (ai(aq)) {
                    he(aq, bg);
                    for (R = 0; R < bg.length; R++) {
                        ks(K, bg[R]);
                    }
                    if (na.canShowContextHandle && aq.isContextHandle) {
                        jH(K, aq);
                    }
                } else if (aX(aq)) {
                    lk(aq, bg);
                    for (R = 0; R < bg.length; R++) {
                        lB(K, bg[R]);
                    }
                    if (na.canShowContextHandle && aq.isContextHandle) {
                        ln(K, aq);
                    }
                    if (aq.getLineStyle() === 'bezier') {
                        jb(K, aq);
                    }
                }
            }
        };
        function jH(K, F) {
            var mA;
            mA = ld(F);
            if (mA !== null) {
                kc(K, mA.left, mA.top);
            }
        };
        function ln(K, J) {
            var mA;
            mA = lc(J);
            if (mA !== null) {
                kc(K, mA.left, mA.top);
            }
        };
        function kc(K, x, y) {
            var d, ag;
            d = na.contextHandleSize * 2 / 5 - 2;
            K.lineWidth = 1;
            K.strokeStyle = na.contextHandleStrokeStyle;
            ag = K.createLinearGradient(x, y, x + d, y + d);
            ag.addColorStop(0, na.contextHandleGradientColor1);
            ag.addColorStop(1, na.contextHandleGradientColor2);
            K.fillStyle = ag;
            bF.eg(K, x, y, d, d);
            K.stroke();
            K.fill();
            x += 1 + d;
            ag = K.createLinearGradient(x, y, x + d, y + d);
            ag.addColorStop(0, na.contextHandleGradientColor1);
            ag.addColorStop(1, na.contextHandleGradientColor2);
            K.fillStyle = ag;
            bF.eg(K, x, y, d, d);
            K.stroke();
            K.fill();
            x += 1 + d;
            ag = K.createLinearGradient(x, y, x + d, y + d);
            ag.addColorStop(0, na.contextHandleGradientColor1);
            ag.addColorStop(1, na.contextHandleGradientColor2);
            K.fillStyle = ag;
            bF.eg(K, x, y, d, d);
            K.stroke();
            K.fill();
        };
        function ks(K, rect) {
            var ag;
            K.lineWidth = 1;
            ag = K.createLinearGradient(rect.left, rect.top, rect.left + rect.width, rect.top + rect.height);
            ag.addColorStop(0, na.handleGradientColor1);
            ag.addColorStop(1, na.handleGradientColor2);
            K.fillStyle = ag;
            K.strokeStyle = na.handleStrokeStyle;
            bF.eg(K, rect.left, rect.top, rect.width, rect.height);
            K.stroke();
            K.fill();
        };
        function lf(K, rect) {
            var ag;
            K.lineWidth = 1;
            ag = K.createLinearGradient(rect.left, rect.top, rect.left + rect.width, rect.top + rect.height);
            ag.addColorStop(0, na.pinGradientColor1);
            ag.addColorStop(1, na.pinGradientColor2);
            K.fillStyle = ag;
            K.strokeStyle = na.pinStrokeStyle;
            bF.cK(K, rect.left, rect.top, rect.width, rect.height);
            K.stroke();
            K.fill();
        };
        function kG(K, rect) {
            var ag;
            K.lineWidth = 1;
            ag = K.createLinearGradient(rect.left, rect.top, rect.left + rect.width, rect.top + rect.height);
            ag.addColorStop(0, na.centralPinGradientColor1);
            ag.addColorStop(1, na.centralPinGradientColor2);
            K.fillStyle = ag;
            K.strokeStyle = na.centralPinStrokeColor;
            bF.cK(K, rect.left, rect.top, rect.width, rect.height);
            K.stroke();
            K.fill();
        };
        function lB(K, rect) {
            var ag;
            K.lineWidth = 1;
            ag = K.createLinearGradient(rect.left, rect.top, rect.left + rect.width, rect.top + rect.height);
            ag.addColorStop(0, na.handleGradientColor1);
            ag.addColorStop(1, na.handleGradientColor2);
            K.fillStyle = ag;
            K.strokeStyle = na.handleStrokeStyle;
            bF.eg(K, rect.left, rect.top, rect.width, rect.height);
            K.stroke();
            K.fill();
        };
        function kq(K) {
            if (cj) {
                lN(K);
            } else if (an) {
                kh(K);
            } else if (df || dg) {
                kb(K);
            }
        };
        function lN(K) {
            var mA, ag, bS;
            mA = new bq(bs.x, bs.y, bO.x - bs.x, bO.y - bs.y);
            K.lineWidth = na.nodeModel.lineWidth;
            K.strokeStyle = na.nodeModel.strokeStyle;
            if (na.nodeModel.gradientFillStyle !== na.nodeModel.fillStyle) {
                ag = K.createLinearGradient(mA.left, mA.top, mA.left + mA.width, mA.top + mA.height);
                ag.addColorStop(0, na.nodeModel.fillStyle);
                ag.addColorStop(1, na.nodeModel.gradientFillStyle);
                K.fillStyle = ag;
            } else {
                K.fillStyle = na.nodeModel.fillStyle;
            }
            if (eF(na.nodeModel)) {
                bF.eg(K, mA.left, mA.top, mA.width, mA.height);
            } else if (gR(na.nodeModel)) {
                bF.cK(K, mA.left, mA.top, mA.width, mA.height);
            } else if (eo(na.nodeModel)) {
                if (na.nodeModel.polygon !== undefined && na.nodeModel.polygon !== null) {
                    bS = [];
                    na.nodeModel.x = mA.left;
                    na.nodeModel.y = mA.top;
                    na.nodeModel.w = mA.width;
                    na.nodeModel.h = mA.height;
                    eu(na.nodeModel, bS);
                    bF.hM(K, bS);
                } else {
                    bF.cK(K, mA.left, mA.top, mA.width, mA.height);
                }
            } else {
                na.nodeModel.drawShape(K, mA.left, mA.top, mA.width, mA.height);
            }
            K.stroke();
            K.fill();
        };
        function kh(K) {
            K.lineWidth = na.linkModel.lineWidth;
            K.strokeStyle = na.linkModel.strokeStyle;
            K.beginPath();
            K.moveTo(bs.x, bs.y);
            K.lineTo(bO.x, bO.y);
            K.stroke();
        };
        function kb(K) {
            K.strokeStyle = na.selRectStrokeStyle;
            K.fillStyle = na.selRectFillStyle;
            K.lineWidth = na.selRectLineWidth;
            K.strokeRect(aI.left, aI.top, aI.width, aI.height);
            K.fillRect(aI.left, aI.top, aI.width, aI.height);
        };
        function jb(K, J) {
            K.lineWidth = 0.2;
            K.strokeStyle = na.bezierSelectionLinesStrokeStyle;
            K.moveTo(J.points[0].x, J.points[0].y);
            K.lineTo(J.points[1].x, J.points[1].y);
            K.moveTo(J.points[3].x, J.points[3].y);
            K.lineTo(J.points[2].x, J.points[2].y);
            K.stroke();
        };
        function jc(K, flow) {
            K.shadowOffsetX = flow.shadowOffsetX;
            K.shadowOffsetY = flow.shadowOffsetY;
            K.shadowBlur = flow.shadowBlur;
            K.shadowColor = flow.shadowColor;
        };
        function ko(K, G) {
            K.save();
            lH(K, G);
            K.restore();
            K.save();
            lE(K, G);
            K.restore();
        };
        function lH(K, G) {
            var ag, bS;
            if (G.isShadowed) {
                jc(K, na);
            }
            K.lineWidth = G.lineWidth;
            K.strokeStyle = G.strokeStyle;
            if (eF(G)) {
                bF.eg(K, G.x, G.y, G.w, G.h);
            } else if (gR(G)) {
                bF.cK(K, G.x, G.y, G.w, G.h);
            } else if (eo(G)) {
                if (G.polygon !== undefined && G.polygon !== null) {
                    bS = [];
                    eu(G, bS);
                    bF.hM(K, bS);
                } else {
                    bF.cK(K, G.x, G.y, G.w, G.h);
                }
            } else {
                if (G.drawShape !== undefined && G.drawShape !== null) {
                    G.drawShape(K, G.x, G.y, G.w, G.h);
                } else {
                    bF.cK(K, G.x, G.y, G.w, G.h);
                }
            }
            K.stroke();
            if (G.gradientFillStyle !== G.fillStyle) {
                ag = K.createLinearGradient(G.x, G.y, G.x + G.w, G.y + G.h);
                ag.addColorStop(0, G.fillStyle);
                ag.addColorStop(1, G.gradientFillStyle);
                K.fillStyle = ag;
            } else {
                K.fillStyle = G.fillStyle;
            }
            K.fill();
            if (G.fillShape !== undefined && G.fillShape !== null) {
                G.fillShape(K, G.x, G.y, G.w, G.h);
            }
        };
        function lE(K, G) {
            var eh, size, x, y, w, h, mA, bL;
            if ((G.text === null || G.text.length === 0) && G.image === null) {
                return;
            }
            bL = G.lineWidth / 2;
            mA = bN(G);
            mA = mA.bH(bL, bL);
            gi(K, mA);
            if (G.image !== undefined && G.image !== null) {
                x = mA.left + G.imageMargin.left;
                y = mA.top + G.imageMargin.top;
                w = Math.max(0, mA.width - G.imageMargin.left - G.imageMargin.right);
                h = Math.max(0, mA.height - G.imageMargin.top - G.imageMargin.bottom);
                eh = jT(G, new bq(x, y, w, h), G.image);
                K.drawImage(G.image, eh.left, eh.top, eh.width, eh.height);
            }
            if (G.text !== undefined && G.text !== null && G.text.length > 0) {
                x = mA.left + G.textMargin.left;
                y = mA.top + G.textMargin.top;
                w = Math.max(0, mA.width - G.textMargin.left - G.textMargin.right);
                h = Math.max(0, mA.height - G.textMargin.top - G.textMargin.bottom);
                K.fillStyle = G.textFillStyle;
                K.font = G.font;
                K.textBaseline = 'top';
                size = {
                    width: 0,
                    height: 0
                };
                if (G.textLineHeight !== null) {
                    size = bF.fV(K, G.text, 0, 0, G.textLineHeight, w, false);
                }
                switch (G.textPosition) {
                case 'leftTop':
                    K.textAlign = 'start';
                    break;
                case 'centerTop':
                    K.textAlign = 'center';
                    x += w / 2;
                    break;
                case 'rightTop':
                    K.textAlign = 'end';
                    x += w;
                    break;
                case 'leftMiddle':
                    K.textAlign = 'start';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'middle';
                    }
                    y += h / 2 - size.height / 2;
                    break;
                case 'centerMiddle':
                    K.textAlign = 'center';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'middle';
                    }
                    x += w / 2;
                    y += h / 2 - size.height / 2;
                    break;
                case 'rightMiddle':
                    K.textAlign = 'end';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'middle';
                    }
                    x += w;
                    y += h / 2 - size.height / 2;
                    break;
                case 'leftBottom':
                    K.textAlign = 'start';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'bottom';
                    }
                    y += h - size.height;
                    break;
                case 'centerBottom':
                    K.textAlign = 'center';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'bottom';
                    }
                    x += w / 2;
                    y += h - size.height;
                    break;
                case 'rightBottom':
                    K.textAlign = 'end';
                    if (G.textLineHeight === null) {
                        K.textBaseline = 'bottom';
                    }
                    x += w;
                    y += h - size.height;
                    break;
                }
                if (G.textLineHeight !== null) {
                    bF.fV(K, G.text, x, y, G.textLineHeight, w, true);
                } else {
                    K.fillText(G.text, x, y);
                }
            }
        };
        function jT(G, aD, image) {
            var av = aD.gw();
            av.width = image.width;
            av.height = image.height;
            switch (G.imagePosition) {
            case 'leftTop':
                break;
            case 'leftMiddle':
                av.top += aD.height / 2 - av.height / 2;
                break;
            case 'leftBottom':
                av.top += aD.height - av.height;
                break;
            case 'rightTop':
                av.left += aD.width - av.width;
                break;
            case 'rightMiddle':
                av.left += aD.width - av.width;
                av.top += aD.height / 2 - av.height / 2;
                break;
            case 'rightBottom':
                av.left += aD.width - av.width;
                av.top += aD.height - av.height;
                break;
            case 'centerTop':
                av.left += aD.width / 2 - av.width / 2;
                break;
            case 'centerMiddle':
                av.left += aD.width / 2 - av.width / 2;
                av.top += aD.height / 2 - av.height / 2;
                break;
            case 'centerBottom':
                av.left += aD.width / 2 - av.width / 2;
                av.top += aD.height - av.height;
                break;
            }
            return av;
        };
        function lo(K, J) {
            var r, bz, ao, dM, pt, eJ, aA, w, h, aE, angle;
            K.save();
            if (J.isShadowed) {
                jc(K, J.flow);
            }
            K.lineWidth = J.lineWidth;
            K.strokeStyle = J.strokeStyle;
            switch (J.getLineStyle()) {
            case 'polyline':
            case 'database':
            case 'orthogonal':
                r = J.roundedCornerSize;
                if (r > 0 && J.points.length > 2) {
                    bF.kw(K, J.points, r);
                } else {
                    bF.io(K, J.points);
                }
                break;
            case 'spline':
                bz = [];
                bF.kZ(J.points, bz);
                bF.io(K, bz);
                break;
            case 'bezier':
                bF.lz(K, J.points[0], J.points[1], J.points[2], J.points[3]);
                break;
            }
            K.stroke();
            if (J.arrowDst !== undefined && J.arrowDst !== null) {
                kl(K, J);
            }
            if (J.arrowOrg !== undefined && J.arrowOrg !== null) {
                mj(K, J);
            }
            K.restore();
            if (J.text !== undefined && J.text !== null && J.text.length > 0) {
                ao = [];
                if (J.lineStyle === 'bezier') {
                    bF.hb(J.points[0], J.points[1], J.points[2], J.points[3], ao);
                } else {
                    ao = J.points;
                }
                dM = new ip(ao);
                pt = dM.jA(0.5);
                if (pt !== null) {
                    eJ = dM.jZ();
                    if (eJ !== null) {
                        angle = Math.atan2(eJ.y, eJ.y) * (180 / Math.PI);
                        if (eJ.y < 0) {
                            angle += 180;
                        }
                    } else {
                        angle = 0;
                    }
                    K.translate(pt.x, pt.y);
                    if (J.isOrientedText) {
                        K.rotate( - angle);
                    }
                    K.font = J.font;
                    aA = K.measureText(J.text);
                    w = aA.width;
                    h = parseInt(J.font, 10) * 1.2;
                    if (J.isOpaque && h !== undefined) {
                        aE = new bq( - w / 2, - h / 2, w, h);
                        aE.bH(2, 2);
                        K.fillStyle = J.flow.fillStyle;
                        K.fillRect(aE.left, aE.top, aE.width, aE.height);
                        K.fillStyle = J.textFillStyle;
                        K.textBaseline = 'middle';
                        K.fillText(J.text, - w / 2, 0);
                    } else {
                        K.fillStyle = J.textFillStyle;
                        K.fillText(J.text, - w / 2, - 2);
                    }
                    if (J.isOrientedText) {
                        K.rotate(angle);
                    }
                    K.translate( - pt.x, - pt.y);
                }
            }
        };
        function kl(K, J) {
            var ad, O, angle;
            ad = J.points[J.points.length - 2];
            O = J.points[J.points.length - 1];
            if (J.getLineStyle() === 'bezier') {
                ad = bF.jE(J.points[0], J.points[1], J.points[2], J.points[3]);
            }
            angle = Math.atan2(O.y - ad.y, O.x - ad.x);
            K.fillStyle = J.fillStyle;
            K.strokeStyle = J.strokeStyle;
            bF.hY(K, bF.ir(bF.gM(J.arrowDst, angle), O.x, O.y));
        };
        function mj(K, J) {
            var ad, O, angle;
            ad = J.points[1];
            O = J.points[0];
            if (J.getLineStyle() === 'bezier') {
                ad = bF.jE(J.points[3], J.points[2], J.points[1], J.points[0]);
            }
            angle = Math.atan2(O.y - ad.y, O.x - ad.x);
            K.fillStyle = J.fillStyle;
            K.strokeStyle = J.strokeStyle;
            bF.hY(K, bF.ir(bF.gM(J.arrowOrg, angle), O.x, O.y));
        };
        function eA(G, pt) {
            var K, eR, gd, gp, gW, V, bp, mA;
            mA = bN(G);
            bp = false;
            if (mA.bf(pt)) {
                if (gR(G)) {
                    bp = true;
                } else if (eF(G)) {
                    gW = mA.af();
                    eR = (mA.height / 2 * (pt.x - gW.x));
                    gd = (mA.width / 2 * (pt.y - gW.y));
                    gp = (mA.width / 2 * mA.height / 2);
                    if (eR * eR + gd * gd <= gp * gp) {
                        bp = true;
                    }
                } else if (eo(G)) {
                    K = na.canvas.getContext('2d');
                    if (G.polygon !== undefined && G.polygon !== null) {
                        V = [];
                        eu(G, V);
                        bF.hM(K, V);
                        bp = K.isPointInPath(pt.x, pt.y);
                    } else {
                        bp = true;
                    }
                } else {
                    K = na.canvas.getContext('2d');
                    if (G.drawShape !== undefined && G.drawShape !== null) {
                        G.drawShape(K, G.x, G.y, G.w, G.h);
                        bp = K.isPointInPath(pt.x, pt.y);
                    }
                }
            }
            return bp;
        };
        function lw(G, pt) {
            var aM, mA;
            mA = bN(G);
            for (aM = 0; aM < bB.length; aM++) {
                mA.bI(bB[aM]);
            }
            return (mA.bf(pt));
        };
        function fh(J, pt) {
            var bp, mA, distance, ao;
            bp = false;
            mA = bb(J);
            distance = 0.0;
            if (mA.bf(pt)) {
                ao = [];
                if (J.getLineStyle() === 'bezier') {
                    bF.hb(J.points[0], J.points[1], J.points[2], J.points[3], ao);
                } else {
                    ao = J.points;
                }
                distance = bF.kV(ao, ao.length, pt, na.linkSelectionAreaWidth);
                if (distance <= na.linkSelectionAreaWidth) {
                    aj = distance;
                    bp = true;
                }
            }
            return bp;
        };
        function cB(G, iR) {
            var mA, ptPin;
            mA = bN(G);
            ptPin = G.pins[iR];
            return {
                x: mA.left + (mA.width / 100) * ptPin[0],
                y: mA.top + (mA.height / 100) * ptPin[1]
            };
        };
        function hs(pt) {
            var i, aq;
            if (cg) {
                return;
            }
            na.hitArea = 'outSide';
            by = 'default';
            if (dh) {
                lG = nr(pt, bQ.nodes);
            } else {
                lG = nr(pt, bQ.items);
            }
            if (aR !== null) {
                if (lG === null) {
                    if (!lw(aR, pt)) {
                        aF(aR);
                        aR = null;
                        bB.splice(0, bB.length);
                        cQ = null;
                        ap();
                    } else {
                        if (ig(aR, pt)) {
                            return;
                        }
                    }
                } else if (lG !== aR) {
                    aF(aR);
                    aR = null;
                    bB.splice(0, bB.length);
                    cQ = null;
                    ap();
                }
            }
            if (lG !== null) {
                if (ai(lG)) {
                    na.hitArea = 'G';
                    if (!an && na.canMoveNode && (lG.isXMoveable || lG.isYMoveable)) {
                        by = 'move';
                    }
                } else {
                    na.hitArea = 'J';
                }
                if (ai(lG)) {
                    aR = lG;
                    if (ig(lG, pt)) {
                        return;
                    }
                }
            }
            if (!bX && an) {
                if (lG === null || !ai(lG)) {
                    bX = true;
                }
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    kR(aq, pt);
                } else if (aX(aq)) {
                    jB(aq, pt);
                }
            }
        };
        function ig(aq, pt) {
            var R;
            if (!an) {
                if (na.canDrawLink && aq.isOutLinkable) {
                    aq.refresh();
                    if (aq.pins !== null) {
                        gI(aq, bB);
                        for (R = 0; R < bB.length; R++) {
                            if (bB[R].bf(pt)) {
                                eH = R;
                                eU = bB[R].af();
                                na.hitArea = 'pin';
                                by = 'crosshair';
                                return true;
                            }
                        }
                    } else {
                        cQ = jN(aq);
                        if (cQ.bf(pt)) {
                            eU = cQ.af();
                            na.hitArea = 'centralPin';
                            by = 'crosshair';
                            return true;
                        }
                    }
                }
            } else {
                if (na.canDrawLink && aq.isInLinkable) {
                    aq.refresh();
                    if (aq.pins !== null) {
                        gI(aq, bB);
                        for (R = 0; R < bB.length; R++) {
                            if (bB[R].bf(pt)) {
                                fg = R;
                                lA = bB[R].af();
                                na.hitArea = 'pin';
                                by = 'crosshair';
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        function et(aq, pt) {
            var R, index;
            index = - 1;
            if (aq.pins !== null) {
                gI(aq, bB);
                for (R = 0; R < bB.length; R++) {
                    if (bB[R].bf(pt)) {
                        index = R;
                        break;
                    }
                }
            }
            return index;
        };
        function gI(G, bB) {
            var mA, x, y, i, size;
            size = na.pinSize;
            bB.splice(0, bB.length);
            if (G.pins !== undefined && G.pins !== null) {
                for (i = 0; i < G.pins.length; i++) {
                    mA = bN(G);
                    x = mA.left + (mA.width / 100) * G.pins[i][0];
                    y = mA.top + (mA.height / 100) * G.pins[i][1];
                    bB.push(new bq(x - size / 2, y - size / 2, size, size));
                }
            }
        };
        function jN(G) {
            var mA, x, y, size;
            size = na.pinSize;
            mA = bN(G);
            x = mA.left + mA.width / 2;
            y = mA.top + mA.height / 2;
            return new bq(x - size / 2, y - size / 2, size, size);
        };
        function iW(F) {
            var bL, mA;
            bL = F.lineWidth + 5 * na.handleSize / 2;
            if (F.isContextHandle) {
                bL += na.contextHandleSize;
            }
            mA = bN(F);
            mA = mA.bH(bL, bL);
            return mA;
        };
        function hg(J) {
            var mA, bL;
            bL = J.lineWidth + na.handleSize;
            if (J.isContextHandle) {
                bL += na.contextHandleSize;
            }
            mA = bb(J);
            mA = mA.bH(bL, bL);
            return mA;
        };
        function kR(F, pt) {
            var R, bg, mA;
            bg = [];
            mA = iW(F);
            if (!mA.bf(pt)) {
                return;
            }
            if (na.canShowContextHandle && F.isContextHandle && ds) {
                mA = ld(F);
                if (mA !== null && mA.bf(pt)) {
                    jV(F);
                    ds = false;
                    return;
                }
            }
            he(F, bg);
            for (R = 0; R < bg.length; R++) {
                if (bg[R].bf(pt)) {
                    na.hitArea = 'resizeHandle';
                    na.ey = R;
                    switch (na.ey) {
                    case bP.left:
                    case bP.right:
                        if (!na.canSizeNode || !F.isXSizeable) {
                            na.hitArea = 'outSide';
                            by = 'default';
                        } else {
                            by = 'e-resize';
                        }
                        break;
                    case bP.down:
                    case bP.up:
                        if (!na.canSizeNode || !F.isYSizeable) {
                            na.hitArea = 'outSide';
                            by = 'default';
                        } else {
                            by = 'n-resize';
                        }
                        break;
                    case bP.gQ:
                    case bP.fI:
                    case bP.ih:
                    case bP.fX:
                        if (!na.canSizeNode) {
                            na.hitArea = 'outSide';
                            by = 'default';
                        } else {
                            if (!F.isXSizeable && !F.isYSizeable) {
                                na.hitArea = 'outSide';
                                by = 'default';
                            } else if (!F.isXSizeable) {
                                na.hitArea = 'upHandle';
                                by = 'n-resize';
                            } else if (!F.isYSizeable) {
                                na.hitArea = 'leftHandle';
                                by = 'e-resize';
                            } else {
                                if (na.ey === bP.gQ || na.ey === bP.fI) {
                                    by = 'ne-resize';
                                } else {
                                    by = 'se-resize';
                                }
                            }
                        }
                        break;
                    default:
                        break;
                    }
                    break;
                }
            }
        };
        function jB(J, pt) {
            var R, aM, ba, co, mA, bU;
            if (dh || J.points.length < 2) {
                return;
            }
            mA = hg(J);
            if (!mA.bf(pt)) {
                return;
            }
            if (na.canShowContextHandle && J.isContextHandle && ds) {
                mA = lc(J);
                if (mA !== null && mA.bf(pt)) {
                    jV(J);
                    ds = false;
                    return;
                }
            }
            bU = J.points.length;
            if (hh(J)) {
                co = 2 * bU - 1;
                for (R = 0; R < co; R++) {
                    if (R%2 === 0) {
                        ba = J.points[R / 2];
                    } else {
                        aM = Math.round(R / 2) - 1;
                        ba = bF.gY(J.points[aM], J.points[aM + 1]);
                    }
                    mA = new bq(ba.x - na.handleSize / 2, ba.y - na.handleSize / 2, na.handleSize, na.handleSize);
                    if (mA.bf(pt)) {
                        bn = J;
                        na.hitArea = 'stretchHandle';
                        if (R === 0) {
                            if (na.canChangeOrg) {
                                ax = bw.first;
                                by = 'crosshair';
                            }
                        } else if (R === co - 1) {
                            if (na.canChangeDst) {
                                ax = bw.last;
                                by = 'crosshair';
                            }
                        } else {
                            if (na.canStretchLink && J.isStretchable) {
                                by = 'crosshair';
                                if (R%2 !== 0) {
                                    ax = bw.add;
                                } else {
                                    ax = bw.del;
                                }
                            } else {
                                ax = bw.none;
                            }
                        }
                        ac = (R%2 !== 0) ? Math.round(R / 2) - 1 : R / 2;
                        break;
                    }
                }
            } else {
                co = bU;
                for (R = 0; R < co; R++) {
                    ba = J.points[R];
                    mA = new bq(ba.x - na.handleSize / 2, ba.y - na.handleSize / 2, na.handleSize, na.handleSize);
                    if (mA.bf(pt)) {
                        na.hitArea = 'stretchHandle';
                        bn = J;
                        if (R === 0) {
                            if (na.canChangeOrg) {
                                ax = bw.first;
                                by = 'crosshair';
                            }
                        } else if (R === bU - 1) {
                            if (na.canChangeDst) {
                                ax = bw.last;
                                by = 'crosshair';
                            }
                        } else {
                            if (na.canStretchLink && J.isStretchable) {
                                by = 'crosshair';
                                ax = bw.change;
                            } else {
                                ax = bw.none;
                            }
                        }
                        ac = R;
                        break;
                    }
                }
            }
        };
        function nr(pt, kB) {
            var i, aq, bC, ff, gq;
            if (cA) {
                gq = dp.ev(new bq(pt.x - 5, pt.y - 5, 10, 10));
            } else {
                gq = aJ;
            }
            bC = null;
            ff = aj;
            for (i = 0; i < gq.length; i++) {
                aq = gq[i];
                switch (kB) {
                case bQ.items:
                    if (ai(aq)) {
                        if (eA(aq, pt)) {
                            bC = aq;
                        }
                    } else if (aX(aq)) {
                        if (bC !== null && ai(bC) && (aq.dst === bC || aq.org === bC)) {
                            continue;
                        }
                        if (fh(aq, pt)) {
                            if (aj <= na.linkSelectionAreaWidth) {
                                ff = aj;
                                bC = aq;
                            }
                        }
                    }
                    break;
                case bQ.nodes:
                    if (ai(aq)) {
                        if (eA(aq, pt)) {
                            bC = aq;
                        }
                    }
                    break;
                case bQ.links:
                    if (aX(aq)) {
                        if (fh(aq, pt)) {
                            if (aj <= na.linkSelectionAreaWidth) {
                                ff = aj;
                                bC = aq;
                            }
                        }
                    }
                    break;
                case bQ.hX:
                    if (aq.isSelectable) {
                        if (ai(aq)) {
                            if (eA(aq, pt)) {
                                bC = aq;
                            }
                        } else if (aX(aq)) {
                            if (bC !== null && ai(bC) && (aq.dst === bC || aq.org === bC)) {
                                continue;
                            }
                            if (fh(aq, pt)) {
                                if (aj <= na.linkSelectionAreaWidth) {
                                    ff = aj;
                                    bC = aq;
                                }
                            }
                        }
                    }
                    break;
                case bQ.jQ:
                    if (aq.isSelectable && ai(aq)) {
                        if (eA(aq, pt)) {
                            bC = aq;
                        }
                    }
                    break;
                case bQ.hZ:
                    if (aq.isSelectable && aX(aq)) {
                        if (fh(aq, pt)) {
                            if (aj <= na.linkSelectionAreaWidth) {
                                ff = aj;
                                bC = aq;
                            }
                        }
                    }
                    break;
                }
            }
            return bC;
        };
        function cv() {
            dB++;
        };
        function dF() {
            dB--;
            if (dB === 0) {
                bW();
                if (cA) {
                    fU();
                }
                na.refresh();
            }
        };
        function gH() {
            if (na.isFixedSize) {
                na.canvas.width = ii;
                na.canvas.height = jo;
            } else {
                na.canvas.width = au.width * na.zoom + ii;
                na.canvas.height = au.height * na.zoom + jo;
            }
            bv(null);
        };
        function bW() {
            if (dB !== 0) {
                return;
            }
            var mA = mG();
            if (!mA.jp(au)) {
                au = mA;
                gH();
            }
        };
        function ee(rect) {
            if (dB !== 0) {
                return;
            }
            var mA = au.jJ(rect);
            if (!mA.jp(au)) {
                au = mA;
                gH();
            }
        };
        function mG() {
            var i, aq, mA, bD, first;
            mA = new bq(0, 0, 0, 0);
            first = true;
            for (i = 0; i < aJ.length; i++) {
                aq = aJ[i];
                if (na.isNode(aq)) {
                    bD = bN(aq);
                } else {
                    bD = bb(aq);
                }
                if (first) {
                    mA = bD;
                    first = false;
                } else {
                    mA.bI(bD);
                }
            }
            mA.width += mA.left;
            mA.height += mA.top;
            mA.left = 0;
            mA.top = 0;
            return mA;
        };
        function iq(mA) {
            var div, x, y, width, height, w, h;
            width = na.canvas.width;
            height = na.canvas.height;
            div = na.canvas.parentNode;
            if (div !== null && div !== undefined) {
                w = parseInt(div.style.width, 10);
                h = parseInt(div.style.height, 10);
                if (!isNaN(w) && !isNaN(h)) {
                    width = w;
                    height = h;
                }
            }
            x = width / mA.width;
            y = height / mA.height;
            na.zoom = (x > y) ? y : x;
            na.refresh();
            if (div !== null && div !== undefined) {
                div.scrollLeft = mA.left * na.zoom;
                div.scrollTop = mA.top * na.zoom;
            }
        };
        function iH(J, gO) {
            if (!gO.isInLinkable) {
                return false;
            }
            if (!na.canReflexLink && J.org === gO) {
                return false;
            }
            if (!na.canMultiLink && jr(J.org, gO)) {
                return false;
            }
            return true;
        };
        function iu(J, hy) {
            if (!hy.isOutLinkable) {
                return false;
            }
            if (!na.canReflexLink && J.dst === hy) {
                return false;
            }
            if (!na.canMultiLink && lj(J.dst, hy)) {
                return false;
            }
            return true;
        };
        function cf() {
            if (na.canvas.setCapture) {
                na.canvas.setCapture();
            } else {
                if (window.addEventListener) {
                    window.addEventListener("mousemove", na.canvas, true);
                }
            }
        };
        function jj() {
            if (na.canvas.releaseCapture) {
                na.canvas.releaseCapture();
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", na.canvas, true);
                }
            }
        };
        function hx(e) {
            var x, y, rect;
            rect = canvas.getBoundingClientRect();
            var cx = e.clientX || e.touches[0].clientX;
            var cy = e.clientY || e.touches[0].clientY;
            x = cx - rect.left;
            y = cy - rect.top;
            x += na.xCustomOffset;
            y += na.yCustomOffset;
            return {
                'x': x,
                'y': y
            };
        };
        function jf(e) {
            na.refresh();
        };
        function mH(e) {
            e.preventDefault();
            hN(e);
        };
        function mk(e) {
            e.preventDefault();
            lv(e);
        };
        function nm(e) {
            jL(e);
        };
        function hN(e) {
            var cD, am, pt, ae, ce, fz, gy, fT, hJ, hd;
            pt = hx(e);
            ae = {
                out: 0,
                mZ: 1,
                G: 2,
                iQ: 3,
                hn: 4,
                hQ: 5,
                link: 6,
                gf: 7,
                jn: 8,
                iL: 9
            };
            ce = na.canMultiSelect && (e.shiftKey || e.ctrlKey);
            fz = false;
            gy = false;
            fT = false;
            hJ = false;
            hd = false;
            pt.x = pt.x / na.zoom;
            pt.y = pt.y / na.zoom;
            ds = true;
            dY = true;
            ek = false;
            fN = false;
            ef = false;
            fs = false;
            fj = false;
            er = false;
            eP = false;
            fp = false;
            ed = pt;
            bs = bO = pt;
            aI = new bq(bs.x, bs.y, 0, 0);
            hs(pt);
            if (na.hitArea === 'stretchHandle') {
                ek = true;
                return;
            } else if (na.hitArea === 'resizeHandle') {
                if (na.gridSnap) {
                    bO = bF.du(pt, na.gridSizeX, na.gridSizeY);
                }
                fs = true;
                return;
            } else if (na.hitArea === 'pin' || na.hitArea === 'centralPin') {
                fj = true;
                bX = false;
                origin = aR;
                bO = eU;
                bs = eU;
                return;
            }
            am = lG;
            if (am !== null && am.isSelectable) {
                if (aX(am)) {
                    if (am.getIsSelected()) {
                        cD = ce ? ae.iL : ae.gf;
                    } else {
                        cD = ce ? ae.jn : ae.link;
                    }
                } else if (ai(am)) {
                    if (am.getIsSelected()) {
                        cD = ce ? ae.hQ : ae.iQ;
                    } else {
                        cD = ce ? ae.hn : ae.G;
                    }
                }
            } else {
                cD = ce ? ae.mZ : ae.out;
            }
            switch (cD) {
            case ae.out:
                dk();
                if (na.mouseSelection === 'none') {
                    if (na.canDrawNode) {
                        gy = true;
                    }
                } else if (na.mouseSelection === 'zoom') {
                    hJ = true;
                } else if (na.mouseSelection === 'pan') {
                    hd = true;
                } else if (na.mouseSelection !== 'none' && na.mouseSelection !== 'zoom') {
                    fT = true;
                }
                break;
            case ae.link:
                dk();
                if (am !== null) {
                    am.setIsSelected(true);
                }
                break;
            case ae.G:
                dk();
                if (am !== null) {
                    am.setIsSelected(true);
                }
                if (am !== null) {
                    if (na.canMoveNode && (am.isXMoveable || am.isYMoveable)) {
                        fz = true;
                    }
                }
                break;
            case ae.iQ:
                if (am !== null) {
                    if (na.canMoveNode && (am.isXMoveable || am.isYMoveable)) {
                        fz = true;
                    }
                }
                break;
            case ae.gf:
                if (na.canMoveNode) {
                    fz = true;
                }
                break;
            case ae.hQ:
            case ae.hn:
            case ae.iL:
            case ae.jn:
                if (am !== null) {
                    am.setIsSelected(!am.getIsSelected());
                }
                break;
            default:
                break;
            }
            if (fz) {
                fN = true;
                if (na.gridSnap) {
                    bO = bF.du(bO, na.gridSizeX, na.gridSizeY);
                }
            } else if (gy) {
                ef = true;
                if (na.gridSnap) {
                    bO = bF.du(bO, na.gridSizeX, na.gridSizeY);
                }
                bs = bO;
            } else if (fT) {
                er = true;
            } else if (hJ) {
                eP = true;
            } else if (hd) {
                fp = true;
            }
            ap();
        };
        function lv(e) {
            var pt, parent, isParentDiv;
            pt = hx(e);
            parent = na.canvas.parentNode;
            if (parent !== null) {
                dc = {
                    x: pt.x - parent.scrollLeft,
                    y: pt.y - parent.scrollTop
                };
            }
            pt.x = pt.x / na.zoom;
            pt.y = pt.y / na.zoom;
            if (dY) {
                if (Math.abs(pt.x - ed.x) < fB && Math.abs(pt.y - ed.y) < fB) {
                    return;
                }
                dY = false;
            }
            hs(pt);
            na.canvas.style.cursor = by;
            if (ds) {
                if (ef) {
                    if (!cC(kx, parent)) {
                        fQ(pt);
                    }
                } else if (fj) {
                    if (!cC(kt, parent)) {
                        gu(pt);
                    }
                } else if (fN) {
                    if (!cC(lq, parent)) {
                        hi(pt);
                    }
                } else if (fs) {
                    if (!cC(autoSize, parent)) {
                        gl(pt);
                    }
                } else if (ek) {
                    if (!cC(kW, parent)) {
                        gF(pt);
                    }
                } else if (er) {
                    if (!cC(jX, parent)) {
                        gr(pt);
                    }
                } else if (eP) {
                    if (!cC(mD, parent)) {
                        hf(pt);
                    }
                } else if (fp) {
                    lp(pt);
                }
            }
        };
        function jL(e) {
            jj();
            if (ds) {
                ds = false;
                if (cj) {
                    cj = false;
                    jG();
                } else if (an) {
                    an = false;
                    ly();
                } else if (cT) {
                    cT = false;
                    jR();
                } else if (di) {
                    di = false;
                    ky();
                } else if (dh) {
                    dh = false;
                    mQ();
                } else if (df) {
                    df = false;
                    np();
                } else if (dg) {
                    dg = false;
                    me();
                } else if (cg) {
                    cg = false;
                    kM();
                }
            }
        };
        function cC(kg, div) {
            var fc, dW, mA, w, h;
            if (div === null || div === undefined) {
                return false;
            }
            w = parseInt(div.style.width, 10);
            h = parseInt(div.style.height, 10);
            if (isNaN(w) || isNaN(h)) {
                return false;
            }
            fc = div.scrollLeft;
            dW = div.scrollTop;
            mA = new bq(0, 0, w, h);
            mA.width -= 20;
            mA.height -= 20;
            if (!mA.bf(dc)) {
                if (na.canDragScroll) {
                    dJ = 'none';
                    cY = 'none';
                    if (dc.x > mA.left + mA.width) {
                        dJ = 'right';
                    } else if (dc.x < mA.left && fc > 0) {
                        dJ = 'left';
                    }
                    if (dc.y > mA.top + mA.height) {
                        cY = 'bottom';
                    } else if (dc.y < mA.top && dW > 0) {
                        cY = 'top';
                    }
                    if (dJ !== 'none' || cY !== 'none') {
                        if (!fK) {
                            cp = setInterval(kg, hw);
                            fK = true;
                        }
                    }
                }
                return true;
            }
            if (cp !== null) {
                clearInterval(cp);
            }
            fK = false;
            return false;
        };
        function lq() {
            hi(cS());
        };
        function autoSize() {
            gl(cS());
        };
        function kW() {
            gF(cS());
        };
        function kx() {
            fQ(cS());
        };
        function kt() {
            gu(cS());
        };
        function jX() {
            gr(cS());
        };
        function mD() {
            hf(cS());
        };
        function cS() {
            var hC, gh, div, fc, dW;
            if (!ds) {
                if (cp !== null) {
                    clearInterval(cp);
                }
                fK = false;
            }
            hC = 0;
            gh = 0;
            if (dJ !== 'none') {
                hC = (dJ === 'right') ? gz : - gz;
            }
            if (cY !== 'none') {
                gh = (cY === 'bottom') ? gX : - gX;
            }
            div = na.canvas.parentNode;
            if (div !== null && div !== undefined) {
                fc = div.scrollLeft;
                dW = div.scrollTop;
                div.scrollLeft = fc + hC;
                div.scrollTop = dW + gh;
                return {
                    x: div.scrollLeft + dc.x,
                    y: div.scrollTop + dc.y
                };
            }
            return {
                x: 0,
                y: 0
            };
        };
        function mE() {
            cj = true;
            cf();
        };
        function fQ(pt) {
            var mA, bL;
            if (na.gridSnap) {
                pt = bF.du(pt, na.gridSizeX, na.gridSizeY);
            }
            if (!cj) {
                mE();
            }
            bL = na.nodeModel.lineWidth + na.handleSize;
            mA = bF.aV(bs, bO);
            mA = mA.bH(bL, bL);
            bv(mA);
            mA = bF.aV(bs, pt);
            mA = mA.bH(bL, bL);
            bv(mA);
            ap();
            bO = pt;
        };
        function jG() {
            var mA, bD, bL, F;
            mA = bF.aV(bs, bO);
            bL = na.nodeModel.lineWidth + na.handleSize;
            bD = mA.bH(bL, bL);
            bv(bD);
            ap();
            if (!na.canDrawNode) {
                return;
            }
            if (mA.width > gv && mA.height > gv) {
                F = jz(mA.left, mA.top, mA.width, mA.height);
                if (F !== null && F.isSelectable) {
                    dk();
                    F.setIsSelected(true);
                }
            }
        };
        function mX() {
            an = true;
            cf();
        };
        function gu(pt) {
            var mA, bL;
            if (!an) {
                mX();
            }
            if (!bX) {
                if (lG === null || !ai(lG)) {
                    bX = true;
                }
            }
            bL = 2 * na.linkModel.lineWidth;
            mA = bF.aV(bs, bO);
            mA = mA.bH(bL, bL);
            bv(mA);
            mA = bF.aV(bs, pt);
            mA = mA.bH(bL, bL);
            bv(mA);
            bO = pt;
            ap();
        };
        function ly() {
            var mA, pinOrg, pinDst, destination, J, lineStyle, bL;
            bL = 2 * na.linkModel.lineWidth;
            mA = bF.aV(bs, bO);
            mA = mA.bH(bL, bL);
            bv(mA);
            ap();
            if (!na.canDrawLink) {
                return;
            }
            pinOrg = eH;
            pinDst = fg;
            eH = null;
            fg = null;
            destination = aR !== null ? aR : nr(bO, bQ.nodes);
            if (destination === null || origin === null) {
                return;
            }
            if (!destination.isInLinkable) {
                return;
            }
            if (origin === destination) {
                if (!na.canReflexLink) {
                    return;
                }
                if (!bX) {
                    return;
                }
            }
            if (!na.canMultiLink && jr(origin, destination)) {
                return;
            }
            if (origin.pins !== null && pinOrg === null) {
                return;
            }
            if (destination.pins !== null && pinDst === null) {
                return;
            }
            lineStyle = na.linkModel.getLineStyle();
            J = jy(origin, destination, '', pinOrg, pinDst);
            if (J !== null && J.isSelectable) {
                dk();
                J.setIsSelected(true);
            }
        };
        function mP() {
            var i, R, J, aq, bA;
            cT = true;
            cf();
            cu = iw();
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    if (bM.aL()) {
                        aq.H = new ec(na, aq, bN(aq));
                    }
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        bA[R].aP = true;
                    }
                }
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        J = bA[R];
                        if (J.aP) {
                            J.H = new cq(na, J);
                            J.aP = false;
                        }
                    }
                }
            }
        };
        function hi(pt) {
            var i, aq, dG, cP;
            if (na.gridSnap) {
                pt = bF.du(pt, na.gridSizeX, na.gridSizeY);
            }
            if (!cT) {
                mP();
            }
            bM.skipUndo = true;
            dG = pt.x - bO.x;
            cP = pt.y - bO.y;
            bO = pt;
            if (cu.left + dG < 0) {
                dG -= cu.left + dG;
            }
            if (cu.top + cP < 0) {
                cP -= cu.top + cP;
            }
            if (dG !== 0 || cP !== 0) {
                gE();
                for (i = 0; i < nc.length; i++) {
                    aq = nc[i];
                    if (ai(aq)) {
                        lb(aq, dG, cP);
                    }
                }
                cu = iw();
            }
            bW();
            ap();
            bM.skipUndo = false;
        };
        function lb(F, dG, cP) {
            var pt, R, aM, J, n, bA, cR, cG;
            cR = F.isXMoveable ? dG : 0;
            cG = F.isYMoveable ? cP : 0;
            if (cR === 0 && cG === 0) {
                return;
            }
            if (cA) {
                dp.dS(F);
            }
            bA = bY(F);
            for (R = 0; R < bA.length; R++) {
                J = bA[R];
                n = J.points.length;
                bj(J);
                if (J.org.getIsSelected() && J.dst.getIsSelected()) {
                    if (J.aP) {
                        J.aP = false;
                        for (aM = 0; aM < n; aM++) {
                            pt = J.points[aM];
                            J.points[aM] = {
                                x: pt.x + cR,
                                y: pt.y + cG
                            };
                        }
                    }
                } else {
                    if (F === J.dst) {
                        if (J.dst.pins !== null || J.isDstPointAdjustable) {
                            pt = J.points[n - 1];
                            J.points[n - 1] = {
                                x: pt.x + cR,
                                y: pt.y + cG
                            };
                        }
                    }
                    if (F === J.org) {
                        if (J.org.pins !== null || J.isOrgPointAdjustable) {
                            pt = J.points[0];
                            J.points[0] = {
                                x: pt.x + cR,
                                y: pt.y + cG
                            };
                        }
                    }
                }
                bj(J);
                J.refresh();
            }
            aF(F);
            F.x += cR;
            F.y += cG;
            F.fd = bN(F);
            if (cA) {
                dp.cs(F, F.fd);
            }
            F.refresh();
            fG(F);
        };
        function iw() {
            var mA, bD, i, R, aq, bA, J;
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (na.isNode(aq)) {
                    bD = bN(aq);
                } else {
                    bD = bb(aq);
                }
                if (i === 0) {
                    mA = bD;
                } else {
                    mA.bI(bD);
                }
                if (ai(aq)) {
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        J = bA[R];
                        if (J.org.getIsSelected() && J.dst.getIsSelected()) {
                            mA.bI(bb(J));
                        }
                    }
                } else if (aX(aq)) {
                    if (i === 0 && (aq.org.getIsSelected() && aq.dst.getIsSelected())) {
                        mA = bb(aq);
                    }
                }
            }
            return mA;
        };
        function gE() {
            var i, R, bA, aq;
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        bA[R].aP = true;
                    }
                }
            }
        };
        function jR() {
            var aq, J, bA, i, R;
            if (bM.aL()) {
                bM.dN('AF_moveSelectedNodes');
                gE();
                for (i = 0; i < nc.length; i++) {
                    aq = nc[i];
                    if (ai(aq)) {
                        bM.bG(aq.H);
                        aq.H = null;
                        bA = aq.getLinks();
                        for (R = 0; R < bA.length; R++) {
                            J = bA[R];
                            bj(J);
                            if (J.aP !== undefined) {
                                if (J.aP) {
                                    J.aP = false;
                                    if (J.H !== null) {
                                        bM.bG(J.H);
                                        J.H = null;
                                    }
                                }
                                delete J["aP"];
                            }
                        }
                    }
                }
                bM.cV();
            }
        };
        function jY() {
            var i, R, aq, bA;
            di = true;
            cf();
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    if (bM.aL()) {
                        aq.H = new ec(na, aq, bN(aq));
                    }
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        bA[R].aP = true;
                    }
                }
            }
        };
        function gl(pt) {
            var i, aq, deltaX, deltaY, mA, x, y;
            if (na.gridSnap) {
                pt = bF.du(pt, na.gridSizeX, na.gridSizeY);
            }
            if (!di) {
                jY();
            }
            bM.skipUndo = true;
            deltaX = pt.x - bO.x;
            deltaY = pt.y - bO.y;
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    if (cA) {
                        dp.dS(aq);
                    }
                    mA = bN(aq);
                    x = mA.left;
                    y = mA.top;
                    dx = (x + deltaX < 0) ? 0 : deltaX;
                    dy = (y + deltaY < 0) ? 0 : deltaY;
                    switch (na.ey) {
                    case bP.ih:
                        mA.width = Math.max(mA.width - dx, na.handleSize);
                        mA.height = Math.max(mA.height - dy, na.handleSize);
                        mA.left = x + dx;
                        mA.top = y + dy;
                        break;
                    case bP.up:
                        mA.height = Math.max(mA.height - dy, na.handleSize);
                        mA.top = y + dy;
                        break;
                    case bP.fI:
                        mA.width = Math.max(mA.width + dx, na.handleSize);
                        mA.height = Math.max(mA.height - dy, na.handleSize);
                        mA.top = y + dy;
                        break;
                    case bP.left:
                        mA.width = Math.max(mA.width - dx, na.handleSize);
                        mA.left = x + dx;
                        break;
                    case bP.right:
                        mA.width = Math.max(mA.width + dx, na.handleSize);
                        break;
                    case bP.gQ:
                        mA.width = Math.max(mA.width - dx, na.handleSize);
                        mA.height = Math.max(dy + mA.height, na.handleSize);
                        mA.left = x + dx;
                        break;
                    case bP.down:
                        mA.height = Math.max(mA.height + dy, na.handleSize);
                        break;
                    case bP.fX:
                        mA.width = Math.max(mA.width + dx, na.handleSize);
                        mA.height = Math.max(dy + mA.height, na.handleSize);
                        break;
                    }
                    cF(aq, mA);
                    aq.fd = mA;
                    if (cA) {
                        dp.cs(aq, aq.fd);
                    }
                    aq.refresh();
                    jF(aq, mA);
                }
            }
            bM.skipUndo = false;
            bW();
            ap();
            bO = pt;
        };
        function jF(aq, mA) {
            var X, Y, R, bA, J, bU;
            bA = aq.getLinks();
            for (R = 0; R < bA.length; R++) {
                J = bA[R];
                if (!J.aP) {
                    if (aq === J.dst) {
                        if (J.dst.pins !== null) {
                            bU = J.points.length;
                            X = (mA.width === 0) ? 0 : ((J.points[bU - 1].x - mA.left) * mA.width) / mA.width;
                            Y = (mA.height === 0) ? 0 : (J.points[bU - 1].y - mA.top) * mA.height / mA.height;
                            J.points[bU - 1] = {
                                x: mA.left + X,
                                y: mA.top + Y
                            };
                        }
                    }
                    if (aq === J.org) {
                        if (J.org.pins !== null) {
                            X = (mA.width === 0) ? 0 : (J.points[0].x - mA.left) * mA.width / mA.width;
                            Y = (mA.height === 0) ? 0 : (J.points[0].y - mA.top) * mA.height / mA.height;
                            J.points[0] = {
                                x: mA.left + X,
                                y: mA.top + Y
                            };
                        }
                    }
                }
                if (ht(J)) {
                    J.aP = !J.aP;
                }
            }
            im(aq);
        };
        function im(F) {
            var R, n, J, bA;
            if (F.pins !== null) {
                bA = F.getLinks();
                for (R = 0; R < bA.length; R++) {
                    J = bA[R];
                    if (J.org === F && J.pinOrg !== null) {
                        J.points[0] = cB(F, J.pinOrg);
                    } else if (J.dst === F && J.pinDst !== null) {
                        n = J.points.length;
                        J.points[n - 1] = cB(F, J.pinDst);
                    }
                }
            }
        };
        function ky() {
            var i, R, aq, J, bA;
            if (bM.aL()) {
                bM.dN('AF_resizeSelectedNodes');
                for (i = 0; i < nc.length; i++) {
                    aq = nc[i];
                    if (ai(aq)) {
                        bM.bG(aq.H);
                    }
                }
                bM.cV();
            }
            for (i = 0; i < nc.length; i++) {
                aq = nc[i];
                if (ai(aq)) {
                    bA = aq.getLinks();
                    for (R = 0; R < bA.length; R++) {
                        J = bA[R];
                        bj(J);
                        if (J.aP !== undefined) {
                            delete J["flag"];
                        }
                    }
                }
            }
            ap();
        };
        function kN(J) {
            var O;
            dh = true;
            cf();
            if (bM.aL()) {
                J.H = new cq(na, J);
            }
            if (J.getLineStyle() === 'database') {
                fW(J);
            } else {
                fW(J);
                if (ax === bw.add) {
                    O = bF.gY(J.points[ac], J.points[ac + 1]);
                    kP(J, O, ac);
                    ac++;
                }
            }
        };
        function gF(pt) {
            if (bn === null) {
                return;
            }
            if (!dh) {
                kN(bn);
            }
            if (pt.x < 0) {
                pt.x = 0;
            }
            if (pt.y < 0) {
                pt.y = 0;
            }
            if (cA) {
                dp.dS(bn);
            }
            bj(bn);
            if (bn.getLineStyle() === 'database') {
                kH(pt, bn);
            } else if (bn.getLineStyle() === 'orthogonal') {
                jx(pt, bn);
            } else {
                ja(pt, bn);
            }
            bj(bn);
            bn.fd = bb(bn);
            if (cA) {
                dp.cs(bn, bn.fd);
            }
            bO = pt;
            bW();
            ap();
        };
        function mQ() {
            var J, pt, bV, org, dst, iR;
            J = bn;
            bn = null;
            ac = Math.max(Math.min(ac, J.points.length - 1), 0);
            pt = J.points[ac];
            if (hh(J) && (ax === bw.add || ax === bw.del)) {
                if (ac > 0 && ac < J.points.length - 1) {
                    bV = bF.hk(J.points[ac - 1], J.points[ac + 1], J.points[ac]);
                    if (bV <= na.removePointDistance) {
                        bj(J);
                        J.removePoint(ac);
                        bj(J);
                        ap();
                        ax = bw.none;
                        return;
                    }
                }
            }
            bj(J);
            if (J.getLineStyle() === 'database') {
                ei(J);
            } else if (J.getLineStyle() === 'orthogonal') {
                fl(J);
            }
            if (J.org.pins === null && !J.isOrgPointAdjustable) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable) {
                aC(J);
            }
            bj(J);
            ap();
            if (ax === bw.first && na.canChangeOrg) {
                org = nr(pt, bQ.nodes);
                if (org === null) {
                    J.H.undo();
                    J.fd = bb(J);
                    if (cA) {
                        dp.cs(J, J.fd);
                    }
                    bj(J);
                    ap();
                    return;
                } else {
                    if (org !== J.org) {
                        if (!iu(J, org)) {
                            J.H.undo();
                            J.fd = bb(J);
                            if (cA) {
                                dp.cs(J, J.fd);
                            }
                            bj(J);
                            ap();
                            return;
                        }
                        if (bM.aL) {
                            bM.dN('AF_linkStretch');
                        }
                        if (bM.aL()) {
                            bM.bG(J.H);
                        }
                        J.setOrg(org);
                        iR = et(org, pt);
                        if (iR >= 0) {
                            v(J, iR);
                        }
                        ap();
                        if (bM.aL) {
                            bM.cV();
                        }
                        return;
                    } else {
                        iR = et(org, pt);
                        if (iR >= 0) {
                            v(J, iR);
                            return;
                        } else {
                            J.H.undo();
                            J.fd = bb(J);
                            if (cA) {
                                dp.cs(J, J.fd);
                            }
                            bj(J);
                            ap();
                            return;
                        }
                    }
                }
            }
            if (ax === bw.last && na.canChangeDst) {
                dst = nr(pt, bQ.nodes);
                if (dst === null) {
                    J.H.undo();
                    J.fd = bb(J);
                    if (cA) {
                        dp.cs(J, J.fd);
                    }
                    bj(J);
                    ap();
                    return;
                } else {
                    if (dst !== J.dst) {
                        if (!iH(J, dst)) {
                            J.H.undo();
                            J.fd = bb(J);
                            if (cA) {
                                dp.cs(J, J.fd);
                            }
                            bj(J);
                            ap();
                            return;
                        }
                        if (bM.aL) {
                            bM.dN('AF_linkStretch');
                        }
                        if (bM.aL()) {
                            bM.bG(J.H);
                        }
                        J.setDst(dst);
                        iR = et(dst, pt);
                        if (iR >= 0) {
                            aB(J, iR);
                        }
                        if (bM.aL) {
                            bM.cV();
                        }
                        return;
                    } else {
                        iR = et(dst, pt);
                        if (iR >= 0) {
                            aB(J, iR);
                            return;
                        } else {
                            J.H.undo();
                            J.fd = bb(J);
                            if (cA) {
                                dp.cs(J, J.fd);
                            }
                            bj(J);
                            ap();
                            return;
                        }
                    }
                }
            }
            if (bM.aL()) {
                bM.bG(J.H);
            }
        };
        function ja(pt, J) {
            if (ac >= 0 && ac <= J.points.length - 1) {
                J.points[ac] = pt;
            }
            if (J.org.pins === null && !J.isOrgPointAdjustable && ax !== bw.first) {
                bK(J);
            }
            if (J.dst.pins === null && !J.isDstPointAdjustable && ax !== bw.last) {
                aC(J);
            }
        };
        function kH(pt, J) {
            var dr, cX;
            switch (ac) {
            case 0:
                dr = J.points[1].x - J.points[0].x;
                J.points[0] = pt;
                J.points[1] = {
                    x: J.points[0].x + dr,
                    y: pt.y
                };
                break;
            case 1:
                J.points[1] = {
                    x: pt.x,
                    y: J.points[1].y
                };
                break;
            case 2:
                J.points[2] = {
                    x: pt.x,
                    y: J.points[2].y
                };
                break;
            case 3:
                cX = J.points[2].x - J.points[3].x;
                J.points[3] = pt;
                J.points[2] = {
                    x: J.points[3].x + cX,
                    y: pt.y
                };
                break;
            }
        };
        function jx(pt, J) {
            var n, fY, iB;
            n = J.points.length;
            if (n === 3) {
                if (ac === 0) {
                    if (!J.ij) {
                        J.points[0] = pt;
                        J.points[1] = {
                            x: pt.x,
                            y: J.points[1].y
                        };
                    } else {
                        J.points[0] = pt;
                        J.points[1] = {
                            x: J.points[1].x,
                            y: pt.y
                        };
                    }
                } else if (ac === 1) {
                    if (!J.ij) {
                        pt.x = Math.min(pt.x, J.org.x + J.org.w);
                        pt.x = Math.max(pt.x, J.org.x);
                        pt.y = Math.min(pt.y, J.dst.y + J.dst.h);
                        pt.y = Math.max(pt.y, J.dst.y);
                        if (J.org.pins === null) {
                            J.points[0] = {
                                x: pt.x,
                                y: J.points[0].y
                            };
                            J.points[1] = {
                                x: pt.x,
                                y: J.points[1].y
                            };
                        }
                        if (J.dst.pins === null) {
                            J.points[2] = {
                                x: J.points[2].x,
                                y: pt.y
                            };
                            J.points[1] = {
                                x: J.points[1].x,
                                y: pt.y
                            };
                        }
                    } else {
                        pt.x = Math.min(pt.x, J.dst.x + J.dst.w);
                        pt.x = Math.max(pt.x, J.dst.x);
                        pt.y = Math.min(pt.y, J.org.y + J.org.h);
                        pt.y = Math.max(pt.y, J.org.y);
                        if (J.org.pins === null) {
                            J.points[0] = {
                                x: pt.x,
                                y: J.points[0].y
                            };
                            J.points[1] = {
                                x: J.points[1].x,
                                y: pt.y
                            };
                        }
                        if (J.dst.pins === null) {
                            J.points[2] = {
                                x: J.points[2].x,
                                y: pt.y
                            };
                            J.points[1] = {
                                x: pt.x,
                                y: J.points[1].y
                            };
                        }
                    }
                } else if (ac === 2) {
                    if (!J.ij) {
                        J.points[2] = pt;
                        J.points[1] = {
                            x: J.points[1].x,
                            y: pt.y
                        };
                    } else {
                        J.points[2] = pt;
                        J.points[1] = {
                            x: pt.x,
                            y: J.points[1].y
                        };
                    }
                }
            } else {
                if (ac <= 1) {
                    if (ac === 1) {
                        if (!J.ij) {
                            if (J.org.pins !== null) {
                                J.points[1] = {
                                    x: J.points[1].x,
                                    y: pt.y
                                };
                            } else {
                                pt.x = Math.min(pt.x, J.org.x + J.org.w);
                                pt.x = Math.max(pt.x, J.org.x);
                                J.points[0] = {
                                    x: pt.x,
                                    y: J.points[0].y
                                };
                                J.points[1] = pt;
                            }
                        } else {
                            if (J.org.pins !== null) {
                                J.points[1] = {
                                    x: pt.x,
                                    y: J.points[1].y
                                };
                            } else {
                                pt.y = Math.min(pt.y, J.org.y + J.org.h);
                                pt.y = Math.max(pt.y, J.org.y);
                                J.points[0] = {
                                    x: J.points[0].x,
                                    y: pt.y
                                };
                                J.points[1] = pt;
                            }
                        }
                    }
                } else if (ac >= n - 2) {
                    iB = (J.ij && (n - 1)%2 === 0) || (!J.ij && (n - 1)%2 === 1);
                    if (ac === n - 2) {
                        if (iB) {
                            if (J.dst.pins !== null) {
                                J.points[n - 2] = {
                                    x: J.points[n - 1].x,
                                    y: pt.y
                                };
                            } else {
                                pt.x = Math.min(pt.x, J.dst.x + J.dst.w);
                                pt.x = Math.max(pt.x, J.dst.x);
                                J.points[n - 1] = {
                                    x: pt.x,
                                    y: J.points[n - 1].y
                                };
                                J.points[n - 2] = pt;
                            }
                        } else {
                            if (J.dst.pins !== null) {
                                J.points[n - 2] = {
                                    x: pt.x,
                                    y: J.points[n - 1].y
                                };
                            } else {
                                pt.y = Math.min(pt.y, J.dst.y + J.dst.h);
                                pt.y = Math.max(pt.y, J.dst.y);
                                J.points[n - 1] = {
                                    x: J.points[n - 1].x,
                                    y: pt.y
                                };
                                J.points[n - 2] = pt;
                            }
                        }
                    }
                }
            }
            js(J, pt, ac);
        };
        function kr() {
            df = true;
            cf();
        };
        function gr(pt) {
            var mA;
            if (!df) {
                kr();
            }
            mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            aI = bF.aV(bs, pt);
            mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            if (na.canSelectOnMouseMove) {
                iA();
            }
            ap();
        };
        function np() {
            var mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            if (!na.canSelectOnMouseMove) {
                iA();
            }
            ap();
        };
        function iA() {
            dk();
            var dq = aI;
            switch (na.mouseSelection) {
            case 'selection2':
                if (na.canMultiSelect) {
                    iG(dq);
                }
                break;
            case 'selection':
                if (na.canMultiSelect) {
                    ji(dq);
                }
                break;
            }
        };
        function iG(dq) {
            var i, mA, aq;
            dk();
            for (i = 0; i < aJ.length; i++) {
                aq = aJ[i];
                if (na.isNode(aq)) {
                    mA = bN(aq);
                } else {
                    mA = bb(aq);
                }
                if (dq.lK(mA)) {
                    if (aq.isSelectable) {
                        aq.setIsSelected(true);
                    }
                }
            }
        };
        function ji(dq) {
            var i, mA, aq;
            dk();
            for (i = 0; i < aJ.length; i++) {
                aq = aJ[i];
                if (na.isNode(aq)) {
                    mA = bN(aq);
                } else {
                    mA = bb(aq);
                }
                if (dq.fb(mA)) {
                    if (aq.isSelectable) {
                        aq.setIsSelected(true);
                    }
                }
            }
        };
        function kF() {
            dg = true;
            cf();
        };
        function hf(pt) {
            var mA;
            if (!dg) {
                kF();
            }
            mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            aI = bF.aV(bs, pt);
            mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            ap();
        };
        function me() {
            var mA = aI.bH(na.selRectLineWidth, na.selRectLineWidth);
            bv(mA);
            ap();
            if (mA.width > fB && mA.height > fB) {
                iq(mA);
            }
        };
        function ke(pt) {
            var div = na.canvas.parentNode;
            if (div !== null && div !== undefined) {
                cg = true;
                fv = div.scrollLeft;
                en = div.scrollTop;
                cz = pt;
                cf();
            }
        };
        function lp(pt) {
            var hq, eL, fL, div, w, h;
            if (!cg) {
                ke(pt);
            }
            div = na.canvas.parentNode;
            if (div !== null && div !== undefined) {
                w = parseInt(div.style.width, 10);
                h = parseInt(div.style.height, 10);
                if (!isNaN(w) && !isNaN(h)) {
                    hq = (na.canvas.width > w) || (na.canvas.height > h);
                    by = hq ? 'pointer' : 'default';
                    eL = (pt.x > cz.x) ? - (pt.x - cz.x) : (cz.x - pt.x);
                    fL = (pt.y > cz.y) ? - (pt.y - cz.y) : (cz.y - pt.y);
                    if (eL !== 0) {
                        fv += eL;
                        div.scrollLeft = fv;
                    }
                    if (fL !== 0) {
                        en += fL;
                        div.scrollTop = en;
                    }
                }
            }
        };
        function kM() {}
    }
};

