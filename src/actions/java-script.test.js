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
