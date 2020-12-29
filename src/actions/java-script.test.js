import compiler from '../compiler';

it('should execute function', async () => {
  const script = compiler.newComponent({
    component: 'JavaScript',
    // function: () => console.log('foo')
    function: (props) => console.log({ props }),
  });

  // const foo = () => console.log('bar');

  // script.set({ function: foo });

  await script.run({ arguments: 'foo' });

  // console.log(foo)
});

it('should serialize and deserialize function', async () => {
  const fun = (props) => console.log({ props });

  const script = compiler.newComponent({
    component: 'JavaScript',
    function: fun.toString(),
  });

  await script.run({ arguments: 'foo' });
});
