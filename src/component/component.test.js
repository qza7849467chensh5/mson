import BaseComponent from './component';

it('should concat schemas', () => {
  const c = new BaseComponent({
    schema: 'one',
  });
  c.set({ schema: 'two' });
  c.set({ schema: 'three' });
  expect(c.get('schema')).toEqual([
    c._getBaseComponentSchema(),
    c._getWrappedComponentSchema(),
    'one',
    'two',
    'three',
  ]);
});

// // NOTE: testing at this layer to make sure that derived class at Component layer supports getters
// // TODO: also test with nested properties
// it('should support getters', () => {
//   class BaseComponentWithGetter extends BaseComponent {
//     get foo() {
//       return this.get('foo');
//     }
//   }

//   // const component = new BaseComponent({
//   const component = new BaseComponentWithGetter({
//     schema: {
//       component: 'Form',
//       fields: [
//         {
//           name: 'foo',
//           component: 'TextField'
//         }
//       ]
//     }
//   });
//   component.set({ foo: 'bar' })
// // console.log(component.get('foo'))
//   console.log({ foo: component.foo })
// });

// it('should support getters', () => {
//   class BaseComponentWithGetter extends BaseComponent {
//     get foo() {
//       return this.get('foo');
//     }
//   }

//   const schema = {
//     component: 'Form',
//     fields: [
//       {
//         name: 'foo',
//         component: 'Field'
//       }
//     ]
//   }

//   const innerComponent = new BaseComponentWithGetter({ schema });

//   const outerComponent = new BaseComponentWithGetter({ schema });

//   innerComponent.set({ foo: 'bar' })
//   outerComponent.set({ foo: innerComponent })
//   console.log(outerComponent.get('foo.foo'))
//   console.log({ foo: outerComponent.foo.foo })
// });

// NOTE: testing at this layer to make sure that derived class at Component layer supports getters
// TODO: also test with nested properties
// it('should support getters', () => {
//   function extend(sup, base) {
//     var descriptor = Object.getOwnPropertyDescriptor(
//       base.prototype, 'constructor'
//     );
//     base.prototype = Object.create(sup.prototype);
//     var handler = {
//       construct: function(target, args) {
//         var obj = Object.create(base.prototype);
//         this.apply(target, obj, args);
//         return obj;
//       },
//       apply: function(target, that, args) {
//         sup.apply(that, args);
//         base.apply(that, args);
//       }
//     };
//     var proxy = new Proxy(base, handler);
//     descriptor.value = proxy;
//     Object.defineProperty(base.prototype, 'constructor', descriptor);
//     return proxy;
//   }

//   class Person {
//     constructor(name) {
//       this.name = name;
//     }
//   }

//   // var Person = function(name) {
//   //   this.name = name;
//   // };

//   var Boy = extend(Person, function(name, age) {
//     this.age = age;
//   });

//   Boy.prototype.gender = 'M';

//   var Peter = new Boy('Peter', 13);

//   console.log(Peter.gender);  // "M"
//   console.log(Peter.name);    // "Peter"
//   console.log(Peter.age);
// });

// it('should support getters', () => {
//   class Person {
//     constructor(name, age, gender) {
//       this.name = name;
//       this.age = age;
//       this.other = { gender }

//       return new Proxy(this, {
//         get: (target, key) => {
//           console.log({ target, key })
//           if (this[key] === undefined) {
//             return this.other[key]
//           } else {
//             return Reflect.get(target, key);
//           }
//         }
//       })
//     }
//   }

//   var peter = new Person('Peter', 13, 'M');

//   console.log(peter.name);
//   console.log(peter.age);
//   console.log(peter.gender);
// });

it('should support getters', () => {
  class BaseComponentWithGetter extends BaseComponent {
    constructor(props) {
      super(props);

      return new Proxy(this, {
        get: (target, key) => {
          if (key in this) {
            return Reflect.get(target, key);
          } else if (this.has(key)) {
            return this.get(key);
          } else {
            // We may end up here is we are implicitly retrieving the value of a schema-defined
            // property. TODO: should we change the callers so that this doesn't happen?
            return Reflect.get(target, key);
          }
        },
      });
    }
  }

  const schema = {
    component: 'Form',
    fields: [
      {
        name: 'foo',
        component: 'Field',
      },
    ],
  };

  const innerComponent = new BaseComponentWithGetter({ schema });

  const outerComponent = new BaseComponentWithGetter({ schema });

  innerComponent.set({ foo: 'bar' });
  outerComponent.set({ foo: innerComponent });
  console.log(outerComponent.get('foo.foo'));
  console.log({ foo: outerComponent.foo.foo });
});
