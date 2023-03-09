/**
 *Geometria:crea un objeto THREE.Geometry y lo retorna
 * Entradas: vx=arreglo de vertices (arreglo de arreglos de enteros)
 * Salidas:  
 */
function Geometria(vx){

    geom = new THREE.Geometry();
      var largoVertice = vx.length;
     for (i = 0; i < largoVertice; i++){
       [x,y,z]=[vx[i][0],vx[i][1],vx[i][2]]
        vector = new THREE.Vector3(x, y, z);
        geom.vertices.push(vector);
      }
      return geom;

}    

function Traslacion(vt) {
        var matriz = new THREE.Matrix4();
        matriz.set(1, 0, 0, vt[0],
                   0, 1, 0, vt[1],
                   0, 0, 1, vt[2],
                   0, 0, 0, 1);
        return matriz;
}

/**
 * escalado: crea la matriz de escalado matrizS a partir de vs
 * ENTRADAS: vs = Vector de escalado (arreglo de 3 enteros)
 * SALIDA:  matriz = Matriz de traslacion genrada a partir de vt
*/
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
               0, vs[1], 0, 0,
               0, 0, vs[2], 0,
               0, 0, 0, 1);
    return matrizS;
}
/**
 * escaladoReal: Escala
 * ENTRADA: obj = objeto de tipo ??
 *          vp = vector de posicion inicial de obj (Arreglo de 3 enteros)
 *          vs = Vector de escalado (Arreglo de 3 enteros)
 * SALIDA: obj actualizado
*/
function EscaladoReal(obj, vp, vs) {
    vt = [-vp[0], -vp[1], -vp[2]]
    obj.applyMatrix(Traslacion(vt));
    obj.applyMatrix(Escalado(vs));
    obj.applyMatrix(Traslacion(vp));

}

function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    // Colores
    color=[{color:0xFF0000},{color:0x00ff00},{color:0xFF0000}]; //colores
    
    //Geometria para las piramides
    lado=40;    //lado de la base de la piramide
    h=50;       //altura de la piramide
    [v1, v2, v3, v4, v5] = [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    var vertices = [v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];
    geom = Geometria(vertices);

    //Material de las piramides
    material=[]; 
    for(i=0;i<2;i++)
        material.push(new THREE.ParticleBasicMaterial(color[i]));

    //figuras para las piramides (arreglo fig)
    fig=[];
    vt = [20,50,10];
    for(i=0;i<2;i++){
        fig.push(new THREE.Line(geom,material[i]));
        fig[i].applyMatrix(Traslacion(vt));
    }

    //Rotar una de las piramides sobre el eje x
    //fig[1].applyMatrix(escalado([1, -1, 1]));
    EscaladoReal(fig[1], vt, [1, -1, 1]);

    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);  
    scene.add(arrowY);  
    scene.add(arrowZ);

    for(i=0;i<2;i++)
        scene.add(fig[i]);

    renderer.render(scene, camera);


}

init();  // otra forma: window.onload = init;