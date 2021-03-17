import observe from './observe';
import Watcher from './Watcher'

var obj = {
    a:{
        b:{
            c:1
        }
    },
    d: 6
}

observe(obj);
new Watcher(obj, 'a.b.c', function(){
    console.log('watcher', this)
})

obj.a.b.c = 999
console.log(obj)

