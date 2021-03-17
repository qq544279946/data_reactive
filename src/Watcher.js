import Dep from "./Dep";

let uid = 0;
export default class Watcher{
    constructor(target, expression, callback){
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
        
    }

    update(){
        this.run();
    }

    get(){
        Dep.target = this;
        const obj = this.target;
        let value = this.getter(obj);
        Dep.target = null;
        return value
    }

    run(){
        this.getAndInvoke(this.callback)
    }

    getAndInvoke(callback){
        const value = this.get();
        console.log('in',value)
        if(value !== this.value || typeof value == 'object'){
            const oldValue = this.value;
            this.value = value;
            callback.call(this.target, value, oldValue);
        }
    }
}

function parsePath(str){
    let segments = str.split('.');

    return (obj)=>{
        for(let i = 0; i < segments.length; i++){
            if(!obj) return;
            obj = obj[segments[i]];
        }
        
        return obj;
    }
}