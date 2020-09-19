var data = {
    titulo: 'Lista de Tareas',
    nuevaTarea: '',
    tareas: [{
            objetivo: 'Correr',
            terminada: false
        },
        {
            objetivo: 'Lavar el auto',
            terminada: false
        },
        {
            objetivo: 'Estudiar',
            terminada: false
        }
    ]

}
Vue.component('titulo', {
    template: `<h1><strong>{{titulo}}</strong></h1>`,
    data: function (titulo) {
        return  data;
    }
})
Vue.component('agregar-tareas', {
    template: `<div class="input-group">
                <input type="text" v-model='nuevaTarea' class="form-control" placeholder="Escribe una nueva tarea" v-on:keyup.enter='agregarTarea'>
                <button v-on:click='agregarTarea' class="btn btn-primary">Agregar</button>
                </div>`,
    data: function(){
        return data;
    },
    methods: {
        agregarTarea: function () {
            let objetivo = this.nuevaTarea.trim();
            let terminada = false;
            if (objetivo) {
                this.tareas.push({
                    objetivo,
                    terminada
                })
            }
            this.nuevaTarea = '';
        }
    }            
})
Vue.component('lista-de-tareas', {
    template: `<ul class="list-group">
                    <li v-for='(tarea, indice) of tareas' class="list-group-item d-flex justify-content-between align-items-center" v-bind:class="{listo: tarea.terminada}">{{tarea.objetivo}}
                        <span>
                            <button class="btn btn-success" v-on:click='tarea.terminada = !tarea.terminada'>Lista</button>
                            <button class="btn btn-danger" v-on:click='borrar(indice)'>Borrar</button>
                        </span>
                    </li>
                </ul>`,
    data: function(){
        return data;
    },
    methods: {
        borrar: function (indice) {
            this.tareas.splice(indice, 1);
        }
    }

})

var app = new Vue({
    el: '#app',
    data: data,

})
