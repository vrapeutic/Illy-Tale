// ThreeDOM.js r40 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array) {
  window.Int32Array = Array;
  window.Float32Array = Array;
}
THREE.Color = function (a) {
  this.setHex(a);
};
THREE.Color.prototype = {
  copy: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    this.hex = a.hex;
  },
  setHex: function (a) {
    this.hex = ~~a & 16777215;
    this.updateRGB();
  },
  setRGB: function (a, b, c) {
    this.r = a;
    this.g = b;
    this.b = c;
    this.updateHex();
  },
  setHSV: function (a, b, c) {
    var d, e, h, f, j, g;
    if (c == 0) d = e = h = 0;
    else {
      f = Math.floor(a * 6);
      j = a * 6 - f;
      a = c * (1 - b);
      g = c * (1 - b * j);
      b = c * (1 - b * (1 - j));
      switch (f) {
        case 1:
          d = g;
          e = c;
          h = a;
          break;
        case 2:
          d = a;
          e = c;
          h = b;
          break;
        case 3:
          d = a;
          e = g;
          h = c;
          break;
        case 4:
          d = b;
          e = a;
          h = c;
          break;
        case 5:
          d = c;
          e = a;
          h = g;
          break;
        case 6:
        case 0:
          d = c;
          e = b;
          h = a;
      }
    }
    this.setRGB(d, e, h);
  },
  updateHex: function () {
    this.hex =
      (~~(this.r * 255) << 16) ^ (~~(this.g * 255) << 8) ^ ~~(this.b * 255);
  },
  updateRGB: function () {
    this.r = ((this.hex >> 16) & 255) / 255;
    this.g = ((this.hex >> 8) & 255) / 255;
    this.b = (this.hex & 255) / 255;
  },
  clone: function () {
    return new THREE.Color(this.hex);
  },
};
THREE.Vector2 = function (a, b) {
  this.set(a || 0, b || 0);
};
THREE.Vector2.prototype = {
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a);
    return this;
  },
  negate: function () {
    this.set(-this.x, -this.y);
    return this;
  },
  unit: function () {
    this.multiplyScalar(1 / this.length());
    return this;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y);
  },
};
THREE.Vector3 = function (a, b, c) {
  this.set(a || 0, b || 0, c || 0);
};
THREE.Vector3.prototype = {
  set: function (a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y, a.z);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y, a.z + b.z);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y, this.z + a.z);
    return this;
  },
  addScalar: function (a) {
    this.set(this.x + a, this.y + a, this.z + a);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y, a.z - b.z);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y, this.z - a.z);
    return this;
  },
  cross: function (a, b) {
    this.set(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
    return this;
  },
  crossSelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z;
    this.set(c * a.z - d * a.y, d * a.x - b * a.z, b * a.y - c * a.x);
    return this;
  },
  multiply: function (a, b) {
    this.set(a.x * b.x, a.y * b.y, a.z * b.z);
    return this;
  },
  multiplySelf: function (a) {
    this.set(this.x * a.x, this.y * a.y, this.z * a.z);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a, this.z * a);
    return this;
  },
  divideSelf: function (a) {
    this.set(this.x / a.x, this.y / a.y, this.z / a.z);
    return this;
  },
  divideScalar: function (a) {
    this.set(this.x / a, this.y / a, this.z / a);
    return this;
  },
  negate: function () {
    this.set(-this.x, -this.y, -this.z);
    return this;
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      c = this.y - a.y;
    a = this.z - a.z;
    return b * b + c * c + a * a;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  lengthManhattan: function () {
    return this.x + this.y + this.z;
  },
  normalize: function () {
    var a = this.length();
    a > 0 ? this.multiplyScalar(1 / a) : this.set(0, 0, 0);
    return this;
  },
  setPositionFromMatrix: function (a) {
    this.x = a.n14;
    this.y = a.n24;
    this.z = a.n34;
  },
  setRotationFromMatrix: function (a) {
    var b = Math.cos(this.y);
    this.y = Math.asin(a.n13);
    if (Math.abs(b) > 1.0e-5) {
      this.x = Math.atan2(-a.n23 / b, a.n33 / b);
      this.z = Math.atan2(-a.n12 / b, a.n11 / b);
    } else {
      this.x = 0;
      this.z = Math.atan2(a.n21, a.n22);
    }
  },
  setLength: function (a) {
    return this.normalize().multiplyScalar(a);
  },
  isZero: function () {
    return (
      Math.abs(this.x) < 1.0e-4 &&
      Math.abs(this.y) < 1.0e-4 &&
      Math.abs(this.z) < 1.0e-4
    );
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
};
THREE.Vector4 = function (a, b, c, d) {
  this.set(a || 0, b || 0, c || 0, d || 1);
};
THREE.Vector4.prototype = {
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y, a.z, a.w || 1);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a, this.z * a, this.w * a);
    return this;
  },
  divideScalar: function (a) {
    this.set(this.x / a, this.y / a, this.z / a, this.w / a);
    return this;
  },
  lerpSelf: function (a, b) {
    this.set(
      this.x + (a.x - this.x) * b,
      this.y + (a.y - this.y) * b,
      this.z + (a.z - this.z) * b,
      this.w + (a.w - this.w) * b
    );
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
};
THREE.Ray = function (a, b) {
  this.origin = a || new THREE.Vector3();
  this.direction = b || new THREE.Vector3();
};
THREE.Ray.prototype = {
  intersectScene: function (a) {
    return this.intersectObjects(a.objects);
  },
  intersectObjects: function (a) {
    var b,
      c,
      d,
      e = [];
    b = 0;
    for (c = a.length; b < c; b++) {
      d = a[b];
      d instanceof THREE.Mesh && (e = e.concat(this.intersectObject(d)));
    }
    e.sort(function (h, f) {
      return h.distance - f.distance;
    });
    return e;
  },
  intersectObject: function (a) {
    function b(t, r, C, G) {
      G = G.clone().subSelf(r);
      C = C.clone().subSelf(r);
      var K = t.clone().subSelf(r);
      t = G.dot(G);
      r = G.dot(C);
      G = G.dot(K);
      var x = C.dot(C);
      C = C.dot(K);
      K = 1 / (t * x - r * r);
      x = (x * G - r * C) * K;
      t = (t * C - r * G) * K;
      return x > 0 && t > 0 && x + t < 1;
    }
    var c,
      d,
      e,
      h,
      f,
      j,
      g,
      i,
      l,
      k,
      m,
      n = a.geometry,
      p = n.vertices,
      q = [];
    c = 0;
    for (d = n.faces.length; c < d; c++) {
      e = n.faces[c];
      k = this.origin.clone();
      m = this.direction.clone();
      g = a.matrixWorld;
      h = g.multiplyVector3(p[e.a].position.clone());
      f = g.multiplyVector3(p[e.b].position.clone());
      j = g.multiplyVector3(p[e.c].position.clone());
      g =
        e instanceof THREE.Face4
          ? g.multiplyVector3(p[e.d].position.clone())
          : null;
      i = a.matrixRotationWorld.multiplyVector3(e.normal.clone());
      l = m.dot(i);
      if (a.doubleSided || (a.flipSided ? l > 0 : l < 0)) {
        i = i.dot(new THREE.Vector3().sub(h, k)) / l;
        k = k.addSelf(m.multiplyScalar(i));
        if (e instanceof THREE.Face3) {
          if (b(k, h, f, j)) {
            e = {
              distance: this.origin.distanceTo(k),
              point: k,
              face: e,
              object: a,
            };
            q.push(e);
          }
        } else if (
          e instanceof THREE.Face4 &&
          (b(k, h, f, g) || b(k, f, j, g))
        ) {
          e = {
            distance: this.origin.distanceTo(k),
            point: k,
            face: e,
            object: a,
          };
          q.push(e);
        }
      }
    }
    return q;
  },
};
THREE.Rectangle = function () {
  function a() {
    h = d - b;
    f = e - c;
  }
  var b,
    c,
    d,
    e,
    h,
    f,
    j = !0;
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return c;
  };
  this.getWidth = function () {
    return h;
  };
  this.getHeight = function () {
    return f;
  };
  this.getLeft = function () {
    return b;
  };
  this.getTop = function () {
    return c;
  };
  this.getRight = function () {
    return d;
  };
  this.getBottom = function () {
    return e;
  };
  this.set = function (g, i, l, k) {
    j = !1;
    b = g;
    c = i;
    d = l;
    e = k;
    a();
  };
  this.addPoint = function (g, i) {
    if (j) {
      j = !1;
      b = g;
      c = i;
      d = g;
      e = i;
    } else {
      b = b < g ? b : g;
      c = c < i ? c : i;
      d = d > g ? d : g;
      e = e > i ? e : i;
    }
    a();
  };
  this.add3Points = function (g, i, l, k, m, n) {
    if (j) {
      j = !1;
      b = g < l ? (g < m ? g : m) : l < m ? l : m;
      c = i < k ? (i < n ? i : n) : k < n ? k : n;
      d = g > l ? (g > m ? g : m) : l > m ? l : m;
      e = i > k ? (i > n ? i : n) : k > n ? k : n;
    } else {
      b =
        g < l
          ? g < m
            ? g < b
              ? g
              : b
            : m < b
            ? m
            : b
          : l < m
          ? l < b
            ? l
            : b
          : m < b
          ? m
          : b;
      c =
        i < k
          ? i < n
            ? i < c
              ? i
              : c
            : n < c
            ? n
            : c
          : k < n
          ? k < c
            ? k
            : c
          : n < c
          ? n
          : c;
      d =
        g > l
          ? g > m
            ? g > d
              ? g
              : d
            : m > d
            ? m
            : d
          : l > m
          ? l > d
            ? l
            : d
          : m > d
          ? m
          : d;
      e =
        i > k
          ? i > n
            ? i > e
              ? i
              : e
            : n > e
            ? n
            : e
          : k > n
          ? k > e
            ? k
            : e
          : n > e
          ? n
          : e;
    }
    a();
  };
  this.addRectangle = function (g) {
    if (j) {
      j = !1;
      b = g.getLeft();
      c = g.getTop();
      d = g.getRight();
      e = g.getBottom();
    } else {
      b = b < g.getLeft() ? b : g.getLeft();
      c = c < g.getTop() ? c : g.getTop();
      d = d > g.getRight() ? d : g.getRight();
      e = e > g.getBottom() ? e : g.getBottom();
    }
    a();
  };
  this.inflate = function (g) {
    b -= g;
    c -= g;
    d += g;
    e += g;
    a();
  };
  this.minSelf = function (g) {
    b = b > g.getLeft() ? b : g.getLeft();
    c = c > g.getTop() ? c : g.getTop();
    d = d < g.getRight() ? d : g.getRight();
    e = e < g.getBottom() ? e : g.getBottom();
    a();
  };
  this.instersects = function (g) {
    return (
      Math.min(d, g.getRight()) - Math.max(b, g.getLeft()) >= 0 &&
      Math.min(e, g.getBottom()) - Math.max(c, g.getTop()) >= 0
    );
  };
  this.empty = function () {
    j = !0;
    e = d = c = b = 0;
    a();
  };
  this.isEmpty = function () {
    return j;
  };
};
THREE.Matrix3 = function () {
  this.m = [];
};
THREE.Matrix3.prototype = {
  transpose: function () {
    var a,
      b = this.m;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this;
  },
  transposeIntoArray: function (a) {
    var b = this.m;
    a[0] = b[0];
    a[1] = b[3];
    a[2] = b[6];
    a[3] = b[1];
    a[4] = b[4];
    a[5] = b[7];
    a[6] = b[2];
    a[7] = b[5];
    a[8] = b[8];
    return this;
  },
};
THREE.Matrix4 = function (a, b, c, d, e, h, f, j, g, i, l, k, m, n, p, q) {
  this.set(
    a || 1,
    b || 0,
    c || 0,
    d || 0,
    e || 0,
    h || 1,
    f || 0,
    j || 0,
    g || 0,
    i || 0,
    l || 1,
    k || 0,
    m || 0,
    n || 0,
    p || 0,
    q || 1
  );
  this.flat = Array(16);
  this.m33 = new THREE.Matrix3();
};
THREE.Matrix4.prototype = {
  set: function (a, b, c, d, e, h, f, j, g, i, l, k, m, n, p, q) {
    this.n11 = a;
    this.n12 = b;
    this.n13 = c;
    this.n14 = d;
    this.n21 = e;
    this.n22 = h;
    this.n23 = f;
    this.n24 = j;
    this.n31 = g;
    this.n32 = i;
    this.n33 = l;
    this.n34 = k;
    this.n41 = m;
    this.n42 = n;
    this.n43 = p;
    this.n44 = q;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (a) {
    this.set(
      a.n11,
      a.n12,
      a.n13,
      a.n14,
      a.n21,
      a.n22,
      a.n23,
      a.n24,
      a.n31,
      a.n32,
      a.n33,
      a.n34,
      a.n41,
      a.n42,
      a.n43,
      a.n44
    );
    return this;
  },
  lookAt: function (a, b, c) {
    var d = THREE.Matrix4.__v1,
      e = THREE.Matrix4.__v2,
      h = THREE.Matrix4.__v3;
    h.sub(a, b).normalize();
    if (h.length() === 0) h.z = 1;
    d.cross(c, h).normalize();
    if (d.length() === 0) {
      h.x += 1.0e-4;
      d.cross(c, h).normalize();
    }
    e.cross(h, d).normalize();
    this.n11 = d.x;
    this.n12 = e.x;
    this.n13 = h.x;
    this.n21 = d.y;
    this.n22 = e.y;
    this.n23 = h.y;
    this.n31 = d.z;
    this.n32 = e.z;
    this.n33 = h.z;
    return this;
  },
  multiplyVector3: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = 1 / (this.n41 * b + this.n42 * c + this.n43 * d + this.n44);
    a.x = (this.n11 * b + this.n12 * c + this.n13 * d + this.n14) * e;
    a.y = (this.n21 * b + this.n22 * c + this.n23 * d + this.n24) * e;
    a.z = (this.n31 * b + this.n32 * c + this.n33 * d + this.n34) * e;
    return a;
  },
  multiplyVector4: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = a.w;
    a.x = this.n11 * b + this.n12 * c + this.n13 * d + this.n14 * e;
    a.y = this.n21 * b + this.n22 * c + this.n23 * d + this.n24 * e;
    a.z = this.n31 * b + this.n32 * c + this.n33 * d + this.n34 * e;
    a.w = this.n41 * b + this.n42 * c + this.n43 * d + this.n44 * e;
    return a;
  },
  rotateAxis: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z;
    a.x = b * this.n11 + c * this.n12 + d * this.n13;
    a.y = b * this.n21 + c * this.n22 + d * this.n23;
    a.z = b * this.n31 + c * this.n32 + d * this.n33;
    a.normalize();
    return a;
  },
  crossVector: function (a) {
    var b = new THREE.Vector4();
    b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
    b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
    b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;
    b.w = a.w
      ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w
      : 1;
    return b;
  },
  multiply: function (a, b) {
    var c = a.n11,
      d = a.n12,
      e = a.n13,
      h = a.n14,
      f = a.n21,
      j = a.n22,
      g = a.n23,
      i = a.n24,
      l = a.n31,
      k = a.n32,
      m = a.n33,
      n = a.n34,
      p = a.n41,
      q = a.n42,
      t = a.n43,
      r = a.n44,
      C = b.n11,
      G = b.n12,
      K = b.n13,
      x = b.n14,
      o = b.n21,
      Q = b.n22,
      H = b.n23,
      N = b.n24,
      O = b.n31,
      u = b.n32,
      s = b.n33,
      I = b.n34;
    this.n11 = c * C + d * o + e * O;
    this.n12 = c * G + d * Q + e * u;
    this.n13 = c * K + d * H + e * s;
    this.n14 = c * x + d * N + e * I + h;
    this.n21 = f * C + j * o + g * O;
    this.n22 = f * G + j * Q + g * u;
    this.n23 = f * K + j * H + g * s;
    this.n24 = f * x + j * N + g * I + i;
    this.n31 = l * C + k * o + m * O;
    this.n32 = l * G + k * Q + m * u;
    this.n33 = l * K + k * H + m * s;
    this.n34 = l * x + k * N + m * I + n;
    this.n41 = p * C + q * o + t * O;
    this.n42 = p * G + q * Q + t * u;
    this.n43 = p * K + q * H + t * s;
    this.n44 = p * x + q * N + t * I + r;
    return this;
  },
  multiplyToArray: function (a, b, c) {
    this.multiply(a, b);
    c[0] = this.n11;
    c[1] = this.n21;
    c[2] = this.n31;
    c[3] = this.n41;
    c[4] = this.n12;
    c[5] = this.n22;
    c[6] = this.n32;
    c[7] = this.n42;
    c[8] = this.n13;
    c[9] = this.n23;
    c[10] = this.n33;
    c[11] = this.n43;
    c[12] = this.n14;
    c[13] = this.n24;
    c[14] = this.n34;
    c[15] = this.n44;
    return this;
  },
  multiplySelf: function (a) {
    this.multiply(this, a);
    return this;
  },
  multiplyScalar: function (a) {
    this.n11 *= a;
    this.n12 *= a;
    this.n13 *= a;
    this.n14 *= a;
    this.n21 *= a;
    this.n22 *= a;
    this.n23 *= a;
    this.n24 *= a;
    this.n31 *= a;
    this.n32 *= a;
    this.n33 *= a;
    this.n34 *= a;
    this.n41 *= a;
    this.n42 *= a;
    this.n43 *= a;
    this.n44 *= a;
    return this;
  },
  determinant: function () {
    var a = this.n11,
      b = this.n12,
      c = this.n13,
      d = this.n14,
      e = this.n21,
      h = this.n22,
      f = this.n23,
      j = this.n24,
      g = this.n31,
      i = this.n32,
      l = this.n33,
      k = this.n34,
      m = this.n41,
      n = this.n42,
      p = this.n43,
      q = this.n44;
    return (
      d * f * i * m -
      c * j * i * m -
      d * h * l * m +
      b * j * l * m +
      c * h * k * m -
      b * f * k * m -
      d * f * g * n +
      c * j * g * n +
      d * e * l * n -
      a * j * l * n -
      c * e * k * n +
      a * f * k * n +
      d * h * g * p -
      b * j * g * p -
      d * e * i * p +
      a * j * i * p +
      b * e * k * p -
      a * h * k * p -
      c * h * g * q +
      b * f * g * q +
      c * e * i * q -
      a * f * i * q -
      b * e * l * q +
      a * h * l * q
    );
  },
  transpose: function () {
    var a;
    a = this.n21;
    this.n21 = this.n12;
    this.n12 = a;
    a = this.n31;
    this.n31 = this.n13;
    this.n13 = a;
    a = this.n32;
    this.n32 = this.n23;
    this.n23 = a;
    a = this.n41;
    this.n41 = this.n14;
    this.n14 = a;
    a = this.n42;
    this.n42 = this.n24;
    this.n24 = a;
    a = this.n43;
    this.n43 = this.n34;
    this.n43 = a;
    return this;
  },
  clone: function () {
    var a = new THREE.Matrix4();
    a.n11 = this.n11;
    a.n12 = this.n12;
    a.n13 = this.n13;
    a.n14 = this.n14;
    a.n21 = this.n21;
    a.n22 = this.n22;
    a.n23 = this.n23;
    a.n24 = this.n24;
    a.n31 = this.n31;
    a.n32 = this.n32;
    a.n33 = this.n33;
    a.n34 = this.n34;
    a.n41 = this.n41;
    a.n42 = this.n42;
    a.n43 = this.n43;
    a.n44 = this.n44;
    return a;
  },
  flatten: function () {
    this.flat[0] = this.n11;
    this.flat[1] = this.n21;
    this.flat[2] = this.n31;
    this.flat[3] = this.n41;
    this.flat[4] = this.n12;
    this.flat[5] = this.n22;
    this.flat[6] = this.n32;
    this.flat[7] = this.n42;
    this.flat[8] = this.n13;
    this.flat[9] = this.n23;
    this.flat[10] = this.n33;
    this.flat[11] = this.n43;
    this.flat[12] = this.n14;
    this.flat[13] = this.n24;
    this.flat[14] = this.n34;
    this.flat[15] = this.n44;
    return this.flat;
  },
  flattenToArray: function (a) {
    a[0] = this.n11;
    a[1] = this.n21;
    a[2] = this.n31;
    a[3] = this.n41;
    a[4] = this.n12;
    a[5] = this.n22;
    a[6] = this.n32;
    a[7] = this.n42;
    a[8] = this.n13;
    a[9] = this.n23;
    a[10] = this.n33;
    a[11] = this.n43;
    a[12] = this.n14;
    a[13] = this.n24;
    a[14] = this.n34;
    a[15] = this.n44;
    return a;
  },
  flattenToArrayOffset: function (a, b) {
    a[b] = this.n11;
    a[b + 1] = this.n21;
    a[b + 2] = this.n31;
    a[b + 3] = this.n41;
    a[b + 4] = this.n12;
    a[b + 5] = this.n22;
    a[b + 6] = this.n32;
    a[b + 7] = this.n42;
    a[b + 8] = this.n13;
    a[b + 9] = this.n23;
    a[b + 10] = this.n33;
    a[b + 11] = this.n43;
    a[b + 12] = this.n14;
    a[b + 13] = this.n24;
    a[b + 14] = this.n34;
    a[b + 15] = this.n44;
    return a;
  },
  setTranslation: function (a, b, c) {
    this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
    return this;
  },
  setScale: function (a, b, c) {
    this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationX: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationY: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationZ: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationAxis: function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = 1 - c,
      h = a.x,
      f = a.y,
      j = a.z,
      g = e * h,
      i = e * f;
    this.set(
      g * h + c,
      g * f - d * j,
      g * j + d * f,
      0,
      g * f + d * j,
      i * f + c,
      i * j - d * h,
      0,
      g * j - d * f,
      i * j + d * h,
      e * j * j + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  },
  setPosition: function (a) {
    this.n14 = a.x;
    this.n24 = a.y;
    this.n34 = a.z;
    return this;
  },
  getPosition: function () {
    if (!this.position) this.position = new THREE.Vector3();
    this.position.set(this.n14, this.n24, this.n34);
    return this.position;
  },
  getColumnX: function () {
    if (!this.columnX) this.columnX = new THREE.Vector3();
    this.columnX.set(this.n11, this.n21, this.n31);
    return this.columnX;
  },
  getColumnY: function () {
    if (!this.columnY) this.columnY = new THREE.Vector3();
    this.columnY.set(this.n12, this.n22, this.n32);
    return this.columnY;
  },
  getColumnZ: function () {
    if (!this.columnZ) this.columnZ = new THREE.Vector3();
    this.columnZ.set(this.n13, this.n23, this.n33);
    return this.columnZ;
  },
  setRotationFromEuler: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z;
    a = Math.cos(b);
    b = Math.sin(b);
    var e = Math.cos(c);
    c = Math.sin(c);
    var h = Math.cos(d);
    d = Math.sin(d);
    var f = a * c,
      j = b * c;
    this.n11 = e * h;
    this.n12 = -e * d;
    this.n13 = c;
    this.n21 = j * h + a * d;
    this.n22 = -j * d + a * h;
    this.n23 = -b * e;
    this.n31 = -f * h + b * d;
    this.n32 = f * d + b * h;
    this.n33 = a * e;
    return this;
  },
  setRotationFromQuaternion: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = a.w,
      h = b + b,
      f = c + c,
      j = d + d;
    a = b * h;
    var g = b * f;
    b *= j;
    var i = c * f;
    c *= j;
    d *= j;
    h *= e;
    f *= e;
    e *= j;
    this.n11 = 1 - (i + d);
    this.n12 = g - e;
    this.n13 = b + f;
    this.n21 = g + e;
    this.n22 = 1 - (a + d);
    this.n23 = c - h;
    this.n31 = b - f;
    this.n32 = c + h;
    this.n33 = 1 - (a + i);
    return this;
  },
  scale: function (a) {
    var b = a.x,
      c = a.y;
    a = a.z;
    this.n11 *= b;
    this.n12 *= c;
    this.n13 *= a;
    this.n21 *= b;
    this.n22 *= c;
    this.n23 *= a;
    this.n31 *= b;
    this.n32 *= c;
    this.n33 *= a;
    this.n41 *= b;
    this.n42 *= c;
    this.n43 *= a;
    return this;
  },
  extractPosition: function (a) {
    this.n14 = a.n14;
    this.n24 = a.n24;
    this.n34 = a.n34;
  },
  extractRotation: function (a, b) {
    var c = 1 / b.x,
      d = 1 / b.y,
      e = 1 / b.z;
    this.n11 = a.n11 * c;
    this.n21 = a.n21 * c;
    this.n31 = a.n31 * c;
    this.n12 = a.n12 * d;
    this.n22 = a.n22 * d;
    this.n32 = a.n32 * d;
    this.n13 = a.n13 * e;
    this.n23 = a.n23 * e;
    this.n33 = a.n33 * e;
  },
};
THREE.Matrix4.makeInvert = function (a, b) {
  var c = a.n11,
    d = a.n12,
    e = a.n13,
    h = a.n14,
    f = a.n21,
    j = a.n22,
    g = a.n23,
    i = a.n24,
    l = a.n31,
    k = a.n32,
    m = a.n33,
    n = a.n34,
    p = a.n41,
    q = a.n42,
    t = a.n43,
    r = a.n44;
  b === undefined && (b = new THREE.Matrix4());
  b.n11 = g * n * q - i * m * q + i * k * t - j * n * t - g * k * r + j * m * r;
  b.n12 = h * m * q - e * n * q - h * k * t + d * n * t + e * k * r - d * m * r;
  b.n13 = e * i * q - h * g * q + h * j * t - d * i * t - e * j * r + d * g * r;
  b.n14 = h * g * k - e * i * k - h * j * m + d * i * m + e * j * n - d * g * n;
  b.n21 = i * m * p - g * n * p - i * l * t + f * n * t + g * l * r - f * m * r;
  b.n22 = e * n * p - h * m * p + h * l * t - c * n * t - e * l * r + c * m * r;
  b.n23 = h * g * p - e * i * p - h * f * t + c * i * t + e * f * r - c * g * r;
  b.n24 = e * i * l - h * g * l + h * f * m - c * i * m - e * f * n + c * g * n;
  b.n31 = j * n * p - i * k * p + i * l * q - f * n * q - j * l * r + f * k * r;
  b.n32 = h * k * p - d * n * p - h * l * q + c * n * q + d * l * r - c * k * r;
  b.n33 = e * i * p - h * j * p + h * f * q - c * i * q - d * f * r + c * j * r;
  b.n34 = h * j * l - d * i * l - h * f * k + c * i * k + d * f * n - c * j * n;
  b.n41 = g * k * p - j * m * p - g * l * q + f * m * q + j * l * t - f * k * t;
  b.n42 = d * m * p - e * k * p + e * l * q - c * m * q - d * l * t + c * k * t;
  b.n43 = e * j * p - d * g * p - e * f * q + c * g * q + d * f * t - c * j * t;
  b.n44 = d * g * l - e * j * l + e * f * k - c * g * k - d * f * m + c * j * m;
  b.multiplyScalar(1 / a.determinant());
  return b;
};
THREE.Matrix4.makeInvert3x3 = function (a) {
  var b = a.m33,
    c = b.m,
    d = a.n33 * a.n22 - a.n32 * a.n23,
    e = -a.n33 * a.n21 + a.n31 * a.n23,
    h = a.n32 * a.n21 - a.n31 * a.n22,
    f = -a.n33 * a.n12 + a.n32 * a.n13,
    j = a.n33 * a.n11 - a.n31 * a.n13,
    g = -a.n32 * a.n11 + a.n31 * a.n12,
    i = a.n23 * a.n12 - a.n22 * a.n13,
    l = -a.n23 * a.n11 + a.n21 * a.n13,
    k = a.n22 * a.n11 - a.n21 * a.n12;
  a = a.n11 * d + a.n21 * f + a.n31 * i;
  if (a == 0) throw "matrix not invertible";
  a = 1 / a;
  c[0] = a * d;
  c[1] = a * e;
  c[2] = a * h;
  c[3] = a * f;
  c[4] = a * j;
  c[5] = a * g;
  c[6] = a * i;
  c[7] = a * l;
  c[8] = a * k;
  return b;
};
THREE.Matrix4.makeFrustum = function (a, b, c, d, e, h) {
  var f;
  f = new THREE.Matrix4();
  f.n11 = (2 * e) / (b - a);
  f.n12 = 0;
  f.n13 = (b + a) / (b - a);
  f.n14 = 0;
  f.n21 = 0;
  f.n22 = (2 * e) / (d - c);
  f.n23 = (d + c) / (d - c);
  f.n24 = 0;
  f.n31 = 0;
  f.n32 = 0;
  f.n33 = -(h + e) / (h - e);
  f.n34 = (-2 * h * e) / (h - e);
  f.n41 = 0;
  f.n42 = 0;
  f.n43 = -1;
  f.n44 = 0;
  return f;
};
THREE.Matrix4.makePerspective = function (a, b, c, d) {
  var e;
  a = c * Math.tan((a * Math.PI) / 360);
  e = -a;
  return THREE.Matrix4.makeFrustum(e * b, a * b, e, a, c, d);
};
THREE.Matrix4.makeOrtho = function (a, b, c, d, e, h) {
  var f, j, g, i;
  f = new THREE.Matrix4();
  j = b - a;
  g = c - d;
  i = h - e;
  f.n11 = 2 / j;
  f.n12 = 0;
  f.n13 = 0;
  f.n14 = -((b + a) / j);
  f.n21 = 0;
  f.n22 = 2 / g;
  f.n23 = 0;
  f.n24 = -((c + d) / g);
  f.n31 = 0;
  f.n32 = 0;
  f.n33 = -2 / i;
  f.n34 = -((h + e) / i);
  f.n41 = 0;
  f.n42 = 0;
  f.n43 = 0;
  f.n44 = 1;
  return f;
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Object3D = function () {
  this.parent = undefined;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.scale = new THREE.Vector3(1, 1, 1);
  this.dynamic = !1;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4();
  this.matrixWorld = new THREE.Matrix4();
  this.matrixRotationWorld = new THREE.Matrix4();
  this.matrixAutoUpdate = !0;
  this.matrixWorldNeedsUpdate = !0;
  this.quaternion = new THREE.Quaternion();
  this.useQuaternion = !1;
  this.boundRadius = 0;
  this.boundRadiusScale = 1;
  this.visible = !0;
  this._vector = new THREE.Vector3();
  this.name = "";
};
THREE.Object3D.prototype = {
  translate: function (a, b) {
    this.matrix.rotateAxis(b);
    this.position.addSelf(b.multiplyScalar(a));
  },
  translateX: function (a) {
    this.translate(a, this._vector.set(1, 0, 0));
  },
  translateY: function (a) {
    this.translate(a, this._vector.set(0, 1, 0));
  },
  translateZ: function (a) {
    this.translate(a, this._vector.set(0, 0, 1));
  },
  lookAt: function (a) {
    this.matrix.lookAt(a, this.position, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix);
  },
  addChild: function (a) {
    if (this.children.indexOf(a) === -1) {
      a.parent !== undefined && a.parent.removeChild(a);
      a.parent = this;
      this.children.push(a);
      for (var b = this; b.parent !== undefined; ) b = b.parent;
      b !== undefined && b instanceof THREE.Scene && b.addChildRecurse(a);
    }
  },
  removeChild: function (a) {
    var b = this.children.indexOf(a);
    if (b !== -1) {
      a.parent = undefined;
      this.children.splice(b, 1);
    }
  },
  getChildByName: function (a, b) {
    var c, d, e;
    c = 0;
    for (d = this.children.length; c < d; c++) {
      e = this.children[c];
      if (e.name === a) return e;
      if (b) {
        e = e.getChildByName(a, b);
        if (e !== undefined) return e;
      }
    }
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    this.useQuaternion
      ? this.matrix.setRotationFromQuaternion(this.quaternion)
      : this.matrix.setRotationFromEuler(this.rotation);
    if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
      this.matrix.scale(this.scale);
      this.boundRadiusScale = Math.max(
        this.scale.x,
        Math.max(this.scale.y, this.scale.z)
      );
    }
    this.matrixWorldNeedsUpdate = !0;
  },
  update: function (a, b, c) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || b) {
      a
        ? this.matrixWorld.multiply(a, this.matrix)
        : this.matrixWorld.copy(this.matrix);
      this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
      this.matrixWorldNeedsUpdate = !1;
      b = !0;
    }
    a = 0;
    for (var d = this.children.length; a < d; a++)
      this.children[a].update(this.matrixWorld, b, c);
  },
};
THREE.Quaternion = function (a, b, c, d) {
  this.set(a || 0, b || 0, c || 0, d !== undefined ? d : 1);
};
THREE.Quaternion.prototype = {
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  },
  setFromEuler: function (a) {
    var b = (0.5 * Math.PI) / 360,
      c = a.x * b,
      d = a.y * b,
      e = a.z * b;
    a = Math.cos(d);
    d = Math.sin(d);
    b = Math.cos(-e);
    e = Math.sin(-e);
    var h = Math.cos(c);
    c = Math.sin(c);
    var f = a * b,
      j = d * e;
    this.w = f * h - j * c;
    this.x = f * c + j * h;
    this.y = d * b * h + a * e * c;
    this.z = a * e * h - d * b * c;
    return this;
  },
  setFromAxisAngle: function (a, b) {
    var c = b / 2,
      d = Math.sin(c);
    this.x = a.x * d;
    this.y = a.y * d;
    this.z = a.z * d;
    this.w = Math.cos(c);
    return this;
  },
  calculateW: function () {
    this.w = -Math.sqrt(
      Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
    );
    return this;
  },
  inverse: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var a = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    if (a == 0) this.w = this.z = this.y = this.x = 0;
    else {
      a = 1 / a;
      this.x *= a;
      this.y *= a;
      this.z *= a;
      this.w *= a;
    }
    return this;
  },
  multiplySelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = this.w,
      h = a.x,
      f = a.y,
      j = a.z;
    a = a.w;
    this.x = b * a + e * h + c * j - d * f;
    this.y = c * a + e * f + d * h - b * j;
    this.z = d * a + e * j + b * f - c * h;
    this.w = e * a - b * h - c * f - d * j;
    return this;
  },
  multiply: function (a, b) {
    this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
    this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
    this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
    this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
    return this;
  },
  multiplyVector3: function (a, b) {
    b || (b = a);
    var c = a.x,
      d = a.y,
      e = a.z,
      h = this.x,
      f = this.y,
      j = this.z,
      g = this.w,
      i = g * c + f * e - j * d,
      l = g * d + j * c - h * e,
      k = g * e + h * d - f * c;
    c = -h * c - f * d - j * e;
    b.x = i * g + c * -h + l * -j - k * -f;
    b.y = l * g + c * -f + k * -h - i * -j;
    b.z = k * g + c * -j + i * -f - l * -h;
    return b;
  },
};
THREE.Quaternion.slerp = function (a, b, c, d) {
  var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
  if (Math.abs(e) >= 1) {
    c.w = a.w;
    c.x = a.x;
    c.y = a.y;
    c.z = a.z;
    return c;
  }
  var h = Math.acos(e),
    f = Math.sqrt(1 - e * e);
  if (Math.abs(f) < 0.001) {
    c.w = 0.5 * (a.w + b.w);
    c.x = 0.5 * (a.x + b.x);
    c.y = 0.5 * (a.y + b.y);
    c.z = 0.5 * (a.z + b.z);
    return c;
  }
  e = Math.sin((1 - d) * h) / f;
  d = Math.sin(d * h) / f;
  c.w = a.w * e + b.w * d;
  c.x = a.x * e + b.x * d;
  c.y = a.y * e + b.y * d;
  c.z = a.z * e + b.z * d;
  return c;
};
THREE.Vertex = function (a) {
  this.position = a || new THREE.Vector3();
};
THREE.Face3 = function (a, b, c, d, e, h) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3();
  this.vertexNormals = d instanceof Array ? d : [];
  this.color = e instanceof THREE.Color ? e : new THREE.Color();
  this.vertexColors = e instanceof Array ? e : [];
  this.vertexTangents = [];
  this.materials = h instanceof Array ? h : [h];
  this.centroid = new THREE.Vector3();
};
THREE.Face4 = function (a, b, c, d, e, h, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3();
  this.vertexNormals = e instanceof Array ? e : [];
  this.color = h instanceof THREE.Color ? h : new THREE.Color();
  this.vertexColors = h instanceof Array ? h : [];
  this.vertexTangents = [];
  this.materials = f instanceof Array ? f : [f];
  this.centroid = new THREE.Vector3();
};
THREE.UV = function (a, b) {
  this.set(a || 0, b || 0);
};
THREE.UV.prototype = {
  set: function (a, b) {
    this.u = a;
    this.v = b;
    return this;
  },
  copy: function (a) {
    this.set(a.u, a.v);
    return this;
  },
};
THREE.Camera = function (a, b, c, d, e) {
  THREE.Object3D.call(this);
  this.fov = a || 50;
  this.aspect = b || 1;
  this.near = c || 0.1;
  this.far = d || 2e3;
  this.target = e || new THREE.Object3D();
  this.useTarget = !0;
  this.matrixWorldInverse = new THREE.Matrix4();
  this.projectionMatrix = null;
  this.updateProjectionMatrix();
};
THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (a, b) {
  this.matrix.rotateAxis(b);
  this.position.addSelf(b.multiplyScalar(a));
  this.target.position.addSelf(b.multiplyScalar(a));
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix = THREE.Matrix4.makePerspective(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
};
THREE.Camera.prototype.update = function (a, b, c) {
  if (this.useTarget) {
    this.matrix.lookAt(this.position, this.target.position, this.up);
    this.matrix.setPosition(this.position);
    a
      ? this.matrixWorld.multiply(a, this.matrix)
      : this.matrixWorld.copy(this.matrix);
    THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    b = !0;
  } else {
    this.matrixAutoUpdate && this.updateMatrix();
    if (b || this.matrixWorldNeedsUpdate) {
      a
        ? this.matrixWorld.multiply(a, this.matrix)
        : this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = !1;
      b = !0;
      THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    }
  }
  for (a = 0; a < this.children.length; a++)
    this.children[a].update(this.matrixWorld, b, c);
};
THREE.ParticleDOMMaterial = function (a) {
  THREE.Material.call(this);
  this.domElement = a;
};
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.materials = a instanceof Array ? a : [a];
};
THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.Bone = function (a) {
  THREE.Object3D.call(this);
  this.skin = a;
  this.skinMatrix = new THREE.Matrix4();
  this.hasNoneBoneChildren = !1;
};
THREE.Bone.prototype = new THREE.Object3D();
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (a, b, c) {
  this.matrixAutoUpdate && (b |= this.updateMatrix());
  if (b || this.matrixWorldNeedsUpdate) {
    a
      ? this.skinMatrix.multiply(a, this.matrix)
      : this.skinMatrix.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    b = !0;
  }
  var d,
    e = this.children.length;
  if (this.hasNoneBoneChildren) {
    this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
    for (d = 0; d < e; d++) {
      a = this.children[d];
      a instanceof THREE.Bone
        ? a.update(this.skinMatrix, b, c)
        : a.update(this.matrixWorld, !0, c);
    }
  } else for (d = 0; d < e; d++) this.children[d].update(this.skinMatrix, b, c);
};
THREE.Bone.prototype.addChild = function (a) {
  if (this.children.indexOf(a) === -1) {
    a.parent !== undefined && a.parent.removeChild(a);
    a.parent = this;
    this.children.push(a);
    if (!(a instanceof THREE.Bone)) this.hasNoneBoneChildren = !0;
  }
};
THREE.Sound = function (a, b, c, d) {
  THREE.Object3D.call(this);
  this.isLoaded = !1;
  this.isAddedToDOM = !1;
  this.isPlaying = !1;
  this.duration = -1;
  this.radius = b !== undefined ? Math.abs(b) : 100;
  this.volume = Math.min(1, Math.max(0, c !== undefined ? c : 1));
  this.domElement = document.createElement("audio");
  this.domElement.volume = 0;
  this.domElement.pan = 0;
  this.domElement.loop = d !== undefined ? d : !0;
  this.sources = a instanceof Array ? a : [a];
  var e;
  c = this.sources.length;
  for (a = 0; a < c; a++) {
    b = this.sources[a];
    b.toLowerCase();
    if (b.indexOf(".mp3") !== -1) e = "audio/mpeg";
    else if (b.indexOf(".ogg") !== -1) e = "audio/ogg";
    else b.indexOf(".wav") !== -1 && (e = "audio/wav");
    if (this.domElement.canPlayType(e)) {
      e = document.createElement("source");
      e.src = this.sources[a];
      this.domElement.THREESound = this;
      this.domElement.appendChild(e);
      this.domElement.addEventListener("canplay", this.onLoad, !0);
      this.domElement.load();
      break;
    }
  }
};
THREE.Sound.prototype = new THREE.Object3D();
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function () {
  var a = this.THREESound;
  if (!a.isLoaded) {
    this.removeEventListener("canplay", this.onLoad, !0);
    a.isLoaded = !0;
    a.duration = this.duration;
    a.isPlaying && a.play();
  }
};
THREE.Sound.prototype.addToDOM = function (a) {
  this.isAddedToDOM = !0;
  a.appendChild(this.domElement);
};
THREE.Sound.prototype.play = function (a) {
  this.isPlaying = !0;
  if (this.isLoaded) {
    this.domElement.play();
    if (a) this.domElement.currentTime = a % this.duration;
  }
};
THREE.Sound.prototype.pause = function () {
  this.isPlaying = !1;
  this.domElement.pause();
};
THREE.Sound.prototype.stop = function () {
  this.isPlaying = !1;
  this.domElement.pause();
  this.domElement.currentTime = 0;
};
THREE.Sound.prototype.calculateVolumeAndPan = function (a) {
  a = a.length();
  this.domElement.volume =
    a <= this.radius ? this.volume * (1 - a / this.radius) : 0;
};
THREE.Sound.prototype.update = function (a, b, c) {
  if (this.matrixAutoUpdate) {
    this.matrix.setPosition(this.position);
    b = !0;
  }
  if (b || this.matrixWorldNeedsUpdate) {
    a
      ? this.matrixWorld.multiply(a, this.matrix)
      : this.matrixWorld.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    b = !0;
  }
  var d = this.children.length;
  for (a = 0; a < d; a++) this.children[a].update(this.matrixWorld, b, c);
};
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.matrixAutoUpdate = !1;
  this.collisions = this.fog = null;
  this.objects = [];
  this.lights = [];
  this.sounds = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
THREE.Scene.prototype = new THREE.Object3D();
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (a) {
  this.supr.addChild.call(this, a);
  this.addChildRecurse(a);
};
THREE.Scene.prototype.addChildRecurse = function (a) {
  if (a instanceof THREE.Light)
    this.lights.indexOf(a) === -1 && this.lights.push(a);
  else if (a instanceof THREE.Sound)
    this.sounds.indexOf(a) === -1 && this.sounds.push(a);
  else if (
    !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
    this.objects.indexOf(a) === -1
  ) {
    this.objects.push(a);
    this.__objectsAdded.push(a);
  }
  for (var b = 0; b < a.children.length; b++)
    this.addChildRecurse(a.children[b]);
};
THREE.Scene.prototype.removeChild = function (a) {
  this.supr.removeChild.call(this, a);
  this.removeChildRecurse(a);
};
THREE.Scene.prototype.removeChildRecurse = function (a) {
  if (a instanceof THREE.Light) {
    var b = this.lights.indexOf(a);
    b !== -1 && this.lights.splice(b, 1);
  } else if (a instanceof THREE.Sound) {
    b = this.sounds.indexOf(a);
    b !== -1 && this.sounds.splice(b, 1);
  } else if (!(a instanceof THREE.Camera)) {
    b = this.objects.indexOf(a);
    if (b !== -1) {
      this.objects.splice(b, 1);
      this.__objectsRemoved.push(a);
    }
  }
  for (b = 0; b < a.children.length; b++)
    this.removeChildRecurse(a.children[b]);
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Projector = function () {
  function a() {
    var u = (g[j] = g[j] || new THREE.RenderableVertex());
    j++;
    return u;
  }
  function b(u, s) {
    return s.z - u.z;
  }
  function c(u, s) {
    var I = 0,
      J = 1,
      M = u.z + u.w,
      E = s.z + s.w,
      w = -u.z + u.w,
      z = -s.z + s.w;
    if (M >= 0 && E >= 0 && w >= 0 && z >= 0) return !0;
    else if ((M < 0 && E < 0) || (w < 0 && z < 0)) return !1;
    else {
      if (M < 0) I = Math.max(I, M / (M - E));
      else E < 0 && (J = Math.min(J, M / (M - E)));
      if (w < 0) I = Math.max(I, w / (w - z));
      else z < 0 && (J = Math.min(J, w / (w - z)));
      if (J < I) return !1;
      else {
        u.lerpSelf(s, I);
        s.lerpSelf(u, 1 - J);
        return !0;
      }
    }
  }
  var d,
    e,
    h = [],
    f,
    j,
    g = [],
    i,
    l,
    k = [],
    m,
    n = [],
    p,
    q,
    t = [],
    r,
    C,
    G = [],
    K = new THREE.Vector4(),
    x = new THREE.Vector4(),
    o = new THREE.Matrix4(),
    Q = new THREE.Matrix4(),
    H = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
    ],
    N = new THREE.Vector4(),
    O = new THREE.Vector4();
  this.projectVector = function (u, s) {
    o.multiply(s.projectionMatrix, s.matrixWorldInverse);
    o.multiplyVector3(u);
    return u;
  };
  this.unprojectVector = function (u, s) {
    o.multiply(s.matrixWorld, THREE.Matrix4.makeInvert(s.projectionMatrix));
    o.multiplyVector3(u);
    return u;
  };
  this.projectObjects = function (u, s, I) {
    s = [];
    var J, M, E;
    e = 0;
    M = u.objects;
    u = 0;
    for (J = M.length; u < J; u++) {
      E = M[u];
      var w;
      if (!(w = !E.visible))
        if ((w = E instanceof THREE.Mesh)) {
          a: {
            w = void 0;
            for (
              var z = E.matrixWorld,
                A =
                  -E.geometry.boundingSphere.radius *
                  Math.max(E.scale.x, Math.max(E.scale.y, E.scale.z)),
                D = 0;
              D < 6;
              D++
            ) {
              w = H[D].x * z.n14 + H[D].y * z.n24 + H[D].z * z.n34 + H[D].w;
              if (w <= A) {
                w = !1;
                break a;
              }
            }
            w = !0;
          }
          w = !w;
        }
      if (!w) {
        w = h[e] = h[e] || new THREE.RenderableObject();
        e++;
        d = w;
        K.copy(E.position);
        o.multiplyVector3(K);
        d.object = E;
        d.z = K.z;
        s.push(d);
      }
    }
    I && s.sort(b);
    return s;
  };
  this.projectScene = function (u, s, I) {
    var J = [],
      M = s.near,
      E = s.far,
      w,
      z,
      A,
      D,
      v,
      F,
      B,
      L,
      P,
      y,
      R,
      U,
      W,
      X,
      S,
      V,
      T;
    C = q = m = l = 0;
    s.matrixAutoUpdate && s.update(undefined, !0);
    u.update(undefined, !1, s);
    o.multiply(s.projectionMatrix, s.matrixWorldInverse);
    H[0].set(o.n41 - o.n11, o.n42 - o.n12, o.n43 - o.n13, o.n44 - o.n14);
    H[1].set(o.n41 + o.n11, o.n42 + o.n12, o.n43 + o.n13, o.n44 + o.n14);
    H[2].set(o.n41 + o.n21, o.n42 + o.n22, o.n43 + o.n23, o.n44 + o.n24);
    H[3].set(o.n41 - o.n21, o.n42 - o.n22, o.n43 - o.n23, o.n44 - o.n24);
    H[4].set(o.n41 - o.n31, o.n42 - o.n32, o.n43 - o.n33, o.n44 - o.n34);
    H[5].set(o.n41 + o.n31, o.n42 + o.n32, o.n43 + o.n33, o.n44 + o.n34);
    for (w = 0; w < 6; w++) {
      P = H[w];
      P.divideScalar(Math.sqrt(P.x * P.x + P.y * P.y + P.z * P.z));
    }
    P = this.projectObjects(u, s, !0);
    u = 0;
    for (w = P.length; u < w; u++) {
      y = P[u].object;
      if (y.visible) {
        R = y.matrixWorld;
        U = y.matrixRotationWorld;
        W = y.materials;
        X = y.overdraw;
        j = 0;
        if (y instanceof THREE.Mesh) {
          S = y.geometry;
          D = S.vertices;
          V = S.faces;
          S = S.faceVertexUvs;
          z = 0;
          for (A = D.length; z < A; z++) {
            f = a();
            f.positionWorld.copy(D[z].position);
            R.multiplyVector3(f.positionWorld);
            f.positionScreen.copy(f.positionWorld);
            o.multiplyVector4(f.positionScreen);
            f.positionScreen.x /= f.positionScreen.w;
            f.positionScreen.y /= f.positionScreen.w;
            f.visible = f.positionScreen.z > M && f.positionScreen.z < E;
          }
          D = 0;
          for (z = V.length; D < z; D++) {
            A = V[D];
            if (A instanceof THREE.Face3) {
              v = g[A.a];
              F = g[A.b];
              B = g[A.c];
              if (
                v.visible &&
                F.visible &&
                B.visible &&
                (y.doubleSided ||
                  y.flipSided !=
                    (B.positionScreen.x - v.positionScreen.x) *
                      (F.positionScreen.y - v.positionScreen.y) -
                      (B.positionScreen.y - v.positionScreen.y) *
                        (F.positionScreen.x - v.positionScreen.x) <
                      0)
              ) {
                L = k[l] = k[l] || new THREE.RenderableFace3();
                l++;
                i = L;
                i.v1.copy(v);
                i.v2.copy(F);
                i.v3.copy(B);
              } else continue;
            } else if (A instanceof THREE.Face4) {
              v = g[A.a];
              F = g[A.b];
              B = g[A.c];
              L = g[A.d];
              if (
                v.visible &&
                F.visible &&
                B.visible &&
                L.visible &&
                (y.doubleSided ||
                  y.flipSided !=
                    ((L.positionScreen.x - v.positionScreen.x) *
                      (F.positionScreen.y - v.positionScreen.y) -
                      (L.positionScreen.y - v.positionScreen.y) *
                        (F.positionScreen.x - v.positionScreen.x) <
                      0 ||
                      (F.positionScreen.x - B.positionScreen.x) *
                        (L.positionScreen.y - B.positionScreen.y) -
                        (F.positionScreen.y - B.positionScreen.y) *
                          (L.positionScreen.x - B.positionScreen.x) <
                        0))
              ) {
                T = n[m] = n[m] || new THREE.RenderableFace4();
                m++;
                i = T;
                i.v1.copy(v);
                i.v2.copy(F);
                i.v3.copy(B);
                i.v4.copy(L);
              } else continue;
            }
            i.normalWorld.copy(A.normal);
            U.multiplyVector3(i.normalWorld);
            i.centroidWorld.copy(A.centroid);
            R.multiplyVector3(i.centroidWorld);
            i.centroidScreen.copy(i.centroidWorld);
            o.multiplyVector3(i.centroidScreen);
            B = A.vertexNormals;
            v = 0;
            for (F = B.length; v < F; v++) {
              L = i.vertexNormalsWorld[v];
              L.copy(B[v]);
              U.multiplyVector3(L);
            }
            v = 0;
            for (F = S.length; v < F; v++)
              if ((T = S[v][D])) {
                B = 0;
                for (L = T.length; B < L; B++) i.uvs[v][B] = T[B];
              }
            i.meshMaterials = W;
            i.faceMaterials = A.materials;
            i.overdraw = X;
            i.z = i.centroidScreen.z;
            J.push(i);
          }
        } else if (y instanceof THREE.Line) {
          Q.multiply(o, R);
          D = y.geometry.vertices;
          v = a();
          v.positionScreen.copy(D[0].position);
          Q.multiplyVector4(v.positionScreen);
          z = 1;
          for (A = D.length; z < A; z++) {
            v = a();
            v.positionScreen.copy(D[z].position);
            Q.multiplyVector4(v.positionScreen);
            F = g[j - 2];
            N.copy(v.positionScreen);
            O.copy(F.positionScreen);
            if (c(N, O)) {
              N.multiplyScalar(1 / N.w);
              O.multiplyScalar(1 / O.w);
              R = t[q] = t[q] || new THREE.RenderableLine();
              q++;
              p = R;
              p.v1.positionScreen.copy(N);
              p.v2.positionScreen.copy(O);
              p.z = Math.max(N.z, O.z);
              p.materials = y.materials;
              J.push(p);
            }
          }
        } else if (y instanceof THREE.Particle) {
          x.set(y.matrixWorld.n14, y.matrixWorld.n24, y.matrixWorld.n34, 1);
          o.multiplyVector4(x);
          x.z /= x.w;
          if (x.z > 0 && x.z < 1) {
            R = G[C] = G[C] || new THREE.RenderableParticle();
            C++;
            r = R;
            r.x = x.x / x.w;
            r.y = x.y / x.w;
            r.z = x.z;
            r.rotation = y.rotation.z;
            r.scale.x =
              y.scale.x *
              Math.abs(
                r.x -
                  (x.x + s.projectionMatrix.n11) /
                    (x.w + s.projectionMatrix.n14)
              );
            r.scale.y =
              y.scale.y *
              Math.abs(
                r.y -
                  (x.y + s.projectionMatrix.n22) /
                    (x.w + s.projectionMatrix.n24)
              );
            r.materials = y.materials;
            J.push(r);
          }
        }
      }
    }
    I && J.sort(b);
    return J;
  };
};
THREE.DOMRenderer = function () {
  THREE.Renderer.call(this);
  var a = null,
    b = new THREE.Projector(),
    c,
    d,
    e,
    h;
  this.domElement = document.createElement("div");
  this.setSize = function (f, j) {
    c = f;
    d = j;
    e = c / 2;
    h = d / 2;
  };
  this.render = function (f, j) {
    var g, i, l, k, m, n, p, q;
    a = b.projectScene(f, j);
    g = 0;
    for (i = a.length; g < i; g++) {
      m = a[g];
      if (m instanceof THREE.RenderableParticle) {
        p = m.x * e + e;
        q = m.y * h + h;
        l = 0;
        for (k = m.material.length; l < k; l++) {
          n = m.material[l];
          if (n instanceof THREE.ParticleDOMMaterial) {
            n = n.domElement;
            n.style.left = p + "px";
            n.style.top = q + "px";
          }
        }
      }
    }
  };
};
THREE.SoundRenderer = function () {
  this.volume = 1;
  this.domElement = document.createElement("div");
  this.domElement.id = "THREESound";
  this.cameraPosition = new THREE.Vector3();
  this.soundPosition = new THREE.Vector3();
  this.render = function (a, b, c) {
    c && a.update(undefined, !1, b);
    c = a.sounds;
    var d,
      e = c.length;
    for (d = 0; d < e; d++) {
      a = c[d];
      this.soundPosition.set(
        a.matrixWorld.n14,
        a.matrixWorld.n24,
        a.matrixWorld.n34
      );
      this.soundPosition.subSelf(b.position);
      if (a.isPlaying && a.isLoaded) {
        a.isAddedToDOM || a.addToDOM(this.domElement);
        a.calculateVolumeAndPan(this.soundPosition);
      }
    }
  };
};
THREE.RenderableParticle = function () {
  this.rotation = this.z = this.y = this.x = null;
  this.scale = new THREE.Vector2();
  this.materials = null;
};
