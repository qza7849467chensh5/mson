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

  async act(props) {
    const fun = this.get('function');
    // console.log({ fun });
    // TODO: how to execute function in a safe way and get the results? Use eval in browser and sandbox in backend?
    if (typeof fun === 'function') {
      // console.log('is function');
      await fun(props);
    }
  }
}
