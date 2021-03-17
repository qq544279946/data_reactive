import observe from './observe'
import Dep from './Dep'
export default function defineReactive(data, key, val){
    if(arguments.length == 2){
        val = data[key];
    }

    let dep = new Dep();
    let childOb = observe(val);

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get(){
            if(Dep.target){
                dep.depend();
                if(childOb){
                    childOb.dep.depend();
                }
            }
            return val;
        },
        set(newVal){
            if(val === newVal){
                return;
            }

            val = newVal;
            childOb = observe(newVal);
            dep.notify()
        }
    })
}