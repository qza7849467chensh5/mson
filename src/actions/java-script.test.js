import compiler from '../compiler';

it('should execute function', async () => {
  const script = compiler.newComponent({
    component: 'JavaScript',
    // function: () => console.log('foo')
  });

  const foo = () => console.log('bar');

  script.set({ function: foo });

  await script.run();

  // console.log(foo)
});
