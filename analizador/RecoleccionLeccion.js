function recorrerLeccion(node) {
    switch (node.tipo) {
        case 'INSTRUCCION':
            {
                for (let index = 0; index < node.numeroHijos.length; index++) {
                    const element = node.numeroHijos[index];
                    recorrerLeccion(element);
                }
                break;
            }
        case 'ATRIBUTOS':
            {
                let titulo = "";
                let descripcion = "";
                let ejemplo = "";
                let tipo = "";
                let tarea = "";
                let resultado = "";
                for (let index = 0; index < node.numeroHijos.length; index++) {
                    const element = node.numeroHijos[index];
                    if (node.hijos[0].valor.toLowerCase() == 'titulo') {
                        titulo = node.hijos[1].valor;
                    }else if (node.hijos[0].valor.toLowerCase() == 'descripcion') {
                        descripcion = node.hijos[1].valor;
                    }else if (node.hijos[0].valor.toLowerCase() == 'ejemplo') {
                        ejemplo = node.hijos[1].valor;
                    }else if (node.hijos[0].valor.toLowerCase() == 'tipo') {
                        tipo = node.hijos[1].valor;
                    }else if (node.hijos[0].valor.toLowerCase() == 'tarea') {
                        tarea = node.hijos[1].valor;
                    }else if (node.hijos[0].valor.toLowerCase() == 'resultado') {
                        resultado = node.hijos[1].valor;
                    }
                }
                let nuevaLeccion = new Leccion(titulo,descripcion,ejemplo,tarea,resultado,tipo);
                insertarLeccion(nuevaLeccion);
                break;
            }
        default:
            break;
    }
}