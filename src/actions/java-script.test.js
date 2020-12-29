import compiler from '../compiler';

it('should execute function', async () => {
  const script = compiler.newComponent({
    component: 'JavaScript',
    function: (props) => props,
  });

  const output = await script.run({ arguments: 'foo' });
  expect(output).toEqual({ arguments: 'foo' });
});

it('should execute async function', async () => {
  const script = compiler.newComponent({
    component: 'JavaScript',
    function: (props) => Promise.resolve(props),
  });

  const output = await script.run({ arguments: 'foo' });
  expect(output).toEqual({ arguments: 'foo' });
});

it('should serialize and deserialize function', async () => {
  const fun = (props) => props;

  const script = compiler.newComponent({
    component: 'JavaScript',
    function: fun.toString(),
  });

  const output = await script.run({ arguments: 'foo' });
  expect(output).toEqual({ arguments: 'foo' });
});
