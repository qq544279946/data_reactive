import defineReactive from './defineReactive';
import {def} from './utils';
import {arrayMethods} from './array'
import observe from './observe';
import Dep from './Dep';
// Observer类 监听obj对象中各个层级的属性

export default class Observer{
    constructor(value){
       def(value, '__ob__', this, false); 
       this.dep = new Dep();
       if(Array.isArray(value)){
           value.__proto__ = arrayMethods;
           this.observeArray(value)
       }else{
            this.walk(value);
       }
    }

    walk(value){
        for(let key in value){
            defineReactive(value, key);
        }
    }

    observeArray(arr){
        for(let i = 0, l = arr.length; i < l; i++){
            observe(arr[i]);
        }
    }
}

