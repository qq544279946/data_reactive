import {def} from './utils';
import observe from './observe'
const arrayPrototype = Array.prototype;
export const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methodsNeedChange.forEach(methodName => {
    const original = arrayPrototype[methodName];
    
    def(arrayMethods, methodName, function(){
        const ob = this.__ob__;
        let inserted = [];
        const args = Array.from(arguments);
        switch(methodName){
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if(inserted.length != 0){
            ob.observeArray(inserted);
        }
        ob.dep.notify();
        let result = original.apply(this, args);
        return result;

    }, false)
})