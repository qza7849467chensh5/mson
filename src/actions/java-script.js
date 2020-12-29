import Action from './action';

export default class JavaScript extends Action {
  _className = 'JavaScript';

  _create(props) {
    super._create(props);

    this.set({
      schema: {
        component: 'Form',
        fields: [
          {
            name: 'function',
            component: 'Field',
            required: true,
          },
        ],
      },
    });
  }

  set(props) {
    if (props.function !== undefined && typeof props.function !== 'function') {
      // TODO: use sandbox instead of eval in back end?
      props = {
        ...props,
        function: new Function(
          'props',
          `const f = ${props.function.toString()}; f(props);`
        ),
      };
    }

    super.set(props);
  }

  async act(props) {
    const fun = this.get('function');
    return await fun(props);
  }
}
